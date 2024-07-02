
document.querySelector("#tripFind").innerHTML = `    <img id="imageContainer" src="./Images/train.png" alt="train">
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
                <button id="book" type="button">Book</button>
            </div>`}
        document.querySelector("#departure").value = ""
        document.querySelector("#arrival").value = ""
        clickBook()
    }
    else {
        document.querySelector("#tripFind").innerHTML +=
            `    <img id="imageContainer" src="./Images/notfound.png" alt="train">
            <div id="textBookTrip">No trip found.</div> `

    }
})


function clickBook() {
    document.querySelector("#book").addEventListener("click", () => {

        window.location.assign('cart.html')
    })
}