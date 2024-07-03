async function myBooking() {
    let req = await fetch('http://localhost:3000/users')
    let res = await req.json()
    console.log(res)

}


myBooking()
