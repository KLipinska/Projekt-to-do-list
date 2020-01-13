let $addBtn, $myInput;


function main() {
    const $list = document.getElementById("list");
    $list.addEventListener("click", listClickHandler);
    $addBtn = document.getElementById("addToDo");
    $myInput = document.getElementById("myInput");
    $addBtn.addEventListener("click", addBtnClickHandler);
}

function listClickHandler(event) {
    if(event.target.tagName === "BUTTON") {
        const [action, id] = event.target.dataset.id.split("-");
    
        if (action === "edit") {
            $myInput.value = event.target.parentElement.firstChild.textContent.trim();
            $addBtn.innerText = "Edit " + id;
            $addBtn.dataset.action = "edit";
            $addBtn.dataset.editId = id;
        } else if (action === "delete") {
            event.target.parentElement.remove();
        }
    }
}

function addBtnClickHandler(event) {
    console.log(event.target.dataset.action)

    if (event.target.dataset.action === "edit") {
        const editedElement = document.getElementById ("todo-" + event.target.dataset.editId)
        editedElement.firstChild.textContent = $myInput.value;
        $addBtn.innerText = "Add ";
        $addBtn.dataset.action = "add";
        $addBtn.dataset.editId = undefined;
        $myInput.value = "";
        console.log(editedElement.firstChild);
    } else {

    }
}

document.addEventListener("DOMContentLoaded", main)