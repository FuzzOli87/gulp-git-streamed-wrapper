# gulp-git-streamed

A simple wrapper around [gulp-git](https://www.npmjs.com/package/gulp-git) (the Git plugin for gulp), making all commands return streams for better chainability:

```js
var gulp = require('gulp'),
    git = require('gulp-git-streamed'),
    bump = require('gulp-bump');

gulp.task('publish', function() {
    var version = '1.2.3',
    	message = 'Release version ' + version;
    return gulp.src([ 'package.json', 'component.json' ])
        .pipe(bump({ version: version }))
        .pipe(git.add())
        .pipe(git.commit(message))
        .pipe(git.tag('v' + version, message));
});
```

Same module [gulp-git-streamed](https://github.com/lehni/gulp-git-streamed) by Jürg Lehni, but in
ES6 and with the exec method. Needed a published version to NPM.
