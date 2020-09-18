'use strict';

var App = angular.module('dataManagerMongo',['ui.router']);

App.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
				$urlRouterProvider.otherwise("/newItem")
				
				$stateProvider
						.state('newItem', {
							url: "/newItem",
							templateUrl: "newItem.html"
						})
						.state('newItem.insertForm', {
							url: "/insertForm",
							templateUrl: "insertForm.html",
							controller: function($scope){
								$scope.services = ["Selling", "Support", "Delivery", "Reparation"];
							}
						})
						.state('listItems', {
							url: "/listItems",
							views: {
								"" 	:    { templateUrl: "listItems.html" },
								"itesmView@listItems": { templateUrl: "itemsTable.html" ,
									controller: function($scope){
											$scope.clients = [{Nombre: "Julio", Apellido: "Juarez"},{Nombre: "Julio", Apellido: "Juarez"}];
									}
								}
							}
						})
			}]);
App.controller('myController', ['$scope','$http', function ($scope,$http) {

    $scope.fA = function(){
        console.log($scope.myVar);
        
    }
    $scope.init = function (json) {
        console.log("sdsadas");
        $http({method: 'POST', url: 'http://localhost/auth', data: {
            "userName":"asfo",
            "passWord":"holamundo"
        }}).then(function (response) {
                $http({method: 'POST', url: 'http://localhost/allData',headers: {
                    'access-token': response.data.token
                }, data: {
                    "allData":"1",
                    "Nombre":"Julio Cesar Juarez Martinez",
                    "Pasatiempo":"Futbol"
                }}).then(function (response) {

                    $scope.employees = response.data;
                    $scope.empArray = Object.keys($scope.employees)
                    .map(function (value, index) {
                        return { values: $scope.employees[value] }
                        }
                    );
                    }, function (response) {
                    $scope.data = response.data || 'Request failed';
                    $scope.status = response.status;
                });
            }, function (response) {
            $scope.data = response.data || 'Request failed';
            $scope.status = response.status;
        });
    };
    } ]);