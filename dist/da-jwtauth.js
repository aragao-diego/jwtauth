(function(){
'use strict'
var moduleName = 'da-jwtauth';

var subModules = ['controllers', 'directives', 'services', 'views'];
subModules.forEach(createSubModules);

angular
    .module(moduleName, [].concat(subModules) );

function createSubModules(element, index, array){
    var subModuleName = moduleName+'.'+element;
    angular.module(subModuleName, []);
    array[index] = subModuleName;
}


configJwtAuth.$inject = ["$ocLazyLoadProvider"];angular
    .module('da-jwtauth')
    .config(configJwtAuth);

/* @ngInject */
function configJwtAuth($ocLazyLoadProvider){
    $ocLazyLoadProvider.config({
        modules: [{
            name: 'da-jwtauth',
            serie: true,
            files: [

            ]
        }]
    });
}

(function(){
    JwtHttpInterceptor.$inject = ["$q", "JwtService"];
    angular
        .module('da-jwtauth.services')
        .factory('JwtHttpInterceptor', JwtHttpInterceptor);

    /*@ngInject*/
    function JwtHttpInterceptor($q, JwtService) {
        var interceptor = {
            // optional method
            'request': requestInterceptor,
            'requestError': requestErrorInterceptor,
            'response': responseInterceptor,
            'responseError': reponseErrorInterceptor
        };
        return interceptor;

        ///////////////
        function requestInterceptor(config){
            if((notSendAuth(config) || notSendAuth(config.headers)) && JwtService.isValidToken()){
                return config;
            }
            config.headers[JwtService.authHeader] = JwtService.getTokenHeader();

            return config;
        }

        function requestErrorInterceptor(rejection){
            return rejection;
        }

        function responseInterceptor(response){
            return response;
        }

        function reponseErrorInterceptor(rejection){
            return $q.reject(rejection);
        }

        function notSendAuth(data){
            var skipProperty = JwtService.skipAuthorization;
            if(data && data.hasOwnProperty(skipProperty) && data[skipProperty] === true ){
                return true;
            }
            return false;
        }
    }
})();

(function(){
    JwtService.$inject = ["$localStorage"];
    angular
        .module('da-jwtauth.services')
        .service('JwtService', JwtService );

    /* @ngInject */
    function JwtService($localStorage){
        var service = this;

        service.authHeader = 'Authorization';
        service.authHeaderPrefix = 'Token ';
        service.authHeaderSulfix = '';
        service.skipAuthorization = 'skipAuthorization';
        service.getSkipAuthorizationHeaderConfig = getSkipAuthorizationHeaderConfig;
        service.getTokenHeader = getTokenHeader;
        service.getToken = getToken;
        service.saveToken = saveToken;
        service.deleteToken = deleteToken;
        service.encodePassword = encodePassword;
        service.getTokenHeader = getTokenHeader;
        service.isValidToken = isValidToken;

        /////////
        function encodePassword(user, password){
            return '';
        }
        function getToken(){
            return $localStorage.token;
        }
        function saveToken(token){
            $localStorage.token = token;
        }
        function deleteToken(){
            $localStorage.token = '';
        }
        function getSkipAuthorizationHeaderConfig(){
            var property = {};
            property[service.skipAuthorization] = true;
            return property;
        }
        function getTokenHeader(){
            return service.authHeaderPrefix+service.getToken()+service.authHeaderSulfix;
        }
        function isValidToken(){
            return $localStorage.token !== '';
        }
    }
})();

})();