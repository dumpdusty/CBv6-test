module.exports = {
    require: ['@babel/register'],
    timeout: '20000',
    exclude: ['test/example.spec.js', 'test/signup.spec.js'],
    file: 'setup/project-setup.js'
  };