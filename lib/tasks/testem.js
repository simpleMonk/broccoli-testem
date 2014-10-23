var RSVP    = require('rsvp');
var testem  = require('testem');

var TestRunner = function () {
  this.testem = new testem();
}

TestRunner.prototype = {

  invokeTestem: function (testemOptions) {
    var testem = this.testem;

    return new RSVP.Promise(function(resolve, reject) {
      testem.startCI(testemOptions, function(exitCode) {
        if (!testem.app.reporter.total) {
          reject(new Error('No tests were run, please check whether any errors occurred in the page (BROCCOLI_ENV=test broccoli serve) and ensure that you have a test launcher (e.g. PhantomJS) enabled.'));
        }

        resolve(exitCode);
      });
    }.bind(this));
  }

}

module.exports = {

  run: function(options, outputPath) {
    var runner = new TestRunner;

    return runner.invokeTestem({
      file: options.config,
      port: options.port,
      cwd: outputPath
    });
  }

}