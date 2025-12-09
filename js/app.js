var InputName = document.getElementById("name");
var InputAvatar = document.getElementById("avatarInput");
var InputPhone = document.getElementById("phone");
var InputEmail = document.getElementById("email");
var InputAddress = document.getElementById("address");
var InputGroup = document.getElementById("group");
var InputNotes = document.getElementById("notes");
var InputFav = document.getElementById("fav");
var InputEmarg = document.getElementById("emarg");
var searchInput = document.getElementById("search");

var ContactList = [];
var ContactFavList = [];
var ContactEmargList = [];
var editIndex = "";

if (localStorage.getItem("ContactList")) {
  ContactList = JSON.parse(localStorage.getItem("ContactList"));
  displayContactsList();
  updateStats();
  getFavItmes();
  getEmargItmes();

  console.log(ContactEmargList);
  console.log(ContactFavList);
  console.log(ContactList);
}

function AddContact() {
  var UserContact = {
    name: InputName.value,
    avatar: InputAvatar.value,
    phone: InputPhone.value,
    email: InputEmail.value,
    address: InputAddress.value,
    group: InputGroup.value,
    notes: InputNotes.value,
    fav: InputFav.checked,
    emarg: InputEmarg.checked,
  };

  if (UserContact.fav) {
    ContactFavList.push(UserContact);
  }
  if (UserContact.emarg) {
    ContactEmargList.push(UserContact);
  }

  ContactList.push(UserContact);
  localStorage.setItem("ContactList", JSON.stringify(ContactList));
  displayContactsList();
  updateStats();

  console.log(UserContact);
  ClearForm();
}

function ClearForm() {
  InputName.value = "";
  InputAvatar.value = "";
  InputPhone.value = "";
  InputEmail.value = "";
  InputAddress.value = "";
  InputGroup.value = "";
  InputNotes.value = "";
  InputFav.checked = false;
  InputEmarg.checked = false;
}

function displayContactsList() {
  ContactFavList = [];
  ContactEmargList = [];

  var box = "";

  if (ContactList.length === 0) {
    box = `
      <div id="contacts-placeholder" class="col-12">
        <div class="placeholder card text-center border-0 shadow-sm py-5">
          <div class="card-body">
            <i class="fa-solid fa-address-card text-muted fs-1 mb-3"></i>
            <h5 class="fw-bold text-dark">Contacts will appear here</h5>
            <p class="text-muted mb-0">Static preview — no JS functionality included</p>
          </div>
        </div>
      </div>
    `;
  } else {
    for (var i = 0; i < ContactList.length; i++) {
      if (ContactList[i].fav) ContactFavList.push(ContactList[i]);
      if (ContactList[i].emarg) ContactEmargList.push(ContactList[i]);

      box += `<div class="col-12 col-md-6">
                  <div class="card custom-card h-100">
                      <div class="card-body d-flex flex-column p-4">

                          <div class="d-flex align-items-start gap-3 mb-3">
                              <div class="position-relative flex-shrink-0">
                                  <div class="avatar-placeholder text-white fw-bold d-flex align-items-center justify-content-center">
                                      ${ContactList[i].name
                                        .slice(0, 2)
                                        .toUpperCase()}

                                  </div>
                                  <div class="badge-star position-absolute top-0 end-0 rounded-circle d-flex align-items-center justify-content-center">
                                      <i class="fa-solid fa-star fa-xs text-white"></i>
                                  </div>
                              </div>

                              <div class="flex-grow-1 min-width-0">
                                  <h5 class="card-title mb-1 text-truncate">${
                                    ContactList[i].name
                                  }</h5>
                                  <div class="d-flex align-items-center gap-2">
                                      <div class="icon-small icon-blue2 d-flex align-items-center justify-content-center rounded">
                                          <i class="fa-solid fa-phone fa-xs"></i>
                                      </div>
                                      <span class="text-muted small text-truncate">${
                                        ContactList[i].phone
                                      }</span>
                                  </div>
                              </div>
                          </div>

                          <div class="mb-3">
                              <div class="d-flex align-items-center gap-2 mb-2">
                                  <div class="icon-small icon-violet d-flex align-items-center justify-content-center rounded">
                                      <i class="fa-solid fa-envelope fa-xs"></i>
                                  </div>
                                  <span class="text-muted small">${
                                    ContactList[i].email
                                  }</span>
                              </div>

                              <div class="d-flex align-items-center gap-2 mb-2">
                                  <div class="icon-small icon-emerald d-flex align-items-center justify-content-center rounded">
                                      <i class="fa-solid fa-location-dot fa-xs"></i>
                                  </div>
                                  <span class="text-muted small">${
                                    ContactList[i].address
                                  }</span>
                              </div>

                              <div class="mt-2 d-flex flex-wrap gap-2">
  <span class="badge tag-blue">${ContactList[i].group}</span>
  ${
    ContactList[i].emarg
      ? '<span class="badge emegy"><i class="fa-solid fa-heart-pulse me-1"></i>Emergency</span>'
      : ""
  }
</div>

                          </div>

                          <div class="mt-auto pt-3 border-top">
                              <div class="d-flex justify-content-between align-items-center gap-2">
                                  <div>
                                      <a href="tel:${
                                        ContactList[i].phone
                                      }" class="btn btn-plain btn-icon icon-violet3" title="Call">
                                          <i class="fa-solid fa-phone"></i>
                                      </a>
                                      <a href="mailto:${
                                        ContactList[i].email
                                      }" class="btn btn-plain btn-icon icon-violet2" title="Email">
                                          <i class="fa-solid fa-envelope"></i>
                                      </a>
                                  </div>
                                  <div>
                                      <button class="btn btn-plain btn-icon icon-fviolet" title="Favorite" onclick="toggleFav(${i})">
  <i class="${ContactList[i].fav ? "fa-solid" : "fa-regular"} fa-star"></i>
</button>

<button class="btn btn-plain btn-icon icon-emarg" title="Emergency" onclick="toggleEmarg(${i})">
  <i class="${
    ContactList[i].emarg ? "fa-solid fa-heart-pulse" : "fa-regular fa-heart"
  }"></i>
</button>


                                      <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="startEdit(${i})" class="btn btn-plain btn-icon icon-blue3" title="Edit">
  <i class="fa-solid fa-pen"></i>
</button>

                                      <button onclick="deleteContact(${i})" class="btn btn-plain btn-icon icon-red" title="Delete">
                                          <i class="fa-solid fa-trash"></i>
                                      </button>
                                  </div>
                              </div>
                          </div>

                      </div>
                  </div>
              </div>`;
    }
  }

  document.getElementById("contacts-list").innerHTML = box;

  getFavItmes();
  getEmargItmes();
}

function getFavItmes() {
  ContactFavList = [];

  for (var i = 0; i < ContactList.length; i++) {
    if (ContactList[i].fav === true) {
      ContactFavList.push(ContactList[i]);
    }
  }

  var container = document.getElementById("favor");

  if (ContactFavList.length === 0) {
    container.innerHTML = `
      <div class="text-center text-muted small">
        Favorites list will appear here
      </div>
    `;
    return;
  }

  var box = "";

  for (let i = 0; i < ContactFavList.length; i++) {
    box += `
      <div class="contact-item d-flex align-items-center gap-3 p-2 rounded-3 cursor-pointer">

        <div class="flex-shrink-0">
          <div class="avatar-box d-flex align-items-center justify-content-center text-white fw-semibold">
            ${ContactList[i].name.slice(0, 2).toUpperCase()}
          </div>
        </div>

        <div class="flex-grow-1 min-w-0">
          <h6 class="mb-0 fw-medium text-dark text-truncate">
            ${ContactFavList[i].name}
          </h6>
          <p class="text-muted small mb-0 text-truncate">
            ${ContactFavList[i].phone}
          </p>
        </div>

        <a href="tel:${ContactFavList[i].phone}"
          class="call-btn d-flex align-items-center justify-content-center rounded-3">
          <i class="fa-solid fa-phone"></i>
        </a>

      </div>
    `;
  }

  container.innerHTML = box;
}

function getEmargItmes() {
  ContactEmargList = [];

  for (var i = 0; i < ContactList.length; i++) {
    if (ContactList[i].emarg === true) {
      ContactEmargList.push(ContactList[i]);
    }
  }

  var container = document.getElementById("emargc");

  if (ContactEmargList.length === 0) {
    container.innerHTML = `
      <div class="text-center text-muted small">
        Emergency contacts list will appear here
      </div>
    `;
    return;
  }

  var box = "";

  for (var i = 0; i < ContactEmargList.length; i++) {
    box += `
      <div class="contact-item d-flex align-items-center gap-3 p-2 rounded-3 cursor-pointer">
        <div class="flex-shrink-0">
            <div class="avatar-box d-flex align-items-center justify-content-center text-white fw-semibold">
              ${ContactList[i].name.slice(0, 2).toUpperCase()}
            </div>
        </div>

        <div class="flex-grow-1 min-w-0">
            <h6 class="mb-0 fw-medium text-dark text-truncate">${
              ContactEmargList[i].name
            }</h6>
            <p class="text-muted small mb-0 text-truncate">${
              ContactEmargList[i].phone
            }</p>
        </div>

        <a href="tel:${
          ContactEmargList[i].phone
        }" class="call-btn d-flex align-items-center justify-content-center rounded-3">
            <i class="fa-solid fa-phone"></i>
        </a>
      </div>
    `;
  }

  container.innerHTML = box;
}

function deleteContact(index) {
  ContactList.splice(index, 1);
  localStorage.setItem("ContactList", JSON.stringify(ContactList));
  displayContactsList();
  updateStats();
}

function startEdit(index) {
  editIndex = index;

  document.getElementById("addBtn").classList.replace("d-block", "d-none");
  document.getElementById("updateBtn").classList.replace("d-none", "d-block");

  InputName.value = ContactList[index].name;
  InputAvatar.value = ContactList[index].avatar;
  InputPhone.value = ContactList[index].phone;
  InputEmail.value = ContactList[index].email;
  InputAddress.value = ContactList[index].address;
  InputGroup.value = ContactList[index].group;
  InputNotes.value = ContactList[index].notes;
  InputFav.checked = ContactList[index].fav;
  InputEmarg.checked = ContactList[index].emarg;
}

function updateContact() {
  if (editIndex === null || editIndex === "") return;

  ContactList[editIndex] = {
    name: InputName.value,
    avatar: InputAvatar.value,
    phone: InputPhone.value,
    email: InputEmail.value,
    address: InputAddress.value,
    group: InputGroup.value,
    notes: InputNotes.value,
    fav: InputFav.checked,
    emarg: InputEmarg.checked,
  };

  localStorage.setItem("ContactList", JSON.stringify(ContactList));

  displayContactsList();
  updateStats();
  ClearForm();

  document.getElementById("addBtn").classList.replace("d-none", "d-block");
  document.getElementById("updateBtn").classList.replace("d-block", "d-none");

  editIndex = "";
}

function searchItem() {
  var box = ``;

  for (let i = 0; i < ContactList.length; i++) {
    if (
      ContactList[i].name
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      box += `
            <div class="col-12 col-md-6">
                  <div class="card custom-card h-100">
                      <div class="card-body d-flex flex-column p-4">

                          <div class="d-flex align-items-start gap-3 mb-3">
                              <div class="position-relative flex-shrink-0">
                                  <div class="avatar-placeholder text-white fw-bold d-flex align-items-center justify-content-center">
                                      ${ContactList[i].name
                                        .slice(0, 2)
                                        .toUpperCase()}

                                  </div>
                                  <div class="badge-star position-absolute top-0 end-0 rounded-circle d-flex align-items-center justify-content-center">
                                      <i class="fa-solid fa-star fa-xs text-white"></i>
                                  </div>
                              </div>

                              <div class="flex-grow-1 min-width-0">
                                  <h5 class="card-title mb-1 text-truncate">${
                                    ContactList[i].name
                                  }</h5>
                                  <div class="d-flex align-items-center gap-2">
                                      <div class="icon-small icon-blue2 d-flex align-items-center justify-content-center rounded">
                                          <i class="fa-solid fa-phone fa-xs"></i>
                                      </div>
                                      <span class="text-muted small text-truncate">${
                                        ContactList[i].phone
                                      }</span>
                                  </div>
                              </div>
                          </div>

                          <div class="mb-3">
                              <div class="d-flex align-items-center gap-2 mb-2">
                                  <div class="icon-small icon-violet d-flex align-items-center justify-content-center rounded">
                                      <i class="fa-solid fa-envelope fa-xs"></i>
                                  </div>
                                  <span class="text-muted small">${
                                    ContactList[i].email
                                  }</span>
                              </div>

                              <div class="d-flex align-items-center gap-2 mb-2">
                                  <div class="icon-small icon-emerald d-flex align-items-center justify-content-center rounded">
                                      <i class="fa-solid fa-location-dot fa-xs"></i>
                                  </div>
                                  <span class="text-muted small">${
                                    ContactList[i].address
                                  }</span>
                              </div>

                              <div class="mt-2 d-flex flex-wrap gap-2">
  <span class="badge tag-blue">${ContactList[i].group}</span>
  ${
    ContactList[i].emarg
      ? '<span class="badge emegy"><i class="fa-solid fa-heart-pulse me-1"></i>Emergency</span>'
      : ""
  }
</div>

                          </div>

                          <div class="mt-auto pt-3 border-top">
                              <div class="d-flex justify-content-between align-items-center gap-2">
                                  <div>
                                      <a href="tel:${
                                        ContactList[i].phone
                                      }" class="btn btn-plain btn-icon icon-violet3" title="Call">
                                          <i class="fa-solid fa-phone"></i>
                                      </a>
                                      <a href="mailto:${
                                        ContactList[i].email
                                      }" class="btn btn-plain btn-icon icon-violet2" title="Email">
                                          <i class="fa-solid fa-envelope"></i>
                                      </a>
                                  </div>
                                  <div>
                                      <button class="btn btn-plain btn-icon" title="Favorite">
                                          <i class="${
                                            ContactList[i].fav
                                              ? "fa-solid"
                                              : "fa-regular"
                                          } fa-star"></i>
                                      </button>
                                      <button class="btn btn-plain btn-icon" title="Emergency">
                                          <i class="${
                                            ContactList[i].emarg
                                              ? "fa-solid"
                                              : "fa-regular"
                                          } fa-heart"></i>
                                      </button>
                                      <button data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="updateContact(${i})" class="btn btn-plain btn-icon icon-blue3" title="Edit">
                                          <i class="fa-solid fa-pen"></i>
                                      </button>
                                      <button onclick="deleteContact(${i})" class="btn btn-plain btn-icon icon-red" title="Delete">
                                          <i class="fa-solid fa-trash"></i>
                                      </button>
                                  </div>
                              </div>
                          </div>

                      </div>
                  </div>
              </div>`;
    }
  }

  document.getElementById("contacts-list").innerHTML = box;
}

function updateStats() {
  var total = ContactList.length;
  var favCount = ContactList.filter((c) => c.fav).length;
  var emargCount = ContactList.filter((c) => c.emarg).length;

  var statCards = document.querySelectorAll("#quick-stats .stat-card");
  statCards[0].querySelector("h4").textContent = total;
  statCards[1].querySelector("h4").textContent = favCount;
  statCards[2].querySelector("h4").textContent = emargCount;
}

function toggleFav(index) {
  ContactList[index].fav = !ContactList[index].fav;
  localStorage.setItem("ContactList", JSON.stringify(ContactList));
  displayContactsList();
  updateStats();
  getFavItmes();
}

function toggleEmarg(index) {
  ContactList[index].emarg = !ContactList[index].emarg;
  localStorage.setItem("ContactList", JSON.stringify(ContactList));
  displayContactsList();
  updateStats();
  getEmargItmes();
}
