const withPlugins = require("next-compose-plugins");

const config = {
    env: {
        MONGO_URI:
            "mongodb+srv://bharat:b9866940727@cluster0.t4thi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    },
};

module.exports = withPlugins([], config);
