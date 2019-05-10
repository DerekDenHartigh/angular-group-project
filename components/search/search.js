"use strict";

function SearchController(MovieAppService, $scope, $interval) { 
    const ctrl = this;
    const service = MovieAppService;
    ctrl.arrayOfParams = service.arrayOfParams;
    ctrl.service = MovieAppService;

/* a watcher for all the params to refresh the page on change */

    ctrl.hasUpdated = false;


    $scope.service = MovieAppService;
    $scope.$watchGroup(['service.pageNumber', 'service.vote_averageGreaterThanOrEqual', 'service.earliestReleaseDate', 'service.latestReleaseDate','service.genreSelectionArray', 'service.genresNotWanted', 'service.runTimeGreaterThanOrEqual', 'service.runTimeLessThanOrEqual', 'service.ote_averageGreaterThanOrEqual', 'service.vote_averageLessThanOrEqual'], function( newValue, oldValue ) {
        ctrl.hasUpdated = true;
        service.queryMode = false;  // toggles off query mode
    },true);

    $interval(function(){
        if (ctrl.hasUpdated === true){ 
            service.getMovies();
            ctrl.hasUpdated = false;
        };
        if(service.searchQuery === ""){
            service.queryMode = false;
            console.log("query mode deactivated")
        }
        if(service.searchQuery !== ""){
            service.queryMode = true;
            console.log("query mode activated")
        }
    }, 200);

    ctrl.searchInit = function(){
        if(service.searchQuery !== ""){
            service.queryMode = true; // toggles on querymode if search isn't empty
            service.searchMovies();
        }
        if(service.searchQuery===""){
            service.queryMode = false; // toggle off queryMode
        }
    }

    // ctrl.hasUpdated2 = false;
    // ctrl.hasUpdated2 = true; // for testing
    // service.searchMovies(); // for testing
    
    // $scope.$watch(['service.searchQuery'], function( newValue, oldValue ) {
    //     ctrl.hasUpdated2 = true;
    // },true);

    // $interval(function(){
    //     if (ctrl.hasUpdated2 === true){ 
    //         service.searchMovies();
    //         ctrl.hasUpdated = false;
    //     }
    // }, 1000);  // longer delay for user to type

/* genre checkbox logic */

    ctrl.genreOptionArray = service.genreOptionArray  // will changes to ctrl.genreOptionArray affect service.genreOptionArray?
    ctrl.callGenerateGenreArray = function(){
        return service.generateGenreArray();
    };

    ctrl.checkboxIncludeFunction = function(genre){
        genre.include = !genre.include; // toggles true/false on checkbox click - default is true
        genre.exclude = !genre.include; // ensures that if a genre is included, it is not excluded.
        if (genre.include === true){  // if genre is included, add it to the genreSelectionArray
            service.addToGenreSelectionArray(genre.id);
        }
        if (genre.include === false){  // if genre is not included, cut it from the genreSelectionArray
            service.removeFromGenreSelectionArray(genre.id);
        }
        if (genre.exclude === true){ // if genre is excluded, add it to the genreExclusionArray
            service.addToGenreExclusionArray(genre.id);
        }
        if (genre.exclude === false){  // if genre isn't excluded, cut it from the genreExclusionArray
            service.removeFromGenreExclusionArray(genre.id);
        }
        service.genreSelectionArrayToString(); // convert the arrays to strings that can be passed as params
        service.genreExclusionArrayToString();
    };

    ctrl.genreExclusionArray = service.genreExclusionArray;
    ctrl.genreSelectionArray = service.genreSelectionArray;

/* scrollbar settings */

    $scope.timevalue=0;
    $scope.timevaluemin =0;
    $scope.timevaluemax=999;
    $scope.ratingvalue=0;
    $scope.max=10;
    $scope.min=0;
    
}


angular
.module('MovieApp')  
.component('search', {
    template: `

    <h1 id="search-filter">Search Your Favorite Movie</h1>
    <input id="search-input" placeholder="Movie Name" type="text" ng-model="$ctrl.service.searchQuery" ng-model-options='{ debounce: 1000 }' ng-change='service.searchMovies()' class="movieLength ranges"/>

    <h1 id="result-filter" ng-click="shown=!shown">Discover The Perfect Movie<h1>
    <div name="search-spec-form" id="search-spec-form" ng-hide="!shown">

        <!--Genres-->
        <div class="genre-option-box" ng-repeat="genre in $ctrl.genreOptionArray">
            <label class="genre-option">{{genre.name}}</label>
            <div class="checkbox-box">
                <label class="checkbox-container genre-inclusion-checkbox-container">
                    <input class="genre-inclusion-checkbox checkbox" type="checkbox" ng-checked="genre.include" name="genre-inclusion[]" ng-click="$ctrl.checkboxIncludeFunction(genre)" />
                </label>
            </div>
        </div>

        <!--Runtime-->
        <div class="questions">
            <div class="stuff">
                <p class="length-question">How long can you handle sitting in the dark? (in minutes)</p>
                <input class="movieLength ranges" type="range" name="range" ng-model="$ctrl.service.runTimeLessThanOrEqual" min="{{timevaluemin}}"  max="{{timevaluemax}}"> 
                <input class="lengthInput inputs" type="number" ng-model="$ctrl.service.runTimeLessThanOrEqual" min="{{timevaluemin}}"  max="{{timevaluemax}}">
            </div>
    

        <!--Rating-->
            <div class="stuff">
                <p class="rating-question">Lowest rated movie your willing to see?\n(on a scale of 0-10)</p>
                <input class="movieRatings ranges" type="range" name="range" ng-model="$ctrl.service.vote_averageGreaterThanOrEqual" min="{{min}}"  max="{{max}}">
                <input class="ratingInput inputs" type="number" ng-model="$ctrl.service.vote_averageGreaterThanOrEqual" min="{{min}}"  max="{{max}}">
            </div>

    </div>
        `,
    controller: SearchController
});