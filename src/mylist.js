const myListBtn = document.getElementById('mylist');

var movieList = JSON.parse(localStorage.getItem('movies'));
movieList = movieList ? movieList : [];

var tvShowList = JSON.parse(localStorage.getItem('tvShows'));
tvShowList = tvShowList ? tvShowList : [];

myListBtn.addEventListener('click', ()=> {
    // Remove the active class from the movieBtn and TvShowBtn
    // Add the active class to the myListBtn
    if(movieNavBtn.classList.contains('active') || tvNavBtn.classList.contains('active')) {
        movieNavBtn.classList.remove('active');
        tvNavBtn.classList.remove('active');
        myListBtn.classList.add('active');

        // Clear the DOM by removing main and the genre filters.
        main.innerHTML = '';
        tagsElement.style.display = 'none';

        showSelectedMovies(movieList);
        showSelectedTVShows(tvShowList);
    }
});


function addMoviesToList(movie) {
    movieList.push(movie);
    localStorage.setItem('movies', JSON.stringify(movieList));
}

function addTVShowsToList(tvShow) {
    tvShowList.push(tvShow);
    localStorage.setItem('tvShows', JSON.stringify(tvShowList));
}

function removeMovieFromList(movie) {
    // Find index of the movie passed to remove
    const index = movieList.indexOf(movie);
    if(index > -1) {
        movieList.splice(index, 1);
        // Reload the movies after removal and update local storage data
        localStorage.setItem('movies', JSON.stringify(movieList));
    }
}

function removeTVShowsFromList(tvShow) {
    const index = tvShowList.indexOf(tvShow);
    if(index > -1) {
        tvShowList.splice(index, 1);
        localStorage.setItem('tvShows', JSON.stringify(tvShowList));
    }

}

function showSelectedMovies(movieList) {
    const movieRowTitle = document.createElement('h1');
    movieRowTitle.classList.add('watchlist-header')
    movieRowTitle.innerText= 'Movies'
    main.appendChild(movieRowTitle);
    if(movieList.length > 0) {
        movieList.forEach(movie => {
            const {title, poster_path, vote_average, overview, id} = movie;
            const movieElement = document.createElement('div');
            let id2 = id * -1;
            movieElement.classList.add('movie');
            movieElement.innerHTML = `
                <img src="${poster_path ? IMG_URL + poster_path: "https://via.placeholder.com/1080x1530"}" alt="${title}">
    
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getColor(vote_average)}">${vote_average}</span>
                </div>
    
                <div class="overview">
                    <h3>Overview</h3>
                    ${overview}
                    <br/>
                    <button class="know-more" id="${id}">More Details</button>
                    <button class="remove-list" id="${id2}">Remove</button>
                </div>
            `
            
            main.appendChild(movieElement);
    
            // Adding an action listener to the 'More Details' button for every
            // movieElement
            document.getElementById(id).addEventListener('click', () => {
                openMovieNav(movie);
            });
            
            // Adding an action listener to the 'Remove' button for every
            // movieElement
            document.getElementById(id2).addEventListener('click', ()=> {
                removeMovieFromList(movie);
            });
    
        })
    }

    else {
        const movieContent = document.createElement('h3')
        movieContent.classList.add('watchlist-header')
        movieContent.innerHTML = 'No Movies Added'
        main.appendChild(movieContent);

    }
    
}

function showSelectedTVShows(tvShowList) {
    const tvShowRowTitle = document.createElement('h1');
    tvShowRowTitle.classList.add('watchlist-header')
    tvShowRowTitle.innerText= 'TV Shows'
    main.appendChild(tvShowRowTitle);

    if(tvShowList.length > 0) {
        tvShowList.forEach(tvShow => {
            const {name, poster_path, vote_average, overview, id} = tvShow;
            const tvElement = document.createElement('div');
            let id2 = id * -1;
            tvElement.classList.add('tvShow');
            tvElement.innerHTML = `
                <img src="${poster_path ? IMG_URL + poster_path: "https://via.placeholder.com/1080x1530"}" alt="${name}">
    
                <div class="tvShow-info">
                    <h3>${name}</h3>
                    <span class="${getColor(vote_average)}">${vote_average}</span>
                </div>
    
                <div class="overview">
                    <h3>Overview</h3>
                    ${overview}
                    <br/>
                    <button class="know-more" id="${id}">More Details</button>
                    <button class="remove-list" id="${id2}">Remove</button>
                </div>
            `
            
            main.appendChild(tvElement);
    
            // Adding an action listener to the 'More Details' button for every
            // tvElement
            document.getElementById(id).addEventListener('click', () => {
                openTVNav(tvShow);
            });
    
            // Adding an action listener to the 'Remove' button for every
            // tvElement
            document.getElementById(id2).addEventListener('click', ()=> {
                removeTVShowsFromList(tvShow);
          });
        })
    }
    else {
        const tvContent = document.createElement('h3')
        tvContent.classList.add('watchlist-header')
        tvContent.innerHTML = 'No TV Shows Added'
        main.appendChild(tvContent);
    }
}
