import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const originalName = path.parse(file.originalname).name; // Extracts file name without extension
    const extension = path.extname(file.originalname); // Extracts file extension
    cb(null, `${originalName}-${uniqueSuffix}${extension}`); // Combines original name, unique suffix, and extension
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10* 1000 * 1000,
  },
});



// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/images");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// export const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 10* 1000 * 1000,
//   },
// });
