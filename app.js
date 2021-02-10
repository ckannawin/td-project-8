// GLOBAL Variables

let employeeList = [];
const urlAPI = 'https://randomuser.me/api/?format=json&results=12&inc=name,email,location,phone,location,dob,picture&noinfo&nat=US';
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContainer = document.querySelector('.modal-content');
const modalClose = document.querySelector('.modal-close');

// FETCH API

fetch(urlAPI)
  .then(response => response.json()) //parse
  .then(response => response.results) //return the results - an arr of 12 items
  .then(displayEmployees)
  .catch(err => console.log(err))

// Functions

function displayEmployees(employeeData) {
  
  employeeList = employeeData;

  let employeeHTML = '';

  employeeList.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    employeeHTML += 
    `<div class="card" data-index="${index}">
      <img class="avatar" src="${picture.large}" />
      <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
      </div>
    </div>`
  })

  gridContainer.innerHTML = employeeHTML;
}



function displayModal(index) {
  
  let { name, dob, phone, email, location: { city, street, state, postcode
  }, picture } = employeeList[index];

  let date = new Date(dob.date);
  
  
  const modalHTML =
  `<img class="avatar" src="${picture.large}" />
  <div class="text-container">
  <h2 class="name">${name.first} ${name.last}</h2>
  <p class="email">${email}</p>
  <p class="address">${city}</p>
  <hr />
  <p>${phone}</p>
  <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
  <p>Birthday:
  ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
  </div>`;


  overlay.classList.remove('hidden');
  modalContainer.innerHTML = modalHTML;
}

gridContainer.addEventListener('click', e => {
 if (e.target !== gridContainer) {
  const card = e.target.closest(".card");
  const index = card.getAttribute('data-index');
  displayModal(index);
  }
  });

  modalClose.addEventListener('click', e => {
    overlay.classList.add('hidden');
  })