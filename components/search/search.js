"use strict";

function SearchController(MovieAppService) { 
    const ctrl = this;
    const service = MovieAppService;

    ctrl.callGenerateGenreArray = function(){
        return service.generateGenreArray();
    };
}


angular
.module('MovieApp')  
.component('search', {
    template: `
        <button ng-click="$ctrl.callGenerateGenreArray()">GenerateGenreArray</button>
        `,
    controller: SearchController
});