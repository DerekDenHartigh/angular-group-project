"use strict";

function SearchController(MovieAppService, $scope, $interval) { 
    const ctrl = this;
    const service = MovieAppService;
    ctrl.arrayOfParams = service.arrayOfParams; // binding arrayOfParams for watcher.
    ctrl.service = MovieAppService;
/* a watcher for all the params to refresh the page - it is supposed to watch for changes in arrayOfParams, then, on change, refresh the content w/ a 200ms throttle */
    ctrl.hasUpdated = false;

    $scope.$watch("ctrl.service.genreSelectionArray", function( newValue, oldValue ) {
        console.error("who will watch the watchers?");
        ctrl.hasUpdated = true;
    },true);

    $interval(function(){
        // console.log("I'm the interval service!")
        if (ctrl.hasUpdated === true){ //ctrl.hasUpdated === true
            console.error("im not firing");
            service.getMovies();
            ctrl.hasUpdated = false;
        }
    }, 200);

    ctrl.genreOptionArray = service.genreOptionArray  // will changes to ctrl.genreOptionArray affect service.genreOptionArray?
    ctrl.callGenerateGenreArray = function(){
        return service.generateGenreArray();
    };

    ctrl.checkboxIncludeFunction = function(genre){
        console.log(`genreSelection: ${service.genreSelection}\ngenresNotWanted: ${service.genresNotWanted}`)
        console.log(`Pre-switch: genre.include: ${genre.include}\ngenre.exclude: ${genre.exclude}`)
        genre.include = !genre.include; // toggles true/false on checkbox click - default is true
        genre.exclude = !genre.include; // ensures that if a genre is included, it is not excluded.
        console.log(`post Switch: genre.include: ${genre.include}\ngenre.exclude: ${genre.exclude}`)
        if (genre.include === true){  // if genre is included, add it to the genreSelectionArray
            service.addToGenreSelectionArray(genre.id);
            console.log(`genreSelectionArray: ${service.genreSelectionArray}`)
        }
        if (genre.include === false){  // if genre is not included, cut it from the genreSelectionArray
            service.removeFromGenreSelectionArray(genre.id);
            console.warn(`genreSelectionArray: ${service.genreSelectionArray}`)
        }
        if (genre.exclude === true){ // if genre is excluded, add it to the genreExclusionArray
            service.addToGenreExclusionArray(genre.id);
            console.log(`genreExclusionArray: ${service.genreExclusionArray}`)
        }
        if (genre.exclude === false){  // if genre isn't excluded, cut it from the genreExclusionArray
            service.removeFromGenreExclusionArray(genre.id);
            console.warn(`genreExclusionArray: ${service.genreExclusionArray}`)
        }
        service.genreSelectionArrayToString(); // convert the arrays to strings that can be passed as params
        service.genreExclusionArrayToString();
        console.warn(`genreSelection: ${service.genreSelection}\ngenresNotWanted: ${service.genresNotWanted}`);
    };


    ctrl.genreExclusionArray = service.genreExclusionArray;
    ctrl.genreSelectionArray = service.genreSelectionArray;


    $scope.timevalue=0;
    $scope.timevaluemin =0;
    $scope.timevaluemax=300;
    $scope.ratingvalue=0;
    $scope.max=10;
    $scope.min=0;
    

}


angular
.module('MovieApp')  
.component('search', {
    template: `

    <h1 id="result-filter" ng-click="shown=!shown">Find The Perfect Movie<h1>
    <div name="search-spec-form" id="search-spec-form" ng-hide="!shown">
    <!--Genres-->
        <div class="genre-option-box" ng-repeat="genre in $ctrl.genreOptionArray">
            <label class="genre-option">{{genre.name}}</label>
            <div class="checkbox-box">
                <label class="checkbox-container genre-inclusion-checkbox-container">
                    <input class="genre-inclusion-checkbox checkbox" type="checkbox" checked name="genre-inclusion[]" ng-click="$ctrl.checkboxIncludeFunction(genre)" />
                </label>
            </div>
        </div>

    <!--Runtime-->

    <div class="questions">
    <div class="stuff">
    <p class="lengthQuestion">How long can you handle sitting in the dark?</p><input class="movieLength ranges" type="range" name="range" ng-model="timevalue" min="{{timevaluemin}}"  max="{{timevaluemax}}"> 
    <input class="lengthInput inputs" type="number" ng-model="timevalue">
    </div>
    
    <!--Rating-->

    <div>
    <p class="ratingQuestion">Lowest rating your willing to see?</p><input class="movieRatings ranges" type="range" name="range" ng-model="ratingvalue" min="{{min}}"  max="{{max}}">
    <input class="ratingInput inputs" type="number" ng-model="ratingvalue">
    </div>
    </div>



    </div>
        `,
    controller: SearchController
});


/* <span class="rating">
    <input type="radio" class="rating-input"
        id="rating-input-1-5" name="rating-input-1">
    <label for="rating-input-1-5" class="rating-star"></label>
    <input type="radio" class="rating-input"
        id="rating-input-1-4" name="rating-input-1">
    <label for="rating-input-1-4" class="rating-star"></label>
    <input type="radio" class="rating-input"
        id="rating-input-1-3" name="rating-input-1">
    <label for="rating-input-1-3" class="rating-star"></label>
    <input type="radio" class="rating-input"
        id="rating-input-1-2" name="rating-input-1">
    <label for="rating-input-1-2" class="rating-star"></label>
    <input type="radio" class="rating-input"
        id="rating-input-1-1" name="rating-input-1">
    <label for="rating-input-1-1" class="rating-star"></label>
</span> */