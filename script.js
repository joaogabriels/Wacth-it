const movieContainer = document.querySelector('#movie-container');
const searchBar = document.querySelector('#searchBar');
const pageLi = document.querySelector('#page-li');

const imgUrl = "https://image.tmdb.org/t/p/w500";

let page = 1;
let movies = [];

const getMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=8a2240559c31a8380bef9a3f6ed874d7&language=pt-BR&page=${page}`);
    movies = await response.json();
    console.log(movies)
    displayMovies(movies.results);
}

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredCharacters = movies.results.filter((movie) => {
        return movie.title.toLowerCase().includes(searchString); 
    });
    displayMovies(filteredCharacters);
});
    

const displayMovies = (movies) => {
    const movie = movies
        .map(({ title, poster_path, release_date}) => {
            return `
            <div class="col-lg-4 col-xl-3 p-5">
                <div class="d-flex flex-column justify-content-center align-items-center">
                    <img class="img-fluid" src=${imgUrl}${poster_path} alt=${title}/>
                    <p class="mt-2 h5">${title}</p>
                    <span>Data de lançamento: ${release_date}</span>
                </div>
            </div>
            `
        }).join("")
    movieContainer.innerHTML = movie;
}

function nextPage() {
    page++
    getMovies();
    pageLi.innerHTML = `
        <li class="page-item">
            <a class="page-link disabled" href="#">${page}</a>
        </li>
    `;
};

function previousPage() {
    if (page != 1) {
        page--
        getMovies();
        pageLi.innerHTML = `
        <li class="page-item">
            <a class="page-link disabled" href="#">${page}</a>
        </li>
    `;
    }
};

pageLi.innerHTML = `
        <li class="page-item">
            <a class="page-link disabled" href="#">${page}</a>
        </li>
    `;

getMovies();