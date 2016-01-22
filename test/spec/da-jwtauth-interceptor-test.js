describe('Testes do JwtHttpInterceptor', function(){
    'use strict';

    var JwtService;
    var JwtHttpInterceptor;
    var $localStorage;
    var httpProvider;
    var $httpBackend;
    var $http;

    beforeEach(function(){
        module('ngStorage');
        module('da-jwtauth.services', function($httpProvider){
            httpProvider = $httpProvider;
            $httpProvider.interceptors.push('JwtHttpInterceptor');
        });

        inject(function(_JwtService_, _$localStorage_, _JwtHttpInterceptor_, $injector, _$http_){
            JwtService = JwtService;
            $localStorage = _$localStorage_;
            JwtHttpInterceptor = _JwtHttpInterceptor_;
            $httpBackend = $injector.get('$httpBackend');
            $http = _$http_;
        });
    });


    describe('Contrato do interceptor', function(){
        it('Que seja um objeto', function(){
            expect(JwtHttpInterceptor).toBeObject();
        });
        it('Que tenha a função request', function(){
            expect(JwtHttpInterceptor.request).toBeDefined();
            expect(JwtHttpInterceptor.request).toBeFunction();
        });
        it('Que tenha a função requestError', function(){
            expect(JwtHttpInterceptor.requestError).toBeDefined();
            expect(JwtHttpInterceptor.requestError).toBeFunction();
        });
        it('Que tenha a função response', function(){
            expect(JwtHttpInterceptor.response).toBeDefined();
            expect(JwtHttpInterceptor.response).toBeFunction();
        });
        it('Que tenha a função responseError', function(){
            expect(JwtHttpInterceptor.responseError).toBeDefined();
            expect(JwtHttpInterceptor.responseError).toBeFunction();
        });
    });

    describe('Intercept requests calls', function(){
        it('Injete o token no formato padrão no request POST', inject(function(JwtService){
            var token = 'aaSSdd';
            var url = '/teste';
            var data = {};
            var headers = {};
            var successCallback = jasmine.createSpy();
            var errorCallback = jasmine.createSpy();

            JwtService.saveToken(token);
            $httpBackend.expectPOST(url, data, function(headers){
                expect(headers[JwtService.authHeader]).toBeDefined();
                return headers[JwtService.authHeader] === JwtService.getTokenHeader();
            }).respond(200,'some data');

            $http({
                method: 'POST',
                url: url,
                data: data,
                headers: headers
            }).success(successCallback).error(errorCallback);


            expect(successCallback).not.toHaveBeenCalled();
            expect(errorCallback).not.toHaveBeenCalled();
            $httpBackend.flush();
            expect(successCallback).toHaveBeenCalled();
        }));
        it('Injete o token em um formato qualquer no request POST', inject(function(JwtService){
            var token = 'wwAAss';
            var url = '/teste';
            var data = {};
            var headers = {};
            var successCallback = jasmine.createSpy();
            var errorCallback = jasmine.createSpy();
            var customPrefix = 'Bearer ';
            var customSulfix = '!';
            JwtService.authHeaderPrefix = customPrefix;
            JwtService.authHeaderSulfix = customSulfix;

            JwtService.saveToken(token);
            $httpBackend.expectPOST(url, data, function(headers){
                expect(headers[JwtService.authHeader]).toBeDefined();
                return headers[JwtService.authHeader] === JwtService.getTokenHeader();
            }).respond(200,'some data');

            $http({
                method: 'POST',
                url: url,
                data: data,
                headers: headers
            }).success(successCallback).error(errorCallback);


            expect(successCallback).not.toHaveBeenCalled();
            expect(errorCallback).not.toHaveBeenCalled();
            $httpBackend.flush();
            expect(successCallback).toHaveBeenCalled();
        }));
        it('Não injete o token no request POST', inject(function(JwtService){
            var token = 'wwAAss';
            var url = '/teste';
            var data = {};
            var headers = JwtService.getSkipAuthorizationHeaderConfig();
            var successCallback = jasmine.createSpy();
            var errorCallback = jasmine.createSpy();
            JwtService.saveToken(token);

            $httpBackend.expectPOST(url, data, function(requestHeaders){
                expect(requestHeaders[JwtService.skipAuthorization]).toBeDefined();
                expect(requestHeaders[JwtService.skipAuthorization]).toBeTruthy();
                expect(requestHeaders[JwtService.authHeader]).not.toBeDefined();

                return !headers.hasOwnProperty(JwtService.authHeader);
            }).respond(200, {});

            $http({
                method: 'POST',
                url: url,
                data: data,
                headers: headers
            }).success(successCallback).error(errorCallback);


            expect(successCallback).not.toHaveBeenCalled();
            expect(errorCallback).not.toHaveBeenCalled();
            $httpBackend.flush();
            expect(successCallback).toHaveBeenCalled();
        }));
    });
    describe('Intercept response', function(){
        it('Execute a função reject quando houver um erro', inject(function(JwtService){
            var token = 'aaSSdd';
            var url = '/teste';
            var data = {};
            var headers = {};
            var successCallback = jasmine.createSpy();
            var errorCallback = jasmine.createSpy();

            JwtService.saveToken(token);
            $httpBackend.expectPOST(url, data, function(headers){
                expect(headers[JwtService.authHeader]).toBeDefined();
                return headers[JwtService.authHeader] === JwtService.getTokenHeader();
            }).respond(400,'some data');

            $http({
                method: 'POST',
                url: url,
                data: data,
                headers: headers
            }).success(successCallback).error(errorCallback);

            expect(successCallback).not.toHaveBeenCalled();
            expect(errorCallback).not.toHaveBeenCalled();
            $httpBackend.flush();
            expect(successCallback).not.toHaveBeenCalled();
            expect(errorCallback).toHaveBeenCalled();
        }));
    });


});
