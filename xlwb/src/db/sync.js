const sql = require('./sql')
require('./models/index')

sql.authenticate()
    .then(() => {
        console.log('ok')
    })
    .catch((err) => {
        console.log(err)
    })
sql.sync({ force: true }).then((res) => {
    console.log('okforce')
    process.exit()
})
