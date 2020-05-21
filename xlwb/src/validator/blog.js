const { validate } = require('./_validate')

const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string',
        },
        images: {
            type: 'string',
            maxLength: 225,
        },
    },

}

const blogValidate = (data) => validate(SCHEMA, data)
module.exports = {
    blogValidate,
}
