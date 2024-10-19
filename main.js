/*------------DOM Elements-----------*/

const cardContainer = document.querySelector('#card-container');
const form = document.querySelector('#new-student-form');
const formNameInput = document.querySelector('#form-name-input')
const btnNew = document.querySelector('#btn-new');
const btnEnroll = document.querySelector('#btn-enroll');

/*-----------------------------------*/
//
/*-------------objects---------------*/

let students = [
  {
    id: 0,
    name: 'Bob Example',
    sort: 'Gryffindor'
  },
];

/*-----------------------------------*/
//
/*-----utility functions-------------*/

const toggleForm = () => {
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
};

const sortStudent = () => {
  const randomValue = Math.floor(Math.random() * (4 - 1)) + 1;
  let sortString = 'Unsorted'
  switch (randomValue) {
    case 1:
      sortString = 'Gryffindor';
      break;
    case 2:
      sortString = 'Ravenclaw';
      break;
    case 3:
      sortString = 'Hufflepuff';
      break;
    case 4:
      sortString = 'Slytherin';
      break;
  };
  return sortString;
};

const submitForm = (e) => {
  e.preventDefault();

  let newStudentObj = {
    id: students.length + 1,
    name: formNameInput.value,
    sort: sortStudent()
  };
  students.push(newStudentObj);
  
  form.reset();
  toggleForm();
};

/*-----------------------------------*/
//
/*---------rendering funcs-----------*/

const render = () => {
  students.map((studentObj) => {
    cardContainer.innerHTML += `
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${studentObj.name}</h5>
          <p class="card-text">${studentObj.sort}</p>
          <button type="button" class="btn btn-danger">Expel</button>
        </div>
      </div>
    `
  })
};

/*-----------------------------------*/
//
/*---------button handlers-----------*/

btnNew.addEventListener("click", () => {
  toggleForm();
});

btnEnroll.addEventListener("submit", () => {
  submitForm();
});

/*------------------------------------*/

const startApp = () => {
  render();
};

startApp();
