/* Store external data in application state when fetch data */
const applicationState = {
    partyRequests: [],
    clowns: [],
    reservationCompletions: []
}

/* API is connected to JSON server which is currently 8088 */
const API = "http://localhost:8088"

/* Add event listener to invoke the render function to repeatedly print HTML again */
const mainContainer = document.querySelector("#container")

/* Fetch all existing data - HTTP GET Method */
export const fetchRequests = () => {
    return fetch(`${API}/partyRequests`)
    //Convert it to JSON format
    .then(response => response.json())
    //store external state in application state
    .then((data) => {
        applicationState.partyRequests = data
        }
    )
}

/* Fetch the clowns data */
export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
    .then(response => response.json())
    .then((data) => {
        applicationState.clowns = data
        }
    )
}


/* Fetch completions data */
export const fetchCompletion = () => {
    return fetch(`${API}/reservationCompletions`)
    .then(response => response.json())
    .then((data) => {
        applicationState.reservationCompletions = data
        }
    )
}

/* Export function that returns a copy of state, using .map method */
export const getRequests = () => {
    return applicationState.partyRequests.map(partyRequest => ({...partyRequest})) 
}

/* Export function that returns a copy of state, using .map method */
export const getClowns = () => {
    return applicationState.clowns.map(clown => ({...clown}))
}


/* User type in form fields, changing state of app.
Create function for POST method - API creates something new -- create the reservation.
Need to declare a new method because in default,it will continue "get" method */
export const sendRequest = (userPartyRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userPartyRequest)
    }

    return fetch(`${API}/partyRequests`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        }
    )
}



/* Create another function after the party is completed, to assign which clown hosted party */
export const savedCompletedReservations = (completedReservations) => {
    const fetchCompletedReservations = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completedReservations)
    }
    return fetch(`${API}/reservationCompletions`, fetchCompletedReservations)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        }
    )
}

/* Function that deletes the request */

export const deleteReservation = (id) => {
    return fetch(`${API}/partyRequests/${id}`, {
        method: "DELETE"})
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        }
    )
}

