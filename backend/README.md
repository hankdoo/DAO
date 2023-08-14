# NestJS-Example

* NestJS 9
* TypeORM 0.3

## Dependencies

* [NodeJS 16](https://nodejs.org/download/release/latest-v16.x/)
* [Redis 7](https://redis.io/download/)
* [PostgreSQL 13](https://www.postgresql.org/download/)
* [RabbitMQ](https://www.rabbitmq.com/download.html)

## Installation

```bash
npm ci
```

## Running the app

```bash
npm run start:dev
```

## Repl

```bash
NODE_ENV=development npm run start:repl
```

*https://docs.nestjs.com/recipes/repl*

## Databse

### Create db

```bash
psql -U postgres

create database development_nestjs_example;
```

### Create migration

```bash
NODE_ENV=development npm run db:migration:create
```

### Run migration

```bash
NODE_ENV=development npm run db:migration:run
```

### Sync schema

```bash
NODE_ENV=development npm run db:schema:sync
```




<!-- exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{ title: "First Post", content: "This is the first post!" }],
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  // Create post in db
  res.status(201).json({
    message: "Post created successfully!",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
}; -->

<!-- //firebase
const firebaseAdmin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const serviceAccount = require("../serviceAccount.json");
const { json } = require("body-parser");
const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});
const storageRef = admin.storage().bucket("gs://dao-fe83d.appspot.com");
//firebase
exports.uploadNFT = async (req, res) => {
  for (let i = 1; i <= 10; i++) {
    await uploadFile(`./metadata/${i}.json`, `${i}.json`);
    console.log("Uploaded meta number " + i);
  }
  res.status(200).json();
};

const uploadFile = async (path, filename) => {
  const storage = storageRef.upload(path, {
    public: true,
    destination: `metadata/${filename}`,
    metadata: {
      metadata: {
        firebaseStorageDownloadTokens: uuidv4(),
      },
    },
  });
  return storage;
}; -->
