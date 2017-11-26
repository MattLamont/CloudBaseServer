/**
 * UploadController
 *
 * @description :: Server-side logic for managing Uploads
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var s3Upload = require('../services/s3-upload');

module.exports = {

  create: function(req, res) {

    let image_type = '';

    if (req.query.type == 'user') {
      image_type = 'user_image';
    } else if (req.query.type == 'recipe') {
      image_type = 'recipe_image';
    } else {
      return res.badRequest('Incorrect or no image type given as query parameter.');
    }

    console.log(req.file('image'));

    if (_.isUndefined(req.file('image'))) {
      return res.badRequest('No upload file found.');
    }

    s3Upload.upload(req, res, function(err, uploadedFiles) {

      if (err) {
        return res.serverError(err);
      }

      var upload = {
        filename: uploadedFiles[0].fd,
        url: uploadedFiles[0].extra.Location,
        category: image_type,
        owner: req.user.id,
      };

      Upload.create(upload).exec(function(err, upload) {
        if (err) {
          return res.negotiate(err);
        }
        return res.ok(upload);
      });
    });
  },

  destroy: function(req, res) {

    Upload.findOne({
       id: req.param('id')
    }).exec(function(err, upload) {
      if (err) {
        return res.negotiate(err);
      }

			if( !upload ){
				return res.notFound( 'Could not find upload with given id.');
			}

      s3Upload.destroy(req, res, upload.filename , function(err, data) {
        if (err) {
          return res.serverError(err);
        }

        Upload.destroy({id:req.param('id')}).exec(function(err, upload) {
          if (err) {
            return res.negotiate(err);
          }
          return res.ok(upload);
        });
      });
    });
  }
};
