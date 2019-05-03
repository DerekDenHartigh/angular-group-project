"use strict";

function MovieListController(MovieAppService) { 
    const ctrl = this;
    const service = MovieAppService;

    ctrl.pageBack = function(){
        if (service.pageNumber>1){
        service.pageNumber -= 1;
        console.log(service.pageNumber)
        }
        else if (service.pageNumber<=1){
            console.error("1 is the lowest possible page number")
        }
    }

    ctrl.pageForward = function(){
        if(service.pageNumber<service.responseData.data.total_pages){
            service.pageNumber += 1;
            console.log(service.pageNumber);
        }
        else if(service.pageNumber>=service.response.data.total_pages){
            console.error("There aren't that many pages!")
        }
    }
}


angular
.module('MovieApp')  
.component('movieList', {
    template: `
    <!--Movie Display (title, poster, rating, description)-->


    <!--Page Number Selector-->
    <div id="page-number-container">
        <i class="material-icons arrows" ng-click="$ctrl.pageBack()">arrow_back</i>
        <input id="page-selection-input" type="number" min="1" step="1" ng-model="service.pageNumber">{{$ctrl.service.pageNumber}}</input>
        <i class="material-icons arrows" ng-click="$ctrl.pageForward()">arrow_forward</i>
    </div>
        `,
    controller: MovieListController
});