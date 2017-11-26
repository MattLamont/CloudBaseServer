var aws = require('aws-sdk');

aws.config.update({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION
});
var s3 = new aws.S3();


module.exports = {
  upload: function(req, res, cb) {

    req.file('image')
      .upload({
        adapter: require('skipper-s3'),
        key: process.env.AWS_KEY,
        secret: process.env.AWS_SECRET,
        bucket: process.env.AWS_BUCKET,
        region: process.env.AWS_REGION
      }, cb);
  },

  destroy: function(req, res, filename , cb) {

    var params = {
      Bucket: process.env.AWS_BUCKET,
      Delete: {
        Objects: [{
          Key: filename
        }],
      },
    };

    s3.deleteObjects(params, cb );
  }
};
