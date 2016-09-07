/* eslint-disable strict */
'use strict';

const path = require('path');
const args = require('minimist')(process.argv.slice(2));
const baseConfig = require(path.join(__dirname, 'cfg/base'));
const devConfig = require(path.join(__dirname, 'cfg/dev'));
const distConfig = require(path.join(__dirname, 'cfg/dist'));

// Available configurations
const configs = {
  base: baseConfig,
  dev: devConfig,
  dist: distConfig,
};

// List of allowed environments
const allowedEnvs = ['dev', 'dist', 'test'];

// Set the correct environment
let env;
if (args._.length > 0 && args._.indexOf('start') !== -1) {
  env = 'test';
} else if (args.env) {
  env = args.env;
} else {
  env = 'dev';
}
process.env.REACT_WEBPACK_ENV = env;

/**
 * Build the webpack configuration
 * @param  {String} wantedEnv The wanted environment
 * @return {Object} Webpack config
 */
function buildConfig(wantedEnv) {
  const isValid = wantedEnv && wantedEnv.length > 0 && allowedEnvs.indexOf(wantedEnv) !== -1;
  const validEnv = isValid ? wantedEnv : 'dev';
  return configs[validEnv];
}

module.exports = buildConfig(env);
