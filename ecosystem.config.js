module.exports = {
  apps: [{
    name: 'gateway',
    script: 'gateway.js',
    cwd: 'server/',
  },
  {
    name: 'cocktails',
    script: 'cocktails.js',
    cwd: 'server/',
  },
  {
    name: 'machines',
    script: 'machines.js',
    cwd: 'server/',
  },
  {
    name: 'wallet',
    script: 'wallet.js',
    cwd: 'server/',
  }],
};
