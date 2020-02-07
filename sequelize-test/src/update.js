const { User, Blog } = require("./model");
!(async () => {
    let res = await User.update(
        {
            nickName: "昵称33"
        },
        {
            where: {
                id: 3
            }
        }
    );
    console.log(res[0]);
})();
