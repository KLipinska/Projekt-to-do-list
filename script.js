let $approveBtn, $editInput, $modal, $list, $todoInput;

const BASE_URL = "http://195.181.210.249:3000/todo/";

function main() {
    prepareDOMElements ();
    prepareDOMEvents();
    getToDos();
}

function prepareDOMElements () {
    $approveBtn = document.getElementById("editToDo");
    $todoInput = document.getElementById("todoInput");
    $editInput = document.getElementById("popupInput");
    $modal = document.getElementById ("modal");
    $approveBtn.addEventListener("click", approveBtnClickHandler);
    $list = document.getElementById("list");
}

function prepareDOMEvents () {
    $list.addEventListener("click", listClickHandler);
    const $cancelButton = document.getElementById("cancelChanges");
    const $closeButton = document.getElementById("closePopup");
    $cancelButton.addEventListener("click", closePopup);
    $closeButton.addEventListener("click", closePopup);
}

async function getToDos() {
    try {
        const response = await axios.get(BASE_URL);
        response.data.forEach(addElementToList)
    } catch(err) {
        console.log("Błąd z serwera");
    }
}

function addElementToList(item) {
    const newLi = document.createElement("li");
    newLi.classList.add("todo");
    newLi.id = "todo-" + item.id;
    newLi.innerText = item.title;

    const editBtn = document.createElement("button");
    editBtn.dataset.id = "edit-" + item.id;
    editBtn.style.float = "right";
    editBtn.innerText = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.dataset.id = "delete-" + item.id;
    deleteBtn.style.float = "right";
    deleteBtn.innerText = "Delete";

    newLi.appendChild(editBtn);
    newLi.appendChild(deleteBtn);

    $list.appendChild(newLi);
}

function listClickHandler(event) {
    if(event.target.tagName === "BUTTON") {
        const [action, id] = event.target.dataset.id.split("-");
        if (action === "edit") {
            $editInput.value = event.target.parentElement.firstChild.textContent.trim();
            $approveBtn.dataset.editId = id;
            openPopup();
        }
    }
}

async function approveBtnClickHandler(event) {
        try {
            await axios.put(BASE_URL + event.target.dataset.editId, {title: $editInput.value});
            $list.innerHTML = "";
            await getToDos();
        } catch(err) {
            console.log(err)
        }

        $approveBtn.dataset.editId = undefined;
        $editInput.value = "";
        closePopup();
}

// function markeElementAsDone(id) {
//     axios.put(BASE_URL + id, {
//         extra: true
//     }).then(() => {
//         getTodos();
//     })
// }

function openPopup () {
    $modal.style.display = "block";
}

function closePopup () {
    $modal.style.display = "none";
}

document.addEventListener("DOMContentLoaded", main)