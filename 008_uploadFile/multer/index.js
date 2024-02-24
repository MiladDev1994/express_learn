const express = require("express");
const multer = require("multer")
const { NotFoundHandler } = require("../../Utils/NotFoundHandler");
const { ErrorHandler } = require("../../Utils/ErrorHandler");
const { uploadFile } = require("./middleware/multer.middleware");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/images", express.static(`008_uploadFile/multer/uploads`)) // برای نمایش عکس های داخل دایرکتوری پروژه به صورت استاتیک
const port = 3000;



// ارسال یک عکس
app.post("/upload-single", uploadFile.single("image"), (req, res) => {
    res.send(req.file)
})


// ارسال چند عکس
app.post("/upload-array", uploadFile.array("image", 5), (req, res) => {
    res.send(req.files)
})


// ارسال چند عکس و چند فایل به صورت همزمان
app.post("/upload-fields", uploadFile.fields([
    {name: "image", maxCount: 3},
    {name: "file", maxCount: 2},
]), (req, res) => {
    res.send(req.files)
})



// هرفایلی با هر فرمتی  و با هر تعدادی رو میپذیره
app.post("/upload-any", uploadFile.any([
    {name: "image", maxCount: 3},
    {name: "file", maxCount: 2},
]), (req, res) => {
    res.send(req.files)
})



// برای وقتی که از formData استفاده میکنیم و باید آبجکت ها رو پارس کنیم
app.post("/upload-any", uploadFile.none(), (req, res) => {
    res.send(req.body)
})


app.use(NotFoundHandler)
app.use(ErrorHandler)
app.listen(port, () => {
    console.log(`app started on port ${port} \n http://localhost:${port}`)
})