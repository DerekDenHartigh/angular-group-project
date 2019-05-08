"use strict";

function MoreInfoController(MovieAppService) {

    const ctrl = this;
    ctrl.service = MovieAppService; // this binds/embeds object w/in controller - ist it for modeling/changing service
    
/* watchlist editor for star functionality */
    ctrl.watchlistEditor = ctrl.service.watchlistEditor;

/* genre id to string conversion */


    }

angular
.module('MovieApp')  
.component('moreInfo', {
    template: `
    <div id="detailed-movie-container" ng-repeat="movie in $ctrl.service.detailedMovie">

        <!-- absolutely positioned elements -->
        <img id="detailed-backdrop" src="{{movie.backdrop}}"> <!-- page background? -->
        <div class="star-container" id="detailed-star-container">
            <i class="material-icons star" id="detailed-star-empty" ng-hide="movie.starred" ng-click="$ctrl.watchlistEditor(movie)">star_border</i>
            <i class="material-icons star" id="detailed-star-full" ng-show="movie.starred" ng-click="$ctrl.watchlistEditor(movie)">star</i>
        </div>

        <!-- relatively positioned elements -->
        <img class="movie-poster image" id="detailed-movie-poster" alt="movie poster" ng-src="{{movie.poster}}"></img>
        
        <div id="detailed-info-pane"> <!-- translucent white background? -->
            <h1 class="movie-title title" id="detailed-title">{{movie.title}}</h1>
            <p class ="movie-description description" id="detailed-movie-description">{{movie.description}}</p>
            <p id="detailed-genres">Genres: <span class="detailed-genre-list">{{$ctrl.service.detailedMovieGenreString}}</span><p>
            <p id="detailed-vote-avg">User Rating: {{movie.avgVote}}</p>
        </div>
    </div>
        `,
    controller: MoreInfoController
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

/** Sample movieObj template:
 *               
 *  let movieObj = { // why is this done?  why not just return the child as is?
    title: child.title,
    poster: `https://image.tmdb.org/t/p/w185/` + child.poster_path, //Change thumbnail to appropraite return from API
    description: child.overview,  // Change permalink to appropraite return from API 
    backdrop: `https://image.tmdb.org/t/p/original/` + child.backdrop_path,
    avgVote: child.vote_average,
    releaseDate: release_date,
    genres: genre_ids,
    starred: false
    }
 */

/**
 * "genres": [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]
 */