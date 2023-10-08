const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (
      file.mimetype === "image/jpeg" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png"
    ) {
      cb(null, path.join(__dirname, "../../public/image"));
    } else {
      cb(null, path.join(__dirname, "../../public/document"));
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + file.originalname;
    cb(null, uniqueSuffix);
  },
});

const filefilter = (req, file, cb) => {
  if (file.fieldname === "image") {
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
      ? cb(null, true)
      : cb(null, false);
  } else if (file.fieldname === "document") {
    file.mimetype === "application/pdf" ? cb(null, true) : cb(null, false);
  }
};

const uploadImage = multer({
  storage: storage,
  fileFilter: filefilter,
}).fields([
  { name: "image", maxCount: 1 },
]);
//  .single("uploaded_file");




const uploadDocuments = multer({
  storage: storage,
  fileFilter: filefilter,
}).fields([
  { name: "document", maxCount: 1 },
]);

module.exports = uploadDocuments;
module.exports = uploadImage;
