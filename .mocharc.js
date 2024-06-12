module.exports = {
    require: ['@babel/register'],
    // spec: 'test/*.spec.js',
    timeout: '20000',
    exclude: ['test/example.spec.js'],
    file: 'setup/project-setup.js'
  };