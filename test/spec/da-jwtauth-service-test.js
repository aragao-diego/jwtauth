describe('Testes do JwtServiço ', function() {
    'use strict';

    var JwtService;
    var $localStorage;

    beforeEach(function(){
        module('ngStorage');
        module('da-jwtauth.services');
    });

    beforeEach(inject(function(_JwtService_, _$localStorage_){
        JwtService = _JwtService_;
        $localStorage = _$localStorage_;

    }));

    describe('Interface do serviço', function(){
        it('Que o serviço exista', function(){
            expect(JwtService).toBeObject();
        });
        it('Que tenha a propriedade authHeader', function(){
            expect(JwtService.authHeader).toBeDefined();
        });
        it('Que tenha a propriedade authHeaderPrefix', function(){
            expect(JwtService.authHeaderPrefix).toBeDefined();
        });
        it('Que tenha a propriedade authHeaderSulfix', function(){
            expect(JwtService.authHeaderSulfix).toBeDefined();
        });
        it('Que tenha a propriedade skipAuthorization', function(){
            expect(JwtService.skipAuthorization).toBeDefined();
        });
        it('Que tenha o método getSkipAuthorizationHeaderConfig', function(){
            expect(JwtService).toHaveMethod('getSkipAuthorizationHeaderConfig');
        });
        it('Que tenha o método getToken', function(){
            expect(JwtService).toHaveMethod('getToken');
        });
        it('Que tenha o método saveToken', function(){
            expect(JwtService).toHaveMethod('saveToken');
        });
        it('Que tenha o método deleteToken', function(){
            expect(JwtService).toHaveMethod('deleteToken');
        });
        it('Que tenha o método encodePassword', function(){
            expect(JwtService).toHaveMethod('encodePassword');
        });
        it('Que tenha o método getTokenHeader', function(){
            expect(JwtService).toHaveMethod('getTokenHeader');
        });
    });

    describe('Funções do JwtService', function(){
        it('Que salve e retorne o token com o $localStorage', function(){
            var token = 'TesteToken';
            JwtService.saveToken(token);
            expect(JwtService.getToken()).toBe(token);
        });
        it('Que modifique a função de pegar/salvar o token e retorne o esperado', inject(function($localStorage){
            $localStorage.token = '';
            expect(JwtService.getToken()).toBe('');

            var tokenStorage;
            var token = 'TestCustomStorageToken';

            JwtService.saveToken = function(token){
                tokenStorage = token;
            };
            JwtService.getToken = function(){
                return tokenStorage;
            };

            JwtService.saveToken(token);
            expect(JwtService.getToken()).toBe(token);
            expect($localStorage.token).toBe('');
        }));
        it('Que retorne o header default esperado para o skipAuthorization', function(){
            var authHeader = JwtService.getSkipAuthorizationHeaderConfig();
            var authProp = JwtService.skipAuthorization;

            expect(authHeader).toBeObject();
            expect(authHeader[authProp]).toBeDefined();
            expect(authHeader[authProp]).toBeTruthy();
        });
        it('Que retorne o header esperado com configurações especificas para o skipAuthorization', function(){
            JwtService.skipAuthorization = 'customHeader';
            var authHeader = JwtService.getSkipAuthorizationHeaderConfig();

            expect(authHeader).toBeObject();
            expect(authHeader.customHeader).toBeDefined();
            expect(authHeader.customHeader).toBeTruthy();
        });
        it('Que retorne vazio por padrão na codificação da autenticação', function(){
            expect(JwtService.encodePassword('user','name')).toBe('');
        });
        it('Que codifique a senha dada uma função', function(){
            JwtService.encodePassword = function(user,name){
                return user+':'+name;
            };
            expect(JwtService.encodePassword('user','name')).toBe('user:name');
        });
        it('Que retorne o valor de header padrão esperado', function(){
            var token = 'AAWWQQ';
            JwtService.saveToken(token);
            var tokenHeader = JwtService.getTokenHeader();

            expect(tokenHeader).toBeString();
            expect(tokenHeader).toBe('Token '+token);
        });
        it('Que retorne o valor de header esperado dada certas configurações', function(){
            var token = 'AALLQQ';
            var customPrefix = 'Bearer ';
            var customSulfix = '!';
            JwtService.saveToken(token);
            JwtService.authHeaderPrefix = customPrefix;
            JwtService.authHeaderSulfix = customSulfix;

            var tokenHeader = JwtService.getTokenHeader();

            expect(tokenHeader).toBeString();
            expect(tokenHeader).toBe(customPrefix+token+customSulfix);
        });
    });


});
