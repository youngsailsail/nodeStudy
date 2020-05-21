class BaseModel {
    constructor({ errno, data, message }) {
        this.errno = errno
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

class SuccesModel extends BaseModel {
    constructor(data) {
        super({
            data,
            errno: 0,
        })
    }
}

class ErrorModel extends BaseModel {
    constructor({ errno, message }) {
        super({
            message,
            errno,
        })
    }
}
module.exports = {
    SuccesModel, ErrorModel,
}
