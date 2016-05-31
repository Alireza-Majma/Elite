// Include in index.html so that app level exceptions are handled.
// Exclude from testRunner.html which should run exactly what it wants to run
(function () {
    'use strict';
    
    var app = angular.module('eliteAdmin');

    app.config(['$provide', function ($provide) {
        $provide.decorator('$exceptionHandler',
            ['$delegate', extendExceptionHandler]);
    }]);
    
    // Extend the $exceptionHandler service to also display a toast.
    function extendExceptionHandler($delegate) {
        return function (exception, cause) {
            $delegate(exception, cause);

            var errorData = { exception: exception, cause: cause };
            var msg = "Error in application !!!    \n"+exception.message;
            alert(msg)

            console.log(msg);
        };
    }
})();