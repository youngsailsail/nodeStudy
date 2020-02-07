const sql = require("./seq");
require("./model");

sql.sync({ force: true }).then(res => {
    console.log("okforce");
    process.exit();
});
