
const mainContainer = document.querySelector('.grid-container');

// FETCH API

fetch('https://randomuser.me/api/?format=json&results=12&inc=name,email,location,cell,location,dob,picture')
  .then(response => response.json())
  .catch(err => console.log(err))
  .then(data => generateImage(data.picture));

