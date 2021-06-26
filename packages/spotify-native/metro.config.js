/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const getWorkspaces = require('get-yarn-workspaces');
const path = require('path');

const reactNativePath = require.resolve('react-native');
const reactNativeFolder = `${
    reactNativePath.split('node_modules/react-native/')[0]
}node_modules/react-native/`;

function getConfig(appDir, options = {}) {
  const workspaces = getWorkspaces(appDir);

  const watchFolders = [
    path.resolve(appDir, 'node_modules'),
    path.resolve(appDir, '../../node_modules'),
    ...workspaces.filter((workspaceDir) => !(workspaceDir === appDir)),
  ];

  return {
    watchFolders,
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    resolver: {
      blacklistRE: new RegExp(
          `^((?!${reactNativeFolder.replace(
              '/',
              '\\/',
          )}).)*\\/node_modules\\/react-native\\/.*$`,
      ),
    },
  };
}

module.exports = getConfig(__dirname);
