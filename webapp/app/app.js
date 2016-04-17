(function(){
	'use strict';
	angular.module("MyApp",[
		"ngRoute",
		"AppCtrls"
	])
	.config(["$routeProvider",function($routeProvider){
		$routeProvider
			.when("/",{
				templateUrl:"app/partials/login.html",
				controller:"LoginCtrl"
			})
	}])
	;
})()