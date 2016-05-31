(function () {
    'use strict';

    angular.module('eliteAdmin').controller('HomeCtrl', HomeCtrl);

    /* @ngInject */
    function HomeCtrl() {
        /* jshint validthis: true */
        var vm = this;
        vm.notesCollapsed = true;

        vm.activate = activate;

        activate();

        ////////////////

        function activate() {
            
        }


    }
})();