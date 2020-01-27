var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/list", function(req, res, next) {
    console.log(req.cookies);
    res.json([1, 2, 3, 4]);
});
router.get("/detail", function(req, res, next) {
    res.json({
        a: 100
    });
});
module.exports = router;
