"use strict";

function MovieAppService($http, $location, $rootScope) {

    const service = this;

    service.api_key = "1524464cc72ee93f90022d132d1d2e44";  // if user did need to log in, we'd need to give them one of these

    // variable initialization:
    // service.pageNumber = 1;
    // service.earliestReleaseDate;
    // service.latestReleaseDate;
    // service.genreSelection = [];
    // service.genresNotWanted = [];
    // service.runTimeGreaterThanOrEqual;
    // service.runTimeLessThanOrEqual;

    // Hardcoded variables for testing - should only return 1 page of action titles (no horror titles) from 2000-2019, of duration 0-120 min.
    
    service.pageNumber = 1;
    service.earliestReleaseDate = 2000;
    service.latestReleaseDate = 2019;
    service.genreSelection = "action";
    service.genresNotWanted = "horror";
    service.runTimeGreaterThanOrEqual = 0;
    service.runTimeLessThanOrEqual = 120;

    service.genreOptionArray = [];  // to populate our genre selections (check & X boxes for include/exclued)
        
        service.generateGenreArray = function (){
            console.error("clicked!")
            $http.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${service.api_key}`, function(data, status){
                data.forEach( genre => {
                    service.genreOptionArray.push(genre.name);
                })
            .then(console.log(service.genreOptionArray));
            return service.genreOptionArray;
        })};

        service.genreSelectionArray = [];
            // will need code that builds this when user checks a genre
            // will need code that splices out genres when user unchecks them
            // will need code so that genres can't be x'd and checked simultaneously

            service.genreSelectionArrayToString = function(){
                service.genreSelection = genreSelectionArray.join();
                // I don't need to return genreSelection right?
            }

        service.genreExlusionArray = [];
            // will need code that builds this array when user x's a genre
            // will need code that splices out genres when user unchecks them
            // will need code so that genres can't be x'd and checked simultaneously

            service.genreExclusionArrayToString = function(){
                service.genreExclusion = genreExclusionArray.join();
                // I don't need to return genreExclusion right?
            }

    service.callTheMovieDbApi = () => {
        return $http.get(`
        https://api.themoviedb.org/3/discover/movie?api_key=${service.api_key}
        &language=en-US
        &sort_by=popularity.desc
        &include_adult=false
        &include_video=false
        &page=${service.pageNumber}
        &release_date.gte=${service.earliestReleaseDate}
        &release_date.lte=${service.latestReleaseDate}
        &with_genres=${service.genreSelection}
        &without_genres=${service.genresNotWanted}
        &with_runtime.gte=${service.runTimeGreaterThanOrEqual}
        &with_runtime.lte=${service.runTimeLessThanOrEqual}
        `)

        // $hhtp(.get(ULR, {search object, movie: movie, genre: action, etc.}))
    };

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