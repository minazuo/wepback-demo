module.exports = {
  plugins: [
    //   自动补充历览器前缀

    require("autoprefixer")({
      browsers: ["last 5 versions"]
    })
  ]
};
