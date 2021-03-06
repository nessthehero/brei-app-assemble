// Generated on 2015-01-22 using generator-brei-app 1.0.0
'use strict';
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
	return connect.static(require('path').resolve(dir));
};

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

	// build a custom version of modernizr
	grunt.loadNpmTasks('grunt-modernizr');

	// Assemble!
	grunt.loadNpmTasks('assemble');

	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Show elapsed time after tasks run
	require('time-grunt')(grunt);

	// configurable paths
	var yeomanConfig = {
		app: 'app',
		dist: 'dist',
		deploy: '../depploy'
	};

	grunt.initConfig({
		yeoman: yeomanConfig,
		modernizr: {
			dist: {
				// [REQUIRED] Path to the build you're using for development.
				'devFile' : 'app/plugins/modernizr/modernizr.js',

				// [REQUIRED] Path to save out the built file.
				'outputFile' : 'dist/js/plugins/modernizr.optimized.js',

				// Based on default settings on http://modernizr.com/download/
				'extra' : {
					'shiv' : true,
					'printshiv' : false,
					'load' : false,
					'mq' : false,
					'cssclasses' : true
				},

				// Based on default settings on http://modernizr.com/download/
				'extensibility' : {
					'addtest' : false,
					'prefixed' : false,
					'teststyles' : false,
					'testprops' : false,
					'testallprops' : false,
					'hasevents' : false,
					'prefixes' : false,
					'domprefixes' : false
				},

				// By default, source is uglified before saving
				'uglify' : true,

				// Define any tests you want to implicitly include.
				'tests' : [],

				// By default, this task will crawl your project for references to Modernizr tests.
				// Set to false to disable.
				'parseFiles' : true,

				// When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
				// You can override this by defining a 'files' array below.
				'files' : {
					'src': [
						'<%= yeoman.app %>/js/**/*.js',
						'<%= yeoman.app %>/css/**/*.css',
						'<%= yeoman.app %>/sass/**/*.scss'
					]
				},

				// When parseFiles = true, matchCommunityTests = true will attempt to
				// match user-contributed tests.
				'matchCommunityTests' : false,

				// Have custom Modernizr tests? Add paths to their location here.
				'customTests' : []
			}
		},
		watch: {
			compass: {
				files: [
					'<%= yeoman.app %>/sass/**/*.{scss,sass}',
					'<%= yeoman.app %>/img/**/*.png'
				],
				tasks: ['compass:server', 'autoprefixer']
			},
			styles: {
				files: ['<%= yeoman.app %>/css/**/*.css'],
				tasks: ['copy:styles', 'autoprefixer']
			},
			livereload: {
				options: {
					livereload: LIVERELOAD_PORT
				},
				files: [
					'<%= yeoman.app %>/*.html',
					'<%= yeoman.app %>/modules/**/*.html',
					'.tmp/css/**/*.css',
					'{.tmp,<%= yeoman.app %>}/js/**/*.js',
					'<%= yeoman.app %>/img/**/*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},
		connect: {
			options: {
				port: 9000,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							lrSnippet,
							mountFolder(connect, '.tmp'),
							mountFolder(connect, yeomanConfig.app)
						];
					}
				}
			},
			test: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, '.tmp'),
							mountFolder(connect, 'test')
						];
					}
				}
			},
			dist: {
				options: {
					middleware: function (connect) {
						return [
							mountFolder(connect, yeomanConfig.dist)
						];
					}
				}
			}
		},
		open: {
			server: {
				path: 'http://localhost:<%= connect.options.port %>'
			}
		},
		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
			deploy: {
				options: {
					force: true
				},
				src: ['<%= yeoman.deploy %>']
			},
			server: '.tmp'
		},
		assemble: {
			options: {
				collections: [
					{
						name: 'pages',
						pages: ['<%= yeoman.app %>/assemble/*.hbs', '!<%= yeoman.app %>/assemble/index.hbs']
					},
					{
						name: 'module',
						sortby: 'title',
						sortorder: 'descending'
					}
				]
			},
			pages: {
				options: {
					flatten: true,
					assets: '<%= yeoman.app %>',
					layout: '<%= yeoman.app %>/assemble/layouts/default.hbs',
					data: '<%= yeoman.app %>/assemble/data/*.{json,yml}',
					partials: ['<%= yeoman.app %>/assemble/partials/*.hbs', '<%= yeoman.app %>/assemble/modules/*.hbs'],
					plugins: []
				},
				files: {
					'<%= yeoman.app %>/assemble/out': ['<%= yeoman.app %>/assemble/*.hbs', '!index.hbs']
				}
			},
			modules: {
				options: {
					flatten: true,
					assets: '<%= yeoman.app %>',
					layout: '<%= yeoman.app %>/assemble/layouts/default.hbs',
					data: '<%= yeoman.app %>/assemble/data/*.{json,yml}',
					partials: '<%= yeoman.app %>/assemble/partials/*.hbs',
					plugins: []
				},
				files: {
					'<%= yeoman.app %>/assemble/out/modules/': ['<%= yeoman.app %>/assemble/modules/**/*.hbs']
				}
			},
			index: {
				options: {
					flatten: true,
					assets: '<%= yeoman.app %>',
					layout: '<%= yeoman.app %>/assemble/layouts/index.hbs',
					data: '<%= yeoman.app %>/assemble/data/*.{json,yml}',
					partials: '<%= yeoman.app %>/assemble/partials/*.hbs',
					plugins: []
				},
				files: {
					'<%= yeoman.app %>/assemble/out': ['<%= yeoman.app %>/assemble/index.hbs']
				}
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= yeoman.app %>/js/{,*/}*.js',
				'!<%= yeoman.app %>/js/plugins.js',
				'!<%= yeoman.app %>/js/plugins/*',
				'!<%= yeoman.app %>/js/vendor/*',
				'test/spec/{,*/}*.js'
			]
		},
		mocha: {
			all: {
				options: {
					run: true,
					urls: ['http://localhost:<%= connect.options.port %>/index.html']
				}
			}
		},
		compass: {
			options: {
				sassDir: '<%= yeoman.app %>/sass',
				cssDir: '.tmp/css',
				generatedImagesDir: '.tmp/img/generated',
				imagesDir: '<%= yeoman.app %>/img',
				javascriptsDir: '<%= yeoman.app %>/js',
				fontsDir: '<%= yeoman.app %>/sass/fonts',
				importPath: '<%= yeoman.app %>/plugins',
				httpImagesPath: '/img',
				httpGeneratedImagesPath: '/img/generated',
				httpFontsPath: '/sass/fonts',
				relativeAssets: false,
				outputStyle: 'compact',
				debugInfo: false
			},
			dist: {
				options: {
					generatedImagesDir: '<%= yeoman.dist %>/img/generated',
					debugInfo: false,
					outputStyle: 'compressed'
				}
			},
			server: {
				options: {
					debugInfo: true
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 8', 'ie 9']
			},
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/css/',
					src: '{,*/}*.css',
					dest: '.tmp/css/'
				}]
			}
		},
		// not used since Uglify task does concat,
		// but still available if needed
		/*concat: {
			dist: {}
		},*/
		// not enabled since usemin task does concat and uglify
		// check index.html to edit your build targets
		// enable this task if you prefer defining your build targets here
		/*uglify: {
			dist: {}
		},*/
		useminPrepare: {
			options: {
				dest: '<%= yeoman.dist %>'
			},
			html: '<%= yeoman.app %>/index.html'
		},
		usemin: {
			options: {
				dirs: ['<%= yeoman.dist %>']
			},
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/css/{,*/}*.css']
		},
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/img',
					src: '{,*/}*.{png,jpg,jpeg}',
					dest: '<%= yeoman.dist %>/img'
				}]
			}
		},
		svgmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/img',
					src: '{,*/}*.svg',
					dest: '<%= yeoman.dist %>/img'
				}]
			}
		},
		cssmin: {
			// This task is pre-configured if you do not wish to use Usemin
			// blocks for your CSS. By default, the Usemin block from your
			// `index.html` will take care of minification, e.g.
			//
			//     <!-- build:css({.tmp,app}) css/main.css -->
			//
			// dist: {
			//     files: {
			//         '<%= yeoman.dist %>/css/main.css': [
			//             '.tmp/css/{,*/}*.css',
			//             '<%= yeoman.app %>/css/{,*/}*.css'
			//         ]
			//     }
			// }
		},
		htmlmin: {
			dist: {
				options: {
					/*removeCommentsFromCDATA: true,
					// https://github.com/yeoman/grunt-usemin/issues/44
					//collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeRedundantAttributes: true,
					useShortDoctype: true,
					removeEmptyAttributes: true,
					removeOptionalTags: true*/
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>',
					src: '*.html',
					dest: '<%= yeoman.dist %>'
				}]
			}
		},
		// Put files not handled in other tasks here
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.{ico,png,txt}',
						'.htaccess',
						'img/{,*/}*.{webp,gif}',
						'css/{,*/}*.{jpg,gif,png,webp}',
						'css/fonts/*',
						'modules/*'
					]
				}]
			},
			deploy: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.dist %>',
					dest: '<%= yeoman.deploy %>',
					src: ['./**']
				}]
			},
			styles: {
				expand: true,
				dot: true,
				cwd: '<%= yeoman.app %>/css',
				dest: '.tmp/css/',
				src: '{,*/}*.css'
			}
		},
		concurrent: {
			server: [
				'compass:server',
				'copy:styles'
			],
			test: [
				'copy:styles'
			],
			dist: [
				'compass:dist',
				'copy:styles',
				'imagemin',
				'svgmin',
				'htmlmin'
			]
		}
	});

	grunt.registerTask('server', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'open', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'concurrent:server',
			'autoprefixer',
			'connect:livereload',
			'open',
			'watch'
		]);
	});

	grunt.registerTask('check', [
		'jshint'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'useminPrepare',
		'concurrent:dist',
		'autoprefixer',
		'concat',
		'cssmin',
		'uglify',
		'copy:dist',
		'usemin',
		'modernizr:dist'
	]);

	grunt.registerTask('deploy', [
		'clean:deploy',
		'copy:deploy'
	]);

	grunt.registerTask('default', [
		'jshint',
		'build'
	]);

};
