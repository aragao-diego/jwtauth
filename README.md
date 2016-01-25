# da-jwtauth


## Serviço

**JwtService**

 * _authHeader_ [string] -> Nome do header a ser enviado para enviar o token
 * _authHeaderPrefix_ [string] -> Prefixo para ser usado na geração do header do token
 * _authHeaderSulfix_ [string] -> Sulfixo para ser usado na geração do header do token
 * _skipAuthorization_ [string] -> Nome da propriedade que será verificada para _NÃO_ enviar o header de autenticação (O header DEVE existir e deve ser **true**)
 * _getSkipAuthorizationHeaderConfig()_ [object] -> Retorna um objeto que deve ser adicionado ao header da requisição para que _NÃO_ seja enviado o header de autenticação
 * _getTokenHeader()_ [string] -> Função que manipula o prefix, sulfix e token para a criação da string que será enviada para realizar a autenticação (função informada pela APP que está consumindo o modulo)
 * _getToken()_ [string] -> Retorna o token (*por padrão é usado o localStorage para armazenar o token), **APP** pode sobreescrever esse método para alterar a forma de armazenamento do token
 * _saveToken(token)_ -> Salva o token (*por padrão é usado o localStorage para armazenar o token), **APP** pode sobreescrever esse método para alterar a forma de armazenamento do token
 * _deleteToken()_ -> Deleta o token (*por padrão é usado o localStorage para armazenar o token), **APP** pode sobreescrever esse método para alterar a forma de armazenamento do token
 * _encodePassword(username, password)_ [string] -> Função para encriptar ou fazer manipulações com o conjunto de usuario/senha a ser enviado para a autenticação
 * _getTokenHeader()_ -> Retorna a concatenação do prefixo+token+sulfixo

## Como usar

1) Incluir o módulo como dependência
````javascript
angular.module('nome_do_modulo', ['da-jwtauth'])
````

2) No bloco de configuração do projeto incluir o interceptor:
````javascript
angular.module('nome_do_modulo')
    .config(function($httpProvider){
        $httpProvider.interceptors.push('JwtHttpInterceptor');
    });
````

3) Informar a função de encriptação do password
````javascript
    JwtService.encodePassword = function(user,password){
        return {"Authorization": "Basic " + btoa(user + ":" + password)};
    };
````

## Informações

### Restangular - Não enviando headers
````javascript
Restangular
    .one('exemplo/jwt/simple')
    .withHttpConfig(JwtService.getSkipAuthorizationHeaderConfig())
    .customPOST();
````




![schema](http://i.imgur.com/0POlH0f.png)