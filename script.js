let $modal, $list, $todoInput, $modalClose, $popupInput, $okModalButton, $addForm, $activeListElement, $dateElement, currentId;

const BASE_URL = "http://195.181.210.249:3000/todo/";

function main() {
    prepareDOMElements ();
    prepareDOMEvents();
    prepareDate();
}

function prepareDOMElements () {
    // $approveBtn = document.getElementById("editToDo");
    $todoInput = document.getElementById("todoInput");
    // $editInput = document.getElementById("popupInput");
    $modal = document.getElementById ("modal");
    // $approveBtn.addEventListener("click", approveBtnClickHandler);
    $list = document.getElementById("list");
    $modalClose = document.getElementsByClassName("close");
    $popupInput = document.getElementById("popupInput");
    $okModalButton = document.getElementById("btn_done");
    $addForm = document.getElementById("addForm");
    $dateElement = document.getElementById("date");
}

function prepareDate() {
  const options = { weekday: "long", month: "long", day: "numeric" };
  const today = new Date();
  $dateElement.innerHTML = today.toLocaleDateString("en-US", options);
}

function prepareDOMEvents () {
    $list.addEventListener("click", listClickHandler);
    $addForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputValue = $todoInput.value;
        if (inputValue != "") {
          postTodos(inputValue);
          $todoInput.value = ""
        }
        else {
          console.log("nie doda się")
        }
      });
}

// $modalClose[0].addEventListener('click', () => {
//     $modal.style.display = "none"
//   });
// $modalClose[2].addEventListener('click', () => {
//     $modal.style.display = "none"
//   });

function openPopup () {
  $modal.style.display = "block";
}
function closePopup () {
  $modal.style.display = "none";
}
// $okModalButton.addEventListener('click', () => {
//     console.log($popupInput.value);
//     editTodos();
//     $modal.style.display = "none"
//   });

    
    // const $cancelButton = document.getElementById("cancelChanges");
    // const $closeButton = document.getElementById("closePopup");
    // $cancelButton.addEventListener("click", closePopup);
    // $closeButton.addEventListener("click", closePopup);
// }

// async function getToDos() {
//     try {
//         const response = await axios.get(BASE_URL);
//         response.data.forEach(addElementToList)
//     } catch(err) {
//         console.log("Błąd z serwera");
//     }
// }

function getTodos() {
    $list.innerHTML = "";
    axios.get(BASE_URL).then((response) => {
      if (response.status === 200) {
        console.log(response);
        response.data.forEach((element) => {
          addNewElementToList(element.title, element.id, element.extra);
        })
      }
    });
  }  

  function postTodos() {
    $list.innerHTML = "";
    axios.post(BASE_URL, {
      title: $todoInput.value
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          getTodos();
        }
      });
  }  

  function editTodos() {
    $list.innerHTML = "";
    axios.put(BASE_URL + currentId, {
      title: $popupInput.value
    })
      .then((response) => {
        if (response.status === 200) {
          getTodos();
        }
      });
  }
  
  function createElement(title, id, extra) {
    const newElement = document.createElement('li');
    newElement.classList.add('flex-row')
    newElement.innerHTML = "<span class= 'to-left'>" + title + "</span>" + " <div class= 'to-right'><button class='edit'>edit</button>"
      + " <button class='delete'>delete</button>" + " <button class='done'>mark as done</button></div>";
    newElement.dataset.id = id;
    if(extra) {
      newElement.classList.add('checked')
      }
    return newElement;
  }
  
  function addNewElementToList(title, id, extra) {
    const newElement = createElement(title, id, extra);
    $list.appendChild(newElement);
  }
  

// function addElementToList(item) {
//     const newLi = document.createElement("li");
//     newLi.classList.add("todo");
//     newLi.id = "todo-" + item.id;
//     newLi.innerText = item.title;

//     const editBtn = document.createElement("button");
//     editBtn.dataset.id = "edit-" + item.id;
//     editBtn.style.float = "right";
//     editBtn.innerText = "Edit";

//     const deleteBtn = document.createElement("button");
//     deleteBtn.dataset.id = "delete-" + item.id;
//     deleteBtn.style.float = "right";
//     deleteBtn.innerText = "Delete";

//     newLi.appendChild(editBtn);
//     newLi.appendChild(deleteBtn);

//     $list.appendChild(newLi);
// }

function listClickHandler(event) {
    const selectedLi = event.target.parentElement.parentElement;
    const selectedLabel = event.target.parentElement.parentElement.firstChild;
        if (event.target.className === 'edit') {
        console.log("edit");
        console.log(selectedLabel.innerText);
        const todoText = selectedLabel.innerText;
        currentId = selectedLi.dataset.id;
        $activeListElement = selectedLabel;
        $popupInput.value = todoText;
        $modal.style.display = 'block'
    }

    else if (event.target.className === 'delete') {
        console.log(selectedLi.dataset.id);
        removeListElement(selectedLi.dataset.id);
      }
      else if (event.target.className === 'done') {
        console.log("done");
        markElementAsDone(selectedLi.dataset.id);
      }
      else {
        console.log("not edit")
      }  
    }

//     if(event.target.tagName === "BUTTON") {
//         const [action, id] = event.target.dataset.id.split("-");
//         if (action === "edit") {
//             $editInput.value = event.target.parentElement.firstChild.textContent.trim();
//             $approveBtn.dataset.editId = id;
//             openPopup();
//         }
//     }
// }

function removeListElement(id) {
    axios.delete(BASE_URL + id).then((response) => {
      if (response.status === 200) {
        getTodos();
      }
    })
  }
  
function editListElement(element) {
    const newTodo = prompt("podaj nową nazwę todo")
    console.log(newTodo)
    element.innerText = newTodo;
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

function markeElementAsDone(id) {
    axios.put(BASE_URL + id, {
        extra: true
    }).then(() => {
        getTodos();
    })
}

// function openPopup () {
//     $modal.style.display = "block";
// }

// function closePopup () {
//     $modal.style.display = "none";
// }

document.addEventListener("DOMContentLoaded", main)