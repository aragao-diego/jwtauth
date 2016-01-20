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
        service.encodePassword = encodePassword;
        service.getToken = getToken;
        service.saveToken = saveToken;
        service.deleteToken = deleteToken;

        /////////
        function encodePassword(user, password){
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
    }
})();
