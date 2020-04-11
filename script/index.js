//reseting every time of current movie  selected 
localStorage.removeItem("select_movie")
localStorage.removeItem("movie_id")


// place where movies list going to display
let movies_list = document.getElementById("movies_list")

//getting data from local storage to render on page

let movies = JSON.parse(localStorage.getItem("movies")) || []

//getting languages input, genre input to filter.
let language = document.getElementById("language")
let genre = document.getElementById("genre")

//values of languages and genre
let curr_language = language.value
let curr_genre = genre.value

language.addEventListener("change", (event) => {
    curr_language = event.target.value
})

genre.addEventListener("change", (event) => {
    curr_genre = event.target.value
})

// filter function which will help to filtering movies as user experience
function search_movie() {
    console.log(curr_language)
    console.log(curr_genre)
    let filtered = movies
    //filtering every time whenever user choose another category
    filtered = movies.filter(movie => {
        if (movie.languages.includes(curr_language) && movie.generes.includes(curr_genre)) {
            return true
        }
    })
    movies_list.innerHTML = ""
    console.log(filtered)
    if (filtered.length == 0) {
        movies_list.innerHTML = `<h3> Not Available</h3>`
    }
    else {
        document.title = `Current Movies`
        append_card_to_dom(filtered)
    }

}


//invoking function to dom.
search_movie()

//generating cards for movies listing

function generate_card(curr_movie) {
    // curr_movie is an object which property will helps to make card
    let card = document.createElement("div")
    card.className = "col-lg-4 col-md-6 col-12  p-2 bg-light"
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
                            <button onclick="book_ticket()" class="btn btn-success my-3" id=${curr_movie.id}>Proccess</button>
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

//select seat for movie

function book_ticket() {
    let selected_movie = event.target.id
    localStorage.setItem("movie_id", selected_movie)
    window.location = "book_seat.html"
}


function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos => {
            let xml = new XMLHttpRequest()
            xml.open('GET', `https://geolocation-db.com/jsonp`, true)
            xml.overrideMimeType("application/json");
            xml.onreadystatechange = function () {
                callback(xml.response)
            }
            xml.send({})
        }))
    }
}

async function city_filter(curr_city) {
    console.log("curr", curr_city)
    let city_wise_movie = movies.filter(movie => {
        if (movie.locations.includes(curr_city)) {
            return true
        }
    })
    return city_wise_movie
}


async function getCity(city) {
    if (city) {
        let curr_address_info = city.slice(11).split(",").map(e => e.split(":"))
        console.log(curr_address_info[2][1])
        // console.log(cur)
        curr_city = curr_address_info[2][1].slice(1, curr_address_info[2][1].length - 1)
        console.log("loading....")
        if (curr_city) {
            let city_wise_movie = await city_filter(curr_city)
            console.log(city_wise_movie, "solved")

            document.title = `${city_wise_movie.length} Movies Found in ${curr_city} `
            movies_list.innerHTML = ""
            append_card_to_dom(city_wise_movie)
        }
    }
}
getLocation(getCity)







