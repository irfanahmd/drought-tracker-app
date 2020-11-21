document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems, {});
});

let editBtn = document.querySelectorAll(".editButton");
let updateForm = document.querySelectorAll(".hide");

for (var i = 0; i < editBtn.length; i++) {
  let editButton = editBtn[i];
  let index = i;
  editButton.addEventListener("click", function (e) {
    updateForm[index].classList.toggle("hide");
  });
}
