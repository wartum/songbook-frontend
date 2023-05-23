const backendUrl = "http://localhost:8080"
const loginEndpoint = "login"

async function loginWithPassword(login, password) {
    try {
        const response = await fetch(backendUrl + "/" + loginEndpoint, {
            method: "POST",
            body: JSON.stringify({
                "username": login,
                "password": password
            })
        })
        return response
    }
    catch (error) {
        console.error(error)
        return null
    }
}

async function getToken() {
    const login = document.getElementById("login_field").value
    const password = document.getElementById("password_field").value
    display = document.getElementById("display")
    display.innerHTML = "logging in..."

    const rsp = await loginWithPassword(login, password)
    if (rsp == null) {
        display.innerHTML = "Error occured when logging"
        return
    }
    if (rsp.status == 200) {
        json = await rsp.json()
        display.innerHTML = "Login succesfull"
    } else if (rsp.status == 401) {
        display.innerHTML = "Unauthorized"
    } else {
        display.innerHTML = "Error occured when logging"
    }
}