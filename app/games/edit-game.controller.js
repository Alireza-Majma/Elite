(function () {
    'use strict';

    angular.module('eliteAdmin').controller('EditGameCtrl', EditGameCtrl);

    EditGameCtrl.$inject = ['$uibModalInstance', 'data'];

    /* @ngInject */
    function EditGameCtrl($uibModalInstance, data) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.cancel = cancel;
        vm.editableItem = angular.copy(data.itemToEdit || {});
        vm.gameDate = {};
        vm.gameTime = {};
        vm.open = openDatePicker;
        vm.opened = false;
        vm.properties = data;
        vm.save = save;
        vm.title = (data.itemToEdit ? 'Edit Game' : 'Add New Game');

        activate();

        ////////////////

        function activate() {
            if (!!vm.editableItem.gameTime) {
                vm.gameDate = vm.editableItem.gameTime;
                vm.gameTime = moment(vm.editableItem.gameTime).toDate();
            } else {
                vm.gameDate = moment().format('MM/DD/YYYY');
                vm.gameTime = moment('18:00', 'HH:mm').toDate();
            }
            if (!vm.editableItem.team1Id) {
                vm.editableItem.team1Id = data.teams[0].teamId;
            }
            if (!vm.editableItem.team2Id) {
                vm.editableItem.team2Id = data.teams[0].teamId;
            }
        }

        function cancel(){
            $uibModalInstance.dismiss();
        }

        function combine(date, time) {
            var dateString = moment(date).format('MM/DD/YYYY');
            return moment(dateString + ' ' + moment(time).format('HH:mm')).format('YYYY-MM-DDTHH:mm:00');
        }

        function openDatePicker($event) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.opened = true;
        }

        function save(){
            vm.editableItem.gameTime = combine(vm.gameDate, vm.gameTime);
            $uibModalInstance.close(vm.editableItem);
        }
    }
})();