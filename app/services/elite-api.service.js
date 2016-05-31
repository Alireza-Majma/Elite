(function () {
    'use strict';

    angular.module('eliteAdmin').factory('eliteApi', eliteApi);

    eliteApi.$inject = ['$http', '$q', "$resource", "appSettings", 'appSpinner', "toastrError"];

    function eliteApi($http, $q, $resource, appSettings, appSpinner, toastrError) {
        var service = {
            addLeague: addLeague,
            deleteGame: deleteGame,
            deleteLeague: deleteLeague,
            deleteLocation: deleteLocation,
            deleteTeam: deleteTeam,
            getGames: getGames,
            getLeague: getLeague,
            getLeagues: getLeagues,
            getLocation: getLocation,
            getLocations: getLocations,
            getTeams: getTeams,
            saveGame: saveGame,
            saveLeague: saveLeague,
            saveLocation: saveLocation,
            saveTeam: saveTeam,
            leagueResource: leagueResource()
        };

        //var baseUrl = 'https://elite-schedule-demo.azure-mobile.net/tables';
        var baseUrl = appSettings.serverPath;
        var requestConfig = {
            headers: {
                'X-ZUMO-APPLICATION': 'GSECUHNQOOrCwgRHFFYLXWiViGnXNV88'
            }
        };

        return service;

        function leagueResource() {
            return $resource(appSettings.serverPath + "/api/leagues/:leagueId")
        }
        
        function addLeague(league){
            return httpPost('api/leagues', league);
        }

        function deleteGame(id){
            return httpDelete('/games/' + id);
        }

        function deleteLeague(id){
            return httpDelete('api/leagues/' + id);
        }

        function deleteLocation(id){
            return httpDelete('/locations/' + id);
        }

        function deleteTeam(id){
            return httpDelete('api/teams/' + id);
        }

        function getGames(leagueId){
            //var url = getUrlByLeagueId('api/games/league/', leagueId);
            var url = 'api/games';
            if (!!leagueId){
                url = url+'/league/'+ leagueId;
            }
            return httpGet(url);
        }

        function getLeague(leagueId){
            return httpGet('api/leagues/' + leagueId);
        }

        function getLeagues() {

            
            return httpGet("api/leagues");

            //var leages = [
            //  {
            //      "id": "038dfd06-0971-467d-80cb-2000cf3cf989",
            //      "name": "Cager Classic",
            //      "homeScreen": "**Welcome coaches, players, and parents!** \n\nThis site contains full schedule information for the tournament.",
            //      "rulesScreen": ""
            //  },
            //  {
            //      "id": "614b9998-e039-42da-8354-626b7b10a1cf",
            //      "name": "Holiday Hoops Challenge",
            //      "homeScreen": "**Welcome coaches, players, and parents!** \n\nThis site contains full schedule information for the tournament.",
            //      "rulesScreen": ""
            //  },
            //  {
            //      "id": "cabe8500-730c-4f99-b509-62c7a0401049",
            //      "name": "Thanksgiving Tip Off",
            //      "homeScreen": "**Welcome coaches, players, and parents!** \n\nThis site contains full schedule information for the tournament.",
            //      "rulesScreen": ""
            //  }
            //];

            //return leages;

            //return $q.when(leages).then(function (data) {
            //    return data
            //});

            //return $q.when(leages);


            //var defer = $q.defer();
            //defer.resolve(leages);
            //return defer.promise;
            
        }

        function getLocation(locationId) {
            return httpGet('/locations/' + locationId);
        }

        function getLocations() {
            return httpGet('api/locations');
        }

        function getTeams(leagueId) {
            var url = 'api/teams';
            if (!!leagueId) {
                url = url + '/league/' + leagueId;
            }
            return httpGet(url);
            //var url = getUrlByLeagueId('api/teams', leagueId);
            //return httpGet('api/teams?leagueId='+ leagueId);
        }

        function saveLeague(league){
            //return httpPatch('/leagues/' + league.id, league);
            return saveItem('api/leagues', league,league.leagueId);
        }

        function saveLocation(location){
            return saveItem('/locations', location,locationId);
        }

        function saveGame(game){
            return saveItem('api/games', game,game.gameId);
        }

        function saveTeam(team){
            return saveItem('api/teams', team,team.teamId);
        }

        /** Private Methods **/

        function getUrlByLeagueId(url, leagueId){
            return url + '?$top=100&$filter=' + encodeURIComponent('leagueId eq \'' + leagueId + '\'');
        }

        function httpDelete(url){
            return httpExecute(url, 'DELETE');
        }

        function httpExecute(requestUrl, method, data){
            appSpinner.showSpinner();
            return $http({
                url: baseUrl + requestUrl,
                method: method,
                data: data,
                headers: requestConfig.headers
            }).then(function (response) {
                appSpinner.hideSpinner();
                console.log('**response from EXECUTE', response);
                return response.data;
            }, function errorCallback(response) {
                appSpinner.hideSpinner();
                toastrError(response);
                console.log(response);
                return null;
                });
        }

        function httpGet(url){
            return httpExecute(url, 'GET');
        }

        function httpPatch(url, data){
            return httpExecute(url, 'PATCH', data);
        }

        function httpPost(url, data){
            return httpExecute(url, 'POST', data);
        }

        function saveItem(url, item, itemId){
            if (itemId) {
                return httpPatch(url + '/' + itemId, item);
            } else {
                return httpPost(url, item);
            }
        }
    }
})();
