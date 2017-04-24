app.service('getProdDetails',function($http,$q){
 
     var reqDetails=[];
     this.getProdData = function(){
     	var deferred = $q.defer();
     	$http.get('js/requestfile.json').success(function(data){
              deferred.resolve(data);
              return deferred.promise;      
         });
     }
                                        
});
