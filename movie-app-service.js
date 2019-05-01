"use strict";

function MovieAppService($http) {

    // Below is code from the reddit lab that we can modify for our own API usage
    const service = this;
    service.api_key = "1524464cc72ee93f90022d132d1d2e44";

    service.callTheMovieDbApi = () => {
        return $http.get(`api.themoviedb.org/3/movie/76341?api_key=1524464cc72ee93f90022d132d1d2e44`)

        // $hhtp(.get(ULR, {search object, movie: movie, genre: action, etc.}))
    };
}

angular
    .module("MovieApp")
    .service("MovieAppService", ["$http", MovieAppService]);



    /**
     * Derek's Key info:
     * API Key (v3 auth): 1524464cc72ee93f90022d132d1d2e44
     * Example API Request: https://api.themoviedb.org/3/movie/550?api_key=1524464cc72ee93f90022d132d1d2e44
     * API Read Access Token (v4 auth): eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTI0NDY0Y2M3MmVlOTNmOTAwMjJkMTMyZDFkMmU0NCIsInN1YiI6IjVjYzdhNmZlMGUwYTI2MzQ0N2YwMGE2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jF5Dpyw_d8cGwX_H-Nzm3-0Tb4GJcDxOhgsJhOEJLJg
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
    we can use this to build a genreArray to populate our dropdown box.  
    e.g. while (n<genres.length) {service.genreArray.push(genres[n].name)}
      */