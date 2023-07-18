const multer = require('multer');
const path = require("path");
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,'./images');
    },
    filename: (req, file, cb) => {
      cb(null, new Date() + file.originalname);
    }
  });

  let uploadCsv = multer({
    storage: storage, fileFilter: function (req, file, callback) {
   
      if (file.mimetype == 'csv' || file.mimetype == 'text/csv' || file.mimetype == 'application/vnd.ms-excel') {
        callback(null, true)
      }
      else {
        return callback(new Error('Only	csv files allowed!'));
  
      }
  
    }
  });

  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"||file.mimetype=="video/mp4") {
        cb(null, true);
      } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
    },
    // optional: {
    //   PostImage: true,
    // },
  });


  let uploadGameFile = multer({ storage: storage,
    fileFilter: function(req, file, callback) {
      let ext = path.extname(file.originalname);
      if(ext !== '.pdf' && ext !== '.txt' && ext !== '.doc' && ext !== '.docx' && file.mimetype == "image/png" && file.mimetype == "image/jpg" && file.mimetype == "image/jpeg") {
                return callback(new Error('Only	pdf, text files are allowed!'));
      }
      callback(null, true)
  
    }
});


let uploadEventFile = multer({ storage: storage,
  fileFilter: function(req, file, callback) {
    let ext = path.extname(file.originalname);
    if(ext !== '.pdf' && ext !== '.ppt' && ext !== '.pptx' && file.mimetype == "image/png" && file.mimetype == "image/jpg" && file.mimetype == "image/jpeg" && file.mimetype=="video/mp4") {
              return callback(new Error('Only	pdf, ppt files are allowed!'));

    }
    callback(null, true)

  }
});


  const UploadGameFile = uploadGameFile.array('RulesPdf')
  const UploadEventFile = uploadEventFile.array('File')
  const UploadPostImage = upload.array('PostImage')
  const UploadImage=upload.array('image')
  const UploadProfileImage=upload.array('image')
  const UploadCsv=uploadCsv.array("csv")
  const UploadBirthdayCard = upload.array('image')
  
  module.exports = {
    UpdateGroupImage: UploadImage,
    UploadCsv: UploadCsv,
    UploadGame : UploadGameFile,
    UploadEvent : UploadEventFile,
    UploadPost :  UploadPostImage,
    UploadImage : UploadProfileImage,
    UploadBirthdayCard : UploadBirthdayCard
 }