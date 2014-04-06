angular.module('Filemanager').
    directive('modal', ['$parse', 'extension', 'PDFViewerService', function($parse, extension, PDFViewerService) {
        return {
            scope: true,
            restrict: 'E',
            templateUrl: '/templates/modal',
            replace: true,
            require: 'modal',
            controller: function($scope) {
                var self = this;
                var $local = $scope._modal = {};

                $local.resourceUrl = "";
                $local.file = "";

                $local.pdf = {};

                $local.pdf.instance = PDFViewerService.Instance("pdfViewer");

                $local.pdf.nextPage = function() {
                    $local.pdf.instance.nextPage();
                };

                $local.pdf.prevPage = function() {
                    $local.pdf.instance.prevPage();
                };

                $local.pdf.gotoPage = function(page) {
                    $local.pdf.instance.gotoPage(page);
                };

                $local.pdf.pageLoaded = function(curPage, totalPages) {
                    $local.pdf.currentPage = curPage;
                    $local.pdf.totalPages = totalPages;
                };

                $local.isVisible = function() {
                    return $scope._filemanager.showModal;
                };

                $local.close = function() {
                    $scope._filemanager.showModal = false;
                    if($local.file !== undefined && $local.file.category == "video") {
                        videojs('video').pause();
                    }
                };
            },
            link: function($scope, $node, attributes, self) {

                var $local = $scope._modal;

                $scope.$watch('_filemanager.showModal', function(showModal) {
                    if(showModal === false) {
                        $local.close();
                    }
                });

                $scope.$watch('_filemanager.resourceUrl', function() {
                    $local.resourceUrl = $scope._filemanager.resourceUrl;
                });
                $scope.$watch('_filemanager.file', function() {
                    $local.file = $scope._filemanager.file;
                    if($local.file !== undefined && $local.file.category == "video") {
                        videojs("video", {}, function(){
                        });
                    }
                });
            }
        };
    }]);