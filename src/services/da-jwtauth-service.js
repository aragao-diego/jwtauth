(function(){
    angular
        .module('da-jwtauth.services')
        .service('JwtService', JwtService );

    /* @ngInject */
    function JwtService($localStorage, $sessionStorage){
        var service = this;

        service.authHeader = 'Authorization';
        service.authHeaderPrefix = 'Token ';
        service.authHeaderSulfix = '';
        service.skipAuthorization = 'skipAuthorization';
        service.storage = $localStorage;

        service.getSkipAuthorizationHeaderConfig = getSkipAuthorizationHeaderConfig;
        service.getTokenHeader = getTokenHeader;
        service.getToken = getToken;
        service.saveToken = saveToken;
        service.deleteToken = deleteToken;
        service.encodePassword = encodePassword;
        service.getTokenHeader = getTokenHeader;
        service.isValidToken = isValidToken;
        service.setStorage = setStorage;

        /////////
        function encodePassword(user, password){
            return '';
        }
        function getToken(){
            return service.storage.token;
        }
        function saveToken(token){
            service.storage.token = token;
        }
        function deleteToken(){
            service.storage.token = '';
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
            return service.storage && service.storage.token && service.storage.token !== '';
        }
        function setStorage($storage){
            service.storage = $storage;
        }
    }
})();