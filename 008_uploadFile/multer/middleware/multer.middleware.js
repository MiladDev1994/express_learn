
const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `008_uploadFile/multer/uploads/`)
    },
    filename: (req, file, cb) => {
        // اطلاعات مربوط به فایل یا عکس داخل file قرار داره و میتونیم با استفاده ای این اطلاعات برای عکس ولیدیشن بنویسیم
        console.log(req.file)
        const ext = path.extname(file.originalname)
        const fileName = Date.now() + ext
        cb(null, fileName)

        // مثلا اگر ولید نبود بیا ارور ایجاد کن
        // cb(new Error("file not valid"))
    },
})

const uploadFile = multer({
    storage,
    limits: {
        fileSize: 500000 * 10 // یعنی باید زیر 0.5 میگ باشه
    }
}) 

module.exports = {
    uploadFile
}