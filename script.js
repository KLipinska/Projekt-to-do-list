let $approveBtn, $editInput, $modal, $list;

const BASE_URL = "http://195.181.210.249:3000/todo/";

function main() {
  prepareDOMElements();
  prepareDOMEvents();
  getTodos();
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
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
  alert("You must write something!");
  } else {
    document.getElementById("list").appendChild(li);
  }
  document.getElementById("myInput").value = "";
  
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);
  
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
  }
}

// function addElementToList(item) {
//   const newLi = document.createElement("li");
//   newLi.classList.add("todo");
//   newLi.id = "todo-" + item.id;
//   newLi.innerText = item.title;

//   const editBtn = document.createElement("button");
//   editBtn.dataset.id= "edit-" + item.id;
//   editBtn.style.float= "right";
//   editBtn.innerText = "Edit";

//   newLi.appendChild(editBtn);
//   $list.appendChild(newLi);
// }

// async function getToDos() {
//   try {
//       const response = await axios.get(BASE_URL);
//       response.data.forEach(addElementToList)
//   } catch(err) {
//       console.log("Błąd z serwera");
//   }
// }

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
  var div = this.parentElement;
  div.style.display = "none";
  }
}

// Add a "checked" symbol when clicking on a list item
var list = document.querySelector("ul");
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
  ev.target.classList.toggle('checked');
  }
}, false);


function removeAll(){
  var lst = document.getElementsByTagName("ul");
    lst[0].innerHTML = "";
}

function listClickHandler(event) {
  if (event.target.tagName === "BUTTON") {
      const [action, id] = event.target.dataset.id.split("-");
      if(action === "edit") {
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

function openPopup () {
  $modal.style.display = "block";
}
function closePopup () {
  $modal.style.display = "none";
}
    
document.addEventListener("DOMContentLoaded", main)
