/**
 * Created by LI Xueyu on 10/17/17.
 */
var app = angular.module('dataVis', []);
var carItem = {
    name: '201MCE',
    accuracy: 82.32,
    data: {
        '15-10': {
            real: 2681,
            predict: 2207,
            sale: 2000
        },
        '15-11': {
            real: 3660,
            predict: 2681,
            sale: 2000
        },
        '16-01': {
            real: 4373,
            predict: 3508,
            sale: 2000
        },
        '16-02': {
            real: 4425,
            predict: 4053,
            sale: 2000
        },
        '16-03': {
            real: 2844,
            predict: 3387,
            sale: 2000
        },
        '16-04': {
            real: 3380,
            predict: 3581,
            sale: 2000
        },
        '16-05': {
            real: 2899,
            predict: 2552,
            sale: 2000
        },
        '16-06': {
            real: 3497,
            predict: 2771,
            sale: 2000
        },
        '16-07': {
            real: 3396,
            predict: 3379,
            sale: 2000
        },
        '16-08': {
            real: null,
            predict: 3363,
            sale: null
        },
        '16-09': {
            real: null,
            predict: 3363,
            sale: null
        },
        '16-10': {
            real: null,
            predict: 3363,
            sale: null
        },
        '16-11': {
            real: null,
            predict: 3363,
            sale: null
        },
        '16-12': {
            real: null,
            predict: 3363,
            sale: null
        },
        '17-01': {
            real: null,
            predict: 3363,
            sale: null
        },
        '17-02': {
            real: null,
            predict: 3363,
            sale: null
        },
        '17-03': {
            real: null,
            predict: 3363,
            sale: null
        },
        '17-04': {
            real: null,
            predict: 3363,
            sale: null
        },
        '17-05': {
            real: null,
            predict: 3363,
            sale: null
        },
        '17-06': {
            real: null,
            predict: 3363,
            sale: null
        },
        '17-07': {
            real: null,
            predict: 3363,
            sale: null
        }
    }
};
var carData =[];
for (var i= 0; i<15; i++) {
    var temp = $.extend(true, {}, carItem);
    carData.push(temp);
}
var companies = ['长安马自达', '东风日产', '海马', '上海通用', '郑州日产'];

var drawCarChart = function(date, data) {
    var carChart = echarts.init(document.getElementById('car-chart'));
    var option = {
        backgroundColor: '#FBFBFB',
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['实际产量', '预测产量', '销量']
        },

        calculable: true,
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: date
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: '实际产量',
            type: 'line',
            data: data.real
        }, {
            name: '预测产量',
            type: 'line',
            data: data.predict
        }, {
            name: '销量',
            type: 'line',
            data: data.sale
        }]
    };
    carChart.setOption(option);
};

$(document).ready(function() {
    $('.company-list').select2();
});
app.controller('visualCtrl',['$scope', '$http', function($scope, $http) {
    $scope.carData = $.extend(true, [], carData); // all cars data for a single company
    $scope.companies =  ['长安马自达', '东风日产', '海马', '上海通用', '郑州日产'];
    //$scope.model = {};
    $scope.companySelect = 0;
    $scope.carSelect = 0;
    //$scope.selectCompany = function() {
    //    // send request and then set $scope.carData as response.data
    //    console.log($scope.companySelect);
    //};
    $scope.$watch("companySelect",function(newValue){
        console.log(newValue);
    });
    var prepareChartData = function(index) {
        var x = [];
        var data = {
            real: [],
            predict: [],
            sale: []
        };
        var dataSeries = $scope.carData[index].data;
        for (var key in dataSeries) {
            x.push(key);
        }
        x.sort();
        for (var item in x) {
            var temp = dataSeries[x[item]];
            data.real.push(temp.real);
            data.predict.push(temp.predict);
            data.sale.push(temp.sale);
        }
        return {
            x: x,
            data: data
        };
    };
    var data = prepareChartData($scope.carSelect);
    drawCarChart(data.x, data.data);
    $scope.selectCar = function(index) {
        $scope.carSelect = index;
        data = prepareChartData(index);
        drawCarChart(data.x, data.data);
    };
}]);


//var drawDistScatter = function(data) {
//    var distScatter = echarts.init(document.getElementById('dist-scatter'));
//    //var data = [
//    //    [[28604,77,50,'Australia',1990],[31163,77.4,30,'Canada',1990],[1516,68,20,'China',1990]],
//    //    [[44056,81.8,70,'Australia',2015],[43294,81.7,80,'Canada',2015],[13334,76.9,90,'China',2015]]
//    //];
//    var zc = [];
//    var rz = [];
//    var ls = [];
//    var tl = [];
//    for (var item in data) {
//        if (item.Type === '忠诚型') {
//            zc.push(item);
//        } else if (item.Type === '人质型') {
//            rz.push(item);
//        } else if (item.Type === '流失型') {
//            ls.push(item);
//        } else {
//            tl.push(item);
//        }
//    }
//    var option = {
//        legend: {
//            right: 10,
//            data: ['忠诚型', '人质型', '流失型', '图利型']
//        },
//        xAxis: {
//            splitLine: {
//                lineStyle: {
//                    type: 'dashed'
//                }
//            }
//        },
//        yAxis: {
//            splitLine: {
//                lineStyle: {
//                    type: 'dashed'
//                }
//            },
//            scale: true
//        },
//        series: [{
//            name: '忠诚型',
//            data: data[0],
//            type: 'scatter',
//            symbolSize: function (data) {
//                return Math.sqrt(data['Customer_Quantity'])*3;
//            },
//            label: {
//                emphasis: {
//                    show: true,
//                    formatter: function (data) {
//                        return data['Customer_Quantity'];
//                    },
//                    position: 'top'
//                }
//            },
//            itemStyle: {
//                normal: {
//                    shadowBlur: 10,
//                    shadowColor: 'rgba(120, 36, 50, 0.5)',
//                    shadowOffsetY: 5,
//                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
//                        offset: 0,
//                        color: 'rgb(251, 118, 123)'
//                    }, {
//                        offset: 1,
//                        color: 'rgb(204, 46, 72)'
//                    }])
//                }
//            }
//        }, {
//            name: '2015',
//            data: data[1],
//            type: 'scatter',
//            symbolSize: function (data) {
//                return Math.sqrt(data[2]) *3;
//            },
//            label: {
//                emphasis: {
//                    show: true,
//                    formatter: function (param) {
//                        return param.data[3];
//                    },
//                    position: 'top'
//                }
//            },
//            itemStyle: {
//                normal: {
//                    shadowBlur: 10,
//                    shadowColor: 'rgba(25, 100, 150, 0.5)',
//                    shadowOffsetY: 5,
//                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
//                        offset: 0,
//                        color: 'rgb(129, 227, 238)'
//                    }, {
//                        offset: 1,
//                        color: 'rgb(25, 183, 207)'
//                    }])
//                }
//            }
//        }]
//    };
//    distScatter.setOption(option);
//
//};
var drawRadar = function(data15, data16) {
    var radarChart = echarts.init(document.getElementById('company-radar'));
    var option = {
        tooltip: {},
        radar: {
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator: [
                { name: '价格）', max: 75},
                { name: '质量', max: 110},
                { name: '品种', max: 105},
                { name: '资金', max: 70},
                { name: '物流', max: 80},
                { name: '电商', max: 75}
            ]
        },
        series: [{
            type: 'radar',
            data : [
                {
                    value : data15,
                    name : '2015',
                    areaStyle: {
                        normal: {
                            color: 'rgba(178,235,242, 0.5)'
                        }
                    }
                },
                {
                    value: data16,
                    name: '2016',
                    areaStyle: {
                        normal: {
                            color: 'rgba(255,241,118, 0.5)'
                        }
                    }
                }
            ]
        }]
    };
    radarChart.setOption(option);
};

var customer = angular.module('customerApp',[]);
customer.factory('customerRequest', function($http) {
    var getCompany = function(dist, style, type) {
        return $http({
            url: 'http://10.127.1.102:5000/up_data?db=detail&dist=' + dist + '&style=' + style + '&type=' + type,
            method: 'GET'
        });
    };
    var getDist = function(dist) {
        return $http({
            url: 'http://10.127.1.102:5000/up_data?db=stat&dist=' + dist,
            method: 'GET'
        });
    };
    return {
        getCompany: function(dist, style, type) {
            return getCompany(dist, style, type);
        },
        getDist: function(dist) {
            return getDist(dist);
        }
    }
});
customer.controller('customerCtrl', ['$scope', '$http','customerRequest', function($scope, $http, customerRequest) {
    $scope.distSelect = 'all';
    $scope.yearSelect = '2015';
    customerRequest.getDist($scope.distSelect).then(function(res) {
        $scope.distInfo = res.data;
    }, function(res) {
        console.log(res);
    });
    customerRequest.getCompany('all','all','all').then(function(res) {
        $scope.customerTable = res.data;
    }, function(res) {
        console.log(res);
    });
    $scope.selectDist = function(event) {
        $scope.distSelect = event.target.name;
        customerRequest.getDist($scope.distSelect).then(function(res) {
            $scope.distInfo = res.data;
            drawDistScatter($scope.distInfo.pic);
        }, function(res) {
            console.log(res);
        });

    };



    //drawDistScatter();
    drawRadar();


}]);



