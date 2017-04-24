angular.module('appRouter',['ui.router']).config([
    '$stateProvider','$urlRouterProvider',
    function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state('/home',{
                url:'/home',
                templateUrl:'homeData.html'
                //controller:'homeCtrl'
            })


            .state('/mobile',{
               url:'/mobile',
               templateUrl:'mobileData.html',
               controller:'mobileCtrl'
               
               
            })

            .state('/details',{
               url:'/details',
               templateUrl:'detailsData.html',
               controller:'detailsCtrl' // $routeParams.type
               
            })
             .state('/add',{
               url:'/add',
               templateUrl:'add.html',
               controller:'addCtrl' // $routeParams.type
               
            })
    /*        .state('/add',{
               url:'/add',
               templateUrl:'add.html',
               /* controller: 'form_controller'
               
               
            })*/
 $urlRouterProvider.otherwise("/home");
    }
])