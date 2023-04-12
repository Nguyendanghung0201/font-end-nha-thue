const path = require('path')

require('dotenv').config({ path: '.env' })
if (process.env.VUE_APP_NODE_ENV === 'development' && process.env.npm_lifecycle_event !== 'build:dev') {
    require('dotenv').config({ path: '.dev.env' })
} else {
    require('dotenv').config({ path: '.prod.env' })
}
const timeCurrent = new Date().getTime()

module.exports = {
    outputDir: path.resolve(__dirname, 'dist'),
    publicPath: process.env.VUE_APP_NODE_ENV === 'development' && process.env.npm_lifecycle_event !== 'build:dev' ? '/' : '/',
    assetsDir: 'assets/' + process.env.VUE_APP_VERSION,
    productionSourceMap: false,
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.join(__dirname, 'src')
            }
        },
        output: {
            filename: () => '[name].' + timeCurrent + '.[hash:8].js',
            chunkFilename: '[name].' + timeCurrent + '.[hash:8].js'
        }
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/scss/_variables.scss";`,
                sassOptions: {
                    quietDeps: true
                },
            }
        },
        sourceMap: true
    },
    devServer: {
        hot: true,
        liveReload: true,
        public: process.env.VUE_APP_PUBLIC_URL,
        port: process.env.VUE_APP_PUBLIC_PORT
    },
    chainWebpack: (config) => {

    }
}

