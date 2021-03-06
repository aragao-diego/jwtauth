(function(){
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
            if((notSendAuth(config) || notSendAuth(config.headers)) || !JwtService.isValidToken()){
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
