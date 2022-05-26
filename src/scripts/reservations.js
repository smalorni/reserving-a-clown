import { getRequests, getClowns, savedCompletedReservations, deleteReservation } from "./dataAccess.js"

/* Function that will convert each request form object into HTML.
This function runs after fetches are completed, new app state */

export const Reservations = () => {
    const reservations = getRequests()
    const clowns = getClowns()

    /* Will sort by dates - using javascripttutorial.net resource */

    let html = "<ul>"
    reservations.sort((a, b) => {
        let da = new Date(a.Date),
            db = new Date(b.Date);
        return da - db;
    });
  
    const reservationList = reservations.map((reservation) => {
        return ` 
            <li>
                ${reservation.childName}'s party is on ${reservation.date}, located at ${reservation.address}. The party will last for ${reservation.length} hours, with ${reservation.attendance} guests attending.

                <button class="reservation_deny" id="reservation--${reservation.id}">Deny Reservation</button>
                <select class="clowns" id="clowns">
                    <option value ="">Choose Clown</option>
                        ${clowns.map(clown =>
                          `<option value="${reservation.id}--${clown.id}">${clown.name}</option>`).join("")}
                </select>
   
            </li>
         `
    }).join("")

    html += reservationList
    html += "</ul>"

    return html 
}


const mainContainer = document.querySelector("#container")
/* Add event listener for deny button */
mainContainer.addEventListener("click", click => {
    if(click.target.id.startsWith("reservation--")) {
        const [, reservationId] = click.target.id.split("--")
        deleteReservation(parseInt(reservationId))
        }
    }
)

/* Creating New State for Completion */
mainContainer.addEventListener(
    "change",
    (event) => {
        if(event.target.id === "clowns") {
            const [partyRequestId, clownId] = event.target.value.split("--")
                const completion = {
                    partyRequestId: parseInt(partyRequestId),
                    clownId: parseInt(clownId),
                    date_created: Date.now()
                }
                savedCompletedReservations(completion)

        }
    }
)