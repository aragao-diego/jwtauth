angular
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
