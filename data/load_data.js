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