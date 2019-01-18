var git = require('simple-git')('../');
var formatter = require('eslint-friendly-formatter');
var CLIEngine = require("eslint").CLIEngine;
var _ = require('lodash');
var path = require('path');

var isAll = false;
process.argv.slice(2).forEach(function(val, index, array) {
  if (val === 'all') isAll = true;
});

var cli = new CLIEngine({
  configFile: path.join(__dirname, '..', '.eslintrc.json')
});

git.status(function(err, r) {
  var modified = ['./src'];

  if (!isAll) {
    git.raw([
      'diff',
      '--name-only',
      'master'
    ], function(err1, r1) { // eslint-disable-line
      if (!r1) {
        console.log('There are no js files different from + ' + r.current + ' branch to master branch.');
        return;
      }

      if (/\r?\n/g.test(r1) && (/src/g.test(r1) || /__tests__/g.test(r1))) {
        modified = r1.split(/\r?\n/);
      } else {
        modified = [r1];
      }

      modified = modified.concat(r.modified).filter(function(value) {
        return /\.js$/.test(value) && (/src/g.test(value) === true ? /src/g.test(value) : /__tests__/g.test(value));
      });

      modified = _.uniq(modified);

      modified = modified.map(function(value) {
        return value.replace('LiteHQMobile', '.');
      });

      if (modified.length === 0) {
        console.log('There are no js files different from + ' + r.current + ' branch to master branch.');
        process.exit(0);
        return;
      }

      var report = cli.executeOnFiles(modified);

      var results = report.results || [];

      if (!results) {
        console.log('Congrats! There are no errors! 👏 👏 👏');
        process.exit(0);
      } else {
        console.log(results);
        var output = formatter(results);
        console.log(output);
        if (output.indexOf('0 errors') > -1) {
          console.log('Congrats! There are no errors but there are warnings! 👏 👏');
          process.exit(0);
        }
        var msg = 'Errors found! Please fix before requesting a review.';
        console.log('\x1b[31m', '==================================================');
        console.log('\x1b[31m', msg);
        console.log('\x1b[31m', '==================================================');
        process.exit(1);
      }

      if (err1) {
        console.log(err1);
        process.exit(1);
      }
    });
  } else {
    var report = cli.executeOnFiles(modified);

    var results = report.results || [];

    if (!results) {
      console.log('Congrats! There are no errors! 👏 👏 👏');
      process.exit(0);
    } else {
      var output = formatter(results);
      console.log(output);
      if (output.indexOf('0 errors') > -1) {
        console.log('Congrats! There are no errors but there are warnings! 👏 👏');
        process.exit(0);
      }
      var msg = 'Errors found! Please fix before requesting a review.';
      console.log('\x1b[31m', msg);
      process.exit(1);
    }
  }
  if (err) {
    console.log(err);
    process.exit(1);
  }
});
