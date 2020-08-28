const config = require('@nejcm/configs/src/.eslintrc.js');

module.exports = Object.assign(config, {
  rules: Object.assign(config.rules, {
    'babel/new-cap': 'off',
    'no-useless-constructor': 'off',
    'import/order': 'off',
  }),
});
