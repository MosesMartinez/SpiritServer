module.exports = {
  apps: [{
    name: 'api',
    script: 'bin/www',
    instances: 1,
  },
  {
    name: 'front',
    script: 'node_modules/react-scripts/bin/react-scripts.js',
    args: 'start',
    instances: 1,
    cwd: 'drinks-frontend/'
  }],
};
