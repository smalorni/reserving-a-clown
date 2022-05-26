import { sendRequest } from "./dataAccess.js"

/* HTML fields available for user to complete the party request */
export const requestForm = () => {
    return `
    
        <div class="container">
            <div class="field_parent_name">
                <label class="label" for="parentName">Parent's Name</label>
                <input type="text" name="parentName" class="input"/>
            </div>

            <div class="field_child_name">
                <label class="label" for=""childName">Child's Name</label>
                <input type="text" name="childName" class="input"/>
            </div>

            <div class="field_attendance">
                <label class="label" for="attendance">Number of Guests</label>
                <input type="number" name="attendance" class="input"/>
            </div>

            <div class="field_address">
                <label class="label" for="address">Party's Address</label>
                <input type="text" name="address" class="input"/>
            </div>

            <div class="field_date">
                <label class="label" for="date">Date of Party</label>
                <input class="date" name="date" class="input/>
            </div>

            <div class="field_length">
                <label class="label" for="length">How Many Hours</label>
                <input class="number" name="length" class="input"/>
            </div>

            <button class="button" id="submitRequest">Submit Party Request</button>
        
        </div>
    `
}

/* Add event listener for when the user clicked on "Submit Party Request" button to send the data for permanent storage */

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "submitRequest") {
        //Get user's data from fields
        const user_ParentName = document.querySelector("input[name='parentName']").value 
        const user_ChildName = document.querySelector("input[name='childName']").value
        const user_Attendance = document.querySelector("input[name='attendance']").value
        const user_Address = document.querySelector("input[name='address']").value
        const user_Date = document.querySelector("input[name='date']").value
        const user_Hour = document.querySelector("input[name='length']").value

        //Make a new object out of user's input, make sure it matches the data already existed
        const dataToSendToAPI = {
            parentName: user_ParentName,
            childName: user_ChildName,
            attendance: user_Attendance,
            address: user_Address,
            date: user_Date,
            length: user_Hour
         }
         //Send to API for permanent storage - sendRequest is from dataAccess module and needs to be invoked
         sendRequest(dataToSendToAPI)
        }

    }
)