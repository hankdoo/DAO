const express = require("express");

const nftController = require("../controller/nft");

const router = express.Router();

router.post("/upload", nftController.uploadNFT);

module.exports = router;
