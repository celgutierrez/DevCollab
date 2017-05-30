angular.module('StalkerCtrls', ['StalkerServices'])
    .controller('PortfolioCtrl', ['$scope', 'Stalker', function($scope, Stalker) {
$scope.stalkers = [];

  Stalker.query(function success(data) {
    $scope.stalkers = data;
  }, function error(data) {
    console.log(data);
  });

  $scope.deleteStalker = function(id, stalkersIdx) {
    Stalker.delete({ id: id }, function success(data) {
      console.log('oh we good i gotchu', data)
      $scope.stalkers.splice(stalkersIdx, 1);
    }, function error(data) {
      console.log('dont you fucking dare./..', data);
    });
  };
}])


.controller('ShowCtrl', ['$scope', '$stateParams', 'Stalker', 'Auth', function($scope, $stateParams, Stalker, Auth) {

  $scope.stalker = {};
  // console.log('id is', $stateParams.id);

  Stalker.get({ id: $stateParams.id }, function success(data) {
    console.log('data is', data);
    $scope.stalker = data;
  }, function error(data) {
    console.log(data);
  });
}])


.controller('EditCtrl', ['$scope', '$location', 'Stalker' ,function($scope, $location, Stalker) {
  $scope.stalker = {
    name: '',
    title: '',
    description: '',
    image: '',
    portfolioUrl: '',
    avatar: ''
  };

  $scope.editStalker = function() {
    Stalker.save($scope.stalker, function success(data) {
      $location.path('/portfolio');
    }, function error(data) {
        console.log(data);
    });
}
}])



.controller('NavCtrl', ['$scope', 'Auth','$location', 'Stalker', function($scope, Auth, $location, Stalker) {
  $scope.profile = function() {
    return Auth.currentUser().id;
    console.log('this is what you need' ,Auth.currentUser())
}

  $scope.isLoggedIn  = function() {
    return Auth.isLoggedIn();
  }

  $scope.logout = function() {
    Auth.removeToken();
    $location.path('/')
  };
}])


.controller('AboutCtrl', ['$scope', 'Auth','$location', 'Stalker', function($scope, Auth, $location, Stalker) {
  $scope.profile = function() {
    return Auth.currentUser().id;
    console.log('this is what you need' ,Auth.currentUser())
}

  $scope.isLoggedIn  = function() {
    return Auth.isLoggedIn();
  }

  $scope.logout = function() {
    Auth.removeToken();
    $location.path('/About')
  };
}])






.controller('EditCtrl', ['$scope', '$location', 'Stalker', function($scope, $location, Stalker) {
        $scope.stalker = {
            name: '',
            title: '',
            description: '',
            image: '',
            portfolioUrl: '',
            avatar: ''
        };

        $scope.editStalker = function() {
            Stalker.save($scope.stalker, function success(data) {
                console.log('am i editing this page or what??', data)
                $location.path('/portfolio');
            }, function error(data) {
                console.log(data);
            });
        };
    }])
    .controller('NavCtrl', ['$scope', 'Auth', '$location', 'Stalker', function($scope, Auth, $location, Stalker) {
        $scope.profile = function() {
            return Auth.currentUser().id;

        }

        $scope.isLoggedIn = function() {
            return Auth.isLoggedIn();
        }

        $scope.logout = function() {
            Auth.removeToken();
            $location.path('/')
        };

    }])
    .controller('SignupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
        $scope.user = {
            email: '',
            password: '',
            name: '',
            avatar: '',
            portfolioUrl: '',
            description: '',
            title: ''
        };
        $scope.userSignup = function() {
            $http.post('/api/users', $scope.user).then(function success(res) {
                console.log('successfully created a new user', res);
                $location.path('/login'); //relocate to the home page
            }, function error(res) {
                console.log('Error while signing up', res);
            });
        };
    }])
    .controller('LoginCtrl', ['$scope', '$timeout', 'Auth', '$http', '$location', 'Alerts', function($scope, $timeout, Auth, $http, $location, Alerts) {
        $scope.user = {
            email: '',
            password: ''
        };
        var clearAlerts = function() {
            Alerts.clear();
        }

        $scope.userLogin = function() {
            $http.post('/api/auth', $scope.user).then(function success(res) {
                console.log('response from server when loggin in:', res);
                Auth.saveToken(res.data.token);
                Alerts.add('success', 'You are now logged in, congrats.');
                $timeout(clearAlerts, 1500);
                $location.path('/portfolio'); //redirect to home
            }, function error(res) {
                console.log('Something went wrong', res);
                Alerts.add('error', 'Bad Login Info, Please Try Again!!');
                $timeout(clearAlerts, 1500);
            });
        };
    }])
    .controller('AlertsController', ['$scope', 'Alerts', function($scope, Alerts) {
        $scope.alerts = function() {
            return Alerts.get();
        }
    }]);
