/**
 * Created by LI Xueyu on 10/17/17.
 */
$(document).ready(function() {
    $('.company-list').select2();
});
var app = angular.module('dataVis', []);
app.factory('carRequest', function($http) {
   var getCompanyList =  function() {
       return $http({
           url: 'http://10.127.1.102:5000/company_list',
           method: 'GET'
       });
   };
   var getCarData = function(index) {
       return $http({
           url: '',
           method: 'GET'
       });
   };
   return {
       getCompanyList: function() {
           return getCompanyList();
       },
       getCarData: function() {
           return getCarData();
       }
   };
});

// var carItem = {
//     name: '201MCE',
//     accuracy: 82.32,
//     data: {
//         '15-10': {
//             real: 2681,
//             predict: 2207,
//             sale: 2000
//         },
//         '15-11': {
//             real: 3660,
//             predict: 2681,
//             sale: 2000
//         },
//         '16-01': {
//             real: 4373,
//             predict: 3508,
//             sale: 2000
//         },
//         '16-02': {
//             real: 4425,
//             predict: 4053,
//             sale: 2000
//         },
//         '16-03': {
//             real: 2844,
//             predict: 3387,
//             sale: 2000
//         },
//         '16-04': {
//             real: 3380,
//             predict: 3581,
//             sale: 2000
//         },
//         '16-05': {
//             real: 2899,
//             predict: 2552,
//             sale: 2000
//         },
//         '16-06': {
//             real: 3497,
//             predict: 2771,
//             sale: 2000
//         },
//         '16-07': {
//             real: 3396,
//             predict: 3379,
//             sale: 2000
//         },
//         '16-08': {
//             real: null,
//             predict: 3363,
//             sale: null
//         },
//         '16-09': {
//             real: null,
//             predict: 3363,
//             sale: null
//         },
//         '16-10': {
//             real: null,
//             predict: 3363,
//             sale: null
//         },
//         '16-11': {
//             real: null,
//             predict: 3363,
//             sale: null
//         },
//         '16-12': {
//             real: null,
//             predict: 3363,
//             sale: null
//         },
//         '17-01': {
//             real: null,
//             predict: 3363,
//             sale: null
//         },
//         '17-02': {
//             real: null,
//             predict: 3363,
//             sale: null
//         },
//         '17-03': {
//             real: null,
//             predict: 3363,
//             sale: null
//         },
//         '17-04': {
//             real: null,
//             predict: 3363,
//             sale: null
//         },
//         '17-05': {
//             real: null,
//             predict: 3363,
//             sale: null
//         },
//         '17-06': {
//             real: null,
//             predict: 3363,
//             sale: null
//         },
//         '17-07': {
//             real: null,
//             predict: 3363,
//             sale: null
//         }
//     }
// };
// var carData =[];
// for (var i= 0; i<15; i++) {
//     var temp = $.extend(true, {}, carItem);
//     carData.push(temp);
// }
// var companies = ['长安马自达', '东风日产', '海马', '上海通用', '郑州日产'];

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


app.controller('visualCtrl',['$scope', '$http','carRequest', function($scope, $http, carRequest) {
    $scope.carData = $.extend(true, [], carData); // all cars data for a single company
    $scope.companies =  [];
    carRequest.getCompanyList().then(function(res){
        $scope.companies = res.data;
    }, function(err){
        console.log(err);
    });
    //$scope.model = {};
    $scope.companySelect = 0;
    $scope.carSelect = 0;
    $scope.selectCompany = function() {
       // send request and then set $scope.carData as response.data
       console.log($scope.companySelect);
    };
    // $scope.$watch("companySelect",function(newValue){
    //     console.log(newValue);
    // });
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

//////////////////////////////////////////////////////////////////////////////////////

var drawDistScatter = function(data) {
   var distScatter = echarts.init(document.getElementById('dist-scatter'));
   var option = option = {
       // backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
       //     offset: 0,
       //     color: '#f7f8fa'
       // }, {
       //     offset: 1,
       //     color: '#cdd0d5'
       // }]),
       backgroundColor: '#fff',
       legend: {
           right: 10,
           data: ['忠诚','人质','流失','图利']
       },
       xAxis: {
           splitLine: {
               lineStyle: {
                   type: 'dashed'
               }
           }
       },
       yAxis: {
           splitLine: {
               lineStyle: {
                   type: 'dashed'
               }
           },
           scale: true
       },
       series: [{
           name: '忠诚',
           data: data[0],
           type: 'scatter',
           symbolSize: function (data) {
               return Math.sqrt(data[2]);
           },
           label: {
               emphasis: {
                   show: true,
                   formatter: function (param) {
                       return param.data[3];
                   },
                   position: 'top'
               }
           },
           itemStyle: {
               normal: {
                   shadowBlur: 10,
                   shadowColor: 'rgba(120, 36, 50, 0.5)',
                   shadowOffsetY: 5,
                   // color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                   //     offset: 0,
                   //     color: 'rgb(251, 118, 123)'
                   // }, {
                   //     offset: 1,
                   //     color: 'rgb(204, 46, 72)'
                   // }])
                   color: '#ffa726'
               }
           }
       }, {
           name: '人质',
           data: data[1],
           type: 'scatter',
           symbolSize: function (data) {
               return Math.sqrt(data[2]) ;
           },
           label: {
               emphasis: {
                   show: true,
                   formatter: function (param) {
                       return param.data[3];
                   },
                   position: 'top'
               }
           },
           itemStyle: {
               normal: {
                   shadowBlur: 10,
                   shadowColor: 'rgba(25, 100, 150, 0.5)',
                   shadowOffsetY: 5,
                   // color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                   //     offset: 0,
                   //     color: 'rgb(129, 227, 238)'
                   // }, {
                   //     offset: 1,
                   //     color: 'rgb(25, 183, 207)'
                   // }])
                   color: '#e84e40'
               }
           }
       }, {
           name: '流失',
           data: data[2],
           type: 'scatter',
           symbolSize: function (data) {
               return Math.sqrt(data[2]);
           },
           label: {
               emphasis: {
                   show: true,
                   formatter: function (param) {
                       return param.data[3];
                   },
                   position: 'top'
               }
           },
           itemStyle: {
               normal: {
                   shadowBlur: 10,
                   shadowColor: 'rgba(120, 36, 50, 0.5)',
                   shadowOffsetY: 5,
                   // color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                   //     offset: 0,
                   //     color: 'rgb(251, 118, 123)'
                   // }, {
                   //     offset: 1,
                   //     color: 'rgb(204, 46, 72)'
                   // }])
                   color: '#ab47bc'
               }
           }
       }, {
           name: '图利',
           data: data[3],
           type: 'scatter',
           symbolSize: function (data) {
               return Math.sqrt(data[2]);
           },
           label: {
               emphasis: {
                   show: true,
                   formatter: function (param) {
                       return param.data[3];
                   },
                   position: 'top'
               }
           },
           itemStyle: {
               normal: {
                   shadowBlur: 10,
                   shadowColor: 'rgba(120, 36, 50, 0.5)',
                   shadowOffsetY: 5,
                   // color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                   //     offset: 0,
                   //     color: 'rgb(251, 118, 123)'
                   // }, {
                   //     offset: 1,
                   //     color: 'rgb(204, 46, 72)'
                   // }])
                   color: '#5c6bc0'
               }
           }
       }]
   };
   distScatter.setOption(option);

};
var drawRadar = function(data15, data16) {
    var radarChart = echarts.init(document.getElementById('company-radar'));
    var option = {
        legend: {
            data: ['2015', '2016']
        },
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
                { name: '价格', max: 75},
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
var prepareScaData = function(data) {
    var zc = [];
    var rz = [];
    var ls = [];
    var tl = [];
    for (var item in data) {
        var temp = [];
        temp.push(data[item].X_Axis);
        temp.push(data[item].Y_Axis);
        temp.push(data[item].Customer_Quantity);
        temp.push(data[item].Type);
       if (data[item].Type === '忠诚型') {
           zc.push(temp);
       } else if (data[item] === '人质型') {
           rz.push(temp);
       } else if (data[item] === '流失型') {
           ls.push(temp);
       } else {
           tl.push(temp);
       }
    }
    var result = [];
    result.push(zc);
    result.push(rz);
    result.push(ls);
    result.push(tl);
    return result;
}

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
    $scope.s_dist = 'all';
    $scope.s_style = 'all';
    $scope.s_type = 'all';
    $scope.companyIndex = 0;

    customerRequest.getDist($scope.distSelect).then(function(res) {
       $scope.distInfo = res.data;
       console.log($scope.distInfo);
       var scaData = prepareScaData($scope.distInfo.pic);
       drawDistScatter(scaData);
    }, function(res) {
       console.log(res);
    });
    customerRequest.getCompany($scope.s_dist,$scope.s_style,$scope.s_type).then(function(res) {
       $scope.customerTable = res.data;
       var data15 = [];
       var data16 = [];
       for(var i =0; i<6; i++) {
           if ($scope.customerTable[$scope.companyIndex]['2015'].length) {
               data15.push($scope.customerTable[$scope.companyIndex]['2015'][i]);
           } else {
               data15.push(0);
           }
           if ($scope.customerTable[$scope.companyIndex]['2016']) {
               data16.push($scope.customerTable[$scope.companyIndex]['2016'][i])
           } else {
               data16.push(0);
           }
       }
       drawRadar(data15, data16);
    }, function(res) {
       console.log(res);
    });
    $scope.selectDist = function(event) {
        $scope.distSelect = event.target.name;
        customerRequest.getDist($scope.distSelect).then(function(res) {
            $scope.distInfo = res.data;
            var scaData = prepareScaData($scope.distInfo.pic);
            drawDistScatter(scaData);
        }, function(res) {
            console.log(res);
        });
    };
    $scope.setYear = function() {

    };


    $scope.searchCompany = function() {
        customerRequest.getCompany($scope.s_dist,$scope.s_style,$scope.s_type).then(function(res) {
            $scope.customerTable = res.data;
            var data15 = [];
            var data16 = [];
            for(var i =0; i<6; i++) {
                if ($scope.customerTable[0]['2015'].length) {
                    data15.push($scope.customerTable[0]['2015'][i]);
                } else {
                    data15.push(0);
                }
                if ($scope.customerTable[0]['2016']) {
                    data16.push($scope.customerTable[0]['2016'][i])
                } else {
                    data16.push(0);
                }
            }
            drawRadar(data15, data16);
        }, function(res) {
            console.log(res);
        });
    }
    $scope.setCompany = function(index) {
        var data15 = [];
        var data16 = [];
        $scope.companyIndex = index;
        for(var i =0; i<6; i++) {
            if ($scope.customerTable[index]['2015'].length) {
                data15.push($scope.customerTable[index]['2015'][i]);
            } else {
                data15.push(0);
            }
            if ($scope.customerTable[index]['2016']) {
                data16.push($scope.customerTable[index]['2016'][i])
            } else {
                data16.push(0);
            }
        }
        drawRadar(data15, data16);
    };


}]);



