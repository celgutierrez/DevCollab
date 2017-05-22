angular.module('ControllerName', ['services'])
    .controller('SignupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
        $scope.user = {
            email: '',
            password: ''
        };
        $scope.userSignup = function() {
            $http.post('/api/users', $scope.user).then(function success(res) {
                $location.path('/');
            }, function error(res) {
                console.log(data);
            });
        }
    }])
    .controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
        $scope.user = {
            email: '',
            password: ''
        };
        $scope.userLogin = function() {
            $http.post('/api/auth', $scope.user).then(function success(res) {
                Auth.saveToken(res.data.token);
                console.log('Token:', res.data.token)
                $location.path('/');
            }, function error(res) {
                console.log(data);
            });
        }
    }])
    .controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth) {
        $scope.Auth = Auth;
        $scope.logout = function() {
            Auth.removeToken();
            console.log('token here:', Auth.getToken());
        }
    }])
    /////navctrl is called in .html file -- used for logout as indicated in actual function
