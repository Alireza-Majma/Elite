(function () {
    'use strict';

    angular.module('eliteAdmin').controller('LeagueHomeCtrl', LeagueHomeCtrl);

    LeagueHomeCtrl.$inject = ['$location', '$routeParams', 'initialData'];

    /* @ngInject */
    function LeagueHomeCtrl($location, $routeParams, initialData) {
        /* jshint validthis: true */
        var vm = this;
        vm.isActive = [false,false,true];
        vm.activate = activate;
        vm.go = go;

        activate();

        ////////////////

        function activate() {
        }

        function go(path){
            $location.path('leagues/' + $routeParams.id + '/' + path);
        }
    }
})();