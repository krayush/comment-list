module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/modules/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        watch: {
            js: {
                files: ['<%= concat.dist.src %>'],
                tasks: ['concat', 'uglify']
            },
            html: {
                files: ['index.html'],
                tasks: ['copy:html']
            },
            css: {
                files: ['src/**/*.scss'],
                tasks: ['sass']
            }
        },
        connect: {
            options: {
                port: 8080,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0',
                livereload: 35730
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('./dist'),
                            connect().use(
                                '/images',
                                connect.static('./images')
                            ),
                            connect().use(
                                '/testScripts',
                                connect.static('./src/testScripts')
                            )
                        ];
                    }
                }
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: "src/css",
                    src: ['main.scss'],
                    dest: 'dist',
                    ext: '.css'
                }]
            }
        },
        clean: ['dist'],
        copy: {
            html: {
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['index.html'],
                    dest: 'dist/',
                    filter: 'isFile'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', [
        'build',
        'serve',
        'watch'
    ]);
    grunt.registerTask('build', [
        'clean',
        'concat',
        'uglify',
        'sass',
        'copy:html'
    ]);
    grunt.registerTask('serve', function () {
        grunt.task.run(['connect:livereload']);
        console.log("Server started at port: 8080")
    });
};