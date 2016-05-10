'use strict';

/* Controllers */

var phonecatControllers = angular.module('phonecatControllers', []);

phonecatControllers.controller('PhoneListCtrl', ['$scope', 'Phone',
  function($scope, Phone) {
    $scope.phones = Phone.query();
    $scope.orderProp = 'age';
  }]);

phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    };
  }]);

phonecatControllers.controller('UserCtrl', function ($scope, $http) {
  $http.get('/user/all').success(function(data) {
    $scope.users = data;
  });
});

phonecatControllers.controller('VideoCtrl', function ($scope, $http) {
  $http.get('/video/all').success(function(data) {
    $scope.videos = data;
    $scope.milliToDate= function(date){
    var dateV = new Date(date);
    return  dateV.toString("dd/MMM/yyyy hh:mm:ss");
  };

  });
});

phonecatControllers.controller('CurrentVideoCtrl', function ($scope, $http) {
  $http.get('/current/video').success(function(data) {
    $scope.cvideos = data;
    $scope.milliToDate= function(date){
    var dateV = new Date(date);
    return  dateV.toString("dd/MMM/yyyy hh:mm:ss");
  };

  });
});


  phonecatControllers.controller('UploadUserCtrl', [ '$scope', 'Upload', function($scope, Upload) {
  $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var $file = $files[i];
      Upload.upload({
        url: '/user/upload',
        file: $file,
        progress: function(e){}
      }).then(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
      }); 
    }
  }
}]


    );


  phonecatControllers.controller('UploadVideoCtrl', [ '$scope', 'Upload', function($scope, Upload) {
  $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var $file = $files[i];
      Upload.upload({
        url: '/video/upload',
        file: $file,
        progress: function(e){}
      }).then(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
      }); 
    }
  }
}]


    );



phonecatControllers.controller('EditUserCtrl', function($scope, $filter, $http) {
   $http.get('/user/all').success(function(data) {
    $scope.users = data;
  });

   $scope.statuses = [
    {value: "true", text: "true"},
    {value: "false", text: "false"}
  ]; 

  $scope.showStatus = function(user) {
    
    

     var selected = [];
    if(user.isverified) {
      selected = $filter('filter')($scope.statuses, {value: user.isverified});
      console.log(selected.length)
    }
    return selected.length ? selected[0].text : 'Not set';
  };

$scope.checkName = function(data, id) {
    if (id === 2 && data !== 'awesome') {
      return "Username 2 should be `awesome`";
    }
  };

  $scope.saveUser = function(data, id) {
    console.log(typeof id);
    
    if( id==null){
       console.log("Hi-->"+id);
    // Assign value to the property here
    return $http.post('/user', data);
  }else{
    //$scope.user not updated yet
    angular.extend(data, {username: id});
    return $http.put('/user', data);
  }
  };

  // remove user
  $scope.removeUser = function(index) {
    $scope.users.splice(index, 1);
    $http.delete('/user?user_id='+index);
   
  };

  // add user
  $scope.addUser = function() {
    $scope.inserted = {
      id: $scope.users.length+1,
      
               username:'',
               password:'',
               securityquestion:'',
               securityanswer:'',
             recoveryemail:'',
               recoveryphone:0,
              isverified:false,
               comment:'',
               proxy:'',
               proxyuser:'',
              proxypassword:'',
              lastCommentTime:0
    };
    $scope.users.push($scope.inserted);
  };
});












