"use strict";

function MovieAppService($http, $location, $rootScope, $q) {

    const service = this;

    service.detailedMovie = []; // [{movieObj}] - an array of one
        service.detailedMovieGenreArray = [];  // stores names corresponding to genre id#s
        service.detailedMovieGenreString = "";

    service.api_key = "1524464cc72ee93f90022d132d1d2e44";  // if user did need to log in, we'd need to give them one of these

    service.responseData = {};

    service.pageNumber = 1;
    service.earliestReleaseDate = "";
    service.latestReleaseDate = "";
    service.genreSelection = [];
    service.genresNotWanted = [];
    service.runTimeGreaterThanOrEqual = 0
    service.runTimeLessThanOrEqual = 999;
    service.vote_averageGreaterThanOrEqual = 0;
    service.vote_averageLessThanOrEqual = 10;

    service.arrayOfParams = [service.pageNumber, service.earliestReleaseDate, service.latestReleaseDate,
        service.genreSelection, service.genresNotWanted, service.runTimeGreaterThanOrEqual, 
        service.runTimeLessThanOrEqual, service.ote_averageGreaterThanOrEqual, service.vote_averageLessThanOrEqual]

    service.movieList = [];

    // Hardcoded variables for testing - should only return 1 page of titles from 2000-2019, of duration 60-120 min.
    
    // service.pageNumber = 1;
    // service.earliestReleaseDate = 2000;
    // service.latestReleaseDate = 2019;
    // service.genreSelection;
    // service.genresNotWanted;
    // service.runTimeGreaterThanOrEqual = 60;
    // service.runTimeLessThanOrEqual = 120;
    // service.vote_averageGreaterThanOrEqual = 5;
    // service.vote_averageLessThanOrEqual = 10;

/* API call */

// Derek's pre-merge API call function:
// service.callTheMovieDbApi = () => {
//     console.log(service.api_key, service.pageNumber, service.earliestReleaseDate, service.latestReleaseDate, 
//         service.genreSelection, service.genresNotWanted, service.runTimeGreaterThanOrEqual, service.runTimeLessThanOrEqual, service.vote_averageGreaterThanOrEqual, service.vote_averageLessThanOrEqual)
//         // all the variables are working as they should.
//     $http.get('https://api.themoviedb.org/3/discover/movie', {
//         params: {
//             api_key: service.api_key,
//             language: "en-US",
//             sort_by: "popularity.desc",
//             include_adult: false,
//             include_video: false,
//             page: service.pageNumber,
//             'release_date.gte': service.earliestReleaseDate,
//             'release_date.lte': service.latestReleaseDate,
//             with_genres: service.genreSelection,
//             without_genres: service.genresNotWanted,
//             'with_runtime.gte': service.runTimeGreaterThanOrEqual,
//             'with_runtime.lte': service.runTimeLessThanOrEqual,
//             'vote_average.gte': service.vote_averageGreaterThanOrEqual,
//             'vote_average.lte': service.vote_averageLessThanOrEqual
//         }
//     })
//     .then( (response)=>{
        // response.data.results.forEach((movie)=>{ // this is to add starred boolean for watchlist usage
        //     movie.starred = false;
        // });
//         console.log(response.data);
//         service.responseData = response.data; // saves data to service
//         console.warn(service.responseData) // check to see that the data saved correctly
//         return response.data;  // don't need this since it is saved to service?
//     })
// };


/* incoming modified callTheMovieDbApi from movie-list branch, compare/contrast after merge */

service.callTheMovieDbApi = () => {
    return $q(function(resolve, reject){
        console.log("all the params in callTheMovieDbApi:");
        console.error(service.api_key, service.pageNumber, service.vote_averageGreaterThanOrEqual, service.earliestReleaseDate, service.latestReleaseDate, 
              service.genreSelection, service.genresNotWanted, service.runTimeLessThanOrEqual);
      $http.get('https://api.themoviedb.org/3/discover/movie', {
        params: {
            api_key: service.api_key,
            language: "en-US",
            sort_by: "popularity.desc",
            include_adult: false,
            include_video: false,
            page: service.pageNumber,
            'release_date.gte': service.earliestReleaseDate,
            'release_date.lte': service.latestReleaseDate,
            // 'with_genres': service.genreSelection,  // perhaps having both params breaks it?  i'm not sure why..
            'without_genres': service.genresNotWanted,
            // 'with_runtime.gte': service.runTimeGreaterThanOrEqual,
            'with_runtime.lte': service.runTimeLessThanOrEqual,
            'vote_average.gte': service.vote_averageGreaterThanOrEqual,
            'vote_average.lte': service.vote_averageLessThanOrEqual
        }
    })
    .then( (response)=>{
        response.data.results.forEach((movie)=>{ // this is to add starred boolean for watchlist usage
            movie.starred = false;
        });
        service.responseData = response.data; // saves data to service
        console.warn("service.responseData from callTheMovieDbApi") // check to see that the data saved correctly
        console.warn(service.responseData) // check to see that the data saved correctly
        resolve(response.data);  // the return of a promise
    })

    }
  )
};

service.getMovies = () => {
    // service.movieList = [];  // why does this prevent anything from showing?
    return $q(function(resolve, reject) {

    service.callTheMovieDbApi()
      .then ( (response) => {
        console.log("response of callTheMovieDbApi:");
        console.log(response);

          let children = response.results; //Adjust for proper API return
          console.log("children of response from getMovies:")
          console.log(children);
  

            children.forEach( function(child, index) {
                let isWatchlisted = ( service.isWatchlisted(child.id) !== false );
              let movieObj = { // why is this done?  why not just return the child as is?
                title: child.title,
                poster: `https://image.tmdb.org/t/p/w185/` + child.poster_path, //Change thumbnail to appropraite return from API
                description: child.overview,  // Change permalink to appropraite return from API 
                // I backdrop path broken - how to fix?
                backdrop: `https://image.tmdb.org/t/p/original/` + child.backdrop_path,
                avgVote: child.vote_average,
                releaseDate: child.release_date,
                genres: child.genre_ids, // array of genre id #s
                id: child.id,
                starred: isWatchlisted // if movie ID is in the watchlistArray, it returns a number, a number !== false, so this is true, if it returns false, false!==false is false.
              }

              service.movieList.push(movieObj);
  
              if ( index === (children.length - 1) ){
                console.log("service.movieList post array push from getMovies:")
                console.log(service.movieList);
                resolve();
              }
            })
        });
    });
  }

/* Genre Land */


    // Hardcoded variables for testing - should only return 1 page of titles from 2000-2019, of duration 60-120 min.
    
    // service.pageNumber = 1;
    // service.earliestReleaseDate = 2000;
    // service.latestReleaseDate = 2019;
    // service.genreSelection;
    // service.genresNotWanted;
    // service.runTimeGreaterThanOrEqual = 60;
    // service.runTimeLessThanOrEqual = 120;
    // service.vote_averageGreaterThanOrEqual = 5;
    // service.vote_averageLessThanOrEqual = 10;

/* Genre Land */
    service.genreOptionArray = [];  // to populate our genre selections (check & X boxes for include/exclued)
    service.genreSelectionArray = []; // houses preferred genres (initially same as genreOptionArray)
    service.genreExclusionArray = []; // houses excluded genres, initially empty
    
        service.generateGenreArray = function (){
            $http.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${service.api_key}`)
            .then( (response)=>{ // response includes headers
                console.error("response:")
                console.error(response)
                response.data.genres.forEach( genre => {
                    console.error(genre);
                    console.log(service.genreExclusionArray);
                    let genreChecked = (service.isCheckedFunction(genre.id));
                    genre.include = genreChecked;
                    genre.exclude = false;
                    service.genreOptionArray.push(genre); // genre is an object containing name(string) and id(number)
                    service.genreSelectionArray.push(genre.id);
                });
                service.genreSelectionArrayToString(); // stringifys Arrays
                service.genreExclusionArrayToString();
            });
        };
        service.generateGenreArray();

        service.isCheckedFunction = function(genreID){  // serches watchlist array for movie, if 
            let genreChecked = true;
            service.genreExclusionArray.forEach( (genre, index) => {
                if(genre.id === genreID){
                    genreChecked = false;
                }
            })

            return genreChecked;
        }

        //data.genres[n]

            // builds genreSelectionArray when user checks a desiredgenre
            service.addToGenreSelectionArray = function(genre){ // genreSelection should correspond to genre's ID
                service.genreSelectionArray.push(genre);
            }
            // searches out removedGenre and splices it from the genreSelectionArray
            service.removeFromGenreSelectionArray = function(genre){
                let target = service.genreSelectionArray.indexOf(genre);
                service.genreSelectionArray.splice(target, 1);
              };

            service.genreSelectionArrayToString = function(){
                service.genreSelection = service.genreSelectionArray.join();
            }

            service.addToGenreExclusionArray = function(genre){
                service.genreExclusionArray.push(genre);
            }

            service.removeFromGenreExclusionArray = function(genre){
                let target = service.genreExclusionArray.indexOf(genre);
                service.genreExclusionArray.splice(target, 1);
              };

            service.genreExclusionArrayToString = function(){
                service.genresNotWanted = service.genreExclusionArray.join();
            }

    service.watchlistArray = [];

        service.addToWatchlistArray = function(movie){ // adds movies to watchlist array from movie-list component
            service.watchlistArray.push(movie);
        }

        service.removeFromWatchlistArray = function(movie){ // will this work with objects? removes movies from watchlistArray
        
            let target = service.isWatchlisted(movie.id);

            if ( target === false ) {
                alert('no');
            } else {
                service.watchlistArray.splice(target, 1);
            }

         
        };

        service.watchlistEditor = function(movie){
            if(movie.starred === true){ // if star is filled out, add movie to watchlist array
                movie.starred = false;
                service.removeFromWatchlistArray(movie);
            }
            else if (movie.starred === false){ // if star is empty, remove from watchlist array
                movie.starred = true;
                service.addToWatchlistArray(movie);
            }
        }

        service.isWatchlisted = function(movieID){  // serches watchlist array for movie, if 
            let isWatchlisted = false;

            service.watchlistArray.forEach((movie, index)=>{
                if(movie.id === movieID){
                    isWatchlisted = index;
                }
            })

            return isWatchlisted;
        }

/* movie id to string converter */
        service.movieObjGenreArrayToString = function(movieObj){
            service.detailedMovieGenreArray = []; // empties out previous detailed movie's genres
            movieObj.genres.forEach((genre)=>{
                switch(genre) {
                    case 28: service.detailedMovieGenreArray.push("Action"); break;
                    case 12: service.detailedMovieGenreArray.push("Adventure"); break;
                    case 16: service.detailedMovieGenreArray.push("Animation"); break;
                    case 35: service.detailedMovieGenreArray.push("Comedy"); break;
                    case 80: service.detailedMovieGenreArray.push("Crime"); break;
                    case 99: service.detailedMovieGenreArray.push("Documentary"); break;
                    case 18: service.detailedMovieGenreArray.push("Drama"); break;
                    case 10751: service.detailedMovieGenreArray.push("Family"); break;
                    case 14: service.detailedMovieGenreArray.push("Fantasy"); break;
                    case 36: service.detailedMovieGenreArray.push("History"); break;
                    case 27: service.detailedMovieGenreArray.push("Horror"); break;
                    case 10402: service.detailedMovieGenreArray.push("Music"); break;
                    case 9648: service.detailedMovieGenreArray.push("Mystery"); break;
                    case 10749: service.detailedMovieGenreArray.push("Romance"); break;
                    case 878: service.detailedMovieGenreArray.push("Science Fiction"); break;
                    case 10770: service.detailedMovieGenreArray.push("TV Movie"); break;
                    case 53: service.detailedMovieGenreArray.push("Thriller"); break;
                    case 10402: service.detailedMovieGenreArray.push("Music"); break;
                    case 10752: service.detailedMovieGenreArray.push("War"); break;
                    case 37: service.detailedMovieGenreArray.push("Western"); break;
                    default: console.error("An invalid Genre ID was input to movieObjGenreArrayToString()")
                };
            })
            service.detailedMovieGenreString = service.detailedMovieGenreArray.join(", "); // converts array into a list
            return service.detailedMovieGenreString;
        }

}

angular
    .module("MovieApp")
    .service("MovieAppService", ["$http", "$location", "$rootScope", "$q", MovieAppService]);
    // felt cute, might need to strip some of these dependencies later



    /**
     * Derek's Key info:
     * API Key (v3 auth): 1524464cc72ee93f90022d132d1d2e44
     * Example API Request: https://api.themoviedb.org/3/movie/550?api_key=1524464cc72ee93f90022d132d1d2e44
     * API Read Access Token (v4 auth): eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTI0NDY0Y2M3MmVlOTNmOTAwMjJkMTMyZDFkMmU0NCIsInN1YiI6IjVjYzdhNmZlMGUwYTI2MzQ0N2YwMGE2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jF5Dpyw_d8cGwX_H-Nzm3-0Tb4GJcDxOhgsJhOEJLJg
     */

    /**
     * essential for specifying the get: https://developers.themoviedb.org/3/discover/movie-discover
     * 
     * https://api.themoviedb.org/3/discover/movie?api_key=1524464cc72ee93f90022d132d1d2e44
     * &language=en-US - makes language english
     * &sort_by=popularity.desc - sorts movies by popularity (descending, so most popular 1st?)
     * &include_adult=false - prevents NSFW content
     * &include_video=false - prevents videos from getting kicked out of API
     * &page=${pageNumber} - set page of results to query - we could do a next/previous page that increments/decriments this to allow user to keep browsing
     * &release_date.gte=${earliestReleaseDate} - if we wanted to set time-ranges on movie release dates
     * &release_date.lte=${latestReleaseDate} - if we wanted to set time-ranges on movie release dates
     * &with_genres=${genreSelection} - user could check genres they are interested in
     *      Comma separated value of genre ids that you want to include in the results.
     *      we'll need to use the Array.join() method for multiple genres
     *      e.g. https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_join
     * &without_genres=genresNotWanted - user could exclude genres they aren't interested in
     * &with_runtime.gte=runTimeGreaterThanOrEqual - user can specify min runtime (integer)
     * &with_runtime.lte=runTimeLessThanOrEqual - user can specicy max runtime (integer)
     */

    /**  RESOURCES
     * https://docs.angularjs.org/api/ng/service/$location - resource on using location service
     * https://docs.angularjs.org/api/ng/service/$http - resource on using http service
     * https://docs.angularjs.org/api/ng/type/$rootScope.Scope#$watch - resource on setting us a $watch service
     * 
     */

     /**
      * For Genres:
      * get: https://api.themoviedb.org/3/genre/movie/list?api_key=1524464cc72ee93f90022d132d1d2e44&language=en-US
      * returns: 
      * {
  "genres": [
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
}
    we can use this to build a genreOptionArray to populate our dropdown box.  
    e.g. while (n<genres.length) {service.genreOptionArray.push(genres[n].name)}
      */