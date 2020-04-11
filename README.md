# BookMyMovies

```
BookMyMovies offers to book ticket online.
```

# Website

https://hasmuddinansari.github.io/ticket_management/index.html

### Features in Website
1. User can book multiple tickets
2. User can find movies at their city if they will give access to location.
2. User can search movies as basis of their languages and genres
3. User can cancel booked movie


## Technology used
1. HTML
2. CSS
3. Bootstrap
4. Javascript

## Tools
1. Local Storage
2. Geolocatoin


## getting current location 


```
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

````

### Adding Json data to LocalStorage.

```
function load_data() {
    var xml = new XMLHttpRequest();
    xml.overrideMimeType("application/json");
    xml.open('GET', './data/data.json', true);
    xml.onreadystatechange = function () {
        if (xml.status == "200") {
            let movies = JSON.stringify(xml.responseText)
            localStorage.setItem("movies", JSON.parse(movies))
        }
    }
    xml.send(null);
}

let movies_in_local_storage = localStorage.getItem("movies")

if (!movies_in_local_storage) {
    load_data()
}
```

### JSON movie data model

```
 {
        "id": 1001,
        "name": "83",
        "img": "https://upload.wikimedia.org/wikipedia/en/thumb/6/69/83_film_poster.jpg/220px-83_film_poster.jpg",
        "price": 350,
        "desc": "Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Rem possimus alias commodi quaerat ex omnis animi quis laudantium quod 
        placeat. Quod nesciunt autem veritatis exercitationem dolores voluptate laboriosam error optio?",
        "locations": [
            "Patna",
            "Banglore",
            "New Delhi"
        ],
        "languages": [
            "Hindi",
            "All"
        ],
        "generes": [
            "Drama",
            "Sport",
            "All"
        ],
        "availablity": {
            "seat1": true,
            "seat2": true,
            "seat3": true,
            "seat4": true,
            "seat5": true,
            "seat6": true,
            "seat7": true,
            "seat8": true,
            "seat9": true,
            "seat10": true,
            "seat11": true,
            "seat12": true
        },
        "timing": {
            "to": "12:30",
            "from": "9:30"
        }
    },
```



# Data in Local Storage
```
1. movies : //Saving all movies information here
2. booked_history : //saving all booked ticket history
```





