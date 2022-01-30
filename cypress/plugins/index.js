// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const allureWriter = require('@shelex/cypress-allure-plugin/writer');
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
const cucumber = require('cypress-cucumber-preprocessor').default
console.log('in plugins file')
module.exports = (on, config) => {
  on('file:preprocessor', cucumber()) //,
  on('task', {
    failed: require('cypress-failed-log/src/failed')(),
  })
}

module.exports = (on, config) => {
  on('file:preprocessor', cucumber());
  allureWriter(on, config);
  return config;
};