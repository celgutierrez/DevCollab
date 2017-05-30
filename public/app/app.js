var app = angular.module('MyApp', ['ui.router', 'StalkerCtrls', 'ui.materialize', 'ngMaterial']);

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
                .state('about', {
                    url: '/About',
                    templateUrl: 'app/views/About.html',
                    controller: 'AboutCtrl'
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
    }])
    .config(function($mdThemingProvider) {
        $mdThemingProvider.definePalette('black', {
            '50': '000000',
            '100': '000000',
            '200': '000000',
            '300': '000000',
            '400': '000000',
            '500': '000000',
            '600': '000000',
            '700': '000000',
            '800': '000000',
            '900': '000000',
            'A100': '000000',
            'A200': '000000',
            'A400': '000000',
            'A700': '000000',
            'contrastDefaultColor': 'light'
        });
        $mdThemingProvider.definePalette('white', {
            '50': 'ffffff',
            '100': 'ffffff',
            '200': 'ffffff',
            '300': 'ffffff',
            '400': 'ffffff',
            '500': 'ffffff',
            '600': 'ffffff',
            '700': 'ffffff',
            '800': 'ffffff',
            '900': 'ffffff',
            'A100': 'ffffff',
            'A200': 'ffffff',
            'A400': 'ffffff',
            'A700': 'ffffff',
            'contrastDefaultColor': 'dark'
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('black')
            .accentPalette('white');
    });
