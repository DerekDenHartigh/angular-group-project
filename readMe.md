Here's our Rubric, we have chosen the movie option.

ANGULAR PROJECT: MOVIE OPTION

Task: Use The Movie DB API to build an Angular app for searching and saving movies.

API: https://www.themoviedb.org/documentation/api

Build Specifications
1. Allow users to filter movies based on at least three criteria (e.g.: rating, genre, length).
    genre: checkboxes to include/exclude movies
    length & rating - was initially thinking about using dual scrollbars, but maybe input fields instead

2. Display movies that match the user’s selected criteria.
    watchlist page - this functinality has been achieved in search2 branch

3. Allow users to select individual movies to see more details.
    we show/hide the movie synopsis by use of ngShow/ngHide, perhaps more information should be given?

4. Allow users to mark moves from the results for a watchlist.
    watchlist array that is built from user selction - in the service

5. Include a separate route where users can
    a. See a list of movies they’ve marked for the watchlist
        this has been achieved with watchlist tab
b. Select individual movies to see more details
    I don't know that we are meeting this criteria yet...
    perhaps we can make a "More Details" link on the posts which populate a page with all the movie specific data
    c. Remove items from the watchlist
        Achieved on search2 w/ watchlist.

6. Do not implement log in. Built as if a user is already logged in.
        completely ignore this point?

7. Use at least three components:
    a. searchCriteria the criteria selection
    b. movieList for the list of results
    c. watchlistPage for the watchlist route

8. Must have a good user experience on desktop browsers. Mobile styling is not required.



Wishlist:
    scrollbars, more params (search box?)