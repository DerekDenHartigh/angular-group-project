"use strict";

function MovieListController(MovieAppService, $q) {

    const ctrl = this;
    const service = MovieAppService;
    ctrl.movieList = [];

    ctrl.getMovies = () => {
        return $q(function(resolve, reject) {
    
        MovieAppService.callTheMovieDbApi()
          .then ( (response) => {
            console.log(response);
             
              let children = response.results; 
              console.log(children);
      
                children.forEach( function(child, index) {
                  let movieObj = {
                    title: child.title,
                    poster: `https://image.tmdb.org/t/p/w185/` + child.poster_path, 
                    description: child.overview   
                  }
                 
                  
                  ctrl.movieList.push(movieObj);
                  
                  // Adjust for the number of movies to be returned? 
                  if ( index === (children.length - 1) ){
                    console.log(ctrl.movieList); 
                    resolve();
                  }
      
                })
            });
        });
      }
      
        ctrl.getMovies()
       
    }

    
angular
.module('MovieApp')  
.component('movieList', {
    template: `
    <div ng-repeat="post in $ctrl.movieList">
    <div id="box-container">
    <div class = "title">
      <h2>{{post.title}}</h2>
    </div>
    <div class = "image">
      <img ng-src="{{post.poster}}"></img>
    </div>
    <div class = "description">
        <p>{{post.description}}</p>
    </div>
    </div>
  </div>

        `,
    controller: MovieListController
});



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