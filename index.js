const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const port = 3000;


app.use("/008_uploadFile/multer/uploads", express.static(`008_uploadFile/multer/uploads`))


app.listen(port, () => {
    console.log(`app started on port ${port} \n http://localhost:${port}`)
})