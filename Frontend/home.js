


document.querySelector("#tripFind").innerHTML = `  <img id="imageContainer" src="./Images/train.png" alt="train">
            <div id="textBookTrip">Its time to book your future trip.</div> `


document.querySelector("#searchBtn").addEventListener("click", async () => {

    let departure = document.querySelector("#departure").value
    let arrival = document.querySelector("#arrival").value
    let date = document.querySelector("#start").value
    document.querySelector("#tripFind").innerHTML = ''
    let response = await fetch('http://localhost:3000/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ departure, arrival, date })
    })
    let fetchedTrip = await response.json()
    if (fetchedTrip.trips && fetchedTrip.trips.length) {


        for (const trip of fetchedTrip.trips) {
            let date = trip.date.slice(11, 16)

            document.querySelector("#tripFind").innerHTML +=
                `    <div class="tripFiltered">
                <div class="seeTrip">${trip.departure} > ${trip.arrival} ${date} ${trip.price}€</div>
                <span id="_id" style= display:none>${trip._id}</span>
                <button class="book" type="button" >Book</button>
            </div>`;
        }

        clickBook()
        document.querySelector("#departure").value = ""
        document.querySelector("#arrival").value = ""

    }
    else {
        document.querySelector("#tripFind").innerHTML +=
            `    <img id="imageContainer" src="./Images/notfound.png" alt="train">
            <div id="textBookTrip">No trip found.</div> `

    }

})

function clickBook() {
    let book = document.querySelectorAll('.book')
    for (let i = 0; i < book.length; i++) {
        book[i].addEventListener('click', async () => {
            let parent = book[i].parentNode
            let idVoyage = parent.querySelector('#_id').textContent

            let resp = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idVoyage })
            })
            let tripSave = await resp.json()
            if (tripSave.result) {
                window.location.assign("./cart.html")
            }


        })
    }

}



// objectif = récupérer l'id 
