var FullNameInput = document.querySelector("#FullName")
var phoneInput = document.querySelector("#phone")
var emailInput = document.querySelector("#email")
var favoriteRadio = document.querySelectorAll(".favinputs")
var btnUpdate = document.querySelector("#btn-update")
var btnAdd = document.querySelector("#btn-add")
var secrchInput = document.querySelector("#secrchInput")
var addressInput = document.querySelector("#address")
var contactGroupInput = document.querySelector("#contactGroup")
var imgInput = document.querySelector("#imgInput")
var favSection = document.querySelector("#fav")
var emerSection = document.querySelector("#emergency")
var favoritesnum = document.querySelector(".favorites")
var emergency = document.querySelector(".emergencys")
var allProduct = []
var curruntInput = 0;

// localstorage 
if (localStorage.getItem("all") != null) {
    allProduct = JSON.parse(localStorage.getItem("all"))
    display()
    updateTotals()
    fav()
    emer()
    updateTotalsfav()
    updateTotalsemer()
}
var contanerfave = "Not selected";
function addProduct() {
    if (validationName() && validationphone() && validationemail()) {

        for (var i = 0; i < favoriteRadio.length; i++) {
            if (favoriteRadio[i].checked) {
                contanerfave = favoriteRadio[i].value

            }

        }
        var product = {
            name: FullNameInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
            radio: contanerfave,
            address: addressInput.value,
            contactGroup: contactGroupInput.value,
            imgInputs: `imgs/${imgInput.files[0]?.name}`
        }

        console.log(favoriteRadio);
        allProduct.push(product)
        localStorage.setItem("all", JSON.stringify(allProduct));
        Swal.fire({
            icon: "success",
            title: "Contact Added",
            text: "The contact has been added successfully 🎉",
            timer: 1500,
            showConfirmButton: false
        });

        clear()
        display()
        hideForm()
        fav()
        emer()
        updateTotals()
        updateTotalsfav()
        updateTotalsemer()

    }
}

function updateTotals() {
    var totalnum = document.querySelectorAll(".total");
    for (var i = 0; i < totalnum.length; i++) {
        totalnum[i].textContent = allProduct.length;
    }
}

function updateTotalsfav() {
    var favCount = 0;
    for (var i = 0; i < allProduct.length; i++) {
        if (allProduct[i].radio === "favorite") {
            favCount++;
        }
    }
    favoritesnum.textContent = favCount;
}
function updateTotalsemer() {
    var emer = 0;
    for (var i = 0; i < allProduct.length; i++) {
        if (allProduct[i].radio === "emergency") {
            emer++;
        }
    }
    emergency.textContent = emer;
}
function display() {
    var container = ""
    for (var i = 0; i < allProduct.length; i++) {
        container += `
       <div class="card mb-3 shadow-sm p-3 rounded-4">
  <div class="d-flex align-items-start gap-3">
<img style="width:90px"src="${allProduct[i].imgInputs}"/>
    <div class="flex-grow-1">
      <h6 class="mb-1 fw-bold">${allProduct[i].name}</h6>

      <div class="d-flex align-items-center text-muted mb-1">
        <i class="fa-solid fa-phone me-2"></i>
        ${allProduct[i].phone}
      </div>

      <div class="d-flex align-items-center text-muted mb-1">
        <i class="fa-solid fa-envelope me-2"></i>
        ${allProduct[i].email}
      </div>

      <div class="d-flex align-items-center text-muted mb-2">
        <i class="fa-solid fa-location-dot me-2"></i>
        ${allProduct[i].address}
      </div>

    
      <div class="d-flex gap-2">
        <span class="badge bg-success">${allProduct[i].contactGroup}</span>
        <span class="badge bg-danger">${allProduct[i].radio}</span>
      </div>
    </div>
  </div>

 
  <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
    <div class="d-flex gap-2">
      <button class="btn btn-light">
        <i class="fa-solid fa-phone text-success"></i>
      </button>
      <button class="btn btn-light">
        <i class="fa-solid fa-envelope text-primary"></i>
      </button>
    </div>

    <div class="d-flex gap-2">
      <button class="btn btn-light">
        <i class="fa-regular fa-star"></i>
      </button>
      <button class="btn btn-light text-danger">
        <i class="fa-solid fa-heart-pulse"></i>
      </button>
      <button class="btn btn-light" onclick="updateform(${i})">
        <i class="fa-solid fa-pen"></i>
      </button>
      <button class="btn btn-light text-danger" onclick="deletepro(${i})">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  </div>
</div>

    `
        document.getElementById("demo").innerHTML = container
    }
}
function deletepro(i) {
  // alert for delete
    Swal.fire({
        title: "Are you sure?",
        text: "This contact will be deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        confirmButtonText: "Yes, delete it",
    }).then((result) => {
        if (result.isConfirmed) {
            allProduct.splice(i, 1);
            localStorage.setItem("all", JSON.stringify(allProduct));
            display();
            updateTotals();
            fav()
            emer()
            updateTotalsfav()
            updateTotalsemer()
            Swal.fire("Deleted!", "Contact has been removed.", "success");
        }
    });

}

function clear() {
    FullNameInput.value = ""
    phoneInput.value = ""
    emailInput.value = ""
    addressInput.value = ""
    contactGroupInput.value = ""
    imgInput.value = ""
}
function updateform(i) {
    curruntInput = i;
    FullNameInput.value = allProduct[i].name
    phoneInput.value = allProduct[i].phone
    emailInput.value = allProduct[i].email
    addressInput.value = allProduct[i].address
    contactGroupInput.value = allProduct[i].contactGroup
     for (var j = 0; j < favoriteRadio.length; j++) {
        if (favoriteRadio[j].value === allProduct[i].radio) {
            favoriteRadio[j].checked = true;
            contanerfave = favoriteRadio[j].value;
        }
    }
    btnAdd.classList.add("d-none")
    btnUpdate.classList.remove("d-none")
    fav()
    emer()
    showForm()
}
function saveUpdates() {
    if (validationName() && validationphone() && validationemail()) {
       for (var i = 0; i < favoriteRadio.length; i++) {
            if (favoriteRadio[i].checked) {
                contanerfave = favoriteRadio[i].value;
            }
        }
        var product = {
            name: FullNameInput.value,
            phone: phoneInput.value,
            email: emailInput.value,
            radio: contanerfave,
            address: addressInput.value,
            contactGroup: contactGroupInput.value,
              

        }
        allProduct.splice(curruntInput, 1, product)
        localStorage.setItem("all", JSON.stringify(allProduct));
        display()
        Swal.fire({
            icon: "success",
            title: "Contact Updated",
            text: "Changes saved successfully ✨",
            timer: 1500,
            showConfirmButton: false
        })
        hideForm()
        btnAdd.classList.remove("d-none")
        btnUpdate.classList.add("d-none")
        clear()
        fav()
        emer()
    }
}
// search by name || email || phone
function search() {
    var serchInputValue = secrchInput.value
    var cartona = ""
    for (var i = 0; i < allProduct.length; i++) {
        if (allProduct[i].name.toLowerCase().includes(serchInputValue.toLowerCase()) || allProduct[i].email.includes(serchInputValue.toLowerCase()) || allProduct[i].phone.toLowerCase().includes(serchInputValue.toLowerCase())) {
            cartona += `
          <div class="card mb-3 shadow-sm p-3 rounded-4">
  <div class="d-flex align-items-start gap-3">
<img style="width:90px"src="${allProduct[i].imgInputs}"/>
    <div class="flex-grow-1">
      <h6 class="mb-1 fw-bold">${allProduct[i].name}</h6>

      <div class="d-flex align-items-center text-muted mb-1">
        <i class="fa-solid fa-phone me-2"></i>
        ${allProduct[i].phone}
      </div>

      <div class="d-flex align-items-center text-muted mb-1">
        <i class="fa-solid fa-envelope me-2"></i>
        ${allProduct[i].email}
      </div>

      <div class="d-flex align-items-center text-muted mb-2">
        <i class="fa-solid fa-location-dot me-2"></i>
        ${allProduct[i].address}
      </div>

    
      <div class="d-flex gap-2">
        <span class="badge bg-success">${allProduct[i].contactGroup}</span>
        <span class="badge bg-danger">${allProduct[i].radio}</span>
      </div>
    </div>
  </div>

 
  <div class="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
    <div class="d-flex gap-2">
      <button class="btn btn-light">
        <i class="fa-solid fa-phone text-success"></i>
      </button>
      <button class="btn btn-light">
        <i class="fa-solid fa-envelope text-primary"></i>
      </button>
    </div>

    <div class="d-flex gap-2">
      <button class="btn btn-light">
        <i class="fa-regular fa-star"></i>
      </button>
      <button class="btn btn-light text-danger">
        <i class="fa-solid fa-heart-pulse"></i>
      </button>
      <button class="btn btn-light" onclick="updateform(${i})">
        <i class="fa-solid fa-pen"></i>
      </button>
      <button class="btn btn-light text-danger" onclick="deletepro(${i})">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  </div>
</div>
    `
            document.getElementById("demo").innerHTML = cartona
        }
    }

}

function fav() {
    var cartona = "";
    for (var i = 0; i < allProduct.length; i++) {
        if (allProduct[i].radio === "favorite") {
            cartona += `
               <div class="card mb-2 p-3 rounded-4 shadow-sm">
  <div class="d-flex align-items-center justify-content-between">
    <div class="d-flex align-items-center gap-3">
      <div>
        <h6 class="mb-0 fw-bold">${allProduct[i].name}</h6>
        <p class="mb-0 text-muted">${allProduct[i].phone}</p>
      </div>
    </div>
    <div class="call-icon bg-danger-subtle rounded-circle d-flex align-items-center justify-content-center">
      <i class="fa-solid fa-phone text-danger"></i>
    </div>

  </div>
</div>
            `;
        }
    }
    favSection.innerHTML = cartona;
}

function emer() {
    var cartona = "";
    for (var i = 0; i < allProduct.length; i++) {
        if (allProduct[i].radio === "emergency") {
            cartona += `
               <div class="card mb-2 p-3 rounded-4 shadow-sm">
  <div class="d-flex align-items-center justify-content-between">
    <div class="d-flex align-items-center gap-3">
      <div>
        <h6 class="mb-0 fw-bold">${allProduct[i].name}</h6>
        <p class="mb-0 text-muted">${allProduct[i].phone}</p>
      </div>
    </div>
    <div class="call-icon bg-danger-subtle rounded-circle d-flex align-items-center justify-content-center">
      <i class="fa-solid fa-phone text-danger"></i>
    </div>

  </div>
</div>

            `;
        }
    }
    emerSection.innerHTML = cartona;
}
// shaw and hide form
function showForm() {
    document.getElementById("formOverlay").classList.remove("d-none");
}

function hideForm() {
    document.getElementById("formOverlay").classList.add("d-none");
}
// form validation
function validationName() {
    var regex = /^[a-zA-Z\u0600-\u06FF ]{2,50}$/;
    var text = FullNameInput.value
    var mesNameInput = document.querySelector("#mesNameInput")
    if (regex.test(text)) {
        FullNameInput.classList.remove("is-invalid")
        FullNameInput.classList.add("is-valid")
        mesNameInput.classList.add("d-none")
        return true

    } else {
        FullNameInput.classList.add("is-invalid")
        FullNameInput.classList.remove("is-valid")
        mesNameInput.classList.remove("d-none")
        return false
    }
}
function validationphone() {
    var regex = /^01[0125][0-9]{8}$/;
    var text = phoneInput.value
    var mesphoneInput = document.querySelector("#mesphoneInput")
    if (regex.test(text)) {
        phoneInput.classList.remove("is-invalid")
        phoneInput.classList.add("is-valid")
        mesphoneInput.classList.add("d-none")
        return true

    } else {
        phoneInput.classList.add("is-invalid")
        phoneInput.classList.remove("is-valid")
        mesphoneInput.classList.remove("d-none")
        return false
    }
}
function validationemail() {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var text = emailInput.value
    var mesemailInput = document.querySelector("#mesemailInput")
    if (regex.test(text)) {
        emailInput.classList.remove("is-invalid")
        emailInput.classList.add("is-valid")
        mesemailInput.classList.add("d-none")
        return true

    } else {
        emailInput.classList.add("is-invalid")
        emailInput.classList.remove("is-valid")
        mesemailInput.classList.remove("d-none")
        return false
    }
}