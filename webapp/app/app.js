(function(){
	'use strict';
	angular.module("MyApp",[
		"ngRoute",
		"ngCookies",
		"pascalprecht.translate",
		"AppCtrls"
	])
	.config(["$routeProvider",function($routeProvider){
		$routeProvider
			.when("/login",{
				templateUrl : "app/partials/login/login.html",
				controller : "LoginCtrl"
			})
			.when("/logout",{
				templateUrl: "",
				controller : "LogoutCtrl"
			})
			.when("/",{
				templateUrl : "app/partials/home/home.html",
			})
			.otherwise({redirectTo: "/login"});
	}])
	.config(["$translateProvider",function($translateProvider){
		
		/*
		$translateProvider.translations("VI",{
			"login.username":"Tên Đăng Nhập",
			"login.password":"Mật Khẩu",
			"login.login":"Đăng Nhập"
		});
		
		$translateProvider.translations("EN",{
			"login.username":"Username",
			"login.password":"Password",
			"login.login":"Login"
		});
		*/
		
		
		$translateProvider.useStaticFilesLoader({
			prefix:"app/languages/",
			suffix:".json"
		})
		
		$translateProvider.preferredLanguage("VI");
			
		$translateProvider.useLocalStorage();
		
	}])
	.run(["$rootScope","$http","$cookieStore","$location",function($rootScope, $http, $cookieStore, $location){
		
		//keep user logined after refresh page
		$rootScope.globals = $cookieStore.get("globals") || {};
		if($rootScope.globals.currentUser) {
			$http.defaults.headers.common["Authorization"] = "Basic " + $rootScope.globals.currentUser.authdata;
		}
		
		//catch location change
		$rootScope.$on("$locationChangeStart",function(event, next, current){
			//check login here
			if(!$location.path() !== "/login" && !$rootScope.globals.currentUser) {
				$location.path("/login");
			}
		});
	}]);
})()