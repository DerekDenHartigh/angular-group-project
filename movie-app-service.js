"use strict";

function MovieAppService($http, $location, $rootScope) {

    const service = this;

    service.api_key = "1524464cc72ee93f90022d132d1d2e44";  // if user did need to log in, we'd need to give them one of these

    service.responseData;
    service.pageNumber = 1;
    service.earliestReleaseDate;
    service.latestReleaseDate;
    service.genreSelection = [];
    service.genresNotWanted = [];
    service.runTimeGreaterThanOrEqual;
    service.runTimeLessThanOrEqual;
    service.ote_averageGreaterThanOrEqual;
    service.vote_averageLessThanOrEqual;

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
                response.data.genres.forEach( genre => {
                    genre.include = true;
                    genre.exclude = false;
                    service.genreOptionArray.push(genre); // genre is an object containing name(string) and id(number)
                    service.genreSelectionArray.push(genre.id);
                });
                service.genreSelectionArrayToString(); // stringifys Arrays
                service.genreExclusionArrayToString();
            });
        };
        service.generateGenreArray();

            // builds genreSelectionArray when user checks a desiredgenre
            service.addToGenreSelectionArray = function(genre){ // genreSelection should correspond to genre's ID
                service.genreSelectionArray.push(genre);
            }
            // searches out removedGenre and splices it from the genreSelectionArray
            service.removeFromGenreSelectionArray = function(genre){
                console.log(`genre being removed from genreSelectionArray: ${genre}`)
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
                console.log(`genre being removed from genreExclusionArray: ${genre}`)
                let target = service.genreExclusionArray.indexOf(genre);
                service.genreExclusionArray.splice(target, 1);
              };

            service.genreExclusionArrayToString = function(){
                service.genresNotWanted = service.genreExclusionArray.join();
            }

    service.watchlistArray = [];

        service.addToWatchlistArray = function(movie){
            service.watchlistArray.push(movie);
            console.log(`watchlistArray: ${watchlistArray}`);
        }

        service.removeFromWatchlistArray = function(movie){ // will this work with objects?
            console.log(`pre-splice watchlistArray: ${watchlistArray}`)
            let target = service.genreSelectionArray.indexOf(movie);
            service.genreSelectionArray.splice(target, 1);
            console.error(`post-splice watchlistArray: ${watchlistArray}`);
        };


    service.callTheMovieDbApi = () => {
        console.log(service.api_key, service.pageNumber, service.earliestReleaseDate, service.latestReleaseDate, 
            service.genreSelection, service.genresNotWanted, service.runTimeGreaterThanOrEqual, service.runTimeLessThanOrEqual, service.vote_averageGreaterThanOrEqual, service.vote_averageLessThanOrEqual)
            // all the variables are working as they should.
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
                with_genres: service.genreSelection,
                without_genres: service.genresNotWanted,
                'with_runtime.gte': service.runTimeGreaterThanOrEqual,
                'with_runtime.lte': service.runTimeLessThanOrEqual,
                'vote_average.gte': service.vote_averageGreaterThanOrEqual,
                'vote_average.lte': service.vote_averageLessThanOrEqual
            }
        })
        .then( (response)=>{
            console.log(response.data);
            service.responseData = response;  // saves data to service
            return response.data;
        })
    };
    // https://image.tmdb.org/t/p/w185_and_h278_bestv2/cmJ71gdZxCqkMUvGwWgSg3MK7pC.jpg - example of how to use poster image
    // service.callTheMovieDbApi();
}

angular
    .module("MovieApp")
    .service("MovieAppService", ["$http", "$location", "$rootScope", MovieAppService]);
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