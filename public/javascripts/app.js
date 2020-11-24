document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems, {});
});

let editBtn = document.querySelectorAll(".editButton");
let cancelBtn = document.querySelector("#cancelButton");

let latInput = document.querySelector("#latnew");

let updateForm = document.querySelectorAll("#hiddenform");
let createNew = document.querySelectorAll("#createNewFarm");
let newForm = document.querySelectorAll("#newFarmForm");

createNew[0].addEventListener("click", function () {
  newForm[0].classList.toggle("hide");
  createNew[0].classList.toggle("hide");
});

cancelBtn.addEventListener("click", function () {
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

//form validation
function validate() {
  if (document.formNew.farmName.value == "") {
    swal("Oops", "Farm Name Required");
    document.formNew.farmName.focus();
    return false;
  }
  if (
    document.formNew.lat.value > 90 ||
    document.formNew.lat.value < -90 ||
    document.formNew.lat.value == "" ||
    isNaN(document.formNew.lat.value)
  ) {
    swal("Oops", "Latidude between -90 to +90");
    document.formNew.lat.focus();
    return false;
  }
  if (
    document.formNew.lon.value > 180 ||
    document.formNew.lon.value < -180 ||
    document.formNew.lon.value == "" ||
    isNaN(document.formNew.lon.value)
  ) {
    swal("Oops", "Longitude between -180 to +180");
    document.formNew.lon.focus();
    return false;
  }
}

function valUpdate(f) {
  if (f.farmName.value == "") {
    swal("Oops", "Farm Name Required");
    f.farmName.focus();
    return false;
  }
  if (
    f.lat.value > 90 ||
    f.lat.value < -90 ||
    f.lat.value == "" ||
    isNaN(f.lat.value)
  ) {
    swal("Oops", "Latidude between -90 to +90");
    f.lat.focus();
    return false;
  }
  if (
    f.lon.value > 180 ||
    f.lon.value < -180 ||
    f.lon.value == "" ||
    isNaN(f.lon.value)
  ) {
    swal("Oops", "Longitude between -180 to +180");
    f.lon.focus();
    return false;
  }
}
