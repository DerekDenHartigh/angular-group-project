Here's our Rubric, we have chosen the movie option.

ANGULAR PROJECT: MOVIE OPTION

Task: Use The Movie DB API to build an Angular app for searching and saving movies.

API: https://www.themoviedb.org/documentation/api

Build Specifications
1. Allow users to filter movies based on at least three criteria (e.g.: rating, genre, length).
    ng-modeled dropboxes/options paired with ng-repeat filter?

2. Display movies that match the user’s selected criteria.
    see above note

3. Allow users to select individual movies to see more details.
    ng-open ng-close
    https://www.w3schools.com/angular/tryit.asp?filename=try_ng_ng-open

4. Allow users to mark moves from the results for a watchlist.
    watchlist array that is built from user selction - in the service

5. Include a separate route where users can
    a. See a list of movies they’ve marked for the watchlist
    b. Select individual movies to see more details
    c. Remove items from the watchlist
        one page, populated by favoritesArray, see point 3 for additional information, a function that cuts targeted movies from array.

6. Do not implement log in. Built as if a user is already logged in.
        completely ignore this point?

7. Use at least three components:
    a. searchCriteria the criteria selection
    b. movieList for the list of results
    c. watchlistPage for the watchlist route

8. Must have a good user experience on desktop browsers. Mobile styling is not required.