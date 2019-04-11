const isDebug = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'qa';

let presets = [
  "@babel/preset-env"
];

if(isDebug) {
  presets = [
    [
      "@babel/preset-env",
      {
        "targets": {
          "chrome": "69"
        }
      }
    ]
  ];
}

module.exports = {
  "presets": presets,
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-throw-expressions",
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/transform-react-jsx",

    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": 2,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ]
  ]
}
