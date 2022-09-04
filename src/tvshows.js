// When the user clicks the TV Shows, display all TV Shows instead of the movies
// We can check this by seeing if the TV Shows <a> has the class 'active'

const API_URL_TV = BASE_URL + '/discover/tv?sort_by=popularity.desc&' + API_KEY;
const searchTVURL = BASE_URL + '/search/tv?' + API_KEY;

const tvNavBtn = document.getElementById('tvShowsNav');

tvNavBtn.addEventListener('click', ()=> {
    // Remove the active class from the movieBtn
    // Add the active class to the tvBtn
    if(movieNavBtn.classList.contains('active')) {
        movieNavBtn.classList.remove('active');
        tvNavBtn.classList.add('active');
        getTVShows(API_URL_TV);
    }
}); 

// Get Data From TMDB API
function getTVShows(url) {
    lastUrl = url;
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        if(data.results.length != 0) {
            showTVShows(data.results);
            currentPage = data.page;
            nextPage = currentPage + 1;
            prevPage = currentPage - 1;
            totalPages = data.total_pages;
            
            current.innerText = currentPage;

            if(currentPage <= 1) {
                prev.classList.add('disabled');
                next.classList.remove('disabled');
            }
            else if(currentPage >= totalPages) {
                prev.classList.remove('disabled');
                next.classList.add('disabled');
            }
            else {
                prev.classList.remove('disabled');
                next.classList.remove('disabled');
            }

            tagsElement.scrollIntoView({behavior : 'smooth'});
        }
        else {
            main.innerHTML = `<h1 class='no-results'>No Results Found</h1>`
        }
        
    });
 }

 // Display the TV Shows
 function showTVShows(data) {
    main.innerHTML = '';

    data.forEach(tvShow => {
        const {name, poster_path, vote_average, overview, id} = tvShow;
        const tvElement = document.createElement('div');
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
            </div>
        `
        
        main.appendChild(tvElement);
        document.getElementById(id).addEventListener('click', () => {
            openNav(tvShow);
        });
    })
 }