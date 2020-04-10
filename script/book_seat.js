
// container where current movies going to book

let curr_movie_book = document.getElementById("curr_movie_book")

// current selected movie
let selected_movie = localStorage.getItem("movie_id")

// all movie list 
let all_movies = JSON.parse(localStorage.getItem("movies")) || []

let curr_movie = all_movies.find(movie => {
    return movie.id == selected_movie
})

console.log(curr_movie)

let user_activity = {}

function movie_info(movie) {
    // curr_movie is an object which property will helps to make card
    let card = document.createElement("div")
    card.className = "col-12 col-md-6 col-lg-4 bg-light my-1"
    card.innerHTML = `<div class="card p-1 " >
                                <img id="movie_picture" src=${movie.img} class="card-img-top">
                            <div class="card-body">
                                    <h5 class="card-title">${movie.name}</h5>
                                    <h3>Ticket-Price : ${movie.price}</h3>
                            </div>
                        </div>`
    return card
}


function seat_arrange(movie) {
    let card = document.createElement("div")
    let prices = JSON.parse(localStorage.getItem("select_movie")) || []
    card.className = "col-12 col-md-6 col-lg-8 bg-light my-1"
    card.innerHTML = `<div class="row border p-2 justify-content-center" >
                              ${Object.keys(movie.availablity).map(name => { return `<img onclick="select_seat()" title=${name} name=${name} id="seat" src="pictures/cinema-seat.svg">` })}</div>
                        <div class="row bg-light border">
                                <div class="p-1">
                                    <div class="">
                                         <h4 class="mx-1">Seat Selected :  ${prices.length}</h4>
                                        ${prices.map(p => { return `<span class="mx-2 border p-1"> ${p}</span>` })}
                                     </div>
                                <div class=" bg-light text-right p-3"> 
                                Total : ${movie.price} X ${prices.length} = ${prices.length * movie.price}
                                    </div>
                                </div>
                        </div>
                        
                        `
    return card
}


function select_seat() {
    let set = JSON.parse(localStorage.getItem("select_movie")) || []
    if (set.includes(event.target.name)) {
        let deselect_index = set.indexOf(event.target.name)
        set.splice(deselect_index, 1)
        localStorage.setItem("select_movie", JSON.stringify(set))
        window.location.reload(true)
    }
    else {
        set.push(event.target.name)
        localStorage.setItem("select_movie", JSON.stringify(set))
        window.location.reload(true)

    }
}







curr_movie_book.appendChild(movie_info(curr_movie))
curr_movie_book.appendChild(seat_arrange(curr_movie))





