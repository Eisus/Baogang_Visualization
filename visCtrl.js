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
           url: 'http://10.127.1.102:5000/car_visualization?company_index=' + index,
           method: 'GET'
       });
   };
   return {
       getCompanyList: function() {
           return getCompanyList();
       },
       getCarData: function(index) {
           return getCarData(index);
       }
   };
});

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
    // $scope.carData = $.extend(true, [], carData); // all cars data for a single company
    $scope.companies =  [];
    $scope.companySelect = 0;
    $scope.carSelect = 0;
    $scope.date = [];
    carRequest.getCompanyList().then(function(res){
        $scope.companies = res.data;
    }, function(err){
        console.log(err);
    });
    carRequest.getCarData($scope.companySelect).then(function(res) {
        $scope.carData = $.extend(true, [], res.data);
        for (var key in $scope.carData[0].data) {
            $scope.date.push(key);
        }
        $scope.date = $scope.date.sort();
        var data = prepareChartData($scope.carSelect);
        drawCarChart(data.x, data.data);
    }, function(err) {
        console.log(err);
    })
    $scope.model = {};

    $scope.selectCompany = function() {
       // send request and then set $scope.carData as response.data
        console.log($scope.companySelect);
        // carRequest.getCarData($scope.companySelect).then(function(res) {
        //     $scope.carData = $.extend(true, [], res.data);
        // }, function(err) {
        //     console.log(err);
        // })
    };
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
        x = x.sort();
        for (var item in x) {
            var temp = dataSeries[x[item]];
            data.real.push(temp.ACTUAL);
            data.predict.push(temp.PREDICT);
            data.sale.push(temp.CAR_SALE);
        }
        return {
            x: x,
            data: data
        };
    };
    $scope.selectCar = function(index) {
        $scope.carSelect = index;
        var data = prepareChartData(index);
        drawCarChart(data.x, data.data);
    };

}]);

//////////////////////////////////////////////////////////////////////////////////////

var drawDistScatter = function(data) {
   var distScatter = echarts.init(document.getElementById('dist-scatter'));
   var option = option = {
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
           },
           min: 40
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
               return Math.sqrt(data[2])*2
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
                   color: '#003366'
               }
           }
       }, {
           name: '人质',
           data: data[1],
           type: 'scatter',
           symbolSize: function (data) {
               return Math.sqrt(data[2])*2;
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
                   color: '#006699'
               }
           }
       }, {
           name: '流失',
           data: data[2],
           type: 'scatter',
           symbolSize: function (data) {
               return Math.sqrt(data[2])*2;
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
                   color: '#4cabce'
               }
           }
       }, {
           name: '图利',
           data: data[3],
           type: 'scatter',
           symbolSize: function (data) {
               return Math.sqrt(data[2])*2;
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
                   color: '#e5323e'
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
            data: ['2015', '2016'],
            right: 0
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
       } else if (data[item].Type === '人质型') {
           rz.push(temp);
       } else if (data[item].Type === '流失型') {
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
var drawBar = function(data) {
    var compareChart = echarts.init(document.getElementById('compare-bar'));
     var option = {
        color: ['#003366', '#006699', '#4cabce', '#e5323e'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: ['忠诚','人质','流失','图利']
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                axisTick: {show: false},
                data: ['2015', '2016']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '忠诚',
                type: 'bar',
                barGap: 0,
                data: data[0]
            },
            {
                name: '人质',
                type: 'bar',
                data: data[1]
            },
            {
                name: '流失',
                type: 'bar',
                data: data[2]
            },
            {
                name: '图利',
                type: 'bar',
                data: data[3]
            }
        ]
    };
     compareChart.setOption(option);
}
var prepareBarData = function(data) {
    var zc = [];
    var rz = [];
    var ls = [];
    var tl = [];
    for(var item in data) {
        zc.push(data[item]['1']);
        rz.push(data[item]['2']);
        ls.push(data[item]['3']);
        tl.push(data[item]['4']);
    }
    return [zc, rz, ls, tl];
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
       var scaData = prepareScaData($scope.distInfo.pic);
       drawDistScatter(scaData);
       var barData = prepareBarData($scope.distInfo.hist);
       drawBar(barData);
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
            var barData = prepareBarData($scope.distInfo.hist);
            drawBar(barData);
        }, function(res) {
            console.log(res);
        });
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



