'use strict';

/* Controllers */
var appServices = angular.module('app', ['ngRoute','ngResource']);
appServices.constant("configuracion",{"url":"http://localhost:8000"});
//appServices.constant("configuracion",{"url":"http://www.epsilondx.com/django/index.fcgi"});

// Set up our mappings between URLs, templates, and controllers
function appRouteConfig($routeProvider) {
$routeProvider.
when('/dodo', {
controller: ListController,
templateUrl: 'list.html'
}).
when('/acerca', {
controller: AcercaController,
templateUrl: 'acerca.html'
}).
when('/', {
controller: UsuarioRedController,
templateUrl: 'usuario_red.html'
}). 
// Notice that for the detail view, we specify a parameterized URL component
// by placing a colon in front of the id
when('/view/:id', {
controller: DetailController,
templateUrl: 'detail.html'
}).
otherwise({
redirectTo: '/'
});
}
appServices.factory('RedFactory', ['$resource', 'configuracion',function($resource,configuracion) {
return $resource(configuracion.url+'/redes/:id');
}]);
appServices.factory('UsuarioFactory', ['$resource', 'configuracion',function($resource,configuracion) {
return $resource(configuracion.url+'/usuarios/:id');
}]);
appServices.factory('UsuarioRedFactory', ['$resource', 'configuracion',function($resource,configuracion) {
return $resource(configuracion.url+'/usuarios/:idusuario/redes');
}]);

appServices.factory('Categoria', ['$resource', 'configuracion',function($resource,configuracion) {
return $resource(configuracion.url+'/usuarios/:id');
}]);

appServices.config(['$routeProvider', appRouteConfig]);


function ListController($scope,$http,UsuarioRedFactory) {
    var datos = UsuarioRedFactory.query({idusuario:1},function() {
    console.log(datos);
    });
}
function UsuarioRedController($scope,$http,UsuarioRedFactory,RedFactory) {
    var originales;
    $scope.nuevared={"url":"","usuario":"","red_social":""};
    $scope.bAgregar=false;
    $scope.getRedById=function(id)
    {
        var longitud=0;
        if($scope.redes)
        {
            longitud=$scope.redes.length;
        }
    
        var i;
        for(i=0;i<longitud;i++)
        {
            if($scope.redes[i].id==id)
                return $scope.redes[i];
        }    
        return -1;
    }

    $scope.editar=function(index)
    {
    $scope.bGuardar[index]=true;

    
     
    }
    $scope.cancelar=function(index)
    {
    // console.log(originales);    
    $scope.bEditar[index]=true;
    $scope.bGuardar[index]=false;
    console.log(originales[index]);
    console.log($scope.usuarioredes[index]);
    $scope.usuarioredes[index]=originales[index];    
    }
    $scope.borrar=function(index)
    {
        $scope.bGuardar.splice(index,1);
        $scope.bEditar.splice(index,1);
        $scope.usuarioredes.splice(index,1);
     
    }
    
    $scope.guardar=function(index)
    {
      $scope.bEditar[index]=true;
      $scope.bGuardar[index]=false;
      
    }
    $scope.crear=function()
    {
      $scope.bAgregar=false;
      $scope.bEditar.push(false);
      $scope.bGuardar.push(false);
      $scope.usuarioredes.push($scope.nuevared);
      $scope.nuevared={"url":"","usuario":"","red_social":""};
    
    }
   
    UsuarioRedFactory.query({idusuario:1},function(usuarioredes) {
        $scope.bEditar=new Array(usuarioredes.length);
        $scope.bGuardar=new Array(usuarioredes.length);
        $scope.usuarioredes = usuarioredes;
        originales=usuarioredes;
        
    });
    
    RedFactory.query(function(redes) {
        $scope.redes = redes;
        console.log(redes);
    });
        
}

// Get the message id from the route (parsed from the URL) and use it to
// find the right message object.
function DetailController($scope, $routeParams) {

}
function AcercaController($scope) {

}
