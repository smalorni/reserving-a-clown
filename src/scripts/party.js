import { requestForm } from "./requestForm.js"
import { Reservations } from "./reservations.js"

export const Party = () => {
    return `
        <div class="form">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqxsrFDJ93Nr3i8dqL5aB0KUAdm2SMzUEzZK-rdmkRcmMMA7rfYTMkWX_T5WmWXwuE02M&usqp=CAU" alt="Female and male clowns"/>
            <h1>Hire Button and Lollipop Clowns</h1>
                <section class="partyRequests">
                    ${requestForm()}
                </section>

                <section class="reservations">
                    ${Reservations()}
                </section>
        </div>
    `
}