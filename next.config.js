const withPlugins = require("next-compose-plugins");

const config = {
    env: {
        MONGO_URI:
            "mongodb+srv://bharat:E3kvIiTe82ADwyoI@cluster0.gcmui.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        NODE_ENV: "production",
    },
};

module.exports = withPlugins([], config);
