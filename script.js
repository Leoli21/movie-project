// TMDB API info

const API_KEY = 'api_key=d38867bd0697712d7274de2cbbe45fc5';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

const genres = [
    {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
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
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }
]


const main = document.getElementById('main');
const form = document.getElementById('form');
const searchBar = document.getElementById('search');
const tagsElement = document.getElementById('tags');

var selectedGenre = [];
setGenres();

// Dynamically adds the genre tags and when 'clicked', it only displays movies
// of those genres
function setGenres() {
    tagsElement.innerHTML = ''
    genres.forEach(genre => {
        const div = document.createElement('div');
        div.classList.add('tag');
        div.id = genre.id;
        div.innerText = genre.name;
        div.addEventListener('click', ()=> {
            if(selectedGenre.length == 0) {
                selectedGenre.push(genre.id);
            }
            else {
                if(selectedGenre.includes(genre.id)) {
                    selectedGenre.forEach((id, idx) => {
                        if(id == genre.id) {
                            selectedGenre.splice(idx, 1);
                        }
                    });
                }
                else {
                    selectedGenre.push(genre.id);
                }
            }
            console.log(selectedGenre);
            getMovies(API_URL + '&with_genres=' + encodeURI(selectedGenre.join(',')));
            highlightSelection();
        });
        tagsElement.append(div);

    })

}

// Adds a class to the element tags that are selected
function highlightSelection() {
    const tags = document.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.classList.remove('highlight');
    });

    if(selectedGenre.length != 0) {
        selectedGenre.forEach(id => {
            const highlightedTag = document.getElementById(id);
            highlightedTag.classList.add('highlight');
        })
    }
    
}

getMovies(API_URL);

// Get Data From TMDB API
 function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        if(data.results.length != 0) {
            showMovies(data.results);
        }
        else {
            print('Working');
            main.innerHTML = `<h1 class='no-results'>No Results Found</h1>`
        }
        
    });
 }

 // Display the movies
 function showMovies(data) {
    main.innerHTML = '';

    data.forEach(movie => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieElement = document.createElement('div');
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
            </div>
        `

        main.appendChild(movieElement);
    })
 }

 // Get the correct color for each vote
 function getColor(vote) {
    if(vote >= 8) {
        return 'green';
    }
    else if(vote >= 5) {
        return 'orange';
    }
    else {
        return 'red';
    }
 }

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const searchTerm = searchBar.value;

    if(searchTerm) {
        getMovies(searchURL + '&query=' + searchTerm);
    }
    else {
        getMovies(API_URL);
    }
});