let dialog = document.getElementById("create-category-dialog");
let btnOpenDialog = document.querySelector(".open-dialog");
let closeButton = document.querySelector(".close-button");

let openPostItDialog = document.getElementById("open-post-it-dialog-button");
let createPostitDialog = document.getElementById("create-post-it-dialog");

let btnClosePostitDialog = document.getElementById("close-post-it-dialog");

let createPostitButton = document.getElementById("create-post-it-button");

let currentPostit;

let nPostits = 0;
let nCategories = 0;


createPostitButton.addEventListener("click", checkFormPostit);

openPostItDialog.addEventListener("click", function () {
  // Cambiamos el texto del modal
  document.getElementById("create-post-it-button").innerHTML = "Create post-it";
  createPostitDialog.showModal();
});

btnClosePostitDialog.addEventListener("click", function () {
  
  document.getElementById("post-it-title").value = "";
  document.getElementById("post-it-content").value = "";

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

function checkFormPostit() {
  let title = document.getElementById("post-it-title").value;
  let content = document.getElementById("post-it-content").value;

  if (title == "" || content == "") {
    alert("Debes rellenar todos los campos");
    return false;
  } else {
    // Creamos el elemento HTML
    let newPostit = document.createElement("div");

    newPostit.addEventListener("click", function () {
      // Cambiamos el texto del modal
      document.getElementById("create-post-it-button").innerHTML = "Edit post-it";
      createPostitButton.removeEventListener("click", checkFormPostit);
      createPostitButton.addEventListener("click", editPostit);

      // Guardamos el post-it actual
      currentPostit = this;

      // Rellenamos el formulario con los datos del post-it
      document.getElementById("post-it-title").value = this.querySelector(".postit-header h3").innerHTML;
      document.getElementById("post-it-content").value = this.querySelector(".postit-content").innerHTML;

      createPostitDialog.showModal();
    });

    newPostit.id = "post-it-" + nPostits;
    newPostit.classList.add("postit");
    newPostit.setAttribute("draggable", "true");

    newPostit.innerHTML = `
      <div class="postit-header">
        <h3>${title}</h3>
      </div>
      <textarea readonly class="postit-content">${content}</textarea>
    `;

    // Añadimos el elemento al DOM
    let postitsSection = document.getElementById("post-its-section")
    postitsSection.appendChild(newPostit);

    nPostits++;


    $(function () {
      $(".postit").draggable({
        containment: "document",
        stack: ".postit",
        cancel: "button",
        cursor: "move",
        revert: true,
        helper: "original" // Para que no se mueva el post-it original
        ,
        start: function (event, ui) {
          $(this).addClass("dragged");
        },
        stop: function (event, ui) {
          $(this).removeClass("dragged");
        }
      });
    });

    // Borramos el contenido del formulario
    document.getElementById("post-it-title").value = "";
    document.getElementById("post-it-content").value = "";

    // Cerrar el diálogo
    createPostitDialog.close();
    return true;
  };
}

function editPostit() {

  let postit = currentPostit;
  // Añadimos el evento click al botón de borrar post-it

  console.log(postit);

  // Actualizamos el post-it
  postit.querySelector(".postit-header h3").innerHTML = document.getElementById("post-it-title").value;
  postit.querySelector(".postit-content").innerHTML = document.getElementById("post-it-content").value;

  // revertimos el cambio del texto del botón
  document.getElementById("create-post-it-button").innerHTML = "Create post-it";

  // quitamos el evento click del botón de editar post-it
  createPostitButton.removeEventListener("click", editPostit);

  // borramos el contenido del formulario
  document.getElementById("post-it-title").value = "";
  document.getElementById("post-it-content").value = "";

  // añadimos el evento click del botón de crear post-it
  createPostitButton.addEventListener("click", checkFormPostit);

  // Cerrar el diálogo
  createPostitDialog.close();

}


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
    createCategory();
  };
}

function createCategory() {

  // Crea la nueva categoría...
  var newCategory = $("<div>").addClass("droppable").attr("id", "category-" + nCategories);

  // Añadimos el contenido del formulario a la nueva categoría
  let name = document.getElementById("category-name").value;
  let description = document.getElementById("category-description").value;
  let radios = document.getElementsByName("category-color");
  let categoryColor;
  radios.forEach(radio => {
    if (radio.checked) {
      categoryColor = radio.value;
    }
  });

  newCategory.html(`
      <div class="category-header">
        <h3>${name}</h3>
      </div>
      <div class="category-content">
        <p>${description}</p>
      </div>

      <div class="droppable"> 
        <p> Drag a post-it here to
        add it to the category. </p>
      </div>
    `);

  // Añadimos el color de fondo
  newCategory.css("background-color", categoryColor);

  nCategories++;

  $("#categories-section").append(newCategory);

  $(newCategory).find('.droppable').droppable({
    over: function (event, ui) {
      console.log("over");
      $(this).addClass("can-drop");
    },
    out: function (event, ui) {
      var droppable = $(this);
      setTimeout(function () {
        if (!droppable.find(".postit").length) {
          droppable.removeClass("has-postit");
        }
      }, 1);
    },
    drop: function (event, ui) {
      $(this).removeClass("can-drop").addClass("has-postit");
      // ... el resto de tu código de manejo del evento drop ...
    }
  })

  $("#categories-section .droppable").each(function () {
    $(this).droppable({
      over: function (event, ui) {
        this.classList.add("over");
        console.log("over");
      },
      drop: function (event, ui) {
        this.classList.add("has-postit")
        let dropped = ui.draggable;
        let droppedOn = $(this);
        $(dropped).detach().css({
          top: 0,
          left: 0
        }).appendTo(droppedOn);
      },
      out: function (event, ui) {
        this.classList.remove("over");
        console.log("out");
        // Comprobamos si la categoría tiene más post-its
        // Si no tiene, borramos el texto
        let postits = this.querySelectorAll(".postit");
        if (postits.length == 0) {
          this.classList.remove("has-postit");
        }
      }
    });
  });



  // Borramos el contenido del formulario
  document.getElementById("category-name").value = "";
  document.getElementById("category-description").value = "";

  // Recorremos los radio buttons y deseleccionamos todos
  document.getElementsByName("category-color").forEach(radio => {
    radio.checked = false;
  });

  // Cerrar el diálogo
  dialog.close();

}


