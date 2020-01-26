const getData = fetchReq => {
    return fetchReq
        .then(function(response) {
            console.log(response, "response");

            return response.json();
        })
        .then(function(res) {
            console.log(res, "myJson");
            const { data, message, errno } = res;
            if (errno) {
                alert(message);
                throw new Error(message);
            } else {
                return data;
            }
        })
        .catch(err => {
            throw new Error(err);
        });
};
const get = ({ url }) => {
    return getData(fetch(url));
};

const post = ({ url, data = {} }) => {
    return getData(
        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/json"
            }
        })
    );
};

export { get, post };
