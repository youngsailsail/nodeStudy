const server = require('./server')

test('get json', async () => {
    // get请求;
    let res = await server.get('/json')
    expect(res.body).toEqual({
        title: 'koa2 json'
    })
    // expect(res.body.title).toBe("koa2 json");

    //post请求
    // let res = await server.post("/login").send({
    //     username: "zhangsan",
    //     password: "123"
    // });
})
