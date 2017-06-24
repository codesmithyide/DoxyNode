var path = require("path")

module.exports = {
    entry: "./src/index.js",
    target: 'node',
    output: {
        library: "CodeSmithyDoxyNode",
        libraryTarget: "umd",
        filename: "codesmithy-doxynode.js",
        path: path.resolve(__dirname, "dist")
    },
    externals: {
        path: {
            commonjs: "path",
            commonjs2: "path",
            amd: "path",
            root: "path"
        },
        fs: {
            commonjs: "fs",
            commonjs2: "fs",
            amd: "fs",
            root: "fs"
        },
        xml2js: {
            commonjs: "xml2js",
            commonjs2: "xml2js",
            amd: "xml2js",
            root: "xml2js"
        }
    }
}
