var multer = require('multer');

exports.uploadFile = function(req,res,next) {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, 'public')
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' +file.originalname )
      }
    });
    var upload = multer({ storage: storage }).single('avatar');
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        };
        return next();
    });
}