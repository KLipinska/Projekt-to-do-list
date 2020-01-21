let $approveBtn, $editInput, $modal, $list;

const BASE_URL = "http://195.181.210.249:3000/todo/";

function main() {
  prepareDOMElements();
  prepareDOMEvents();
  getToDos();
}

function prepareDOMElements() {
  $approveBtn = document.getElementById("editTodo");
  $editInput = document.getElementById("popupInput");
  $modal = document.getElementById("modal");
  $approveBtn.addEventListener("click", approveBtnClickHandler);
  $list = document.getElementById("list");
}

function prepareDOMEvents() {
  $list.addEventListener("click", listClickHandler);
  const $cancelButton = document.getElementById("cancelChanges");
  const $closeButton = document.getElementById("closePopup");
  $cancelButton.addEventListener("click", closePopup);
  $closeButton.addEventListener("click", closePopup);
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  let li = document.createElement("li");
  let inputValue = document.getElementById("myInput").value;
  let t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
  alert("You must write something!");
  } else {
    document.getElementById("list").appendChild(li);
  }
  document.getElementById("myInput").value = "";
  
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        let div = this.parentElement;
        div.style.display = "none";
    }
  }
}

function addElementToList(item) {
  const newLi = document.createElement("li");
  newLi.classList.add("todo");
  newLi.id = "todo-" + item.id;
  newLi.innerText = item.title;

  const editBtn = document.createElement("button");
  editBtn.dataset.id= "edit-" + item.id;
  editBtn.style.float= "right";
  editBtn.innerText = "Edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.dataset.id= "delete-" + item.id;
  deleteBtn.style.float= "right";
  deleteBtn.innerText = "Delete";

  newLi.appendChild(editBtn);
  newLi.appendChild(deleteBtn);

  $list.appendChild(newLi);
}

async function getToDos() {
  try {
      const response = await axios.get(BASE_URL);
      response.data.forEach(addElementToList)
  } catch(err) {
      console.log("Błąd z serwera");
  }
}

// // Create a "close" button and append it to each list item
// var myNodelist = document.getElementsByTagName("LI");
// var i;
// for (i = 0; i < myNodelist.length; i++) {
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   myNodelist[i].appendChild(span);
// }

// // Click on a close button to hide the current list item
// var close = document.getElementsByClassName("close");
// var i;
// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function() {
//   var div = this.parentElement;
//   div.style.display = "none";
//   }
// }

// Click to check the item
let list = document.querySelector("ul");
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
  ev.target.classList.toggle('checked');
  }
}, false);


function removeAll(){
  let lst = document.getElementsByTagName("ul");
  lst[0].innerHTML = "";
}

function listClickHandler(event) {
  if (event.target.tagName === "BUTTON") {
      const [action, id] = event.target.dataset.id.split("-");
      if(action === "edit") {
          $editInput.value = event.target.parentElement.firstChild.textContent.trim();
          $approveBtn.dataset.editId = id;
          openPopup();
      } else if (action === "delete") {
        event.target.parentElement.remove();
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

function openPopup () {
  $modal.style.display = "block";
}
function closePopup () {
  $modal.style.display = "none";
}
    
document.addEventListener("DOMContentLoaded", main)
