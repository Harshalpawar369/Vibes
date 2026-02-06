const ImageKit = require("imagekit");

const imageKit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC,
  privateKey: process.env.IMAGE_KIT_PRIVATE,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file, fileName) {
  const result = await imageKit.upload({
    file: file,
    fileName: fileName,
    useUniqueFileName: true,
  });

  return result;
}

module.exports = {
  uploadFile,
};
