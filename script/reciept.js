function homePage() {
    window.location = "index.html"
}

//receipt at dom

let reciept = document.getElementById("reciept")

let booked_history = JSON.parse(localStorage.getItem("booked_history")) || []

function tickets(ticket) {
    let ticket_card = document.createElement("div")
    ticket_card.className = "col-sm-12 col-md-6 col-lg-4"
    ticket_card.innerHTML =
        `<div class="card border border-dark shadow-lg" >
                    <img id="small_img" src=${ticket.movie.img} class="card-img-top">
                     <div class="card-body">
                        <h5 class="card-title">${ticket.movie.name}--${ticket.selected_seat.length} Tickets [ Time: ${ticket.movie.timing.from} -${ticket.movie.timing.to}]</h5 >
                    <div class="p-2 border shadow-sm">
                        ${ticket.selected_seat.map(seat => {
            return `<span class="p-2 my-1"> ${seat.slice(0, 6).trim()} </span>`
        })}         </div>
                    <h5 class="my-2"> Transaction id : ${Math.floor(Math.random() * 34567876)}</h5>
                    <h4 class="my-2">Per Ticket Price : ${ticket.movie.price}</h4>
                    <h4>Paid : ${ticket.price}</h4>

                    <button onclick="cancel_ticket(${ticket.movie.id})" class="btn btn-danger">Cancel Ticket</button>
                    </div >
                </div > `
    return ticket_card
}

if (booked_history.length == 0) {
    reciept.innerHTML = `<h3>You have not book any ticket</h3>`
}

else {
    booked_history.map(movie => {
        reciept.appendChild(tickets(movie))
    })
}

function cancel_ticket(ticket_id) {
    let confirmation = confirm("Are you Sure?")
    if (confirmation) {
        let curr_cancel_ticket = booked_history.find(ticket => {
            return ticket.movie.id == ticket_id
        })
        let get_curr_index;
        booked_history.forEach((e, i) => {
            if (e.movie.id == ticket_id) {
                get_curr_index = i
            }
        })
        let seats = curr_cancel_ticket.selected_seat.map(e => e.slice(0, 6).trim())
        let movies = JSON.parse(localStorage.getItem("movies"))
        let without_curr_movies = movies.filter(e => {
            return e.id !== ticket_id
        })
        let modify_ticket = movies.find(movie => {
            return movie.id == ticket_id
        })
        seats.forEach(seat => {
            modify_ticket["availablity"] = {
                ...modify_ticket["availablity"],
                [seat]: true
            }
        })
        booked_history.splice(get_curr_index, 1)
        localStorage.setItem("booked_history", JSON.stringify(booked_history))
        without_curr_movies.push(modify_ticket)
        localStorage.setItem("movies", JSON.stringify(without_curr_movies))
        window.location.reload(true)
    }
    else {
        alert("Your ticket is safe..")
    }
}