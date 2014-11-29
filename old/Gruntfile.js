module.exports = function(grunt) {

	require('load-grunt-tasks')(grunt);
	grunt.initConfig({

		concat: {
			options: {
				separator: ';'
			},
			libs: {
				src: [
					"application/client/assets/javascripts/libraries/jquery/jquery.js",
					"application/client/assets/javascripts/libraries/jquery/jquery-ui.js",
					"application/client/assets/javascripts/libraries/angular/angular.js",
					"application/client/assets/javascripts/libraries/angular/angular-route.js",
					"application/client/assets/javascripts/libraries/lodash/lodash.js",
					"application/client/assets/javascripts/libraries/socket.io/socket.io.js",
					"application/client/assets/javascripts/libraries/restangular/restangular.js",
					"application/client/assets/javascripts/libraries/select2/select2.min.js",
					"application/client/assets/javascripts/libraries/ui-select2/ui-select2.js",
					"application/client/assets/javascripts/libraries/highlight/highlight.pack.js",
					"application/client/assets/javascripts/libraries/highcharts/highcharts.js",
					"application/client/assets/javascripts/libraries/highcharts-ng/highcharts-ng.js",
					"application/client/assets/javascripts/libraries/customScrollBar/customScrollBar.js",
					"application/client/assets/javascripts/libraries/zeroClipboard/zeroClipboard.js",
					"application/client/assets/javascripts/libraries/ng-clip/ng-clip.js",
					"application/client/assets/javascripts/libraries/numeral/numeral.min.js",
					"application/client/assets/javascripts/libraries/numeral/languages.min.js",
					"application/client/assets/javascripts/libraries/scrollTo/scrollTo.js",
					"application/client/assets/javascripts/libraries/shapeOver/snap.svg.js",
					"application/client/assets/javascripts/libraries/annyang/annyang.js",
					"application/client/assets/javascripts/libraries/grumpy-ui/core.js",
					"application/client/assets/javascripts/libraries/grumpy-ui/constants/grumpyConfigConstants.js",
					"application/client/assets/javascripts/libraries/grumpy-ui/directives/grumpyAccordionDirective.js",
					"application/client/assets/javascripts/libraries/grumpy-ui/directives/grumpyUiDirective.js",
					"application/client/assets/javascripts/libraries/grumpy-ui/directives/grumpyVirginDirective.js",
					"application/client/assets/javascripts/libraries/grumpy-ui/services/grumpyPositionService.js",
					"application/client/assets/javascripts/libraries/grumpy-ui/services/grumpyScrollingService.js"

				],
				dest: 'application/client/assets/minified/javascripts/libraries.js'
			},
			modules_common: {
				src: [
					"application/client/assets/javascripts/modules/config/core.js",
					"application/client/assets/javascripts/modules/config/constants/configConstants.js",
					"application/client/assets/javascripts/modules/config/factories/countryFactory.js",
					"application/client/assets/javascripts/modules/websocket/core.js",
					"application/client/assets/javascripts/modules/websocket/factories/websocketFactory.js",
					"application/client/assets/javascripts/modules/tools/core.js",
					"application/client/assets/javascripts/modules/tools/factories/uploaderFactory.js",
					"application/client/assets/javascripts/modules/tools/services/classService.js",
					"application/client/assets/javascripts/modules/tools/services/formatSizeService.js",
					"application/client/assets/javascripts/modules/tools/services/harlemService.js",
					"application/client/assets/javascripts/modules/tools/directives/rightClickDirective.js",
					"application/client/assets/javascripts/modules/tools/directives/boxalertDirective.js",
					"application/client/assets/javascripts/modules/tools/directives/focusDirective.js",
					"application/client/assets/javascripts/modules/tools/directives/progressBarDirective.js",
					"application/client/assets/javascripts/modules/tools/directives/progressBarPlanDirective.js",
					"application/client/assets/javascripts/modules/tools/directives/scrollBarDirective.js",
					"application/client/assets/javascripts/modules/tools/directives/modalDirective.js",
					"application/client/assets/javascripts/modules/tools/directives/formFileUploadDirective.js",
					"application/client/assets/javascripts/modules/tools/directives/shapeOverDirective.js",
					"application/client/assets/javascripts/modules/tools/filters/numeraljsFilter.js",
					"application/client/assets/javascripts/modules/tools/filters/orMultipleFilter.js",
					"application/client/assets/javascripts/modules/breadcrumb/core.js",
					"application/client/assets/javascripts/modules/breadcrumb/controllers/breacrumbController.js",
					"application/client/assets/javascripts/modules/authentication/core.js",
					"application/client/assets/javascripts/modules/authentication/controllers/authenticationController.js",
					"application/client/assets/javascripts/modules/authentication/controllers/loginController.js",
					"application/client/assets/javascripts/modules/authentication/controllers/registerController.js",
					"application/client/assets/javascripts/modules/authentication/factories/userFactory.js",
					"application/client/assets/javascripts/modules/authentication/factories/authenticationFactory.js",
					"application/client/assets/javascripts/modules/authentication/directives/datePickerDirective.js",
					"application/client/assets/javascripts/modules/filemanager/core.js",
					"application/client/assets/javascripts/modules/filemanager/providers/itemProvider.js",
					"application/client/assets/javascripts/modules/filemanager/providers/folderProvider.js",
					"application/client/assets/javascripts/modules/filemanager/providers/fileProvider.js",
					"application/client/assets/javascripts/modules/filemanager/factories/fileExtensionFactory.js",
					"application/client/assets/javascripts/modules/filemanager/factories/itemFactory.js",
					"application/client/assets/javascripts/modules/filemanager/factories/sharingFactory.js",
					"application/client/assets/javascripts/modules/filemanager/controllers/fileManagerController.js",
					"application/client/assets/javascripts/modules/filemanager/controllers/previewController.js",
					"application/client/assets/javascripts/modules/filemanager/controllers/sharingController.js",
					"application/client/assets/javascripts/modules/filemanager/directives/uploaderDirective.js",
					"application/client/assets/javascripts/modules/filemanager/directives/itemDirective.js",
					"application/client/assets/javascripts/modules/filemanager/directives/buttonUploaderDirective.js",
					"application/client/assets/javascripts/modules/filemanager/directives/highlightDirective.js",
					"application/client/assets/javascripts/modules/filemanager/directives/formPostDownloaderDirective.js",
					"application/client/assets/javascripts/modules/navigation/core.js",
					"application/client/assets/javascripts/modules/navigation/controllers/navigationController.js",
					"application/client/assets/javascripts/modules/overlay/core.js",
					"application/client/assets/javascripts/modules/overlay/controllers/overlayController.js",
					"application/client/assets/javascripts/modules/annyang/core.js",
					"application/client/assets/javascripts/modules/annyang/configs/annyangConfig.js",
					"application/client/assets/javascripts/modules/annyang/controllers/annyangController.js",
					"application/client/assets/javascripts/modules/annyang/factories/configFactory.js",
					"application/client/assets/javascripts/modules/annyang/services/annyangService.js",
					"application/client/assets/javascripts/modules/annyang/services/formatService.js"
				],
				dest: 'application/client/assets/minified/javascripts/common.js'
			},
			modules_account: {
				src: [
					"application/client/assets/javascripts/modules/cubbyhole/core.js",
					"application/client/assets/javascripts/modules/cubbyhole/configs/cubbyholeConfig.js",
					"application/client/assets/javascripts/modules/cubbyhole/controllers/cubbyholeController.js",
					"application/client/assets/javascripts/modules/cubbyhome/core.js",
					"application/client/assets/javascripts/modules/cubbyhome/controllers/cubbyhomeController.js",
					"application/client/assets/javascripts/modules/cubbyhome/factories/planFactory.js",
					"application/client/assets/javascripts/modules/account/core.js",
					"application/client/assets/javascripts/modules/account/configs/accountConfig.js",
					"application/client/assets/javascripts/modules/account/controllers/accountController.js",
					"application/client/assets/javascripts/modules/account/controllers/accountNavigationController.js",
					"application/client/assets/javascripts/modules/account/controllers/configurationController.js",
					"application/client/assets/javascripts/modules/account/controllers/informationsController.js",
					"application/client/assets/javascripts/modules/account/controllers/timelineController.js",
					"application/client/assets/javascripts/modules/account/controllers/plansController.js",
					"application/client/assets/javascripts/modules/account/providers/donutChartProvider.js",
					"application/client/assets/javascripts/modules/account/factories/dataChartFactory.js",
					"application/client/assets/javascripts/modules/account/directives/donutChartDirective.js"
				],
				dest: 'application/client/assets/minified/javascripts/account.js'
			},
			modules_filemanager: {
				src: [
					"application/client/assets/javascripts/modules/cubbyhole/core.js",
					"application/client/assets/javascripts/modules/cubbyhole/configs/cubbyholeConfig.js",
					"application/client/assets/javascripts/modules/cubbyhole/controllers/cubbyholeController.js",
				],
				dest: 'application/client/assets/minified/javascripts/filemanager.js'
			},
			modules_home: {
				src: [
					"application/client/assets/javascripts/modules/cubbyhome/core.js",
					"application/client/assets/javascripts/modules/cubbyhome/configs/cubbyhomeConfig.js",
					"application/client/assets/javascripts/modules/cubbyhome/controllers/cubbyhomeController.js",
					"application/client/assets/javascripts/modules/cubbyhome/factories/planFactory.js"
				],
				dest: 'application/client/assets/minified/javascripts/home.js'
			},
			modules_shared: {
				src: [
					"application/client/assets/javascripts/modules/sharing/core.js",
					"application/client/assets/javascripts/modules/sharing/configs/sharingConfig.js",
					"application/client/assets/javascripts/modules/sharing/controllers/sharingController.js"
				],
				dest: 'application/client/assets/minified/javascripts/shared.js'
			},
			modules_administration: {
				src: [
					"application/client/assets/javascripts/modules/cubbyhome/core.js",
					"application/client/assets/javascripts/modules/cubbyhome/factories/planFactory.js",
					"application/client/assets/javascripts/modules/administration/core.js",
					"application/client/assets/javascripts/modules/administration/configs/administrationConfig.js",
					"application/client/assets/javascripts/modules/administration/controllers/administrationController.js",
					"application/client/assets/javascripts/modules/administration/controllers/planAdministrationController.js",
					"application/client/assets/javascripts/modules/administration/controllers/userAdministrationController.js"
				],
				dest: 'application/client/assets/minified/javascripts/administration.js'
			}



		},

		cssmin: {
			combine: {
				files: {
					'application/client/assets/minified/styles/style.min.css' : [
						"application/client/assets/styles/libraries/font.css",
						"application/client/assets/styles/libraries/bootstrap/bootstrap.min.css",
						"application/client/assets/styles/libraries/animate/animate.css",
						"application/client/assets/styles/libraries/select2/select2-bootstrap.css",
						"application/client/assets/styles/libraries/highlight/vs.css",
						"application/client/assets/styles/libraries/modalWindowEffects/component.css",
						"application/client/assets/styles/libraries/shapeOver/shapeOver.css",
						"application/client/assets/styles/libraries/customScrollBar/customScrollBar.css",
						"application/client/assets/styles/libraries/grumpy-ui/grumpy-ui.css",
						"application/client/assets/styles/libraries/grumpy-ui/grumpy-accordion.css",
						"application/client/assets/styles/libraries/harlemshake/harlemshake.css",
						"application/client/assets/styles/components/header.css",
						"application/client/assets/styles/components/forms.css",
						"application/client/assets/styles/components/userCard.css",
						"application/client/assets/styles/components/modale.css",
						"application/client/assets/styles/modules/fileManager/breadcrumb.css",
						"application/client/assets/styles/modules/fileManager/manager.css",
						"application/client/assets/styles/modules/fileManager/preview.css",
						"application/client/assets/styles/modules/fileManager/toolbar.css",
						"application/client/assets/styles/modules/account/vertical-menu.css",
						"application/client/assets/styles/modules/account/timeline.css",
						"application/client/assets/styles/modules/account/plans.css",
						"application/client/assets/styles/modules/account/account.css",
						"application/client/assets/styles/modules/tools/progressBar.css",
						"application/client/assets/styles/core.css"
					]
				}
			}
		}
	});



	grunt.registerTask('concatJS', [
		'concat:libs',
		'concat:modules_common',
		'concat:modules_account',
		'concat:modules_filemanager',
		'concat:modules_home',
		'concat:modules_shared',
		'concat:modules_administration',
		'cssmin'
	])

}