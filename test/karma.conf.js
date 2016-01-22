module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
        "bower_components/angular/angular.js",
        "bower_components/ngstorage/ngStorage.js",
        "bower_components/angular-ui-router/release/angular-ui-router.min.js",
        "bower_components/oclazyload/dist/ocLazyLoad.min.js",

        'bower_components/angular-mocks/angular-mocks.js',

        { pattern: 'src/*.*js', watched: true, included: true, served: true},
        { pattern: 'src/**/*.js', watched: true, included: true, served: true},

        { pattern: 'test/spec/**/*.js', watched: true, included: true, served: true},

    ],

    autoWatch : true,

    frameworks: [
        'jasmine',
        'jasmine-matchers'
    ],

    //browsers : ['Chrome', 'PhantomJS'],
    browsers : ['PhantomJS'],

    singleRun: true,

    plugins : [
        'karma-chrome-launcher',
        'karma-firefox-launcher',
        'karma-jasmine',
        'karma-jasmine-matchers',
        'karma-phantomjs-launcher'
        //'karma-junit-reporter'
    ],

    junitReporter : {
        outputFile: 'test_out/unit.xml',
        suite: 'unit'
    },

    proxies: {

    }

  });
};
