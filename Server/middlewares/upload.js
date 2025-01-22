const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, file.fieldname + '_' + uniqueSuffix + "_" + file.originalname);
    }
});

// filedName = image 

const upload = multer({ storage: storage });


module.exports = upload;