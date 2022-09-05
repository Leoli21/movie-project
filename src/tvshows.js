// When the user clicks the TV Shows, display all TV Shows instead of the movies
// We can check this by seeing if the TV Shows <a> has the class 'active'

const API_URL_TV = BASE_URL + '/discover/tv?sort_by=popularity.desc&' + API_KEY;
const searchTVURL = BASE_URL + '/search/tv?' + API_KEY;

const tvNavBtn = document.getElementById('tvShowsNav');

// TV Show Genres Object
tvGenres = [
    {
      "id": 10759,
      "name": "Action & Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 10762,
      "name": "Kids"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10763,
      "name": "News"
    },
    {
      "id": 10764,
      "name": "Reality"
    },
    {
      "id": 10765,
      "name": "Sci-Fi & Fantasy"
    },
    {
      "id": 10766,
      "name": "Soap"
    },
    {
      "id": 10767,
      "name": "Talk"
    },
    {
      "id": 10768,
      "name": "War & Politics"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]


tvNavBtn.addEventListener('click', ()=> {
    // Remove the active class from the movieBtn
    // Add the active class to the tvBtn
    if(movieNavBtn.classList.contains('active')) {
        movieNavBtn.classList.remove('active');
        tvNavBtn.classList.add('active');
        setGenres();
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
            openTVNav(tvShow);
        });
    })
 }

 /* Open when someone clicks on the span element */
function openTVNav(tvShow) {
    let id = tvShow.id;
    fetch(BASE_URL + '/tv/' + id + '/videos?' + API_KEY).then(res=> res.json()).then(videoData => {
        console.log(videoData);
        if(videoData) {
            document.getElementById("myNav").style.width = "100%";
            if(videoData.results.length > 0) {
                var embed = [];
                var dots = [];
                videoData.results.forEach((video, idx) => {
                    let {key, name, site} = video;

                    if(site == 'YouTube') {
                        embed.push(`
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" class="embed hide" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        `)

                        dots.push(`
                            <span class="dot">${idx + 1}</span>
                        `)
                    }
                    
                });
                var content = `
                <h1 class='no-results'>${tvShow.original_name}</h1>
                <br/>
                
                ${embed.join('')}
                <br/>

                <div class="dots">${dots.join('')}</div>

                `
                overlayContent.innerHTML = content;
                activeSlide = 0;
                showVideos();
            }
            else {
                overlayContent.innerHTML = `<h1 class='no-results'>No Results Found</h1>`;
            }
        }
    });
  }