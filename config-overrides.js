module.exports = function override(config, env) {
  for (const rule of config.module.rules) {
    if (rule.hasOwnProperty("oneOf")) {
      rule.oneOf.unshift({
        test: /\.txt$/,
        use: ["json-loader", "yaml-frontmatter-loader"],
      });
    }
  }

  // const fileLoader = config.module.rules.find(loader => loader.type ==='asset/resource');

  // fileLoader.exclude.push(/\.txt$/);

  // config.module.rules.unshift({
  //   test: /\.txt$/,
  //   use: ["json-loader", "yaml-frontmatter-loader"],
  // });
  return config;
};
