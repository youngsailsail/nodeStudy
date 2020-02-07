const { User, Blog } = require("./model");
!(async () => {
    let res = await User.destroy({
        where: {
            id: 2
        }
    });
    console.log(res);
})();
