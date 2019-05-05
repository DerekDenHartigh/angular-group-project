"use strict";

function SearchController(MovieAppService, $scope) { 
    const ctrl = this;
    const service = MovieAppService;
    ctrl.genreOptionArray = service.genreOptionArray  // will changes to ctrl.genreOptionArray affect service.genreOptionArray?
    ctrl.callGenerateGenreArray = function(){
        return service.generateGenreArray();
    };

    ctrl.checkboxIncludeFunction = function(genre){
        genre.include = !genre.include; // toggles true/false on checkbox click - default is false
    };

    ctrl.checkboxExcludeFunction = function(genre){
        genre.include = !genre.include; // toggles true/false on checkbox click - default is false
    };

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
    // $scope.timevalue=0;
    // $scope.timevaluemin =0;
    // $scope.timevaluemax=300;
    // $scope.ratingvalue=0;
    // $scope.min=0;
    // $scope.max=10;

}




angular
.module('MovieApp')  
.component('search', {
    template: `
    <h1 id="result-filter" ng-click="shown=!shown">Find The Perfect Movie<h1>

    <div name="search-spec-form" id="search-spec-form" ng-hide="!shown">

    <!--Genres-->
        <div class="genre-option-box" ng-repeat="genre in $ctrl.genreOptionArray">
            <label class="genre-option">{{genre.name}}</label>
            <div class="checkbox-box">
                <label class="checkbox-container genre-inclusion-checkbox-container">
                    <input class="genre-inclusion-checkbox checkbox" type="checkbox" checked name="genre-inclusion[]" ng-click="$ctrl.checkboxIncludeFunction(genre)" />
                </label>
            </div>
        </div>

    <!--Runtime-->

    <!-- Time as range: <input type="range" name="range" ng-model="timevalue" min="{{timevaluemin}}"  max="{{timevaluemax}}">
    // <hr>
    // Time as number: <input type="number" ng-model="timevalue"><br><br><br>
    
    // Rating as range: <input type="range" name="range" ng-model="ratingvalue" min="{{min}}"  max="{{max}}">
    // <hr>
    // Rating as number: <input type="number" ng-model="ratingvalue"><br> -->

    <span class="rating">
    <input type="radio" class="rating-input"
        id="rating-input-1-5" name="rating-input-1">
    <label for="rating-input-1-5" class="rating-star"></label>
    <input type="radio" class="rating-input"
        id="rating-input-1-4" name="rating-input-1">
    <label for="rating-input-1-4" class="rating-star"></label>
    <input type="radio" class="rating-input"
        id="rating-input-1-3" name="rating-input-1">
    <label for="rating-input-1-3" class="rating-star"></label>
    <input type="radio" class="rating-input"
        id="rating-input-1-2" name="rating-input-1">
    <label for="rating-input-1-2" class="rating-star"></label>
    <input type="radio" class="rating-input"
        id="rating-input-1-1" name="rating-input-1">
    <label for="rating-input-1-1" class="rating-star"></label>
</span>











   

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