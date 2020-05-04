const router = require('koa-router')()
const koaForm = require('formidable-upload-koa')
const { loginApiCheck } = require('../../middlewares/loginCheck')
const { saveFile } = require('../../controller/utils')

router.prefix('/api/utils')

router.post('/upload', loginApiCheck, koaForm(), async (ctx, next) => {
    const file = ctx.req.files['file']
    if (!file) {
        return
    }
    const { size, path, name, type } = file
    ctx.body = await saveFile({
        size, filePath: path, name, type
    })
})

module.exports = router
