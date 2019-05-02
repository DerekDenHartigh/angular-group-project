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
    <div name="genreSelectionForm">
        <div ng-repeat="genre in $ctrl.genreOptionArray">
            <label class="genreOption">{{genre.name}}
                <input class="genreInclusionCheckBox" type="checkbox" ng-model="genreIncluded" ng-click="if (checked)">
                <input class="genreExclusionCheckBox" type="checkbox" ng-model="genreExcluded">
            </label>
        </div>
    </div>
        `,
    controller: SearchController
});


/**
 * example for what was inside the form:
 *      <label>Value1:
        <input type="checkbox" ng-model="checkboxModel.value1">
        </label><br/>
        <label>Value2:
        <input type="checkbox" ng-model="checkboxModel.value2"
                ng-true-value="'YES'" ng-false-value="'NO'">
        </label><br/>
        <tt>value1 = {{checkboxModel.value1}}</tt><br/>
        <tt>value2 = {{checkboxModel.value2}}</tt><br/>
 */