angular.module('Account').
    provider('DonutChartProvider', function(){

        var _default = {
            options: {
                chart: {
                    type: 'pie',
                    backgroundColor: 'transparent'
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: false
                        },
                        point: {
                            events: {
                                legendItemClick: function (event) { event.preventDefault() }
                            }
                        },
                        showInLegend: true,
                        startAngle: 120,
                        borderWidth: 0
                    }
                },
                legend: {
                    align: 'center',
                    enabled: true
                },
                credits: {
                    enabled: false
                }
            },
            series: [{
                name: '',
                data: null,
                size: '100%',
                innerSize: '60%'
            }],
            title: {
                text: '',
                margin: 10,
                style: {
                    'font-size': '22px',
                    'font-family': '"Open Sans", sans-serif'
                }
            },
            subtitle: {
                text: '',
                style: {
                    'font-size': '17px',
                    'font-family': '"Open Sans", sans-serif',
                    'margin-bottom': '5px'
                }
            },

            loading: false
        };

        this.$get = function() {

            var DonutChart = function(options) {

                this.opts = {};
                _.merge(this.opts, _default, options);
                this.options = this.opts.options;
                this.series = this.opts.series;
                this.title = this.opts.title;
                this.subtitle = this.opts.subtitle;
                this.loading = this.opts.loading;

            };

            Object.defineProperties(DonutChart.prototype, {
                'node' : {
                    get : function() {
                        return this._node;
                    },
                    set : function(node) {
                        this._node = angular.element(node);
                    }
                }
            });

            return DonutChart;
        };
    })