const form = document.querySelector(".form");
const addList = document.getElementById("add-list");
const listItems = document.getElementById("list-items");
const searchList = document.getElementById("search-list");


// create li elements
const createListItems = (inputValue, id) => {
    listItems.innerHTML += `
        <li id="list-${id}">
            <div class="text">
                <input id="list-text-${id}" type="checkbox">
                <label onclick="toggleDisplay('${id}')" id="label-${id}" for="list-text-${id}">${inputValue}</label>
            </div>
            <div class="btn">
                <button onclick="editBtn('${id}')" class="edit btn btn-outline-dark">edit</button>
                <button onclick="deleteBtn('${id}')" class="delete btn btn-dark">delete</button>
            </div>
        </li>
    `
    addList.value = "";
}

let id = 1;
let keyId = Object.keys(localStorage);
keyId.sort();
if(localStorage.length>0) {
    id = Number(keyId[keyId.length - 1]);
}

// make list decoration
const toggleDisplay = (id) => {
    const toggleText = document.getElementById(`label-${id}`);
    toggleText.classList.toggle("text-deco")
    console.log(toggleText);
}

// create localStorage
const addToLocalStorage = () => {
    localStorage.setItem(id, addList.value);
    id++;
}

// get localStorage
const getFromLocalStorage = () => {
    keyId.map(key => {
        createListItems(localStorage.getItem(key), key);        
    })
}

// delete list
const deleteBtn = (id) => {
    localStorage.removeItem(id);
    const current = document.getElementById(`list-${id}`);
    current.remove();
}

// edit list
const editBtn = (id) => {
    const labelId = document.getElementById(`label-${id}`)
    let editText = prompt("Edit Your List", labelId.innerText);
    labelId.innerText = editText;
    localStorage.setItem(id, labelId.innerText);
}

// put lists
form.addEventListener("submit", function(e) {
    e.preventDefault();
    if(addList.value === "") {  
        alert("Please enter a value.")              
    } else {
        addToLocalStorage();
        createListItems(addList.value);              
    }
})

getFromLocalStorage();