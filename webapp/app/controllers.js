(function(){
	"use strict";
	angular.module("AppCtrls",[])
		.controller("AppCtrl",["$scope",function($scope){
			console.log("appC");
		}])
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
		}])
})()