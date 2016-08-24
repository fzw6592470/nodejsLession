var mozjpeg = require('imagemin-mozjpeg');
/*---------------------------------------------------
 *  Module Setting
 *-------------------------------------------------*/

module.exports = function(grunt){
  
    grunt.initConfig({
        pkg : grunt.file.readJSON("package.json"),
        // Task htmlmin
        htmlmin : {
            dist : {
                options : {
                    removeComments : true, //去注释
                    collapseWhitespace : true //去换行
                },
                files : { // Dictionary of files
                    "build/index.html" : ["src/index.html"]
                }
            }
        },
        // Task sass
        sass : {
            dist : {
                options : {
                    style : "expanded"
                },
                files : {
                    "build/css/base.css" : "src/css/base.scss",
                    "build/css/index.css" : "src/css/index.scss"
                }
            }
        },
        // Task cssc
        cssc : {
            build : {
                options : {
                    consolidateViaDeclarations : true,
                    consolidateViaSelectors : true,
                    consolidateMediaQueries : true
                },
                files : {
                    "build/css/index.css" : ["src/css/zTreeStyle.css","src/css/index.css"]
                }
            }
        },
        // Task cssmin
        cssmin : {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'build/css/index.min.css': ['src/css/index.css']
                }
            }
        },
        // Task imagemin
        imagemin: {                          // Task 
            dist: {                          // Target 
                options: {                       // Target options 
                    optimizationLevel: 3,
                },
                files: [{
                    expand: true,                  // Enable dynamic expansion 
                    cwd: 'src/',                   // Src matches are relative to this path 
                    src: ['**/*.{gif,jpg,png}'],   // Actual patterns to match 
                    dest: 'build/'                  // Destination path prefix 
                }]
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['babel-preset-es2015']
            },
            dist: {
                files: {
                    'build/js/<%= pkg.name %>.js': 'src/js/<%= pkg.name %>.js'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.author %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['src/js/jquery.ztree.core.js','build/js/<%= pkg.name %>.js'],
                dest: 'build/js/<%= pkg.name %>.min.js'
            }
        }
        //uglify: {
        //    my_target: {
        //        files: [{
        //            expand: true,
        //            cwd: 'src/js',
        //            src: '**/*.js',
        //            dest: 'dest/js'
        //        }]
        //    }
        //}
  
    });

    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-cssc');
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['babel','uglify','cssmin','htmlmin','imagemin']);
    grunt.registerTask('build',['cssmin']);
    grunt.registerTask('foo','This is test foo',function(){
        grunt.log.writeln("start foo task.");

        grunt.task.run(["imagemin"]);
    })

}
