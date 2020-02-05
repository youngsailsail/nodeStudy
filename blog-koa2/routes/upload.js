const router = require("koa-router")();
const fs = require("fs");
router.prefix("/api/files");
const uploadHost = `/uploads/`;

router.post("/upload", async (ctx, next) => {
    const file = ctx.request.files.f1; //得道文件对象
    console.log(file, "file");
    const path = file.path;
    const fname = file.name; //原文件名称
    let nextPath = "";
    if (file.size > 0 && path) {
        //得到扩展名
        const extArr = fname.split(".");
        const ext = extArr[extArr.length - 1];
        nextPath = path + "." + ext;
        //重命名文件
        console.log(path, nextPath, "nextPath");
        fs.renameSync(path, nextPath);
    }
    //以 json 形式输出上传文件地址
    const url = nextPath;
    ctx.body = {
        fileUrl: `${uploadHost}${url}`
    };
});

module.exports = router;
