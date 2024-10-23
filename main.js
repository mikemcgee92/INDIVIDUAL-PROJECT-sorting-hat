/*------------DOM Elements-----------*/

const cardContainer = document.querySelector('#card-container');
const form = document.querySelector('#new-student-form');
const btnNew = document.querySelector('#btn-new');
const btnEnroll = document.querySelector('#btn-enroll');

const filterButtons = document.querySelector("#filter-buttons")
const btnFilterAll = document.querySelector('#btn-filter-all');
const btnFilterGryffindor = document.querySelector('#btn-filter-gryffindor');
const btnFilterHufflepuff = document.querySelector('#btn-filter-hufflepuff');
const btnFilterRavenclaw = document.querySelector('#btn-filter-ravenclaw');
const btnFilterSlytherin = document.querySelector('#btn-filter-slytherin');
const btnFilterVoldemort = document.querySelector('#btn-filter-voldemort');


/*-----------------------------------*/
//
/*-------------objects---------------*/

let students = [
  {
    id: 0,
    name: 'Harry Potter',
    sort: 'Gryffindor'
  },
  {
    id: 1,
    name: 'Cedric Diggory',
    sort: 'Hufflepuff'
  },
  {
    id: 2,
    name: 'Luna Lovegood',
    sort: 'Ravenclaw'
  },
  {
    id: 3,
    name: 'Draco Malfoy',
    sort: 'Slytherin'
  },
  {
    id: 4,
    name: 'Tom Riddle',
    sort: "Voldemort's Army"
  }
];

/*-----------------------------------*/
//
/*-----utility functions-------------*/

//show/hide new student entry form
const toggleForm = () => {
  form.style.display = form.style.display === 'none' ? 'block' : 'none';
};

//add a random house assignment to a new student object
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

//get a shortened version of sort strings to use in template literals for styling
const sortShorten = (house) => {
  let newString = '';
  switch (house) {
    case 'Gryffindor':
      newString = 'gryf';
      break;
    case 'Hufflepuff':
      newString = 'huff';
      break;
    case 'Ravenclaw':
      newString = 'rave';
      break;
    case 'Slytherin':
      newString = 'slyt';
      break;
    case "Voldemort's Army":
      newString = 'vold';
      break;
  }
  return newString;
}

//process into array and add to display
const submitForm = (e) => {
  e.preventDefault();

  let newStudentObj = {
    id: students.length + 1,
    name: document.querySelector("#form-name-input").value,
    sort: sortStudent()
  };
  students.push(newStudentObj);

  render(students);
  btnFilterAll.checked = true;
  form.reset();
  toggleForm();
};

//move expelled student into voldemort
cardContainer.addEventListener("click", (e) => {
  if (e.target.id.includes("expel")) {
    const [, id] = e.target.id.split("--");
    const index = students.findIndex((e) => e.id === Number(id));
    students[index].sort = "Voldemort's Army";
    render(filter("Voldemort's Army"));
    btnFilterVoldemort.checked = true;
  }
})

/*-----------------------------------*/
//
/*---------rendering funcs-----------*/

//creates and returns a filtered array
const filter = (target) => {
  let filteredStudents = [];

  students.map((studentObj) => {
    switch (studentObj.sort === target) {
      case true:
        filteredStudents.push(studentObj);
        break;
    };
  });

  return filteredStudents;
}

//hide expel button for expelled students
const expelHide = (object) => {
  if (object.sort === "Voldemort's Army") {
    return `Expelled`
  } else {
    return `Expel`
  }
}

//renders cards to DOM; takes in an array as a parameter
const render = (array) => {
  cardContainer.innerHTML = '';
  array.map((studentObj) => {
    cardContainer.innerHTML += `
      <div class="card" style="width: 16rem;">
        <div class="card-body card-${sortShorten(studentObj.sort)}">
          <h5 class="card-title">${studentObj.name}</h5>
          <p class="card-text">${studentObj.sort}</p>
          <button type="button" class="btn btn-danger" id="expel--${studentObj.id}">${expelHide(studentObj)}</button>
        </div>
      </div>
    `
  })
};

//checks which radio button is checked and renders based on that
const filterRender = () => {
  if (btnFilterAll.checked === true) {
    render(students);
  } else if (btnFilterGryffindor.checked === true) {
    render(filter('Gryffindor'));
  } else if (btnFilterHufflepuff.checked === true) {
    render(filter('Hufflepuff'));
  } else if (btnFilterRavenclaw.checked === true) {
    render(filter('Ravenclaw'))
  } else if (btnFilterSlytherin.checked === true) {
    render(filter('Slytherin'))
  } else if (btnFilterVoldemort.checked === true) {
    render(filter("Voldemort's Army"))
  }
}

//sets the default state of the radio button group and renders output to DOM
const startApp = () => {
  btnFilterAll.checked = true;
  render(students);
}

/*-----------------------------------*/
//
/*---------button handlers-----------*/

btnNew.addEventListener("click", () => {
  toggleForm();
});

filterButtons.addEventListener("click", () => {
  filterRender();
});

form.addEventListener("submit", submitForm);

/*------------------------------------*/

startApp();
