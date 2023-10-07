import { initializeApp } 
    from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { 
    getDatabase, 
    ref,
    push,
    onValue     
} 
    from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"; 

const appSettings = {
    databaseURL: "https://watc-9f5f0-default-rtdb.firebaseio.com", 
}
const app = initializeApp(appSettings);
const database = getDatabase(app);
const endorsementsDB = ref(database, "endorsements");

const inputField = document.getElementById("endorse-field");
const publishBtn = document.getElementById("publish-btn");
const endorsementsList = document.getElementById("endorsements-wrapper");

publishBtn.addEventListener("click", addToDatabase);

function addToDatabase() {
    let inputValue = inputField.value;

    if(inputValue) {
        push(endorsementsDB, inputValue);
    }

    clearInputField();
}

onValue(endorsementsDB, function(snapshot) {
    if(snapshot.exists()) {
        let endorsementsArray = Object.entries(snapshot.val());
        
        clearEndorsementsList();

        for(let endorsement of endorsementsArray) {
            appendToEndorsementsList(endorsement);
        }
    }
})

function clearInputField() {
    inputField.value = "";
}

function clearEndorsementsList() {
    endorsementsList.innerHTML = "";
}

function appendToEndorsementsList(item) {
    let itemID = item[0];
    let itemValue = item[1];

    let newElem = `
        <article>
            ${itemValue}
        </article>
    `;

    endorsementsList.innerHTML += newElem;
}

