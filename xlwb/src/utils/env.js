const ENV = process.ENV.NODE_ENV;
module.exports = {
    isDev: ENV == "dev",
    isPrd: ENV == "prd",
    isTest: ENV == "test"
};
