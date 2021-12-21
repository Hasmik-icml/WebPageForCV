import {
  members as personFromStorage
} from "./data.js";

let persons = getFromStorage("users") || saveToStorage(personFromStorage);

initGrid();

function initGrid() {
  let box = document.getElementById("box");
  box.innerHTML += `<div class="cvbox">
        <div class="nested_box"><img src="./img/plus-icon.jpg" alt="cvimg" class="cv_img"></div>
        <div class="nested_box"><a href="#newPerson" class="cv_link"><span>Add new person</span></a></div>
      </div>`
  persons.forEach(person => {
    box.innerHTML += `<div class = "cvbox">
          <div class = "nested_box"><img src="./img/person-icon.jpg" alt="cvimg" class="cv_img" ></div>
          <div class ="nested_box"><a href="#cv_Page?id=${person.id}" class="cv_link">${person.firstName} ${person.lastName}</a></div> 
        </div>`;
  });
}


window.addEventListener("hashchange", function (event) {
event.preventDefault();
  let container = document.querySelector(".cardBox");
  let personalPage = document.querySelector(".personal_page");
  let aboutPerson = document.querySelector(".about");
  let newPerson = document.querySelector(".add-new");
  

  if (window.location.hash.includes("cv_Page")) {
    container.classList.add("hidden");
    personalPage.classList.remove("hidden");

    let searchId = window.location.hash.split("=");

   window.location.reload(false);
   

    for (let person of persons) {
      if ((person.id).toString() === searchId[1].toString()) {
        addUserData(person);
      }
    }

  } else {
    container.classList.remove("hidden");
    personalPage.classList.add("hidden");
    aboutPerson.classList.add('hidden');
    newPerson.classList.add('hidden');
  }
  if (window.location.hash.includes("about")) {
    showAboutPage();
  }
  if (window.location.hash.includes("newPerson")) {
    showNewPersonPage();
  }
});

//show newPerson page
function showNewPersonPage() {
  let container = document.querySelector(".cardBox");
  let personalPage = document.querySelector(".personal_page");
  let aboutPerson = document.querySelector(".about");
  let newPerson = document.querySelector(".add-new");

  container.classList.add("hidden");
  personalPage.classList.add("hidden");
  aboutPerson.classList.add('hidden');
  newPerson.classList.remove('hidden');
}

//show about page
function showAboutPage() {
  let container = document.querySelector(".cardBox");
  let personalPage = document.querySelector(".personal_page");
  let aboutPerson = document.querySelector(".about");

  container.classList.add("hidden");
  personalPage.classList.add("hidden");
  aboutPerson.classList.remove('hidden');
}


//adding users data in cv page
function addUserData(persons) {
  console.log(persons.workExperienceDat);

  console.log(persons);
  document.querySelector(".cvName").innerHTML = persons.firstName + " " + persons.lastName;
  document.querySelector(".emailAddress").innerHTML = (persons.email || "not filled");
  document.querySelector(".phoneNumber").innerHTML = (persons.phone || "not filled");

  document.querySelector(".education").innerHTML = (persons.education || "not filled");
  document.querySelector(".educationDate").innerHTML = (persons.educationDate || "not filled");
  document.querySelector(".profession").innerHTML = (persons.profession || "not filled");


  document.querySelector(".trainings0").innerHTML = (persons.trainings || "not filled");
  document.querySelector(".trainingsDate0").innerHTML = (persons.trainingsDate || "not filled");
  document.querySelector(".trainingName").innerHTML = (persons.trainingName || "not filled");

  document.querySelector(".workExperience").innerHTML = (persons.workExperience || "not filled");
  document.querySelector(".workExperienceDate").innerHTML = (persons.workExperienceDate || "not filled");
  document.querySelector(".position").innerHTML = (persons.position || "not filled");

  document.querySelector(".personImg").setAttribute("src", persons.image || "./img/person-icon.jpg");
}

//adding and saving in local storage
document.querySelector(".add-new-user").addEventListener("click", function (event) {

  event.preventDefault();
  let elements = document.getElementById("new-member").elements;

  let newPerson = {
    id: new Date().valueOf()
  };

  for (let element of elements) {
    newPerson[element.name] = element.value;
  }

  persons.push(newPerson);

  saveToStorage(persons);

  window.location.replace("./index.html");
});

// removing selected user
document.querySelector("#remove-user").addEventListener("click", function (event) {
  event.preventDefault();

  let confirmStatus = confirm("Are you sure to delete?");
  let searchId = window.location.hash.split("=");

  if (confirmStatus) {
    removeFromStorage(searchId);
    window.location.replace("./index.html");
  }
});

function removeFromStorage(searchId) {
  let result = persons.filter(function (person) {
    return (person.id).toString() !== searchId[1].toString();
  });
  saveToStorage(result); 
}

function saveToStorage(data) {
  let stringifyData = JSON.stringify(data);
  window.localStorage.setItem("users", stringifyData);
  return data;
}

function getFromStorage(data) {
  let dataFromStorage = window.localStorage.getItem(data);
  if (dataFromStorage) {
    return JSON.parse(dataFromStorage);
  }
  return false;
}