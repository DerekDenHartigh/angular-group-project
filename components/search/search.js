"use strict";

    /* slider logic */
    /* runtime */
    $( "#slider-range" ).slider({
        range: true,
        step: .5,
        min: 0,
        max: 10,
        values: [ 0, 10 ],
        slide: function( event, ui ) {
          $( "#runtime" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        }
      });
      $( "#runtime" ).val($( "#slider-range" ).slider( "values", 0 ) +
        " - " + $( "#slider-range" ).slider( "values", 1 ) );
    /* rating */


function SearchController(MovieAppService) { 
    const ctrl = this;
    const service = MovieAppService;
    ctrl.genreOptionArray = service.genreOptionArray  // will changes to ctrl.genreOptionArray affect service.genreOptionArray?
    ctrl.callGenerateGenreArray = function(){
        return service.generateGenreArray();
    };

    ctrl.checkboxIncludeFunction = function(genre){
        genre.include = !genre.include; // toggles true/false on checkbox click - default is false
        console.log(genre);
        console.warn(ctrl.genreOptionArray);
        console.error(service.genreOptionArray);
    };

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
                    Include: <input class="genre-inclusion-checkbox checkbox" type="checkbox" name="genre-inclusion[]" ng-model="genre.include" ng-click="$ctrl.checkboxIncludeFunction(genre)" />
                </label>
                <label class="checkbox-container genre-exclusion-checkbox-container">
                    Exclude: <input class="genre-exclusion-checkbox checkbox" type="checkbox" name="genre-exclusion[]" ng-model="genre.exclude"/>
                </label>
            </div>
        </div>

    <!--Runtime-->
        <p>
            <label for="runtime">Runtime:</label>
            <input type="text" id="runtime" readonly style="border:0; color:#f6931f; font-weight:bold;">
        </p>
        <div id="slider-range"></div>

    <!--Rating-->
        
    </div>
        `,
    controller: SearchController
});

/**
 * Questions:
 * will changes to ctrl.genreOptionArray affect service.genreOptionArray?
 * will checkign the checkbox change the genre object?
 *      test function is working, need to model checkbox to change include to true
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

   */