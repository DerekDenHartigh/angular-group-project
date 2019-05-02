"use strict";

function SearchController(MovieAppService) { 
    const ctrl = this;
    const service = MovieAppService;
    ctrl.genreOptionArray = service.genreOptionArray
    ctrl.callGenerateGenreArray = function(){
        return service.generateGenreArray();
    };
}


angular
.module('MovieApp')  
.component('search', {
    template: `
    <h1>Search Criteria<h1>
    <div name="genre-selection-form" id="genre-selection-form">
        <div class="genre-option-box" ng-repeat="genre in $ctrl.genreOptionArray">
            <label class="genre-option">{{genre.name}}</label>
            <div class="container" 
                <input class="genre-inclusion-checkbox checkbox" type="checkbox" ng-model="genreIncluded" checked="checked" ng-click="">
                <span class="checkmark"></span>
            </div>
            <div class="container">
                <input class="genre-exclusion-checkbox checkbox" type="checkbox" ng-model="genreExcluded">
                <span class="checkmark"></span>
            </div>
        </div>
    </div>
        `,
    controller: SearchController
});


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
 */