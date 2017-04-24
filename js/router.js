angular.module('appRouter',['ngRoute']).config([
    '$routeProvider',
    function($routeProvider){
        $routeProvider
            .when('/home',{
                templateUrl:'homeData.html'
                //controller:'homeCtrl'
            })


            .when('/Product/:type',{
              
               templateUrl:'product.html',
               controller:'proCtrl'
               
               
            })

            .when('/details/:id',{
              
               templateUrl:'detailsData.html',
               controller:'detailsCtrl' // $routeParams.type
               
            })
             .when('/add',{
               
               templateUrl:'add.html',
               controller:'addCtrl' // $routeParams.type
               
            })
    /*        .state('/add',{
               url:'/add',
               templateUrl:'add.html',
               /* controller: 'form_controller'
               
               
            })*/
 .otherwise({
        redirectTo: '/home'
      });
    }
]);