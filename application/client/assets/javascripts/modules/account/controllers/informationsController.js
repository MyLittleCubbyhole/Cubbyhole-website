angular.module('Account').
    controller('InformationsController', ['$scope', 'DonutChartProvider', 'DataChartFactory', 'FormatSizeService', function($scope, DonutChart, DataChartFactory, FormatSizeService) {
        var $local = $scope.Informations = {};

        $local.charts = [];

        /**
         * update account chart
         */
        function updateElements() {
            $local.charts = [];

            DataChartFactory($scope).getSizeUsed(function(error, sizes) {
                var availableSize = 1
                ,   usedSpace = 0
                ,   data = null
                ,   videos = 0
                ,   images = 0
                ,   musiques = 0
                ,   documents = 0
                ,   others = 0;

                if(!error && sizes) {
                    for(var i = 0; i < sizes.length; i++) {
                        if(sizes[i]._id.indexOf("video") > -1)
                            videos += sizes[i].size;
                        else if(sizes[i]._id.indexOf("image") > -1)
                             images += sizes[i].size;
                        else if(sizes[i]._id.indexOf("audio") > -1)
                             musiques += sizes[i].size;
                        else if(sizes[i]._id.indexOf("document") > -1 || sizes[i]._id.indexOf("pdf") > -1)
                             documents += sizes[i].size;
                        else
                             others += sizes[i].size;

                        usedSpace += sizes[i].size;
                    }
                    availableSize = $scope.Account.currentPlan.storage - usedSpace;
                }

                $local.charts.push({
                    availableSize: availableSize > 1 ? FormatSizeService.format(availableSize, true) : FormatSizeService.format($scope.Account.currentPlan.storage, true),
                    textSize: 'LIBRE',
                    data: [
                        {
                            name: 'Disponible',
                            y: parseInt(availableSize, 10),
                            size: availableSize > 1 ? FormatSizeService.format(availableSize) : FormatSizeService.format($scope.Account.currentPlan.storage),
                            color: '#ffffff'
                        }
                    ],
                    title: 'STOCKAGE UTILISE',
                    subtitle: $scope.Account.currentPlan.storage ? FormatSizeService.format($scope.Account.currentPlan.storage) + ' total' : ''
                });

                if(videos)
                   $local.charts[0].data.push(
                        {
                            name: 'Vidéos',
                            y: parseInt(videos, 10),
                            size: FormatSizeService.format(videos),
                            color: '#75c8ef'
                        }
                   );
                if(images)
                   $local.charts[0].data.push(
                        {
                            name: 'Images',
                            y: parseInt(images, 10),
                            size: FormatSizeService.format(images),
                            color: '#ffcb2d'
                        }
                   );
                if(musiques)
                   $local.charts[0].data.push(
                        {
                            name: 'Musiques',
                            y: parseInt(musiques, 10),
                            size: FormatSizeService.format(musiques),
                            color: '#ff5a5a'
                        }
                   );
                if(documents)
                   $local.charts[0].data.push(
                        {
                            name: 'Documents',
                            y: parseInt(documents, 10),
                            size: FormatSizeService.format(documents),
                            color: '#52d11a'
                        }
                   );
                if(others)
                   $local.charts[0].data.push(
                        {
                            name: 'Autre',
                            y: parseInt(others, 10),
                            size: FormatSizeService.format(others),
                            color: '#B175EF'
                        }
                   );

            })

            DataChartFactory($scope).getCurrentQuota(function(error, quota) {
                var availableSize = 1;
                if(!error && quota) {
                    availableSize = $scope.Account.currentPlan.quota - quota.quotaUsed;
                }
                $local.charts.push({
                    availableSize: availableSize > 1 ? FormatSizeService.format(availableSize, true) : FormatSizeService.format($scope.Account.currentPlan.quota, true),
                    textSize: 'DISPO',
                    data: [],
                    title: 'QUOTA DE PARTAGE',
                    subtitle: $scope.Account.currentPlan.quota ? FormatSizeService.format($scope.Account.currentPlan.quota) + ' total' : ''
                });

                if(quota)
                    $local.charts[1].data.push({
                        name: 'Utilisé',
                        y: quota.quotaUsed,
                        size: FormatSizeService.format(quota.quotaUsed),
                        color: '#40a7fd'
                    })

                $local.charts[1].data.push({
                    name: 'Disponible',
                    y: availableSize,
                    size: availableSize > 1 ? FormatSizeService.format(availableSize) : FormatSizeService.format($scope.Account.currentPlan.quota),
                    color: '#ffffff'
                })
            })
        }

        if(!$scope.Account.currentPlan)
            $scope.$on('plan_updated', function() {
                updateElements();
            });
        else
            updateElements();

        $scope.toString = function() {
            return 'Informations';
        };
    }])