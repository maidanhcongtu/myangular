(function(){
	'use strict';
	angular.module("MyApp",[])
		.controller("LoginCtrl",["$scope",function($scope){
			//object for login page
			$scope.login = {};
			$scope.login.submit = function() {
				if($scope.login.username == "admin" && $scope.login.password == "admin") {
					//redirect to main page
				} else {
					//show error message
					$scope.login.msgLoginFail = "Your username or password incorrect";
				}
			}
		}]);
})();