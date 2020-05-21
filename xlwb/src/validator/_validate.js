const Ajv = require('ajv')

const ajv = new Ajv({
    // allErrors:true
})
/**
 *
 * @param {Object} schema json schema 规则
 * @param {Object} data 需要校验的数据
 *
 */
function validate(schema, data) {
    const res = ajv.validate(schema, data)
    if (!res) {
        return ajv.errors[0]
    }
}
module.exports = { validate }
