var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3-transform');

//export const upload = multer({ dest: 'uploads/' });

var s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESSKEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});

const uploadS3 = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString());
    },
  }),
});

export const uploadMiddleware = uploadS3.array('photos', 10);

export const uploadController = async (req, res) => {
  // If File not found
  if (req.files === undefined) {
    console.log('uploadProductsImages Error: No File Selected!');
    res.status(500).json({
      status: 'fail',
      message: 'Error: No File Selected',
    });
  } else {
    // If Success
    let fileArray = req.files,
      fileLocation;
    const images = [];
    for (let i = 0; i < fileArray.length; i++) {
      fileLocation = fileArray[i].location;
      images.push(fileLocation);
    }
    // Save the file name into database
    return res.status(200).json({
      status: 'ok',
      filesArray: fileArray,
      locationArray: images,
    });
  }
};

export const getS3Picture = (req, res) => {
  const fileName = req.query['file-name'];
  const fileType = req.query['file-type'];
  const s3Params = {
    Bucket: process.env.S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read',
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
};
