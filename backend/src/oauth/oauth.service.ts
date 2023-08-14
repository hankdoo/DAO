import { Injectable } from '@nestjs/common';

import { Algorithm, sign, verify } from 'jsonwebtoken';
import { DataSource, DeepPartial, EntityManager, InsertResult } from 'typeorm';
import config from 'config';
import { v4 } from 'uuid';

import { checkPassword, passwordToHash } from '../helpers/password.helper';
import {
  account_blocked,
  authorization_failed,
  bad_request,
  access_token_expired_signature,
  refresh_token_expired_signature,
} from '../errors';

import { IJwtPayload, User } from './user/user.entity';
import { RecoveryKey } from './recovery-key/recovery-key.entity';
import { RefreshToken } from './refresh-token/refresh-token.entity';
import { SignInDTO } from './dto/sign-in.dto';
import { SignInResponseDTO } from './dto/sign-in-response.dto';
import { GetMessageDTO } from './dto/get-message.dto';
// import ethers from 'ethers';
const ethers = require('ethers');
const jwt_settings = config.get<IJwtSettings>('JWT_SETTINGS');

export interface IJwtToken {
  iat: number;
  exp: number;
  jti: string;
}

export interface IAccessToken extends IJwtToken {
  current_user: IJwtPayload;
  token_type: 'access';
}

export interface IRefreshToken extends IJwtToken {
  current_user: { id: string };
  token_type: 'refresh';
}

@Injectable()
export class OAuthService {
  constructor(private dataSource: DataSource) {}

  public async registration(publicAddress: string, password: string) {
    return await this.dataSource.transaction(async (entityManager) => {
      const exist_user = await entityManager.getRepository(User).findOne({ where: { publicAddress: publicAddress.trim().toLowerCase() } });

      if (exist_user) {
        bad_request({ raise: true, msg: 'publicAddress_ALREADY_EXISTS' });
      }

      const user_obj: DeepPartial<User> = {
        publicAddress,
        // password: passwordToHash(password),
      };

      const inserted_user = await entityManager.getRepository(User).insert(user_obj);

      return await this.reGenerateRecoveryKeys(entityManager, inserted_user.identifiers[0].id);
    });
  }

  public async getMesage(body: GetMessageDTO): Promise<string> {
    let exist_user: User = await this.dataSource
      .getRepository(User)
      .findOne({ where: { publicAddress: body.publicAddress.trim().toLowerCase() } });
    if (!exist_user) {
      exist_user = await this.createUser({ publicAddress: body.publicAddress });
    }
    // return {
    //   nonce: exist_user.nonce,
    //   publicAddress: body.publicAddress,
    // };
    return `Welcome to Funto \naddress: ${exist_user.publicAddress} \nnonce: ${exist_user.nonce}`;

    // const user_obj: DeepPartial<User> = {
    //   publicAddress,
    //   // password: passwordToHash(password),
    // };

    // const inserted_user = await entityManager.getRepository(User).insert(user_obj);

    // return await this.reGenerateRecoveryKeys(entityManager, inserted_user.identifiers[0].id);
  }
  public async createUser(user: DeepPartial<User>) {
    return await this.dataSource.transaction(async (entityManager): Promise<User> => {
      return await entityManager.save(User, entityManager.create(User, { publicAddress: user.publicAddress }));
    });
  }

  public async signIn(body: SignInDTO) {
    let user: User = await this.dataSource
      .getRepository(User)
      .findOne({ where: { publicAddress: body.publicAddress?.trim().toLowerCase() } });
    const msg = `Welcome to Funto \naddress: ${user.publicAddress} \nnonce: ${user.nonce}`;
    const recoveredAddress = ethers.verifyMessage(msg, body.signature);
    console.log(recoveredAddress);
    const nonce = Math.floor(Math.random() * 1000000);
    await this.dataSource.getRepository(User).save({ ...user, nonce });

    //  await this.dataSource.transaction(async (entityManager): Promise<SignInResponseDTO> => {
    //   if (!exist_user) {
    //     // bad_request({ raise: true, msg: 'publicAddress_ALREADY_EXISTS' });
    //     exist_user = (await entityManager.getRepository(User).insert({ publicAddress })).raw;
    //   }
    //   return {
    //     nonce: exist_user.nonce,
    //     publicAddress: exist_user.publicAddress,
    //   };

    //   return {
    //     access_token: '',
    //     refresh_token: '',
    //   };
    // });
    return recoveredAddress.toLowerCase() === user.publicAddress.toLowerCase();
  }
  public async signInByPassword(publicAddress: string, password: string) {
    return await this.dataSource.transaction(async (entityManager) => {
      const user = await entityManager.getRepository(User).findOne({ where: { publicAddress: publicAddress.trim().toLowerCase() } });

      // if (!user || !checkPassword(user.password, password)) {
      //   authorization_failed({ raise: true });
      // }

      if (user.is_blocked) {
        account_blocked({ raise: true });
      }

      return await this.genereteJwt(entityManager, user);
    });
  }

  public async signInByRefreshToken(refresh_token: string) {
    return await this.dataSource.transaction(async (entityManager) => {
      const { current_user, token_type, jti } = this.verifyToken<IRefreshToken>(refresh_token, false);

      if (!token_type || token_type !== 'refresh') {
        authorization_failed({ raise: true });
      }

      const deleted_token = await entityManager.getRepository(RefreshToken).delete({ id: jti, user_id: current_user.id });

      if (!deleted_token.affected) {
        authorization_failed({ raise: true });
      }

      const user = await entityManager.getRepository(User).findOne({ where: { publicAddress: current_user.id } });

      if (!user) {
        authorization_failed({ raise: true });
      }

      if (user.is_blocked) {
        account_blocked({ raise: true });
      }

      return await this.genereteJwt(entityManager, user);
    });
  }

  public async changePassword(recovery_key: string, new_password: string) {
    return await this.dataSource.transaction(async (entityManager) => {
      const recovery_key_entity = await entityManager.getRepository(RecoveryKey).findOne({ where: { id: recovery_key } });

      if (!recovery_key_entity) {
        authorization_failed({ raise: true });
      }

      // await entityManager.getRepository(User).update(recovery_key_entity.user_id, { password: passwordToHash(new_password) });

      await entityManager.getRepository(RecoveryKey).delete(recovery_key);

      return { message: 'OK' };
    });
  }

  private async genereteJwt(entityManager: EntityManager, user: User) {
    const refresh = await entityManager.getRepository(RefreshToken).save({ user_id: user.publicAddress });

    const access_token = sign({ current_user: user.json_for_jwt(), token_type: 'access' }, jwt_settings.secret_key, {
      jwtid: v4(),
      expiresIn: `${jwt_settings.access_token_expires_in}m`,
      algorithm: jwt_settings.algorithm as Algorithm,
    });

    const refresh_token = sign({ current_user: { id: user.publicAddress }, token_type: 'refresh' }, jwt_settings.secret_key, {
      jwtid: refresh.id,
      expiresIn: `${jwt_settings.refresh_token_expires_in}m`,
      algorithm: jwt_settings.algorithm as Algorithm,
    });

    return {
      access_token,
      access_token_expires_at: new Date(
        new Date().setMinutes(new Date().getMinutes() + jwt_settings.access_token_expires_in)
      ).toISOString(),
      refresh_token,
      refresh_token_expires_at: new Date(
        new Date().setMinutes(new Date().getMinutes() + jwt_settings.refresh_token_expires_in)
      ).toISOString(),
    };
  }

  public async reGenerateRecoveryKeys(entityManager: EntityManager, user_id: string) {
    await entityManager.getRepository(RecoveryKey).delete({ user_id });

    const keys = [];

    for (let i = 0; i < 5; i++) {
      keys.push({ user_id: user_id });
    }

    return (await entityManager.getRepository(RecoveryKey).save(keys)).map((r: RecoveryKey) => r.id);
  }

  public verifyToken<T>(jwt_token: string, is_access_token = true) {
    try {
      return verify(jwt_token, jwt_settings.secret_key) as T;
    } catch (error) {
      if (is_access_token) {
        access_token_expired_signature({ raise: true });
      } else {
        refresh_token_expired_signature({ raise: true });
      }
    }
  }
}
