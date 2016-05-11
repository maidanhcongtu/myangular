(function(){
	"use strict";
	angular.module("Authentication",[])
		.factory("AuthenticationService",["$http","$cookieStore","$rootScope","$timeout",function($http, $cookieStore, $rootScope, $timeout){
			var service = {};
			
			//UserResource
			var userResource = new UserResource();
			
			/* dummy login service */
			service.login = function(username, password, callback){
				$timeout(function(){
					
					var userObj = userResource.find({username:username,password:password});
					var response = {};
					if(userObj === undefined) {
						response.message = "Username or password incorrect";
					} else {
						response.success = true;
					}
					callback(response);
				},1000);
			}
			
			/* Use this for real authentication */
            //$http.post('/api/authenticate', { username: username, password: password })
            //    .success(function (response) {
            //        callback(response);
            //    });
			
			service.SetCredentials = function(username, password) {
				
				var authData = btoa(username + ":" + password);
				$rootScope.globals = {
					currentUser: {
						username : username,
						authdata: authData
					}
				}
				
				$http.defaults.headers.common["Authorization"] = "Basic " + authData;
				$cookieStore.put("globals", $rootScope.globals);
				
			}
			
			service.ClearCredentials = function() {
				$rootScope.globals = {};
				$cookieStore.remove("globals");
				$http.defaults.headers.common["Authorization"] = "Basic ";
			}
			
			return service;
		}]);
})();