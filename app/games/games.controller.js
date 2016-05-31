(function () {
    'use strict';

    angular.module('eliteAdmin').controller('GamesCtrl', GamesCtrl);

    GamesCtrl.$inject = ['$uibModal', '$location', '$routeParams', 'initialData', 'eliteApi', 'dialogsService'];

    /* @ngInject */
    function GamesCtrl($uibModal, $location, $routeParams, initialData, eliteApi, dialogs) {
        /* jshint validthis: true */
        var vm = this;

        vm.activate = activate;
        vm.go = go;
        vm.deleteItem = deleteItem;
        vm.editItem = editItem;
        vm.games = initialData.games;
        vm.locations = initialData.locations;
        vm.locationsLookup = {};
        vm.teams = initialData.teams;
        vm.teamsLookup = {};
        vm.logGame = logGame;

        activate();

        ////////////////
        function logGame(game) {
            //console.log(game);
            if (typeof vm.teamsLookup[game.team1Id] === 'undefined' || typeof vm.teamsLookup[game.team2Id] === 'undefined') {
                console.log(game);
            }

            return game.gameId;
        }
        ///////////////

        function activate() {
            _.forEach(vm.teams, function(team){
                vm.teamsLookup[team.teamId] = team.name;
            });

            _.forEach(vm.locations, function(location){
                vm.locationsLookup[location.locationId] = location.name;
            });
        }

        function deleteItem(id){
            dialogs.confirm('Are you sure you want to Delete this item?', 'Delete?', ['OK', 'Cancel'])
                .then(function(){
                    eliteApi.deleteGame(id).then(function(data){
                        _.remove(vm.games, { 'id': id });
                    });
                });
        }

        function editItem(game) {
            if (!game) {
                //game = {};
                //game.gameId = 0;
                //game.locationId = 0;
                //game.team1Id = 0;
                //game.team2Id = 0;
            }
            var modalInstance = $uibModal.open({
                templateUrl: '/app/games/edit-game.html',
                controller: 'EditGameCtrl',
                controllerAs: 'vm',
                resolve: {
                    data: function() {
                        return {
                            locations: _.sortBy(vm.locations, 'name'),
                            teams: _.sortBy(vm.teams, 'divisionName, name'),
                            itemToEdit: game
                        };
                    }
                }
            });

            modalInstance.result.then(function(result){
                result.leagueId = $routeParams.id;
                eliteApi.saveGame(result).then(function(data){
                    if (game){
                        _.assign(game, data);
                        var index = _.findIndex(vm.eventSources[0], { 'id': game.gameId });
                    } else if (!!data){
                        vm.games.push(data);
                    }
                });
            });
        }

        function go(path){
            $location.path('leagues/' + $routeParams.id + '/' + path);
        }
    }
})();