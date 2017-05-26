var app = angular.module('MyApp', ['ui.router', 'StalkerCtrls']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {
            $urlRouterProvider.otherwise('/404');

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: '/app/views/home.html'
                })
                .state('portfolio', {
                    url: '/portfolio',
                    templateUrl: 'app/views/portfolio.html',
                    controller: 'PortfolioCtrl'
                })
                .state('editProfile', {
                    url: '/portfolio/edit',
                    templateUrl: 'app/views/editProfile.html',
                    controller: 'EditCtrl'
                })
                .state('profile', {
                    url: '/stalkers/:id',
                    templateUrl: 'app/views/profile.html',
                    controller: 'ShowCtrl'
                })
                .state('signup', {
                    url: '/signup',
                    templateUrl: 'app/views/userSignup.html',
                    controller: 'SignupCtrl'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'app/views/userLogin.html',
                    controller: 'LoginCtrl'
                })
                .state('404', {
                    url: '/404',
                    templateUrl: 'app/views/404.html'
                });

            $locationProvider.html5Mode(true);
        }
    ])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    }]);
