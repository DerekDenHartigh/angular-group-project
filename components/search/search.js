"use strict";

function SearchController(MovieAppService, $scope, $timeout) { 
    const ctrl = this;
    const service = MovieAppService;
    ctrl.arrayOfParams = service.arrayOfParams; // binding arrayOfParams for watcher.

/* a watcher for all the params to refresh the page - it is supposed to watch for changes in arrayOfParams, then, on change, refresh the content w/ a 200ms throttle */

$scope.$watch("ctrl.arrayOfParams", function( newValue, oldValue ) {
    $timeout(service.callTheMovieDbApi(), 200);
    },true);

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

    // $scope.$watchCollection('$scope.genreSelectionArray', function(newArray, oldArray) {
    //     console.warn("scope.watch call");
    //     $timeout(service.callTheMovieDbApi(), 1000)
    //   });

    // $timeout($scope.$watchCollection('$scope.genreSelectionArray', function(newArray, oldArray) {
    //     console.warn("timeout first, then scope.watch call");
    //     service.callTheMovieDbApi();
    // }), 1000);

    // $timeout($scope.$watchCollection('$scope.genreSelectionArray', function(newArray, oldArray) {
    //     console.warn("watch genreSelection Array, wait 1 sec, then callAPI");}), 1000)
    //     .then(service.callTheMovieDbApi());

    /**     this is supposed to watch the genreSelectionArray for changes
     *      wait 1 sec (log that it is firing)
     *      then call the moviedbApi to re-render the page.
    */
    // $scope.$watchCollection('$scope.genreSelectionArray', ()=>{
    //     $timeout(console.warn("watch genreSelection Array, timeout function, then callAPI"), 1000)
    //     .then(service.callTheMovieDbApi());
    // });

    // $scope.runtimeSlider = {
    //     minValue: 0,
    //     // maxValue: 120,
    //     options: {
    //       floor: 0,
    //       ceil: 999,
    //       step: 10,
    //     //   showTicks: false,
    //       minLimit: 10,
    //       maxLimit:900
    //     }
    //   };

    //   $scope.ratingSlider = {
    //     minValue: 0,
    //     maxValue: 10,
    //     options: {
    //       floor: 0,
    //       ceil: 10,
    //       step: 1,
    //       showTicks: true,
    //     }
    //   };
    $scope.timevalue=0;
    $scope.timevaluemin =0;
    $scope.timevaluemax=300;
    $scope.ratingvalue=0;
    $scope.min=0;
    $scope.max=10;

}




angular
.module('MovieApp')  
.component('search', {
    template: `
    <h1 id="result-filter" ng-click="shown=!shown">Filter Your Results:<h1>

    <div name="search-spec-form" id="search-spec-form" ng-hide="!shown">

    <!--Genres-->
        <div class="genre-option-box" ng-repeat="genre in $ctrl.genreOptionArray">
            <label class="genre-option">{{genre.name}}</label>
            <div class="checkbox-box">
                <label class="checkbox-container genre-inclusion-checkbox-container">
                    Include: <input class="genre-inclusion-checkbox checkbox" type="checkbox" checked name="genre-inclusion[]" ng-click="$ctrl.checkboxIncludeFunction(genre)" />
                </label>
            </div>
        </div>

    <!--Runtime-->

    Time as range: <input type="range" name="range" ng-model="timevalue" min="{{timevaluemin}}"  max="{{timevaluemax}}">
    <hr>
    Time as number: <input type="number" ng-model="timevalue"><br><br><br>
    
    <!--Rating-->

    Rating as range: <input type="range" name="range" ng-model="ratingvalue" min="{{min}}"  max="{{max}}">
    <hr>
    Rating as number: <input type="number" ng-model="ratingvalue"><br> 










   

    </div>
        `,
    controller: SearchController
});

/**
 * Questions:
 * will changes to ctrl.genreOptionArray affect service.genreOptionArray?
 * will checkign the checkbox change the genre object?
 *      test function is working, need to model checkbox to change include to true
 * I might want to use ngChange instead of ngClick function, also,  maybe ngFalseValue?  thought false is already hardcoded
 * look into this for rezSliders: https://github.com/angular-slider/angularjs-slider/blob/master/README.md
 */


/**
 * example for what was inside the form:
 * 
 *      <label>Value1:
        <input type="checkbox" ng-model="checkboxModel.value1">
        </label><br/>
        <label>Value2:
        <input type="checkbox" ng-model="checkboxModel.value2"
                ng-true-value="'YES'" ng-false-value="'NO'">
        </label><br/>
        <tt>value1 = {{checkboxModel.value1}}</tt><br/>
        <tt>value2 = {{checkboxModel.value2}}</tt><br/>


        <details ng-open="showDetails">
            <summary>Copyright 1999-2016.</summary>
            <p> - by Refsnes Data. All Rights Reserved.</p>
        </details>


        <label class="container">One
            <input type="checkbox" checked="checked">
            <span class="checkmark"></span>
        </label>

        
            <div class="container" 
                <input class="genre-inclusion-checkbox checkbox" type="checkbox" ng-model="genreIncluded" checked="checked" ng-click="">
                <span class="checkmark"></span>
            </div>
            <div class="container">
                <input class="genre-exclusion-checkbox checkbox" type="checkbox" ng-model="genreExcluded">
                <span class="checkmark"></span>
            </div>

            lots of playing around
 */

 /**
  * template before I started messing with ng-open
  * <h1>Filter Your Results:<h1>
    <div name="genre-selection-form" id="genre-selection-form">
        <div class="genre-option-box" ng-repeat="genre in $ctrl.genreOptionArray">
            <label class="genre-option">{{genre.name}}</label>
            <label class="checkbox-container genre-inclusion-checkbox-container"><input class="genre-inclusion-checkbox checkbox" type="checkbox" name="genre-inclusion[]" ng-model="genreIncluded" /></label>
            <label class="checkbox-container genre-exclusion-checkbox-container"><input class="genre-exclusion-checkbox checkbox" type="checkbox" name="genre-exclusion[]" ng-model="genreExcluded"/></label>
        </div>
    </div>
  */

  /**
   * dual input range slider:
   * https://github.com/Wildhoney/ngRangeSlider
   * https://stackoverflow.com/questions/4753946/html5-slider-with-two-inputs-possible
   * http://jqueryui.com/slider/#rangemax
   * http://jqueryui.com/slider/#range
   * http://api.jqueryui.com/slider/#option-range
   * http://angular-slider.github.io/angularjs-slider/ - i think this is the winner - no dependencies
   * 
   * I'll use this to model runtime data and rating data
   * 
   * $( function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 500,
      values: [ 75, 300 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
  } );

  <p>
  <label for="amount">Price range:</label>
  <input type="text" id="amount" readonly style="border:0; color:#f6931f; font-weight:bold;">
</p>
 
<div id="slider-range"></div>


    <!--Runtime-->
        <p>
            <label for="runtime">Runtime:</label>
            <input type="text" id="runtime" readonly style="border:0; color:#f6931f; font-weight:bold;">
        </p>
        <div id="slider-range"></div>



        multiple rez sliders? example

        <rzslider rz-slider-model="verticalSlider.value"
          rz-slider-options="verticalSlider.options"></rzslider>

<rzslider rz-slider-model="verticalSlider2.minValue" rz-slider-high="verticalSlider2.maxValue"
          rz-slider-options="verticalSlider2.options"></rzslider>

<rzslider rz-slider-model="verticalSlider3.value"
          rz-slider-options="verticalSlider3.options"></rzslider>

<rzslider rz-slider-model="verticalSlider4.minValue" rz-slider-high="verticalSlider4.maxValue"
          rz-slider-options="verticalSlider4.options"></rzslider>

<rzslider rz-slider-model="verticalSlider5.value"
          rz-slider-options="verticalSlider5.options"></rzslider>

<rzslider rz-slider-model="verticalSlider6.value"
          rz-slider-options="verticalSlider6.options"></rzslider>
   */