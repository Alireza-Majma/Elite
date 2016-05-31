(function () {
    'use strict';

    angular.module('eliteAdmin').controller('EditTeamCtrl', EditTeamCtrl);

    EditTeamCtrl.$inject = ['$uibModalInstance', 'data'];

    /* @ngInject */
    function EditTeamCtrl($uibModalInstance, data) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.cancel = cancel;
        vm.editableItem = angular.copy(data.itemToEdit);
        vm.properties = data;
        vm.save = save;
        vm.title = (data.itemToEdit ? 'Edit Team' : 'Add New Team');

        activate();

        ////////////////

        function activate() {
        }

        function cancel(){
            $uibModalInstance.dismiss();
        }

        function save(){
            $uibModalInstance.close(vm.editableItem);
        }
    }
})();
