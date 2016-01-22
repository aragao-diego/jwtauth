(function(){
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
    }
})();
