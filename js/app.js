// side_tasks-form
let refId = 0;
let darkThemeFlag = false
////////////////////////////////////
// Create Card after save
// crate continuer
let allcards = document.getElementById("cards");
let row = document.createElement("div");
row.className = "row";
row.style.width = " 100%";
allcards.append(row);

//create card
// should every task have unique id and the id for task match card id
function createCard(task, id) {
  // card container
  let col = document.createElement("div");
  col.className = "col-sm-12 col-md-6 col-lg-4 taskCard";
  col.setAttribute("id", id);
  row.append(col);

  //I have added id to the card to use it with delete it
  // card container
  let card = document.createElement("div");
  card.className = "card text-center m-3";
  if (darkThemeFlag) {
    card.style.background = "#212124"
    card.style.color = "white"
  }
  col.append(card);
  // create card header (card title, edit and delete icon)
  let cardHeader = document.createElement("div");
  cardHeader.className = "card-header d-flex justify-content-between";
  if (darkThemeFlag) {
    cardHeader.classList.add("darkThemeCard")
  }
  card.append(cardHeader);
  // card title
  let spanTaskTitle = document.createElement("span");
  spanTaskTitle.textContent = task.title;
  spanTaskTitle.id = `title-${id}`;
  cardHeader.append(spanTaskTitle);
  // create icon container
  let aswomContaner = document.createElement("span");
  aswomContaner.className = "d-inline-flex gap-2";
  cardHeader.append(aswomContaner);

  // create edit icon container
  let icon = document.createElement("i");
  icon.className = "fa-solid fa-pen-to-square";
  icon.setAttribute("data-bs-toggle", "modal");
  icon.setAttribute("data-bs-target", "#staticBackdropG");
  // pass id task in function onclick
  icon.setAttribute("onclick", "edit(" + id + ")");
  aswomContaner.append(icon);

  //I have added id to the iconXmark to use it with delete it
  // create delete icon container
  let iconXmark = document.createElement("i");
  iconXmark.setAttribute("id", "delCardIcon");
  iconXmark.className = "fa-solid fa-circle-xmark";
  // pass id task in function onclick
  iconXmark.setAttribute("onclick", "deleteSingleCard(" + id + ")");
  aswomContaner.append(iconXmark);

  // create card Body container
  let cardBody = document.createElement("div");
  cardBody.className = "card-body";
  if (darkThemeFlag) {

  }
  card.append(cardBody);

  // create card Text
  let cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent = task.details;
  cardText.id = `card-details-${id}`;
  cardBody.append(cardText);

  // create complete task checkbox
  let checkboxContaner = document.createElement("div");
  checkboxContaner.className = "input-group justify-content-center mb-0";
  cardBody.append(checkboxContaner);

  let completeTask = document.createElement("span");
  completeTask.className = "input-group-text";
  completeTask.id = "inputGroup-sizing-default";
  completeTask.textContent = "Complete";
  checkboxContaner.append(completeTask);

  let checkboxDiv = document.createElement("div");
  checkboxDiv.className = "input-group-text me-lg-3 me-md-3 me-sm-3 me-3 p-0";
  checkboxDiv.setAttribute(
    "style",
    "border-top-right-radius: 5px; border-bottom-right-radius: 5px;"
  );
  checkboxContaner.append(checkboxDiv);

  let inputCheckbox = document.createElement("input");
  inputCheckbox.className = "form-check-input mt-0 w-100 h-100";
  inputCheckbox.id = `compete-${id}`;
  inputCheckbox.type = "checkbox";
  inputCheckbox.value = '"';
  inputCheckbox.setAttribute("class", "checkbox");
  inputCheckbox.setAttribute("onclick", "completedTasks(" + id + ")");
  inputCheckbox.ariaLabel = "Checkbox for following text input";
  checkboxDiv.append(inputCheckbox);

  let divPriority = document.createElement("div");
  checkboxContaner.append(divPriority);

  let spanPriority = document.createElement("span");
  spanPriority.className = "input-group-text";
  spanPriority.id = "inputGroup-sizing-default";
  spanPriority.textContent = task.priority;

  if (task.priority == "Normal") {
    spanPriority.style.color = "green";
    card.style.boxShadow = "3px 3px 20px 5px rgb(0 255 52 / 58%)";
  } else if (task.priority == "Critical") {
    spanPriority.style.color = "red";
    card.style.boxShadow = "3px 3px 20px 5px rgb(173 13 8 / 79%)";
  } else if (task.priority) {
    spanPriority.style.color = "blue";
    card.style.boxShadow = "3px 3px 20px 5px rgb(0 53 255 / 61%) ";
  }

  spanPriority.id = `priority-${id}`;
  divPriority.append(spanPriority);

  let cardFooter = document.createElement("div");
  cardFooter.className = "card-footer  d-flex justify-content-center";
  card.append(cardFooter);

  let remainTime = document.createElement("span");
  remainTime.className = "text-muted";
  remainTime.id = `remain-time-${id}`;
  remainTime.textContent = timeDetails(task.remainTime);
  cardFooter.append(remainTime);

  let saveSpan = document.createElement("span");
  cardFooter.append(saveSpan);

  id++;
}

///////////// this function calculate the time by month *Turkyeh
let month = 0;
let day = 0;
// take dayCount and return it as Month and day
function timeDetails(dayCount) {
  if (!isNaN(dayCount)) {
    if (dayCount >= 30) {
      day = dayCount % 30;
      month = Math.floor(dayCount / 30);
    } else {
      day = dayCount % 30;
      month = 0;
    }
    return `Month: ${month} \t Day: ${day} \t`;
  }
  return ` `;
}

// //////////////////////////////////////////////////////////////////////////

// logout function
let logout = document.getElementById("logoutModal");
logout.onclick = (event) => {
  for (let i = 0; i < user.length; i++) {
    const element = user[i];
    element.isLogged = false;
  }
  // console.log(user);
  // update local storage
  localStorage.setItem("user", JSON.stringify(user));
  location.href = "index.html";
};
// get data from local storage
function getSaveDate() {
  return JSON.parse(localStorage.getItem("user"));
}

// Save new task button
let user = [];
if (getSaveDate()) {
  user = getSaveDate();
}
// save data in local storage
function setDataInLocal(userArray) {
  localStorage.setItem("user", JSON.stringify(userArray));
}

// view saved tasks cards for user who logged in
for (let i = 0; i < user.length; i++) {
  if (user[i].isLogged) {
    user[i].tasks.forEach((e) => {
      createCard(e, user[i].tasks[refId].idDOM);
      refId++;
    });
  }
}

// test case --------
// let newUser = new User("Anas", "mohammed", "tt@ttt.com", "12234");
// user.push(newUser);

// ---------
let saveButton = document.getElementById("saveNewTask");
saveButton.onclick = (event) => {
  let inputTitle = document.getElementById("inputTitle").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  let inputDescription = document.getElementById("inputDescription").value;

  let criticalR = document.getElementById("criticalR");
  let normalR = document.getElementById("normalR");
  let lowR = document.getElementById("lowR");

  let priority = "";
  if (criticalR.checked) {
    priority = "Critical";
  } else if (normalR.checked) {
    priority = "Normal";
  } else {
    priority = "Low";
  }
  let dateValid = document.getElementById("dateValid");
  let titleValid = document.getElementById("titleValid");

  console.log(titleValid);
  // check if title not empty
  if (inputTitle == "" || inputTitle === null) {
    titleValid.style.display = "block";
    return;
  } else {
    titleValid.style.display = "none";
  }
  console.log(compareDate(startDate, endDate));
  // check the start date is not after end date
  if (!compareDate(startDate, endDate)) {
    dateValid.style.display = "block";
    return;
  } else {
    dateValid.style.display = "none";
  }

  // Find user who login & add task to user object
  for (let i = 0; i < user.length; i++) {
    const element = user[i];
    if (element.isLogged) {
      let task = new Task(
        inputTitle,
        endDate,
        startDate,
        inputDescription,
        priority,
        refId
      );
      // console.log(task);
      element.tasks.push(task);
      // task and id
      createCard(task, refId);
      // increase id
      refId++;
      // update local storage
      localStorage.setItem("user", JSON.stringify(user));
    }
  }
};

//  check if start date not after end date
function compareDate(startDate, endDate) {
  let start = new Date(startDate);
  let end = new Date(endDate);
  if (end.getTime() == start.getTime()) {
    return true;
  }
  if (end.getTime() - start.getTime() < 0) {
    return false;
  }
  return true;
}

let welcomeModelTask = document.getElementById("welcomeModelTask");
// when page finish load
window.onload = (event) => {
  // automatic click
  welcomeModelTask.click();
};

//delete single card
function deleteSingleCard(id) {
  // check who user is logged in
  for (let i = 0; i < user.length; i++) {
    let element = user[i];
    if (element.isLogged) {
      for (let j = 0; j < element.tasks.length; j++) {
        // check if card id match task id
        if (element.tasks[j].idDOM == id) {
          // handle if the array have one card to handle error
          if (element.tasks.length == 1) {
            deleteCard(element.tasks[j].idDOM);
            element.tasks.splice(0, 1);
          } else {
            deleteCard(element.tasks[j].idDOM);
            // to delete specific index in local storage
            element.tasks.splice(j, 1);
          }
        }
      }
      // update local storage
      localStorage.setItem("user", JSON.stringify(user));
    }
  }
}
// Delete card
let delCardIcon = document.getElementById("delCardIcon");
// delCardIcon.addEventListener("click",deleteCard(id));
// remove card by id
function deleteCard(id) {
  let delCard = document.getElementById(id);
  // remove element from dom tree
  delCard.remove();
}

// Disable back button (copy paste )
window.history.pushState(null, null, window.location.href);
window.onpopstate = function () {
  window.history.go(1);
};

// filter by priority

let priorityCritical = document.getElementById("priorityCritical");
let priorityNormal = document.getElementById("priorityNormal");
let priorityLow = document.getElementById("priorityLow");

// get user who logged in 
function getUser() {
  let taskArray = [];
  // get task and push it in to taskArray
  for (let index = 0; index < user.length; index++) {
    const element = user[index];
    if (element.isLogged) {
      taskArray.push(element.tasks);
    }
  }
  return taskArray;
}
let criticalFilter = false;
// event handler for priorityCritical
priorityCritical.onclick = (event) => {
  event.preventDefault();
  criticalFilter = true;
  if (completedFilter || incompleteFilter) {
    checkFilter()
    return
  }
  autoRemoveFilter();

  // array for stor task
  let taskArray = getUser();

  for (let index = 0; index < taskArray.length; index++) {
    const element = taskArray[index];
    for (let index = 0; index < element.length; index++) {
      const task = element[index];
      // if priority not Critical change display for every card not Critical to none
      if (task.priority != "Critical") {
        let id = task.idDOM.toString();
        let card = document.getElementById(id);
        card.style.display = "none";
      }
    }
  }
};

let normalFilter = false
priorityNormal.onclick = (event) => {
  event.preventDefault();
  if (completedFilter || incompleteFilter) {
    checkFilter()
    return
  }
  normalFilter = true;
  autoRemoveFilter();
  let taskArray = [];
  for (let index = 0; index < user.length; index++) {
    const element = user[index];
    if (element.isLogged) {
      // console.log(element);
      taskArray.push(element.tasks);
    }
  }

  for (let index = 0; index < taskArray.length; index++) {
    const element = taskArray[index];
    for (let index = 0; index < element.length; index++) {
      const task = element[index];
      if (task.priority != "Normal") {
        let id = task.idDOM.toString();
        let card = document.getElementById(id);

        card.style.display = "none";
      }
    }
  }
};

let lowFilter = false
priorityLow.onclick = (event) => {
  lowFilter = true
  event.preventDefault();
  if (completedFilter || incompleteFilter) {
    checkFilter()
    return
  }
  autoRemoveFilter();
  let taskArray = getUser();


  for (let index = 0; index < taskArray.length; index++) {
    const element = taskArray[index];
    for (let index = 0; index < element.length; index++) {
      const task = element[index];
      if (task.priority != "Low") {
        let id = task.idDOM.toString();
        let card = document.getElementById(id);

        card.style.display = "none";
      }
    }
  }
};

function completedTasks(id) {
  for (let i = 0; i < user.length; i++) {
    let element = user[i];
    if (element.isLogged) {
      for (let i = 0; i < element.tasks.length; i++) {
        if (element.tasks[i].idDOM == id) {
          console.log(element.tasks[i].idDOM);
          if (element.tasks[i].completed == false)
            element.tasks[i].completed = true;
          else element.tasks[i].completed = false;
        } else {
        }
        localStorage.setItem("user", JSON.stringify(user));
      }
    }
  }
}

let completedFilter = false
// filter bu complete state
let completeState = document.getElementById("completeState");
completeState.onclick = (event) => {
  event.preventDefault();
  completedFilter = true
  if (criticalFilter || normalFilter || lowFilter) {
    checkFilter()
    return
  }
  autoRemoveFilter();
  let taskArray = getUser();


  for (let index = 0; index < taskArray.length; index++) {
    const element = taskArray[index];
    for (let index = 0; index < element.length; index++) {
      const task = element[index];
      if (task.completed == false) {
        let id = (task.idDOM).toString()
        let card = document.getElementById(id)

        card.style.display = "none"
      }

    }

  }

}

let incompleteState = document.getElementById("incompleteState");
let incompleteFilter = false

incompleteState.onclick = (event) => {
  event.preventDefault();
  incompleteFilter = true
  if (criticalFilter || normalFilter || lowFilter) {
    checkFilter()
    return
  }
  autoRemoveFilter();
  let taskArray = getUser();
  for (let index = 0; index < taskArray.length; index++) {
    const element = taskArray[index];
    for (let index = 0; index < element.length; index++) {
      const task = element[index];
      if (task.completed == true) {
        let id = task.idDOM.toString();
        let card = document.getElementById(id);
        card.style.display = "none";
      }
    }
  }
};

// without filter

let without = document.getElementById("redo");

without.onclick = (event) => {
  event.preventDefault();
  let taskArray = [];

  for (let index = 0; index < user.length; index++) {
    const element = user[index];
    if (element.isLogged) {
      // console.log(element);
      taskArray.push(element.tasks);
    }
  }

  for (let index = 0; index < taskArray.length; index++) {
    const element = taskArray[index];
    for (let index = 0; index < element.length; index++) {
      const task = element[index];

      let id = task.idDOM.toString();
      let card = document.getElementById(id);

      card.style.display = "block";
    }
  }
};

// clear all task completed
function clearCompletedT() {
  // array to store completed task
  let completeTask = [];
  for (let i = 0; i < user.length; i++) {
    let element = user[i];
    if (element.isLogged) {
      for (let j = 0; j < element.tasks.length; j++) {
        if (element.tasks[j].completed == true) {
          // push completed  task to array
          completeTask.push(element.tasks[j]);
        }
      }
      // loop task array
      completeTask.forEach((e) => {
        for (let i = 0; i < element.tasks.length; i++) {
          // if the id for task match id for completed tsk delete it
          if (element.tasks[i].idDOM == e.idDOM) {
            deleteCard(e.idDOM);
            if (element.tasks.length == 1) {
              element.tasks.splice(0, 1);
            } else {
              element.tasks.splice(i, 1);
            }
          }
        }
      });
      // update local storage
      localStorage.setItem("user", JSON.stringify(user));
    }
  }
}

//completed tasks are checked after refresh
window.addEventListener("load", (event) => {
  let checkboxes = document.querySelectorAll(".checkbox");
  for (let i = 0; i < user.length; i++) {
    let element = user[i];
    if (element.isLogged) {
      for (let i = 0; i < element.tasks.length; i++) {
        // check if task completed is false keep it false
        if (element.tasks[i].completed == false) {
          checkboxes[i].checked = false;
        } else {
          checkboxes[i].checked = true;
        }
      }
    }
  }
});

// save change take the id for target card
function edit(id) {
  // get card element
  let saveEditBtn = document.getElementById("saveEditBtn");
  saveEditBtn.setAttribute("onclick", "saveChange(" + id + ")");
  let cardTitle = document.getElementById(`title-${id}`);
  let cardDetails = document.getElementById(`card-details-${id}`);
  let priority = document.getElementById(`priority-${id}`);
  console.log(id);
  /*
  console.log(cardDetails.textContent);
  console.log(cardTitle.textContent);
  console.log(priority.textContent);
  console.log(priority.textContent);
  console.log(remainTime.textContent);
*/
  // get edit element modal
  let modalTitle = document.getElementById("modalTilte");
  let editInputTitle = document.getElementById("editInputTitle");
  let editInputDescription = document.getElementById("editInputDescription");
  let editCriticalR = document.getElementById("editCriticalR");
  let editNormalR = document.getElementById("editNormalR");
  let editLowR = document.getElementById("editLowR");
  // console.log(modalTitle);
  modalTitle.textContent = `Edit task ${cardTitle.textContent}`;

  editInputTitle.value = cardTitle.textContent;
  editInputDescription.value = cardDetails.textContent;

  if (priority.textContent == "Low") {
    editLowR.setAttribute("checked", "true");
  } else if (priority.textContent == "Critical") {
    editCriticalR.setAttribute("checked", "true");
  } else {
    editNormalR.setAttribute("checked", "true");
  }
}

// take the same id wh passed for modal
function saveChange(id) {
  let cardTitle = document.getElementById(`title-${id}`);
  let cardDetails = document.getElementById(`card-details-${id}`);
  let priority = document.getElementById(`priority-${id}`);
  let remainTime = document.getElementById(`remain-time-${id}`);

  let editInputTitle = document.getElementById("editInputTitle");
  let editInputDescription = document.getElementById("editInputDescription");
  let editStartDate = document.getElementById("editStartDate");
  let editEndDate = document.getElementById("editEndDate");
  let editCriticalR = document.getElementById("editCriticalR");
  let editNormalR = document.getElementById("editNormalR");

  cardTitle.textContent = editInputTitle.value;
  let priorityEdit = "";
  if (editCriticalR.checked) {
    priorityEdit = "Critical";
  } else if (editNormalR.checked) {
    priorityEdit = "Normal";
  } else {
    priorityEdit = "Low";
  }

  priority.textContent = priorityEdit;

  cardDetails.textContent = editInputDescription.value;
  let time = calculateRemainTime(editStartDate.value, editEndDate.value);
  console.log(time, "time");
  remainTime.textContent = timeDetails(time);

  for (let i = 0; i < user.length; i++) {
    let element = user[i];
    if (element.isLogged) {
      element.tasks[id].title = editInputTitle.value;
      element.tasks[id].date = editEndDate.value;
      element.tasks[id].priority = priority.textContent;
      element.tasks[id].remainTime = remainTime.textContent;
      element.tasks[id].details = cardDetails.textContent;
    }
  }
  setDataInLocal(user);
}

function calculateRemainTime(startDate, dateAsString) {
  let date1 = new Date(startDate);
  let date2 = new Date(dateAsString);
  let time = date2.getTime() - date1.getTime();
  let days = time / (1000 * 3600 * 24);
  return Math.floor(days);
}

// display user name in aside bar for welcoming
let welcomeName = document.getElementById("welcomeName");

for (let i = 0; i < user.length; i++) {
  let element = user[i];
  if (element.isLogged) {
    welcomeName.textContent = `Welcome ${element.firstName}`;
  }
}
//function to remove filter will use it before filter by state and priority
function autoRemoveFilter() {
  without.click();
}

let darkTheme = document.getElementById("darkTheme");
darkTheme.onclick = (event) => {
  event.preventDefault();
  document.body.style.background = "black";
  let sidebar1 = document.getElementById("sidebar1");
  let card = document.getElementById("card");
  let inputDescription = document.getElementById("inputDescription");
  let nav = document.getElementById("nav");
  sidebar1.style.background = "#212124"
  card.style.background = "#212124"
  card.style.color = "white"
  inputDescription.style.background = "#212124"
  inputDescription.style.color = "white"
  nav.classList.remove("bg-light")
  nav.style.background = "#212124"

  let cards = document.getElementsByClassName("card-header");
  let cardsBody = document.getElementsByClassName("card-body");
  let inputGroupText = document.getElementsByClassName("input-group-text");
  console.log(cards);
  for (let index = 0; index < cards.length; index++) {
    const element = cards[index];
    element.classList.add("darkThemeCard");
  }

  for (let index = 0; index < cardsBody.length; index++) {
    const element = cardsBody[index];
    element.classList.add("darkThemeCardBody");
  }

  for (let index = 0; index < inputGroupText.length; index++) {
    const element = inputGroupText[index];
    element.classList.add("completeDarkTheme");
  }
  darkThemeFlag = true
}

// check if any filter selected  
function checkFilter() {

  if (completedFilter && criticalFilter) {
    autoRemoveFilter();
    let userArray = getUser()
    userArray.forEach(tasks => {
      console.log(tasks);
      tasks.forEach(task => {
        if (!(task.completed && task.priority == "Critical")) {
          let id = task.idDOM.toString();
          let card = document.getElementById(id);
          console.log(card);
          card.style.display = "none";
        }
      })
    })
  }

  if (completedFilter && normalFilter) {
    autoRemoveFilter();
    let userArray = getUser()
    userArray.forEach(tasks => {
      console.log(tasks);
      tasks.forEach(task => {
        if (!(task.completed && task.priority == "Normal")) {
          let id = task.idDOM.toString();
          let card = document.getElementById(id);
          console.log(card);
          card.style.display = "none";
        }
      })
    })
  }

  if (completedFilter && lowFilter) {
    autoRemoveFilter();
    let userArray = getUser()
    userArray.forEach(tasks => {
      console.log(tasks);
      tasks.forEach(task => {
        if (!(task.completed && task.priority == "Low")) {
          let id = task.idDOM.toString();
          let card = document.getElementById(id);
          console.log(card);
          card.style.display = "none";
        }
      })
    })
  }


  if (incompleteFilter && criticalFilter) {
    autoRemoveFilter();
    let userArray = getUser()
    userArray.forEach(tasks => {
      console.log(tasks);
      tasks.forEach(task => {
        if (!(task.completed == false && task.priority == "Critical")) {
          let id = task.idDOM.toString();
          let card = document.getElementById(id);
          console.log(card);
          card.style.display = "none";
        }
      })
    })
  }

  if (incompleteFilter && normalFilter) {
    autoRemoveFilter();
    let userArray = getUser()
    userArray.forEach(tasks => {
      console.log(tasks);
      tasks.forEach(task => {
        if (!(task.completed == false && task.priority == "Normal")) {
          let id = task.idDOM.toString();
          let card = document.getElementById(id);
          console.log(card);
          card.style.display = "none";
        }
      })
    })
  }

  if (incompleteFilter && lowFilter) {
    autoRemoveFilter();
    let userArray = getUser()
    userArray.forEach(tasks => {
      console.log(tasks);
      tasks.forEach(task => {
        if (!(task.completed == false && task.priority == "Low")) {
          let id = task.idDOM.toString();
          let card = document.getElementById(id);
          console.log(card);
          card.style.display = "none";
        }
      })
    })
  }
  incompleteFilter = false
  completedFilter = false
  criticalFilter = false
  normalFilter = false
  lowFilter = false
}

