"use strict";

function MovieListController(MovieAppService, $q) {

    const ctrl = this;
    const service = MovieAppService; // this only sets
    ctrl.service = MovieAppService; // this binds/embeds object w/in controller - ist it for modeling/changing service
    ctrl.pageNumber = service.pageNumber;


/* page forward/back functions */
    ctrl.pageBack = function(){
        if (service.pageNumber>1){
        ctrl.service.pageNumber -= 1;
        console.log('service.pageNumber:');
        console.log(service.pageNumber);
        }
        else if (service.pageNumber<=1){
            console.error("1 is the lowest possible page number")
        }
    }

    ctrl.pageForward = function(){
        if(service.pageNumber<service.responseData.total_pages){
            ctrl.service.pageNumber += 1;
            console.log('service.pageNumber:');
            console.log(service.pageNumber);
        }
        else if(service.pageNumber>=ctrl.service.responseData.total_pages){
            console.error("There aren't that many pages!")
        }
    }

/* watchlist button - moved logic to service for use by watch-list component*/

    ctrl.watchlistEditor = service.watchlistEditor

/* movie list generator - moved logic to service for reference by search module*/

    ctrl.movieList = ctrl.service.movieList;

    ctrl.getMovies = service.getMovies
    
    ctrl.getMovies()  // calls once
       
    }

angular
.module('MovieApp')  
.component('movieList', {
    template: `
    <!--Movie Display (title, poster, rating, description)-->
    <div id="movie-list-container">
        <div class="movie-post" ng-repeat="movie in $ctrl.movieList">
            <div class="title-container">
                <h1 class="movie-title title" ng-click="show=!show">{{movie.title}}</h1>
                <div class="spacer"></div>
                <div class="star-container">
                    <i class="material-icons star" ng-hide="movie.starred" ng-click="$ctrl.watchlistEditor(movie)">star_border</i>
                    <i class="material-icons star" ng-show="movie.starred" ng-click="$ctrl.watchlistEditor(movie)">star</i>
                </div>
            </div>
            <img class="movie-poster image" alt="movie poster" ng-src="{{movie.poster}}" ng-click="show=!show"></img>
            <p class ="movie-description description" ng-hide="!show">Synopsis:\n{{movie.description}}</p>
        </div>
    </div>

    <!--Page Number Selector-->
    <div id="page-number-container">
        <i class="material-icons arrows" ng-click="$ctrl.pageBack()">arrow_back</i>
        <input id="page-selection-input" type="number" min="1" step="1" ng-model="$ctrl.service.pageNumber" ng-value="$ctrl.service.pageNumber">
        <i class="material-icons arrows" ng-click="$ctrl.pageForward()">arrow_forward</i>
    </div>


<!-- movie list changes below, search branch above, will sort this out after merge -->
<!-- added ".title" ".image"  ".description"
        `,
    controller: MovieListController
});

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