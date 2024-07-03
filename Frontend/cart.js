async function getUser() {
    let user = await fetch('http://localhost:3000/users')
    let jsonUser = await user.json()

    if (jsonUser.user._id.length) {
        let totalPriceTab = []


        for (let i = 0; i < jsonUser.user._id.length; i++) {

            if (jsonUser.user.idVoyage[i]) {
                let dateJson = String(jsonUser.user.idVoyage[i]?.date)

                let date = dateJson.slice(11, 16)


                document.querySelector("#tripFound").innerHTML += `
                
                <div class='tripCard'>
                <div class="voyage"> ${jsonUser.user.idVoyage[i]?.departure} > ${jsonUser.user.idVoyage[i]?.arrival} </div>
                <div class="heure">${date}</div>
                <div class="price">${jsonUser.user.idVoyage[i]?.price} €</div>
                <button class="delete" type="button" >X</button>
                <span class="idMongoose" style = display:none>${jsonUser.user.idVoyage[i]?._id}</span>
                </div>
                `
                updateDeleteEventListener()

                totalPriceTab.push(jsonUser.user.idVoyage[i].price)

                let totalPrice = totalPriceTab.reduce((accumulator, currentValue) => accumulator + currentValue)

                document.querySelector('#bottom').innerHTML = `    <div id="bottomTripContainer">
                <div id="totalPrice">Total : ${totalPrice}€</div>
                <button id="purchase" type="button">Purchase</button>
                </div>`
                purchaseClick()
            }
        }

    } else {
        document.querySelector("#tripContainer").innerHTML = `
                    <div id="noTrip">
            <p>No booking yet.</p>
            <p>Why not plan a trip?</p>
            </div>
            `
    }
}
getUser()

function updateDeleteEventListener() {
    let del = document.querySelectorAll('.delete')

    for (let i = 0; i < del.length; i++) {
        del[i].addEventListener('click', function () {
            let buttonId = this.parentNode.querySelector(".idMongoose").textContent
            fetch(`http://localhost:3000/users/${buttonId}`, { method: 'DELETE' })
                .then(response => response.json())
                .then(data => {

                    if (data.result) {
                        this.parentNode.remove();
                    }
                });
        });
    }
}
function purchaseClick() {
    document.querySelector("#purchase").addEventListener("click", async function () {

        let idVoyagePurchase = document.querySelectorAll('.idMongoose')

        for (let i = 0; i < idVoyagePurchase.length; i++) {
            let idPurchase = idVoyagePurchase[i].textContent
            let respo = await fetch('http://localhost:3000/users/purchase', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idPurchase })
            })

        }


        window.location.assign("bookings.html")
    })

}

