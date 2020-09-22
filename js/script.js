/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage (list,page) {
   const startIndex = ( page * 9 ) - 9;
   const endIndex = ( page * 9 );
   const studentList = document.querySelector(".student-list");
   studentList.innerHTML = "";

   for ( let i = 0; i < list.length; i++){

      if( i >= startIndex && i < endIndex ){
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

function addPagination (list) {
   const totalPages = Math.ceil( list.length / 9 );
   const paginationLinks = document.querySelector(".link-list");
   paginationLinks.innerHTML = "";

   for ( let i = 1; i <= totalPages; i++){
      let link = `<li><button type="button">${i}</button></li>`;
      paginationLinks.insertAdjacentHTML("beforeend",link);
   }

   //Selecting the first pagination button and setting it's class to active
   paginationLinks.querySelectorAll("button")[0].className = "active";

   paginationLinks.addEventListener("click",e => {

      const target = e.target;

      if(target.tagName === "BUTTON"){

         //Sets the last clicked pagination button with the className 'active' to an empty string.
         paginationLinks.querySelector(".active").className = "";

         //Sets the current's pagination button className to 'active'.
         target.className = "active";

         showPage(list,target.textContent);
      }

   });
}

showPage(data,1);
addPagination(data);

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions
