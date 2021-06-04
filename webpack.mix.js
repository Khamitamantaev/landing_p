let mix = require("laravel-mix");
require("mix-html-builder");
mix.override((config) => {
  delete config.watchOptions;
}); // игнорирование node_modules файлов на просмотр изменений
mix
  .js("resources/js/app.js", "public/js")
  .sass("resources/sass/app.scss", "public/css")
  .browserSync({
    // proxy: "localhost:8080",
    watch: true,
    server: "./public",
    files: [
      "./public/**/*.html",
      "./public/css/**/*.css",
      "./public/js/**/*.js",
      "./fonts/**/*.css",
      "./resources/index.html",
    ],
  });

mix.copyDirectory("resources/assets/fonts", "public/fonts");
mix.copy("resources/css/reset.css", "public/css");

mix.html({
  htmlRoot: "./resources/index.html", // Your html root file(s)
  output: "public", // The html output folder
  // inject: true,
  // partialRoot: "./src/partials", // default partial path
  // layoutRoot: "./src/layouts", // default partial path
  minify: {
    removeComments: true,
  },
});
