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
            predict: 2207
        },
        '15-11': {
            real: 3660,
            predict: 2681
        },
        '16-01': {
            real: 4373,
            predict: 3508
        },
        '16-02': {
            real: 4425,
            predict: 4053
        },
        '16-03': {
            real: 2844,
            predict: 3387
        },
        '16-04': {
            real: 3380,
            predict: 3581
        },
        '16-05': {
            real: 2899,
            predict: 2552
        },
        '16-06': {
            real: 3497,
            predict: 2771
        },
        '16-07': {
            real: 3396,
            predict: 3379
        },
        '16-08': {
            real: null,
            predict: 3363
        },
        '16-09': {
            real: null,
            predict: 3363
        },
        '16-10': {
            real: null,
            predict: 3363
        },
        '16-11': {
            real: null,
            predict: 3363
        },
        '16-12': {
            real: null,
            predict: 3363
        },
        '17-01': {
            real: null,
            predict: 3363
        },
        '17-02': {
            real: null,
            predict: 3363
        },
        '17-03': {
            real: null,
            predict: 3363
        },
        '17-04': {
            real: null,
            predict: 3363
        },
        '17-05': {
            real: null,
            predict: 3363
        },
        '17-06': {
            real: null,
            predict: 3363
        },
        '17-07': {
            real: null,
            predict: 3363
        }
    }
};
var data =[];
for (var i= 0; i<15; i++) {
    var temp = $.extend(true, {}, carItem);
    data.push(temp);
}
var companies = ['长安马自达', '东风日产', '海马', '上海通用', '郑州日产'];

app.controller('visualCtrl',['$scope', '$http', function($scope, $http) {
    $scope.carData = $.extend(true, [], data);
    $scope.companies =  ['长安马自达', '东风日产', '海马', '上海通用', '郑州日产'];
    //$scope.companies =  ['1', '2', '3', '4', '5'];

    $scope.companySelect = '';
    $scope.test = function() {
        console.log($scope.companySelect);
    };
}]);

