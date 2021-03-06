(function(){
	"use strict";
	angular.module("AppCtrls",["Authentication"])
		.controller("AppCtrl",["$scope","$translate",function($scope, $translate){
			$scope.changeLanguage = function(key) {
				$translate.use(key);
			}
		}])
		.controller("LogoutCtrl",["$location","AuthenticationService",function($location, AuthenticationService){
			AuthenticationService.ClearCredentials();
			$location.path("/login");
		}])
		.controller("LoginCtrl",["$scope","$location", "AuthenticationService",function($scope, $location, AuthenticationService){
			
			var userResource = new UserResource();
			
			//clear credentials
			AuthenticationService.ClearCredentials();
			
			//object for login page
			$scope.login = {};
			
			//create admin account
			$scope.login.addAdminAcc = function() {
				var adminUser = new User();
				adminUser.id = 1;
				adminUser.username = "admin";
				adminUser.password = "admin";
				
				userResource.save(adminUser, function(err){
					console.log(err);
				});
			}
			
			//print data test
			$scope.login.printDataTest = function() {
				userResource.findAll(function(data){
					console.log(data);
				});
			}
			
			$scope.login.destroyData = function() {
				userResource.deleteAll(function(err){
					console.log(err);
				});
			}
			
			$scope.login.submit = function() {
			/*userResource.find({username:$scope.login.username,password:$scope.login.password}, function(data){
				console.log(data);
			});*/
				
				AuthenticationService.login($scope.login.username, $scope.login.password, userResource, function(response){
					if(response.success) {
						AuthenticationService.SetCredentials($scope.login.username, $scope.login.password);
						//redirect to main page
						$location.path("/");
					} else {
						//show error message
						$scope.login.msgLoginFail = response.message;
					}
				});
				
				/* login normal by normal */
				/* if($scope.login.username == "admin" && $scope.login.password == "admin") {
					//redirect to main page
					$location.path("/");
				} else {
					//show error message
					$scope.login.msgLoginFail = "Your username or password incorrect";
				} */
			}
		}])
		.controller("UserCtrl",["$scope",function($scope){
		
			//define namespace
			$scope.user = {};
			
			//list user
			$scope.user.users = [];
			
			//default state
			modeDefault();
			
			//save user
			$scope.user.saveUser = function() {
				console.log("--- save user ----");
				console.dir($scope.user.userModel);
				$scope.user.users.push($scope.user.userModel);
				modeDefault();
			}
			
			function modeDefault() {
				$scope.user.addMode = false;
				$scope.user.editMode = false;
				//define usermodel use for add/edit
				$scope.user.userModel = {};
			}
			
			$scope.$watch("user.addMode", function(oldVal, newVal){
				console.log("cahnge  " + oldVal + " new " + newVal);
			});
			
		}])
})()