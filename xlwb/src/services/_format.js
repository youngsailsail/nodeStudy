const { DEFAULT_PICTURE } = require('../conf/constant')

const _formatPicture = (user) => {
    if (!user.picture) {
        user.picture = DEFAULT_PICTURE
    }
    return user
}

const formatUser = (list) => {
    if (!list) return list
    if (list instanceof Array) {
        return list.map(_formatPicture)
    }
    return _formatPicture(list)
}
module.exports = {
    formatUser,
}
