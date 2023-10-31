import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

const sharp = require('sharp');
const fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const os = require('os');
const path = require('path');

const compressVideoFFMPG = (
  file: string,
  format: any,
  fileData: any,
  convertedFilePath: string,
  tmpPath: string
) => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.writeFileSync(tmpPath, fileData.data);
  return new Promise((resolve, reject) => {
    ffmpeg.setFfmpegPath(ffmpegPath);
    ffmpeg()
      .input(tmpPath)
      .withNoAudio()
      .outputOptions('-vf', 'scale=-2:720')
      // .saveToFile(`${__dirname}/tmp/${convertedFilePath}`)
      .saveToFile(`${__dirname}/${convertedFilePath}`)
      .on('progress', (progress: { percent: number }) => {
        if (progress.percent) {
          console.log(`Processing: ${Math.floor(progress.percent)}% done`);
        }
      })
      .on('end', () => {
        return resolve(convertedFilePath);
      })
      .on('error', (error: any) => {
        reject(error);
      });
  });
};

interface VideoType {
  convertedFilePath: string;
}
export const uploadFile = async (file: any, folder: string = 'temp') => {
  const nameOfFile = `${Date.now()}-${file.name
    .replace(/[^a-zA-Z0-9 .]/g, '')
    .replace(/\s/g, '-')}`;
  const tmpDir = os.tmpdir();
  let tmpVideoName = '';
  const fileName = file.name.replace(/\.[^/.]+$/, '');
  const convertedFilePath = `convert_${fileName}_${+new Date()}.mp4`;
  const tmpPath = path.join(tmpDir, `${Date.now()}-${fileName}`);
  let compressedVideo;
  let videoFile = false;
  let compressedImage;
  let fileUPLOAD: any;

  if (file.mimetype === 'video/quicktime' || file.mimetype === 'video/mp4') {
    videoFile = true;
    compressedVideo = await compressVideoFFMPG(
      file.name,
      'mp4',
      file,
      convertedFilePath,
      tmpPath
    );
    // tmpVideoName = `${__dirname}/tmp/${convertedFilePath}`;
    tmpVideoName = `${__dirname}/${convertedFilePath}`;

    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fileUPLOAD = fs.readFileSync(tmpVideoName);
  } else {
    const image = await sharp(file.data);
    const { width, height } = await image.metadata();

    let newWidth = width;
    let newHeight = height;

    if (width >= height) {
      if (width > 2000) {
        newWidth = 2000;
        newHeight = Math.round((height * newWidth) / width);
      }
    } else if (height > 2000) {
      newHeight = 2000;
      newWidth = Math.round((width * newHeight) / height);
    }

    compressedImage = image.resize({ width: newWidth, height: newHeight });
    fileUPLOAD = compressedImage.webp({ quality: 80 });
  }

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    Key: `${folder}/${nameOfFile}`,
    Body: fileUPLOAD,
    ACL: 'public-read',
  };
  const s3Return = await s3.upload(params).promise();
  if (videoFile)
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    fs.unlinkSync(tmpVideoName);
  return s3Return;
};

export const uploadImageToAI = async (file: any, folder: string = 'temp') => {
  try {
    // const image = await sharp(file.data);
    const image = sharp(Buffer.from(file));

    const compressedImage = image.resize({ width: 1024, height: 1024 });
    const fileUPLOAD = compressedImage.webp({ quality: 70 });

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: `${folder}/imageToAI.png`,
      Body: fileUPLOAD,
      ACL: 'public-read',
    };
    const s3Return = await s3.upload(params).promise();

    return s3Return;
  } catch (error) {
    console.error('Error upload image:', error);
    return error;
  }
};

export const uploadQr = async (file: any, folder: string = 'temp') => {
  const image = await sharp(file.data);

  const compressedImage = image.resize({ width: 1000, height: 1000 });
  const fileUPLOAD = compressedImage.webp({ quality: 80 });

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    Key: `${folder}/qr.png`,
    Body: fileUPLOAD,
    ACL: 'public-read',
  };
  const s3Return = await s3.upload(params).promise();

  return s3Return;
};

export const getFile = async (key: string) => {
  console.log(key);
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    Key: key,
  };

  return s3.getObject(params).promise();
};

export const moveFile = async (key: string, newKey: string) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    CopySource: `${process.env.AWS_S3_BUCKET_NAME}/${key}`,
    Key: newKey,
    ACL: 'public-read',
  };

  return s3.copyObject(params).promise();
};

export const deleteFile = async (key: string) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    Key: key,
  };

  return s3.deleteObject(params).promise();
};

// export const clearBucket = async () => {
//   const params = {
//     Bucket: process.env.AWS_S3_BUCKET_NAME as string,
//   };

//   const listedObjects = await s3.listObjectsV2(params).promise();

//   if (listedObjects.Contents?.length === 0) return;

//   const deleteParams = {
//     Bucket: process.env.AWS_S3_BUCKET_NAME as string,
//     Delete: { Objects: [] },
//   } as {
//     Bucket: string;
//     Delete: {
//       Objects: { Key: string }[];
//     };
//   };

//   listedObjects.Contents?.forEach(({ Key }) => {
//     deleteParams.Delete.Objects.push({ Key: Key as string });
//   });

//   // eslint-disable-next-line consistent-return
//   return s3.deleteObjects(deleteParams).promise();
// };
