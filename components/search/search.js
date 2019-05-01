"use strict";

function SearchController(MovieAppService) { 
    const ctrl = this;
    const service = MovieAppService;


}


angular
.module('MovieApp')  
.component('search', {
    template: `
        <button ng-click="$ctrl.service.generateGenreArray()">GenerateGenreArray</button>
        `,
    controller: SearchController
});