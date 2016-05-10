'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatAnimations',

  'phonecatControllers',
  'phonecatFilters',
  'phonecatServices',
   'xeditable',
   'ngFileUpload'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/user/all', {
        templateUrl: 'partials/user.html',
        controller: 'UserCtrl'
      }).
      when('/edituser', {
        templateUrl: 'partials/EditUser.html',
        controller: 'EditUserCtrl'
      }).
      when('/currentvideo', {
        templateUrl: 'partials/CurrentVideo.html',
        controller: 'CurrentVideoCtrl'
      }).
      when('/video/all', {
        templateUrl: 'partials/video.html',
        controller: 'VideoCtrl'
      }).
      when('/uploaduser', {
        templateUrl: 'partials/UserUpload.html',
        controller: 'UploadUserCtrl'
      }).
      when('/uploadvideo', {
        templateUrl: 'partials/VideoUpload.html',
        controller: 'UploadVideoCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);
