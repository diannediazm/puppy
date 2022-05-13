module.exports = function (grunt) {
    require('time-grunt') (grunt);
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    })
    grunt.initConfig({
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/css',
                    src: ['assets/css/*.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },
        watch: {
            files: ['assets/css/*scss'],
            task: ['assets/css']
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : ['assets/css/*.css',
                '*.html', 'assets/js/*.js']
                    
                },
                options: {
                    server: {
                        watchTask: true,
                        server: {
                            baseDir: './'
                        }
                    }
                }
            }
            
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/img',
                    src: 'assets/img/*.{png,gif,jpg,jpeg}',
                    dest: 'dist/'
                }]
            }
        },
        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            fonts: {
                expand: true,
                dot: true,
                cwd:'node_modules/open-iconic/font',
                src: ['fonts/*.*'],
                dest: 'dist'
            }
        }, 
        clean: {
            build: {
                src: ['dist/']
            }
        },
        cssmin: {
            dist: {}
        },
        uglify: {
            dist: {}
        }, 
        filerev: {
            options: {
                encoding:'utf8',
                algorithm: 'md5',
                length:20
            },
            release: {
                files: [{
                    src: [
                        'dist/assets/js/*.js',
                        'dist/assets/css/*.css'
                    ]
                }]
            },
            concat: {
                options: {
                    separator: ';'
                },
                dist: {}
            },
            useminPrepare: {
                foo: {
                    dest: 'dist',
                    src: ['index.html', 'about.html', 'app-download.html', 'contacto.html', 'users.html']
                },
                options: {
                    flow: {
                        steps: {
                            css: ['cssmin'],
                            js:['uglify']
                        },
                        post: {
                            css: [{
                                name: 'cssmin',
                                createConfig: function(context, block) {
                                    let generated = context.options.generated;
                                    generated.options = {
                                        keepSpecialComments: 0,
                                        rebase: false,
                                    }

                                }

                        }]
                        }
                    }
                }
            }
        },
        usemin: {
            html: ['dist/index.html', 'dist/about.html', 'dist/app-download', 'dist/contacto.html', 'dist/users.html'],
            options: {
                assetsDir: ['dist', 'dist/assets/css', 'dist/assets/js']
            }
        }
    });

   
    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('img:compress', ['imagemin']);
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useMinPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin'
    ])
};