import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

const sharp = require('sharp');
const fs = require('fs');

export const uploadFile = async (file: any, folder: string = 'temp') => {
  let loading = false;
  const sharp = require('sharp');
  const fs = require('fs');
  const nameOfFile = `${Date.now()}-${file.name
    .replace(/[^a-zA-Z0-9 .]/g, '')
    .replace(/\s/g, '-')}`;

  let fileUPLOAD = '';
  if (file.mimetype != 'video/quicktime') {
    const image = sharp(file.data);
    const compressedImage = image.resize({ width: 3456, height: 1916 });
    fileUPLOAD = compressedImage.webp({ quality: 80 });
  } else {
    // const hb = handbrake();
    // const buffer = Buffer.from(file.data);
    console.log(
      '_____________________________________ 0000000000000000000000000000000'
    );
    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME as string,
      Key: `${folder}/${nameOfFile}`,
      Body: fileUPLOAD,
      ACL: 'public-read',
    };
    const video = await s3.upload(params).promise();

    console.log('________________________');
    console.log('video');
    console.log(video);
    console.log('________________________');
    const data = Buffer.from(file.data, 'utf8');

    const options = {
      input: data.toString(),
      output: `${folder}/${nameOfFile}`,
      // codec: 'libx264',
      // preset: 'medium',
      // quality: '18',
      // paths: [data.toString()],
    };
    // // fileUPLOAD = await hb.spawn(options);

    hb.spawn(options)
      .on('error', (err: any) => {
        // invalid user input, no video found etc
        console.log('____________________1');
        console.log('err');
        console.log(err);
      })
      .on('progress', (progress: { percentComplete: any; eta: any }) => {
        console.log(
          'Percent complete: %s, ETA: %s',
          progress.percentComplete,
          progress.eta
        );
      })
      .on('complete', (result: any) => {
        console.log('result ', result);
        fileUPLOAD = fs.readFileSync('./video-compressed.mp4');
        console.log('_______________________________');
        console.log('fileUPLOAD 1');
        console.log(fileUPLOAD);
        console.log('fileUPLOAD 1');
        console.log('_______________________________');
      });

    // fileUPLOAD = fs.readFileSync('./video-compressed-${nameOfFile}.mp4');
  }

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME as string,
    Key: `${folder}/${nameOfFile}`,
    Body: fileUPLOAD,
    ACL: 'public-read',
  };
  console.log('________________________');
  console.log('s3.upload(params).promise()');
  console.log('________________________');
  return s3.upload(params).promise();
};

// UPLOAD IMAGEM COMPRESS e VIDEO NAO COMPRRESS
// export const uploadFile = async (file: any, folder: string = 'temp') => {
//   // const sharp = require('sharp');
//   // const fs = require('fs');
//   const nameOfFile = `${Date.now()}-${file.name
//     .replace(/[^a-zA-Z0-9 .]/g, '')
//     .replace(/\s/g, '-')}`;
//   console.log('___________________________________________');
//   console.log(file);
//   console.log('___________________________________________');
//   let fileUPLOAD = '';
//   if (file.mimetype != 'video/quicktime') {
//     const image = sharp(file.data);

//     const compressedImage = image.resize({ width: 3456, height: 1916 });

//     fileUPLOAD = compressedImage.webp({ quality: 80 });
//   } else {
//     fileUPLOAD = file.data;
//   }
//   // fs.writeFileSync('image.webp', webpImage.buffer);

//   const params = {
//     Bucket: process.env.AWS_S3_BUCKET_NAME as string,
//     Key: `${folder}/${nameOfFile}`,
//     // Body: file.data,
//     Body: fileUPLOAD,
//     ACL: 'public-read',
//   };

//   return s3.upload(params).promise();
// };

export const getFile = async (key: string) => {
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
