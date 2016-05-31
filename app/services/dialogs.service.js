(function () {
    'use strict';

    angular.module('eliteAdmin').factory('dialogsService', dialogsService);

    dialogsService.$inject = ['$uibModal'];

    function dialogsService($uibModal) {
        var service = {
            confirm: confirm
        };

        return service;

        function confirm(message, title, buttons){
            var modalInstance = $uibModal.open({
                templateUrl: '/app/shared/confirm-modal.html',
                controller: 'ConfirmModalCtrl',
                controllerAs: 'vm',
                resolve: {
                    data: function() {
                        return {
                            message: message,
                            title: title,
                            buttons: buttons
                        };
                    }
                },
                size: 'sm'
            });

            return modalInstance.result;
        }
    }
})();