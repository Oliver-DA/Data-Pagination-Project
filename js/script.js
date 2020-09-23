/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/


//Creating and inserting the searchBar component.
const header = document.querySelector(".header");
const searchBar = createSearchBar();

header.insertAdjacentHTML("beforeend",searchBar);

//Main constans to work through the program.
const searchParent = header.lastElementChild;
const triggerSearch = searchParent.querySelector("button");
const searchInput = searchParent.firstElementChild;
const studentList = document.querySelector(".student-list");
const paginationLinks = document.querySelector(".link-list");

//Clears up an html element.
function cleanHtml (element) {
   return element.innerHTML = "";
}

function createSearchBar () {
   return `<label for="search" class="student-search">
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;   
}

//showPage takes a list(Array) as argument and an amount of pages(Number) to display them on. (9 per page).
function showPage (list,page) {
   const startIndex = ( page * 9 ) - 9;
   const endIndex = ( page * 9 );

   cleanHtml(studentList);

   //loops trought the list and inserts student on the page until endIndex is reached.
   for ( let i = 0; i < list.length; i++) {

      if ( i >= startIndex && i < endIndex ) {
         let student = list[i];

         let html = `
         <li class="student-item cf">
         <div class="student-details">
           <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
           <h3>${student.name.first} ${student.name.last}</h3>
           <span class="email">${student.email}</span>
         </div>
         <div class="joined-details">
           <span class="date">Joined ${student.registered.date}</span>
         </div>
       </li>`;

       studentList.insertAdjacentHTML("beforeend",html);
      }
   }
}

//addPagination function takes a list(Array) as argument and calculates how many pagination button will be displayed.
function addPagination (list) {

   const totalPages = Math.ceil( list.length / 9 );

   cleanHtml(paginationLinks);

   //Creates and inserts pagination buttons according to the totalPages's value.
   for ( let i = 1; i <= totalPages; i++) {
      let link = `<li><button type="button">${i}</button></li>`;
      paginationLinks.insertAdjacentHTML("beforeend",link);
   }

   //Selecting the first pagination button and setting it's class to active
   paginationLinks.querySelectorAll("button")[0].className = "active";

   paginationLinks.addEventListener("click",e => {

      const target = e.target;

      if (target.tagName === "BUTTON") {

         //Sets the last clicked pagination button with the className 'active' to an empty string.
         paginationLinks.querySelector(".active").className = "";

         //Sets the current's pagination button className to 'active'.
         target.className = "active";

         showPage(list,target.textContent);
      }

   });
}

//Calling showPage to display students and addPagination to display paginationButtons.
showPage(data,1);
addPagination(data);


//Takes the array of students and filters those who matched the search(String) argument,then returns them.
function searchFn (search,data) {
   const newData = [];

   for ( let student of data) {
      let studentName = student.name.first.toLowerCase()+" "+ student.name.last.toLowerCase();

      if ( search.length > 0 && studentName.includes( search.toLowerCase().trim("") ) ) {
         newData.push(student);
      }
   }

   return newData;
}

//Controls the search's bar behaviour quer(String) students(Filtered Array of students).
function searchControl (query,students) {

   //if no input provided to search for students return the main page.
   if (query.length == 0 ) {
      showPage(data,1);
      addPagination(data);
      return
   }

   //if the input provided did not match any filtered students.
   else if (students.length == 0) {

      //clean the current list of students and paginationButtons to insert a NOT FOUND message.
      cleanHtml(paginationLinks);
      cleanHtml(studentList);
      studentList.textContent = "No matches were found :(";
      
      return
   }

   //Defining the number of student tha will be displayed per page.
   let totalPages = students.length / 9;

   //passing them as arguments to the showPage and addPagination functions.
   showPage(students,totalPages);
   addPagination(students);

   return;
}

//Event Handlers
triggerSearch.addEventListener("click", () => {
   const filteredStutends = searchFn(searchInput.value,data);
   searchControl(searchInput.value,filteredStutends)
});

searchInput.addEventListener('keyup',() => {
   const filteredStutends = searchFn(searchInput.value,data);
   searchControl(searchInput.value,filteredStutends)
});

