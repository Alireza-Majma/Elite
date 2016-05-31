(function () {
    'use strict';

    angular.module('eliteAdmin').controller('TeamsCtrl', TeamsCtrl);

    TeamsCtrl.$inject = ['$uibModal', '$location', '$routeParams', 'initialData', 'eliteApi', 'dialogsService'];

    /* @ngInject */
    function TeamsCtrl($uibModal, $location, $routeParams, initialData, eliteApi, dialogs) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.deleteItem = deleteItem;
        vm.editItem = editItem;
        vm.go = go;
        vm.teams = initialData;
        vm.toggleExpand = toggleExpand;
        vm.accordionExpanded = true;
        vm.isCollapsed = isCollapsed;
        activate();

        ////////////////

        function activate() {
            initializeGroups();
        }

        function deleteItem(id) {
            dialogs.confirm('Are you sure you want to Delete this item?', 'Delete?', ['OK', 'Cancel'])
                .then(function(){
                    eliteApi.deleteTeam(id).then(function(data){
                        _.remove(vm.teams, { 'teamId': id });
                        initializeGroups();
                    });
                });
        }

        function editItem(team){
            var modalInstance = $uibModal.open({
                templateUrl: '/app/teams/edit-team.html',
                controller: 'EditTeamCtrl',
                controllerAs: 'vm',
                resolve: {
                    data: function() {
                        return {
                            divisions: _.chain(vm.teams).uniq('divisionName').map('divisionName').value(),
                            itemToEdit: team
                        };
                    }
                }
            });

            modalInstance.result.then(function(result){
                result.leagueId = $routeParams.id;
                eliteApi.saveTeam(result).then(function(data){
                    if (team){
                        _.assign(team, data);
                    } else if (data){
                        vm.teams.push(data);
                    }
                    initializeGroups();
                });
            });
        }

        function go(path){
            $location.path('leagues/' + $routeParams.id + '/' + path);
        }

        function initializeGroups() {
            vm.groups = _.chain(vm.teams)
                .sortBy('name')
                .groupBy('divisionName')
                .toPairs()
                .map(function(item){
                    return { divisionName: item[0], teams: item[1], isOpen: true };
                })
                .sortBy('divisionName')
                .value();
        }

        function toggleExpand(expand){
            _.forEach(vm.groups, function(group){
                group.isOpen = expand;
            });
        }

        function isCollapsed() {
            var reslt = false;
            _.forEach(vm.groups, function (group) {
                if (group.isOpen === vm.accordionExpanded)
                    reslt = true;
            });
            return reslt;
        }
    }
})();