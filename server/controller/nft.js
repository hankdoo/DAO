//firebase
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
};
