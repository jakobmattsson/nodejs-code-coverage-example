A code coverage example for Mocha
=================================

This repo is a minimal node.js-library demonstrating how to add code coverage to
existing mocha tests. The code examples below are based on this project and
it should be very straight-foward to adopt the same ideas in your project.

So, in order to add code coverage to our testing, we have to do three things:



Step 1. Install an instrumentation library
------------------------------------------

  This library will insert information required to track code coverage.

  A popular choice is JSCoverage, but it's written in C and can't be added as
  a dependency in package.json.

  The NPM module `jscov` does the same thing as JSCoverage, but is written in
  pure JavaScript, so we'll stick with that one. Just add it as a devDependency
  in your package file:

```
   "devDependencies": {
+    "jscov": "0.2.0",
     "mocha": "1.7.4",
     "should": "1.2.1"
   }
```



Step 2. Add a script for running the code coverage analysis
-----------------------------------------------------------

  This is also easy as pie. First you use your instrumentation library/program
  to create a copy of your source code, with code coverage tracking. Both
  JSCoverage and jscov does it using two arguments: the source folder, where the
  code you want to do code coverage on lives, and the target folder for output.
  I usually put the instrumented output in a hidden folder so I don't have to
  see it.

  Then we run mocha as usual. Almost at least. Except the usual, we also set an
  environment variable called JSCOV to the folder with our instrumented files.
  It will be used in the third step. We also have to choose a reporter for
  presenting the results of the analysis. Mocha comes with several built-in,
  for example `json-cov` and `html-cov`. I prefer an external one, called
  `mocha-term-cov-reporter`, which is readily available using npm.

  We add the following two lines to package.json:

```
   "scripts": {
+    "coverage": "jscov src .cov && JSCOV=.cov mocha --reporter mocha-term-cov-reporter test/*.js",
     "test": "mocha test/*.js"
   },
   "devDependencies": {
     "jscov": "0.2.0",
+    "mocha-term-cov-reporter": "0.1.0",
     "mocha": "1.7.4",
     "should": "1.2.1"
   }
```



Step 3. Loading the correct version of the source code in our tests
-------------------------------------------------------------------

Now, when running your tests as usual, you want everything to remain the same.
When running code coverage tests though, you'll want to test the files in the
directory ".cov" (or whatever you named it in step 2), because they are the
ones with coverage tracking.

Fortunately, `jscov` comes with a function called `cover` for dealing with
this. Just require `jscov` in your tests and then replace all requires where
you load your own source code with calls to `cover`.

* The first argument to cover is the path to your project root directory.
* The second argument is the top folder for your source code (the same as you
passed in to jscov in step 2)
* The third argument is the name of the file you want to require, relative to
the top folder for the source code (given as the second argument).

When the code executes, `jscov` will determine whether to use the original
source code or the instrumented one, depending on the environment variable
JSCOV, set in step 2.

So, we do the following changes in the test file(s):

```
+var jscov = require('jscov');
 var should = require('should');
-var example = require('../src/index');
+var example = require(jscov.cover('..', 'src', 'index'));
```

If you've run `npm install` to get the new dependencies already, it's all set.
You can run your code coverage analysis from the terminal:

`npm run-script coverage`

The tests themselves will work as usual too:

`npm test`



Epilogue
--------

Feel free to clone this repository or check the diffs between the commits to
see all the changes at once.

You can test it all by cloning the repo and simply running `npm install` followed by
`npm run-script coverage`

If you found this useful at all, please give it a tweet at @jakobmattsson.
