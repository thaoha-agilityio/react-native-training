module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts/'],
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    development: {
      plugins: [
        ['@babel/plugin-transform-react-jsx', {runtime: 'classic'}],
        [
          '@babel/preset-react',
          {
            runtime: 'automatic',
            development: true,
            importSource: '@welldone-software/why-did-you-render',
          },
        ],
      ],
    },
  },
};
