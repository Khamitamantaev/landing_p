const { css } = require("laravel-mix");
let mix = require("laravel-mix");
require("mix-html-builder");
mix.override((config) => {
  delete config.watchOptions;
}); // игнорирование node_modules файлов на просмотр изменений
mix
  .js("src/resources/js/app.js", "public/js")
  .sass("src/resources/sass/app.scss", "public/css")
  .webpackConfig({
    module: {
      rules: [
        {
          test: /(\.(png|jpe?g|gif|webp)$|^((?!font).)*\.svg$)/,
          loaders: {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]?[hash]",
              context: "src/resources",
            },
          },
        },
      ],
    },
  })
  .browserSync({
    // proxy: "localhost:8080",
    watch: true,
    server: "./public",
    files: [
      "./public/**/*.html",
      "./public/css/**/*.css",
      "./public/js/**/*.js",
      "./fonts/**/*.css",
      "./src/resources/index.html",
      "./src/resources/sass/app.scss",
    ],
  });

mix.copyDirectory("src/resources/fonts", "public/fonts");
mix.copyDirectory("src/resources/img", "public/img/", false);
mix.copy("src/resources/css/reset.css", "public/css");

mix.html({
  htmlRoot: "./src/resources/index.html", // Your html root file(s)
  output: "public", // The html output folder
  // inject: true,
  partialRoot: "./src/resources/partials", // default partial path
  layoutRoot: "./src/resources/layouts", // default partial path
  minify: {
    removeComments: true,
  },
});
