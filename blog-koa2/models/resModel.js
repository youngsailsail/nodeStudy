class BasicRes {
    constructor(data, message) {
        if (typeof data === "string" || typeof data == "boolean") {
            this.message = data;
            data = null;
            message = null;
        }
        if (data) {
            this.data = data;
        }
        if (message) {
            this.message = message;
        }
    }
}

class SuccesModel extends BasicRes {
    constructor(data, message) {
        super(data, message);
        this.errno = 0;
    }
}
class ErrorModel extends BasicRes {
    constructor(data, message) {
        super(data, message);
        this.errno = -1;
    }
}
module.exports = {
    SuccesModel,
    ErrorModel
};
