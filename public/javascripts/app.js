document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems, {});
});

let editBtn = document.querySelectorAll(".editButton");
let updateForm = document.querySelectorAll("#hiddenform");
let createNew = document.querySelectorAll("#createNewFarm");
let newForm = document.querySelectorAll("#newFarmForm");

createNew[0].addEventListener("click", function () {
  newForm[0].classList.toggle("hide");
  createNew[0].classList.toggle("hide");
});

for (var i = 0; i < editBtn.length; i++) {
  let editButton = editBtn[i];
  let index = i;
  editButton.addEventListener("click", function () {
    updateForm[index].classList.toggle("hide");
  });
}
