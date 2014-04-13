var app=angular.module("myApp",['ngRoute','firebase','ui.bootstrap']);
app.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl:'/views/dashboard.html'
        })
        .when('/create',{
            controller: 'CreateController',
            templateUrl: '/views/create.html'
        })
        .when('/list',{
            controller: 'ListController',
            templateUrl:'/views/list.html'
        })
        .when('/login',{
            controller: 'LoginController',
            templateUrl:'/views/login.html'
        })
        .when('/update/:key',{
            controller: 'UpdateController',
            templateUrl:'/views/update.html'
        })
        .when('/select',{
            controller:'SelectController',
            templateUrl:'/views/select.html'
        })

        .otherwise({redirectTo: '/'});
}]);
app.controller('HomeController',function($scope,$location){
});










//below is legacy code and don't pay any attention to them
app.controller('MyController',function($scope,$http,$parse,$interpolate){
    $scope.counter=0;
    $scope.name="World";
    $http.get('http://localhost:3000/db/collection/').success(function(users) {
        $scope.name=users[0];
    }).error(function() {
        console.log("error");
    });
    $scope.add=function(amount){$scope.counter+=amount;};
    $scope.subtract=function(amount){$scope.counter-=amount;};

    $scope.$watch('expr',function(newVal,oldVal,scope){
        if(newVal!==oldVal){
            var parseFun=$parse(newVal);
            $scope.parsedValue=parseFun(scope);
        }
    });
    $scope.to="dinziranrr@163.com";
    $scope.$watch('emailBody',function(body){
        if(body){
            var template = $interpolate(body);
            $scope.previewText=template({to: $scope.to});
        }
    });
});
app.directive('myDirective',function(){
    return {
        scope:{
            myUrl: '@',
            myLinkText: '@'
        },
        restrict: 'A',
        replace:true,
        template: '<a href="{{myUrl}}">'+'{{myLinkText}}</a>'
    }
});
