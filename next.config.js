const path = require('path');

module.exports = {
    webpack(config, _) {
        config.resolve.alias['@'] = path.join(
            __dirname,
            ''
        );
        return config;
    },
    exportPathMap: function() {
        return {
            '/': { page: '/' },
            '/about': { page: '/about' }
        };
    }
};
