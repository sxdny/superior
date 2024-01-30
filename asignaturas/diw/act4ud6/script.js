
console.log("Script loaded");

let dialog = document.getElementById("create-category-dialog");
let btnOpenDialog = document.querySelector(".open-dialog");
let closeButton = document.querySelector(".close-button");

let openPostItDialog= document.getElementById("open-post-it-dialog-button");
let createPostitDialog = document.getElementById("create-post-it-dialog");

let btnClosePostitDialog = document.getElementById("close-post-it-dialog");

let createPostitButton = document.getElementById("create-post-it-button");

createPostitButton.addEventListener("click", checkFormPostit);

function checkFormPostit() {
  let title = document.getElementById("post-it-title").value;
  let content = document.getElementById("post-it-content").value;

  if (title == "" || content == "") {
    alert("Debes rellenar todos los campos");
    return false;
  } else {
    console.log("Formulario emplenado correctamente");
    console.log("Título: " + title);
    console.log("Contenido: " + content);

    // Creamos el elemento HTML
    let newPostit = document.createElement("div");
    newPostit.classList.add("postit");
    newPostit.setAttribute("draggable", "true");

    newPostit.innerHTML = `
      <div class="postit-header">
        <h3>${title}</h3>
        <button class="delete-button">Eliminar</button>
      </div>
      <textarea class="postit-content">${content}</textarea>
    `;

    // Añadimos el elemento al DOM
    let postitsSection = document.getElementById("post-its-section")
    postitsSection.appendChild(newPostit);

    // Borramos el contenido del formulario
    document.getElementById("post-it-title").value = "";
    document.getElementById("post-it-content").value = "";

    // Cerrar el diálogo
    createPostitDialog.close();
    return true;
  };
}


openPostItDialog.addEventListener("click", function () {
  createPostitDialog.showModal();
});

btnClosePostitDialog.addEventListener("click", function () {
  createPostitDialog.close();
});


btnOpenDialog.addEventListener("click", function () {
  dialog.showModal();
});

closeButton.addEventListener("click", function () {
  dialog.close();
});

let submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", checkForm);

// Comprobamos que todos los campos del formulario estén rellenos
function checkForm() {
  let name = document.getElementById("category-name").value;
  let description = document.getElementById("category-description").value;
  let radios = document.getElementsByName("category-color");
  let categoryColor;
  radios.forEach(radio => {
    if (radio.checked) {
      categoryColor = radio.value;
    }
  });

  if (name == "" || description == "" || categoryColor == "" || categoryColor == undefined) {
    alert("Debes rellenar todos los campos");
    return false;
  } else {
    console.log("Formulario emplenado correctamente");
    console.log("Nombre: " + name);
    console.log("Descripción: " + description);
    console.log("Color: " + categoryColor);

    // Creamos el elemento HTML
    let newCategory = document.createElement("div");
    newCategory.classList.add("category");
    newCategory.style.backgroundColor = categoryColor;

    newCategory.innerHTML = `
      <div>
        <h3>${name}</h3>
        <button class="delete-button">Eliminar</button>
      </div>  
    
      <p>${description}</p>

      <div class="droppable"> 
        <p> Drag a post-it here to
        add it to the category. </p>
      </div>
    `;

    // Añadimos el elemento al DOM
    let categoriesSection = document.getElementById("categories-section")
    categoriesSection.appendChild(newCategory);

    // Borramos el contenido del formulario
    document.getElementById("category-name").value = "";
    document.getElementById("category-description").value = "";
    radios.forEach(radio => {
      radio.checked = false;
    });

    // Cerrar el diálogo
    dialog.close();
    return true;
  };
}


