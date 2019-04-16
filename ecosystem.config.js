module.exports = {
  apps: [{
    name: 'api',
    script: 'bin/www',
    instances: 1,
  },
  {
    name: 'front',
    script: 'npm',
    args: 'start',
    instances: 1,
    cwd: 'drinks-frontend/',
  }],
};
