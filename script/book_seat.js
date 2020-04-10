
// container where current movies going to book

let curr_movie_book = document.getElementById("curr_movie_book")

// current selected movie
let selected_movie = localStorage.getItem("movie_id")

// all movie list 
let all_movies = JSON.parse(localStorage.getItem("movies")) || []

let curr_movie = all_movies.find(movie => {
    return movie.id == selected_movie
})

localStorage.setItem("curr_movie", JSON.stringify(curr_movie))

console.log(curr_movie)


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
    let select_movie = JSON.parse(localStorage.getItem("select_movie")) || []
    card.className = "col-12 col-md-6 col-lg-8 bg-light my-1"
    card.innerHTML = `<div class="row border p-2 justify-content-center" >
                              ${Object.keys(movie.availablity).map(name => { return `<img onclick="select_seat()" title=${name} name=${name} class="${name} seat" src="pictures/cinema-seat.svg">` })}</div>
                                <div class=" bg-light border border-dark shadow-lg my-2">
                                <div class="p-1">
                                    <div class="">
                                         <h4 class="mx-1">Seat Selected :  ${select_movie.length}</h4>
                                        ${select_movie.map(p => { return `<span class="mx-2 border px-1"> ${p.slice(0, 6)}</span>` })}
                                     </div>
                                <div class="row border border-dark bg-light justify-content-end p-1"> 
                                 <h5> Total :  ${movie.price} x ${select_movie.length} = ${select_movie.length * movie.price}</h5>
                                    </div>
                                <div class="row justify-content-between px-4 my-1">
                                    <button onclick="cancelTicket()" class="btn btn-danger">Cancel</button>
                                    <button onclick="payment(${select_movie.length * movie.price})" class="btn btn-success">Go to Payment Page</button>
                                </div>
                                </div>
                        </div>
                     `
    return card
}

function selected_seat_color() {
    let set = JSON.parse(localStorage.getItem("select_movie")) || []
    let all_seats = document.getElementsByClassName("seat")
    let i = 0
    if (set.length !== 0) {
        while (i <= 11) {
            console.log(all_seats[i].className)
            if (set.includes(all_seats[i].className)) {
                all_seats[i].style.backgroundColor = 'green'
            }
            i += 1
        }
    }
}


function select_seat() {
    let set = JSON.parse(localStorage.getItem("select_movie")) || []
    if (set.includes(`${event.target.name} seat`)) {
        let deselect_index = set.indexOf(`${event.target.name} seat`)
        set.splice(deselect_index, 1)
        localStorage.setItem("select_movie", JSON.stringify(set))
        window.location.reload(true)
        selected_seat_color()
    }
    else {
        set.push(`${event.target.name} seat`)
        localStorage.setItem("select_movie", JSON.stringify(set))
        window.location.reload(true)
        selected_seat_color()
    }
}

function cancelTicket() {
    window.location = "index.html"
}


function payment(price) {
    if (price > 0) {
        window.location = "Booking_confirm.html"
        let select_seat = JSON.parse(localStorage.getItem("select_movie")) || []
        let ticket_history = JSON.parse(localStorage.getItem("ticket_history")) || []
        ticket_history.push({ "selected_seat": select_seat, "price": price, "movie": curr_movie })

        localStorage.setItem("ticket_history", JSON.stringify(ticket_history))
    }
    else {
        alert("Please select any seat")
    }

}

curr_movie_book.appendChild(movie_info(curr_movie))
curr_movie_book.appendChild(seat_arrange(curr_movie))
selected_seat_color()






