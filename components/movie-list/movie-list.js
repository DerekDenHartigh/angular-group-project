"use strict";

function MovieListController(MovieAppService) {

    const ctrl = this;
    const service = MovieAppService;
    ctrl.movieList = [];

    ctrl.getMovies = () => {
        return $q(function(resolve, reject) {
    
        MovieAppService.getMovies()
          .then ( (response) => {
            console.log(response);
             
              let children = response.data.data.children; //Adjust for proper API return
      
                children.forEach( function(child, index) {
                  let movieObj = {
                    title: child.data.title,
                    poster: child.data.thumbnail, //Change thumbnail to appropraite return from API
                    description: child.data.permalink  // Change permalink to appropraite return from API 
                  }
                  
                  ctrl.movieList.push(movieObj);
      
                  if ( index === (children.length -1) ){
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
    </div>
  </div>

        `,
    controller: MovieListController
});