var app = angular.module('App',['appRouter','ngResource','LocalStorageModule']);
app.config(function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('app');
})
/*******************service for json**********************/

   app.factory('nukeService', function($rootScope, $http) {
    var nukeService = {};
    //Gets the list of data
    nukeService.getNukes = function() {
       return $http.get('js/data.json');
    };
    return nukeService;
});
/***********************/

app.controller('indexCtrl', ['$scope','$location','$http','localStorageService','nukeService','$window','$routeParams',
    function ($scope, $location,$http,localStorageService,$window,$routeParams,nukeService) {
        $scope.reqDetails=[];
        $scope.productList = "4";
        $scope.changed = function() {
                            	var b=$scope.productList;
                                var cat=b;
                                $location.path("/Product/"+b);
                        }
                            $scope.add = function() {
                                            $location.path("/add");
                                        }
                            $scope.home = function() {
                                          $location.path("/home");
                                          $scope.productList = "4";
                                        }
    }]);

/**********************mobile controler****************************************************/
app.controller('proCtrl',
    function ($scope, $location,$http,localStorageService,$window,info,$routeParams) {
        $scope.cat=$routeParams.type;
        $scope.proDetails=[];
        var data=JSON.parse(localStorage.getItem('reqdet'));
        console.log($scope.cat);
        if($scope.cat!="4"){
            for(i=0;i<data.length;i++){
                if(data[i].category==$scope.cat){
                    $scope.proDetails.push(data[i]);
                }
            }
        }
        else{
           for(i=0;i<data.length;i++){
            $scope.proDetails.push(data[i]);
            }
        }
        // console.log($scope.proDetails);
      $scope.more = function (dat) {
         
          $location.path("/details/"+ dat.reqid);
          info.set(dat); 
    }
});
app.service('info',function($location){
    var data={};
    this.get=function(){
       return data;  }
    this.set=function(dat){
        data=dat;
    }
})
/*********************************************details controler**********************************/
app.controller('detailsCtrl',
    function ($scope,$location,info,$http,localStorageService,$window,$routeParams,nukeService) {
        $scope.reqdet=info.get();
        var cat=$routeParams;
         var name ;

       /* if($scope.reqdet.length == undefined){
           nukeService.getNukes().then(function(data){
            $scope.allProducts = data.data;

            for(var i=0;i<$scope.allProducts.length;i++){

               if($scope.allProducts[i].reqid == cat.id){
                  $scope.reqdet = $scope.allProducts[i];

               }
            }
        });
        }*/
       // if($scope.reqdet.length == undefined){
            var data=JSON.parse(localStorage.getItem('reqdet'));
            for(var i=0;i<data.length;i++){
                if(data[i].reqid == cat.id){
                  $scope.reqdet = data[i];
                  $scope.name=data[i].name;
               }
            }
       // }
        $scope.update=function(){
                var data=JSON.parse(localStorage.getItem('reqdet'));
                $scope.uFlag=false;
                console.log('uddate');
                console.log(data.length);
                for(i in data){
                    console.log(data.length);
                    if(data[i].reqid==$scope.new.reqid){
                        data[i]=$scope.new;
                        console.log(data[i]);
                        $scope.data=data;
                        localStorage.setItem('reqdet',JSON.stringify(data));
                    }
                }
               $scope.reqdet=$scope.new;
            }
        var get=function(id){
                if( $scope.reqdet.reqid==id){
                   console.log(id);
                   data=$scope.reqdet;
                    return data;
                    console.log( $scope.reqdet);
                }
            }
        $scope.edit=function(id){
                    console.log("edit triggered");
                    $scope.idDis=true;
                    $scope.uFlag=true;
                    $scope.new=angular.copy(get(id));
        }
    });
/*******add controllerrr*****************/
 app.controller('addCtrl',['$scope','$location','$http','localStorageService','$window','nukeService',
    function($scope,$location,$http,localStorageService,$window,nukeService){
        $scope.uFlag=false;
        var count=0;
        var reqDetails=[];
        $scope.reqDetails=[];
        var a=JSON.parse($window.localStorage.getItem('reqdet'));
        console.log(a);
       $scope.update=function(){
            $scope.uFlag=false;
            for(i in reqDetails){
                if(reqDetails[i].reqid==$scope.new.reqid){
                    reqDetails[i]=$scope.new;
                    $scope.reqDetails=reqDetails;
                    console.log(reqDetails);
                   localStorage.setItem('reqdet',JSON.stringify(reqDetails));
                }
            }
            $scope.new={};
        }
        var get=function(id){
            for(i in reqDetails){
                if(reqDetails[i].reqid==id){
                    return reqDetails[i];
                }
            }
        }
        $scope.edit=function(id){
            console.log("edit triggered");
            $scope.idDis=true;
            $scope.uFlag=true;
            $scope.new=angular.copy(get(id));
            $scope.new.pos="offshore";
        }
        $scope.cancle=function(){
            $scope.new={};
        }
        $scope.save=function(){
            count++;
            if(a==null || a==''){
                a=[];
            }
            var temparr=[];
            var ed={};
            console.log(count);
            ed.reqid="P00"+count;
            ed.category=$scope.new.category;
            ed.brand=$scope.new.brand;
            ed.name=$scope.new.name;
            ed.price=$scope.new.price;a
            ed.description=$scope.new.description;
            ed.launch=$scope.new.launch;
            $scope.reqDetails.push(ed);
            temparr.push(ed);
            console.log(temparr);
            a=a.concat(temparr);
            count=$scope.reqDetails.length;
            $window.localStorage.setItem('reqdet',JSON.stringify(a));
            $scope.new={};
        }
        console.log(a);
        nukeService.getNukes().then(function(response){ // service calling
        $scope.data = response.data;
        //console.log($scope.data);
         //console.log('hi');
         
         //window.localStorage.clear();
         $scope.reqDetails=$scope.data;
         reqDetails=$scope.data;
         if(a!=null){
                    $scope.reqDetails=$scope.reqDetails.concat(a);
                   reqDetails=reqDetails.concat(a);
                }
                count=$scope.reqDetails.length;
                });
    }]);