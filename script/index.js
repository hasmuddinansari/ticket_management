// place where movies list going to display
let movies_list = document.getElementById("movies_list")

//getting data from local storage to render on page

let movies = JSON.parse(localStorage.getItem("movies")) || []

//invoking function to dom.
append_card_to_dom(movies)


//generating cards for movies listing

function generate_card(curr_movie) {
    // curr_movie is an object which property will helps to make card
    let card = document.createElement("div")
    card.className = "col-12 col-md-6 col-lg-4 p-2 bg-light"
    card.innerHTML = `<div class="card p-1 " >
                            <img id="movie_picture" src=${curr_movie.img} class="card-img-top">
                        <div class="card-body">
                                <h5 class="card-title">${curr_movie.name}</h5>
                                <p class="card-text">${curr_movie.desc}</p>
                                <ul class="list-group"> 
                                    <li class="list-group-item">
                                        ${curr_movie.locations.map(e => { return e })}
                                    </li>
                                </ul>  
                            <button class="btn btn-success my-3" id=${curr_movie.id}>Proccess</button>
                        </div>
                    </div>`
    return card
}



function append_card_to_dom(movies) {
    movies.forEach(curr_movie => {
        let movie_card = generate_card(curr_movie)
        //appending to dom 
        movies_list.appendChild(movie_card)
    })
}











