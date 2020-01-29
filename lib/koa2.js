const http = require("http");

// function compose(middlewareList) {
//     return function(ctx) {
//         function dispatch(i) {
//             const fn = middlewareList[i];
//             try {
//                 return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
//             } catch (err) {
//                 return Promise.reject(err);
//             }
//         }
//         return dispatch(0);
//     };
// }
const compose = middlewareList => {
    return ctx => {
        const dispatch = i => {
            const fn = middlewareList[i];
            try {
                return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)));
            } catch (error) {
                return Promise.reject(error);
            }
        };
        dispatch(0);
    };
};
class LikeKoa {
    constructor() {
        this.middlewareList = [];
    }
    use(middleware) {
        this.middlewareList.push(middleware);
    }
    callback() {
        return (req, res) => {
            const ctx = { req, res };
            const fn = compose(this.middlewareList);
            return fn(ctx);
        };
    }
    listen(...arg) {
        const server = http.createServer(this.callback());
        server.listen(...arg);
    }
}
module.exports = new LikeKoa();
