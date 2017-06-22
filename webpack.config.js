var path = require("path")

module.exports = {
    entry: "./src/index.js",
    output: {
        library: "CodeSmithyDoxyNode",
        libraryTarget: "umd",
        filename: "codesmithy-doxynode.js",
        path: path.resolve(__dirname, "dist")
    }
}
