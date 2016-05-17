import git from 'gulp-git';
import through from 'through2';
import 'source-map-support/register';

const METHODS = [
    'exec', 'addRemote', 'removeRemote', 'addSubmodule', 'updateSubmodule',
    'push', 'pull', 'fetch', 'clone', 'tag', 'branch', 'checkout', 'merge',
    'reset', 'clean'
];

METHODS.forEach(function(method) {
    // Get the original gulp-git function. `func.length` will be its expected
    // parameter count, and we'll use it to pass the callback function last.
    const func = git[method];
    // Override the method with one that returns a stream and handles the
    // callback and errors for us.
    git[method] = function(...args) {
        // Convert arguments to an array, and make sure we have the expected
        // amount of parameters.
        return through.obj((file, enc, cb) =>  {
            // No transformation needed, just pass it through without errors.
            cb(null, file);
        }, function(cb) {
            // Define the callback function as the last expected argument,
            // and call the original gulp-git function with it.
            args[func.length - 1] = function(err) {
                if (err)
                    this.emit('error', err);
                cb();
            }.bind(this);

            func.apply(git, args);
        });
    }
});

export default git;
