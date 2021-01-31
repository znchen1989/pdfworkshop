/* eslint-disable @typescript-eslint/no-var-requires */
const { mergeWithCustomize } = require('webpack-merge');
const lodash = require('lodash');

module.exports = function (options) {
  const result = mergeWithCustomize({
    customizeArray(a, b, key) {
      if (key) {
        return lodash.uniq([...a, ...b]);
      }
      // Fall back to default merging
      return undefined;
    },
  })(options, {
    module: {
      rules: [
        {
          test: /\.less$/,
          use: ['css-loader', 'less-loader'],
        },
      ],
    },
  });
  console.log('-----result', result);
  return result;
};
