//
// StarterKit v0.1
//

angular.module('app', ['ionic'])

// Run
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// Config Application
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('app', {
      url: '/',
      templateUrl: 'index.html'
    });

});
