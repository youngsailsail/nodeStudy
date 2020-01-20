module.exports = (req, res) => {
    const { method, path } = req
    if (method === 'POST' && path === '/api/user/login') {
        return {
            msg: 'login-user'
        }
    }
}