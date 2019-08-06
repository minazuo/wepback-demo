const htmlWebpackPlugin = require("html-webpack-plugin"); //installed via npm

const path = require("path");
module.exports = {
  entry: {
    app: "./src/app.js",
    main: "./src/script/main.js",
    a: "./src/script/a.js",
    b: "./src/script/b.js",
    c: "./src/script/c.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"), //4版本只能引入绝对路径
    filename: "js/[name].bundle.js"
    // publicPath: "http://cdn.com/"
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: "app.html",
      template: "index.html",
      // inject: false,
      inject: "body"
    }),
    new htmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      title: "webpack is good",
      // inject: false,
      date: new Date(),
      minify: {
        removeComments: true
        // collapseWhitespace: true
      }
    }),
    new htmlWebpackPlugin({
      filename: "a.html",
      template: "index.html",
      // inject: false,   //将生成后的文件加到body还是head标签中
      title: "this is a.html",
      excludeChunks: ["b", "c"]
      // chunks: ["a"]
    }),
    new htmlWebpackPlugin({
      filename: "b.html",
      template: "index.html",
      // inject: false,
      title: "this is b.html",
      excludeChunks: ["a", "c"]
      // chunks: ["b"]
    }),
    new htmlWebpackPlugin({
      filename: "c.html",
      template: "index.html",
      // inject: false,
      title: "this is c.html",
      excludeChunks: ["a", "b"]
      // chunks: ["c"]
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: path.resolve(__dirname, "node_modules"),
        // include: path.resolve(__dirname, "src"),
        query: {
          presets: ["latest"]
        }
      },
      {
        test: /\.html$/,
        // 编译html，加入后html文件中不能解析<% %>代码
        loader: "html-loader"
      },
      // ejs-loader可以解析ejs / tpl 结尾的文件
      {
        test: /\.ejs$/,
        loader: "ejs-loader"
      },
      {
        test: /\.css$/,
        use: [
          // style-loader会新建一个style变迁插入在界面中
          "style-loader",
          // css-loaser可以在app.js中import引入common.css
          { loader: "css-loader", options: { importLoaders: 1 } },
          "postcss-loader"
          // 如下配置，或在post.config.js中配置
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     ident: "postcss",
          //     plugins: [
          //       require("autoprefixer")({
          //         browsers: ["last 5 versions"]
          //       })
          //     ]
          //   }
          // }
        ]
        // loader: "style-loader!css-loader!postcss-loader"
      },

      // less-loader将 less文件解析成css
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!postcss-loader!less-loader"
      },
      {
        test: /\.scss$/,
        loader: "style-loader!css-loader!postcss-loader!sass-loader"
      },
      // file-loader可以转换相对路径，转换css，index.html中的图片路径，js模板中的路径需要用require
      // {
      //   test: /\.(png|jpg|gif|svg)$/i,
      //   loader: "file-loader",
      //   query: {
      //     name: "assests/[name]-[hash:5].[ext]"
      //   }
      // },
      // 文件压缩image-webpack-loader
      {
        test: /\.(png|jpg|gif|svg)$/i,
        loaders: ["url-loader?limit=20000&name=assests/[name]-[hash:5].[ext]", "image-webpack-loader"]
      }
    ]
  }
};
