/**
 * Created by Deb on 8/21/2014.
 */
(function () {
    "use strict";

    angular
       .module("eliteAdmin").constant("toastrError", function toastrServerError(error) {
           toastr.success(error.status + " : " + error.statusText);

           if (Array.isArray(error.data)) {
               for (var i = 0; i < error.data.length; i++) {
                   toastr.success(error.data[i]);
               };
           };
           if (error.data.message) {
               toastr.success(error.data.message);
           };
           if (error.data.modelState) {
               for (var prop in error.data.modelState) {
                   toastr.success(error.data.modelState[prop]);
               };
           };
       });
}());

