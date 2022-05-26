import { fetchRequests, fetchClowns, fetchCompletion } from "./dataAccess.js"
import { Party } from "./party.js"

/****FETCH STATE BEFORE DISPLAYING *****************/
/* You need to fetch the data from the API and store it in application state before you can convert the data structures to HTML representations. */

const render = () => {
    fetchRequests()
    .then(() => fetchClowns())
    .then(() => fetchCompletion())
    .then(() => { 
        mainContainer.innerHTML = Party()
        }
    )
}

render()

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "stateChanged", customEvent => {
        render()
    }
)