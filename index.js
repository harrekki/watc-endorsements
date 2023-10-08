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

const textField = document.getElementById("endorse-field");
const fromField = document.getElementById("from-field");
const toField = document.getElementById("to-field");
const publishBtn = document.getElementById("publish-btn");
const endorsementsList = document.getElementById("endorsements-wrapper");

publishBtn.addEventListener("click", addToDatabase);

function addToDatabase() {
    let newEndorsement = {
        to: toField.value,
        from: fromField.value,
        message: textField.value,
        likes: 0
    }

    if(newEndorsement) {
        push(endorsementsDB, newEndorsement);
    }

    clearInputFields();
}

onValue(endorsementsDB, function(snapshot) {
    if(snapshot.exists()) {
        let endorsementsArray = Object.entries(snapshot.val());
        
        clearEndorsementsList();

        for(let endorsement of endorsementsArray) {
            appendToEndorsementsList(endorsement);
        }
    } else {
        endorsementsList.innerHTML = `
            <p>
                No endorsements yet... Give someone a shout out!
            </p>
        `;
    }
})

function clearInputFields() {
    textField.value = "";
    toField.value = "";
    fromField.value = "";
}

function clearEndorsementsList() {
    endorsementsList.innerHTML = "";
}

function appendToEndorsementsList(item) {
    // const itemID = item[0];
    const itemValue = item[1];

    const newEndorsement = createEndorsementElem(itemValue);

    endorsementsList.prepend(newEndorsement);
}

function createEndorsementElem(value) {
    let article = document.createElement("article");

    let toElem = document.createElement("h4");
    toElem.textContent = `To: ${value.to}`;

    let endorsementElem = document.createElement("p");
    endorsementElem.textContent = value.message;
    
    let endorsementFooterElem = document.createElement("div");
    endorsementFooterElem.classList.add("endorsement-footer");
    let fromElem = document.createElement("h4");
    fromElem.textContent = `From: ${value.from}`;
    let likesElem = document.createElement("button");
    likesElem.innerHTML = `
        <span id="heart">🖤</span>
        ${value.likes}
    `;
    endorsementFooterElem.append(fromElem, likesElem);


    article.append(toElem, endorsementElem, endorsementFooterElem);
    
    return article;
}
