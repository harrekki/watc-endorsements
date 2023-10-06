import { initializeApp } 
    from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref } 
    from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"; 

const appSettings = {
    databaseURL: "https://watc-9f5f0-default-rtdb.firebaseio.com", 
}
const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsDB = ref(database, "endorsements");

const inputField = document.getElementById("endorse-field");
const publishBtn = document.getElementById("publish-btn");

publishBtn.addEventListener("click", addToDatabase);

function addToDatabase() {
    let inputValue = inputField.value;

    console.log(`${inputValue} added to database`);
}

