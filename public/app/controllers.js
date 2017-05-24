angular.module('MyCtrls', ['MyServices'])
    .controller('HomeCtrl', ['$scope', function($scope) {

    }])
    .controller('NavCtrl', ['$scope', 'Auth', '$location', function($scope, Auth, $location) {
        $scope.isLoggedIn = function() {
            return Auth.isLoggedIn();
        }

        $scope.logout = function() {
            Auth.removeToken();
            $location.path('/');
        };
    }])
    .controller('SignupCtrl', ['$scope', '$http', '$location', '$stateParams', function($scope, $http, $location, $stateParams) {
        $scope.user = {
            name: '',
            email: '',
            password: '',
            portfolio: '',
            avatar: '',
            description: ''
        };
        $scope.userSignup = function() {
            $http.post('/api/users', $scope.user).then(function success(res) {
                console.log('successfully created a new user', res);
                $location.path('/profile/:id'); //relocate to the profile page
            }, function error(res) {
                console.log('Error while signing up', res);
            });
        };
    }])
    .controller('LoginCtrl', ['$scope', '$timeout', 'Auth', '$http', '$location', 'Alerts', function($scope, $timeout, Auth, $http, $location, Alerts) {
        $scope.user = {
            name: '',
            email: '',
            password: '',
            portfolio: '',
            avatar: '',
            description: ''
        };
        var clearAlerts = function() {
            Alerts.clear();
        }

        $scope.userLogin = function() {
            $http.post('/api/auth', $scope.user).then(function success(res) {
                console.log('response from server when loggin in:', res.config.data);
                Auth.saveToken(res.data.token);
                Alerts.add('success', 'You are now logged in, congrats.');
                $timeout(clearAlerts, 1500);
                $location.path('/profile/:id'); //redirect to home
            }, function error(res) {
                console.log('Something went wrong', res);
                Alerts.add('error', 'Bad Login Info, Please Try Again!!');
                $timeout(clearAlerts, 1500);
            });
        };
    }])



    .controller('ProfileCtrl', ['$scope', '$http', function($scope, $http) {
        console.log('in the users controller');
        $http({
          method: 'GET',
          url: '/user'
        }).then(function(res, data){
          $scope.user = res.config.data;
          console.log('boom, get her to sow that', res.config.data);
        });
    }])


    .controller('AlertsController', ['$scope', 'Alerts', function($scope, Alerts) {
        $scope.alerts = function() {
            return Alerts.get();
        }
    }])
