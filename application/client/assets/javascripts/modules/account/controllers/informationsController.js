angular.module('Account').
    controller('InformationsController', ['$scope', 'DonutChartProvider', 'DataChartFactory', 'FormatSizeService', function($scope, DonutChart, DataChartFactory, FormatSizeService) {
        var $local = $scope.Informations = {};

        $local.charts = [];

        function updateElements() {
            $local.charts = [];

            $local.charts.push({
                availableSize: '5Go',
                textSize: 'LIBRE',
                data: [
                    {
                        name: 'video',
                        y: 12.5,
                        color: '#ff3d3d'
                    },
                    {
                        name: 'image',
                        y: 25,
                        color: '#74cf24'
                    },
                    {
                        name: 'musique',
                        y: 12.5,
                        color: '#40a7fd'
                    },
                    {
                        name: 'document',
                        y: 5,
                        color: '#ffa63d'
                    },
                    {
                        name: 'disponible',
                        y: 45,
                        color: '#ffffff'
                    }
                ],
                title: 'STOCKAGE UTILISE',
                subtitle: $scope.Account.currentPlan.storage ? FormatSizeService.format($scope.Account.currentPlan.storage) + ' total' : ''
            });

            DataChartFactory($scope).getCurrentQuota(function(error, quota) {
                var availableSize = null;
                if(!error && quota) {
                    availableSize = $scope.Account.currentPlan.quota - quota.quotaUsed;
                }
                $local.charts.push({
                    availableSize: availableSize ? FormatSizeService.format(availableSize) : '',
                    textSize: 'DISPO',
                    data: [
                        {
                            name: 'utilisé',
                            y: 50,
                            color: '#40a7fd'
                        },
                        {
                            name: 'disponible',
                            y: 50,
                            color: '#ffffff'
                        }
                    ],
                    title: 'QUOTA DE PARTAGE',
                    subtitle: $scope.Account.currentPlan.quota ? FormatSizeService.format($scope.Account.currentPlan.quota) + ' total' : ''
                });
            })
        }

        $scope.$on('plan_updated', function() {
            updateElements();
        })


        $scope.toString = function() {
            return 'Informations';
        };
    }])