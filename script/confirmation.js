let confirm = document.getElementById("confirm")



//confirm data

let confirm_data = JSON.parse(localStorage.getItem("confirmation"))


function home() {
    window.location = "index.html"
}


//confirm to book function is for just showing user to your completion is done.

function confirm_to_book(confirm_data) {
    let confirm_card = document.createElement("div")
    confirm_card.innerHTML = `<div class="card p-1 border border-dark shadow-lg" >
                <img id="small_img" src=${confirm_data.movie.img} class="card-img-top">
            <div class="card-body">
                    <h5 class="card-title">${confirm_data.movie.name}--${confirm_data.selected_seat.length} Tickets</h5>
                    <div class="p-2">
                    ${confirm_data.selected_seat.map(seat => {
        return `<span class="border p-2"> ${seat.slice(0, 6)} </span>`
    })}         </div>
                <h3>Per Ticket Price : ${confirm_data.movie.price}</h3>
                <h3>Total-Price : ${confirm_data.price}</h3>
                </div>
            </div>`
    return confirm_card
}


function timer() {
    let counter = 5
    let circle_div = document.createElement("div")
    circle_div.className = " col-lg-6 row  justify-content-center align-items-center col-md-6 col-12"
    let timer = setInterval(() => {
        counter--
        circle_div.innerHTML = ` <h3 class="p-3">
        Your Ticket has been booked successfully..Redirecting to home page in...
        
        </h3>
        <h3 style="font-size:10rem">${counter}</h3> 
                               
        `
        confirm.appendChild(circle_div)
        if (counter == 0) {
            clearInterval(timer)

            //after the completetion returning to homepage
            window.location = "index.html"
        }
    }, 1000);
}

function modifying_data() {
    let booked_history = JSON.parse(localStorage.getItem("booked_history")) || []
    booked_history.push(confirm_data)
    //collecting all booked history.
    localStorage.setItem("booked_history", JSON.stringify(booked_history))

    let seats = confirm_data.selected_seat
    let cur_movie_id = confirm_data.movie.id
    //getting allmovies to modify

    let movies = JSON.parse(localStorage.getItem("movies"))
    let remains = movies.filter(movie => {
        return movie.id !== cur_movie_id
    })
    let current_modify = movies.find(movie => {
        return movie.id == cur_movie_id
    })
}

modifying_data()





let card = confirm_to_book(confirm_data)
confirm.appendChild(card)
timer()





