const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

// Get the default configuration
const defaultConfig = getDefaultConfig(__dirname);

// Create your custom configuration
const customConfig = {
  resolver: {
    /* Any custom resolver options you need */
  },
};

// Merge default and custom configurations
const mergedConfig = mergeConfig(defaultConfig, customConfig);

// Wrap the merged configuration with Reanimated's configuration
const reanimatedConfig = wrapWithReanimatedMetroConfig(mergedConfig);

module.exports = reanimatedConfig;