/**
 * Created by Administrator on 14-3-17.
 */
var app=angular.module("myApp");
app.controller('ListController',function($scope,$firebase,$location){
    var usersRef = new Firebase("https://luminous-fire-4025.firebaseio.com/user");
    $scope.users = $firebase(usersRef);
    $scope.remove = function(key){
          $scope.users.$remove(key);
    }
    $scope.update = function(key){
          $location.path("update/"+key);
    }
});
app.controller('CreateController',function($scope,$firebase){
    var usersRef = new Firebase("https://luminous-fire-4025.firebaseio.com/user");
    $scope.users = $firebase(usersRef);
    $scope.user={};
    $scope.create = function() {
        // AngularFire $add method
        $scope.users.$add($scope.user);
        $scope.user = {};
        $scope.message="create success!";
    };
});

app.controller('LoginController',function($scope,$firebaseSimpleLogin){
    var dataRef = new Firebase("https://luminous-fire-4025.firebaseio.com");
    $scope.loginObj = $firebaseSimpleLogin(dataRef);
    $scope.login={};
    $scope.createUser=function(){
        $scope.loginObj.$createUser($scope.create.email,$scope.create.password).then(function(){
            $scope.create={};
        },function(error){
            console.error('Create failed:',error);
        })
    }
    $scope.submitForm = function(){
        $scope.loginObj.$login('password', {
            email: $scope.login.email,
            password: $scope.login.password
        }).then(function(user) {
                $scope.login={};
            }, function(error) {
                console.error('Login failed: ', error);
            });
    };
});
app.controller('UpdateController',function($scope,$routeParams,$firebase,$location){
    //console.log($routeParams.key);
    var usersRef = new Firebase("https://luminous-fire-4025.firebaseio.com/user/"+$routeParams.key);
    $scope.user = $firebase(usersRef);
    //console.log($scope.user);
    $scope.update = function(){
        $scope.user.$save();
        $location.path("list");
    }
});

app.controller('SelectController',function($scope){
    $scope.items = [
        "The first choice!",
        "And another choice for you.",
        "but wait! A third!"
    ];
});