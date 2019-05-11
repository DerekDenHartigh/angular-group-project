"use strict";

function MovieListController(MovieAppService, $interval) {

    const ctrl = this;
    // const service = MovieAppService;
    ctrl.service = MovieAppService;
    ctrl.movieList = ctrl.service.movieList;

/* page forward/back functions */

    ctrl.pageBack = function(){
        console.log("pageBack() pressed")
        if(ctrl.service.queryMode === false){
            if (ctrl.service.pageNumber>1){
            ctrl.service.pageNumber -= 1;
            }
            if (ctrl.service.pageNumber<=1){
                console.error("1 is the lowest possible page number")
            }
            if(ctrl.service.pageNumber>=ctrl.service.pageLimit){
                console.log(ctrl.service.pageNumber);
                console.error("There aren't that many pages! You might want to enter a lower value in the page search.")
            }
        }
        if(ctrl.service.queryMode === true){
            console.log("pageBack() queryMode true")
            if (ctrl.service.queryPageNumber>1){
                ctrl.service.queryPageNumber -= 1;
                }
                if (ctrl.service.queryPageNumber<=1){
                    console.error("1 is the lowest possible page number")
                }
                if(ctrl.service.queryPageNumber>=ctrl.service.queryPageLimit){
                    console.log(ctrl.service.queryPageNumber);
                    console.error("There aren't that many pages! You might want to enter a lower value in the page search.")
                }
        }
    };

    ctrl.pageForward = function(){
        console.log("pageForward() pressed");
        if(ctrl.service.queryMode === false){
            if(ctrl.service.pageNumber<ctrl.service.pageLimit){
                ctrl.service.pageNumber += 1;
            }
            else if(ctrl.service.pageNumber>=ctrl.service.pageLimit){
                console.error("There aren't that many available pages!")
            }
        }
        if (ctrl.service.queryMode === true){
            console.log("pageForward() queryMode true");
            if(ctrl.service.queryPageNumber<ctrl.service.queryPageLimit){
                ctrl.service.querypageNumber += 1;
            }
            else if(ctrl.service.queryPageNumber>=ctrl.service.queryPageLimit){
                console.error("There aren't that many available pages!")
            }
        }
    }

/* watchlist button - moved logic to service for use by watch-list component*/

    ctrl.watchlistEditor = ctrl.service.watchlistEditor

/* movie list generator - moved logic to service for reference by search module*/

    ctrl.movieList = ctrl.service.movieList;
    ctrl.getMovies = ctrl.service.getMovies
     
/* more info functions */

    ctrl.infoFunction = function(movie){ // saves selected movie to service as href directs to moreInfo route
        ctrl.service.detailedMovie = []; // clears out any previous movies pushed in.
        ctrl.service.detailedMovie.push(movie);  // adds the new movie obj to the array
    };

    // $interval(function(){ // querymode Logic toggle for paging through results
    //     if (service.queryMode === true){
        
    //     }
    //     if (service.queryMode === false){
           
    //     }
    // }, 2000);
}

angular
.module('MovieApp')  
.component('movieList', {
    template: `
    <!--Movie Display (title, poster, rating, description)-->
    <div id="movie-list-container">
        <div class="movie-post" ng-repeat="movie in $ctrl.service.movieList">
            <div class="title-container">
                <h1 class="movie-title title" ng-click="show=!show">{{movie.title}}</h1>
                <div class="spacer"></div>
                <div class="star-container">
                    <i class="material-icons star" ng-hide="movie.starred" ng-click="$ctrl.watchlistEditor(movie)">star_border</i>
                    <i class="material-icons star" ng-show="movie.starred" ng-click="$ctrl.watchlistEditor(movie)">star</i>
                </div>
            </div>
            
            <img class="movie-poster image" id="more" alt="movie poster" ng-src="{{movie.poster}}" fallback-src="https://www.kargomaster.com/pub/media/catalog/product/placeholder/default/sorry-image-not-available.jpg" ng-click="show=!show"></img>
            <a class = "more-info" href="#!/moreInfo" ng-click="$ctrl.infoFunction(movie)">More Info</a>

            <p class ="movie-description description" ng-hide="!show">Synopsis:\n{{movie.description}}</p>
        </div>
    </div>

    <!--Discovery Page Number Selector-->
    <div id="page-number-container" ng-if="!$ctrl.service.queryMode">
        <div id="page-box-1">
            <p id="page-limit-text">(Discovery) Page Limit: {{$ctrl.service.pageLimit}}</p>

        </div>
        <div id="page-box-2">
            <i class="material-icons arrows" ng-click="$ctrl.pageBack()">arrow_back</i>
            <input id="page-selection-input" type="number" min="1" max="{{$ctrl.service.pageLimit}}" step="1" ng-model="$ctrl.service.pageNumber" ng-value="$ctrl.service.pageNumber">
            <i class="material-icons arrows" ng-click="$ctrl.pageForward()">arrow_forward</i>
        </div>
    </div>

    <!--Search Page Number Selector-->
    <div id="page-number-container" ng-if="$ctrl.service.queryMode">
        <div id="page-box-1">
            <p id="page-limit-text">(Search) Page Limit: {{$ctrl.service.pageLimit}}</p>

        </div>
        <div id="page-box-2">
            <i class="material-icons arrows" ng-click="$ctrl.pageBack()">arrow_back</i>
            <input id="page-selection-input" type="number" min="1" max="{{$ctrl.service.queryPageLimit}}" step="1" ng-model="$ctrl.service.queryPageNumber" ng-value="$ctrl.service.queryPageNumber" ng-model-options='{ debounce: 200 }' ng-change='$ctrl.service.searchMovies()'>
            <i class="material-icons arrows" ng-click="$ctrl.pageForward()">arrow_forward</i>
        </div>
    </div>
        `,
    controller: MovieListController
});

/* <p id="page-limit-text">Page Limit: {{$ctrl.pageLimit}}</p> */

// sample movie object:
// results: Array(20)
// 0:
// adult: false
// backdrop_path: "/7d6EY00g1c39SGZOoCJ5Py9nNth.jpg"
// genre_ids: (5) [28, 12, 16, 878, 35]
// id: 324857
// original_language: "en"
// original_title: "Spider-Man: Into the Spider-Verse"
// overview: "Miles Morales is juggling his life between being a high school student and being a spider-man. When Wilson "Kingpin" Fisk uses a super collider, others from across the Spider-Verse are transported to this dimension."
// popularity: 87.839
// poster_path: "/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg"
// release_date: "2018-12-07"
// title: "Spider-Man: Into the Spider-Verse"
// video: false
// vote_average: 8.4
// vote_count: 3590

/**
adult: false
backdrop_path: "/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg"
genre_ids: (3) [12, 878, 28]
id: 299534
original_language: "en"
original_title: "Avengers: Endgame"
overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store."
popularity: 323.106
poster_path: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
release_date: "2019-04-24"
starred: false
title: "Avengers: Endgame"
video: false
vote_average: 8.6
vote_count: 4484
 */