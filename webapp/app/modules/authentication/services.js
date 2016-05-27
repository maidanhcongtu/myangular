(function(){
	"use strict";
	angular.module("Authentication",[])
		.factory("AuthenticationService",["$http","$cookieStore","$rootScope","$timeout",function($http, $cookieStore, $rootScope, $timeout){
			var service = {};
			
			/* dummy login service */
			service.login = function(username, password, userResource, callback){

				$timeout(function(){
					
					userResource.find({username:username,password:password}, function(data){
						var response = {};
						if(data.length == 0) {
							response.message = "Username or password incorrect";
						} else {
							response.success = true;
						}
						callback(response);
					});
					
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