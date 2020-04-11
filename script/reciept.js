function homePage() {
    window.location = "index.html"
}

//receipt at dom

let reciept = document.getElementById("reciept")

let booked_history = JSON.parse(localStorage.getItem("booked_history")) || []

function tickets(ticket, index) {
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
                    <h5 class="my-2"> Transaction id : ${ticket.t_id}</h5>
                    <h4 class="my-2">Per Ticket Price : ${ticket.movie.price}</h4>
                    <h4>Paid : ${ticket.price}</h4>

                    <button value=${ticket.t_id} id=${index} onclick="cancel_ticket(${ticket.movie.id})" class="btn btn-danger">Cancel Ticket</button>
                    </div >
                </div > `
    return ticket_card
}

if (booked_history.length == 0) {
    reciept.innerHTML = `<h3>You have not book any ticket</h3>`
}

else {
    booked_history.map((movie, index) => {
        reciept.appendChild(tickets(movie, index))
    })
}

function cancel_ticket(ticket_id) {
    let confirmation = confirm("Are you Sure?")
    if (confirmation) {
        let curr_cancel_ticket = booked_history.find(ticket => {
            return ticket.t_id == event.target.value
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
        booked_history.splice(event.target.id, 1)
        localStorage.setItem("booked_history", JSON.stringify(booked_history))
        without_curr_movies.push(modify_ticket)
        localStorage.setItem("movies", JSON.stringify(without_curr_movies))
        window.location.reload(true)

    }
    else {
        alert("Your ticket is safe..")
    }
}