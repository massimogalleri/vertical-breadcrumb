module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            vendors: {
                options: {
                    banner: "\n",
                    process: function(src, filepath) {
                        return '\n\n// Source: ' + filepath + '\n\n' + src;
                    },
                },
                src: [
                    'node_modules/gsap/src/minified/TweenMax.min.js',
                    'node_modules/gsap/src/minified/plugins/ScrollToPlugin.min.js',
                    'node_modules/in-view/dist/in-view.min.js'
                ],
                dest: 'build/assets/js/vendors.js',
                nonull: true
            },
            app: {
                options: {
                    banner: "\n",
                    process: function(src, filepath) {
                        return '\n\n// Source: ' + filepath + '\n\n' + src;
                    },
                },
                src: [
                    'development/src/_app-start.js',
                    'development/src/_polyfill.js',
                    'development/src/_scroll-navigation.js',
                    'development/src/_app-end.js'
                ],
                dest: 'development/src/_app.js',
                nonull: true
            },
        },


        uglify: {
            options: {
                mangle: true
            },
            vendors: {
                files: {
                    'build/assets/js/vendors.min.js': ['build/assets/js/vendors.js']
                },
            },
        },

        babel: {
            build: {
                options: {
                    presets: ['@babel/preset-env'],
                    comments: false,
                },
                files: {
                    'build/assets/js/app.js': 'development/src/_app.js'
                },
            },
            build_min: {
                options: {
                    presets: ['minify', '@babel/preset-env'],
                    comments: false,
                },
                files: {
                    'build/assets/js/app.min.js': 'development/src/_app.js'
                },
            },
        },


        sass: {
            vertical_breadcrumb: {
                options: {
                    style: 'compressed',
                },
                files: {
                    'build/assets/css/vertical-breadcrumb.css': 'development/scss/vertical-breadcrumb.scss',
                }
            },
        },

        watch: {
            all: {
                files: ['**/*.php', '**/*.html'],
                options: {
                    livereload: true
                }
            },
            concat_vendors: {
                files: ['build/assets/js/vendors.js'],
                tasks: ['concat:vendors']
            },
            concat_app: {
                files: ['development/src/*.js'],
                tasks: ['concat:app']
            },
            uglify_vendors: {
                files: ['build/assets/js/vendors.js'],
                tasks: ['uglify:vendors'],
                options: {
                    livereload: true
                }
            },
            babel: {
                files: ['development/src/_app.js'],
                tasks: ['babel'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['development/scss/*.scss'],
                tasks: ['sass:vertical_breadcrumb'],
                options: {
                    livereload: true
                }
            },
        },

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('js', ['concat', 'uglify', 'babel']);
    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['js', 'css', 'watch']);

};