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
			.when("/users",{
				templateUrl : "app/partials/user/users.html",
				controller : "UserCtrl"
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
	.run(["$rootScope","$http","$cookieStore","$location","$window",function($rootScope, $http, $cookieStore, $location, $window){
		
		var windowElement = angular.element($window);
		console.log(windowElement);
		windowElement.on('beforeunload', function (event) {
			// do whatever you want in here before the page unloads.        
			alert(22);
			// the following line of code will prevent reload or navigating away.
			event.preventDefault();
		});
		
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