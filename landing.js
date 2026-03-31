document.addEventListener("DOMContentLoaded", function () {
  // ----------------------------
  // COOKIES
  // ----------------------------

  const cookiesButton = document.getElementById("cookies");

  function abrirVentana(url) {
    const windowFeatures = "width=800,height=800,top=100,left=350";
    window.open(url, "_blank", windowFeatures);
  }

  if (cookiesButton) {
    cookiesButton.addEventListener("click", function (event) {
      event.preventDefault();
      abrirVentana("PoliticaDeCookies.html");
    });
  }

  // ----------------------------
  // MODAL FORMULARIO
  // ----------------------------

  const botonesAbrir = document.querySelectorAll(".abrir-formulario");
  const modal = document.getElementById("modalFormulario");
  const cerrar = document.getElementById("cerrarModal");

  botonesAbrir.forEach((boton) => {
    boton.addEventListener("click", function (e) {
      e.preventDefault();
      if (modal) {
        modal.classList.add("activo");
        document.body.classList.add("modal-abierto");
      }
    });
  });

  if (cerrar) {
    cerrar.addEventListener("click", function () {
      if (modal) {
        modal.classList.remove("activo");
        document.body.classList.remove("modal-abierto");
      }
    });
  }

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        modal.classList.remove("activo");
        document.body.classList.remove("modal-abierto");
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal) {
      modal.classList.remove("activo");
      document.body.classList.remove("modal-abierto");
    }
  });

  // ----------------------------
  // FORMULARIO DE CONTACTO NUEVO
  // ----------------------------

  const formularioContacto = document.getElementById("formularioContacto");

  if (formularioContacto) {
    const nombre = document.getElementById("nombre");
    const email = document.getElementById("email");
    const asunto = document.getElementById("asunto");
    const mensaje = document.getElementById("mensaje");
    const privacidad = document.getElementById("privacidad");

    const errorNombre = document.getElementById("errorNombre");
    const errorEmail = document.getElementById("errorEmail");
    const errorAsunto = document.getElementById("errorAsunto");
    const errorMensaje = document.getElementById("errorMensaje");
    const mensajeEnvio = document.getElementById("mensajeEnvio");

    function validarEmail(valor) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      return regex.test(valor);
    }

    function limpiarErroresContacto() {
      if (errorNombre) errorNombre.textContent = "";
      if (errorEmail) errorEmail.textContent = "";
      if (errorAsunto) errorAsunto.textContent = "";
      if (errorMensaje) errorMensaje.textContent = "";
      if (mensajeEnvio) mensajeEnvio.textContent = "";
    }

    formularioContacto.addEventListener("submit", function (event) {
      event.preventDefault();
      limpiarErroresContacto();

      let esValido = true;

      if (nombre && nombre.value.trim() === "") {
        errorNombre.textContent = "El nombre es obligatorio.";
        esValido = false;
      }

      if (email && email.value.trim() === "") {
        errorEmail.textContent = "El correo electrónico es obligatorio.";
        esValido = false;
      } else if (email && !validarEmail(email.value.trim())) {
        errorEmail.textContent = "Introduce un correo electrónico válido.";
        esValido = false;
      }

      if (asunto && asunto.value.trim() === "") {
        errorAsunto.textContent = "El asunto es obligatorio.";
        esValido = false;
      }

      if (mensaje && mensaje.value.trim() === "") {
        errorMensaje.textContent = "El mensaje es obligatorio.";
        esValido = false;
      }

      if (privacidad && !privacidad.checked) {
        if (mensajeEnvio) {
          mensajeEnvio.textContent = "Debes aceptar la política de privacidad.";
          mensajeEnvio.style.color = "#c0392b";
        }
        esValido = false;
      }

      if (esValido) {
        if (mensajeEnvio) {
          mensajeEnvio.textContent = "Mensaje validado correctamente.";
          mensajeEnvio.style.color = "#2C2C2C";
        }
        formularioContacto.reset();
      }
    });
  }

  // ----------------------------
  // FORMULARIO ANTIGUO DE REGISTRO
  // SOLO SE EJECUTA SI EXISTE
  // ----------------------------

  const formularioRegistro = document.getElementById("formularioRegistro");

  if (formularioRegistro) {
    const nombre = document.getElementById("nombreCompleto");
    const email = document.getElementById("correoElectronico");
    const password = document.getElementById("contrasena");
    const passwordRepetida = document.getElementById("confirmarContrasena");
    const parrafo = document.getElementById("mensajeRegistro");
    const dni = document.getElementById("dniInput");
    const fecha = document.getElementById("fechaNacimiento");

    const listaRequisitosPassword = document.getElementById("listaRequisitosPassword");
    const caracteresMinimos = document.getElementById("caracteresMinimos");
    const caracteresMaximos = document.getElementById("caracteresMaximos");
    const mayusculaObligatoria = document.getElementById("mayusculaObligatoria");
    const minusculaObligatoria = document.getElementById("minusculaObligatoria");
    const digitoObligatorio = document.getElementById("digitoObligatorio");
    const espaciosProhibidos = document.getElementById("espaciosProhibidos");
    const caracterEspecialObligatorio = document.getElementById("caracterEspecialObligatorio");

    const errorNombre = document.getElementById("errorNombre");
    const errorEmail = document.getElementById("errorEmail");
    const errorPassword = document.getElementById("errorPassword");
    const errorPasswordRepetida = document.getElementById("errorPasswordRepetida");
    const errorDni = document.getElementById("errorDni");
    const errorFecha = document.getElementById("errorFecha");

    const rojo = "#FA7575";
    const verde = "#B8FAA1";

    if (listaRequisitosPassword) {
      listaRequisitosPassword.style.display = "none";
    }

    function mostrarOcultarDNI() {
      const paisSelect = document.getElementById("pais");
      const dniLabel = document.getElementById("dniLabel");
      const dniInput = document.getElementById("dniInput");

      if (!paisSelect || !dniLabel || !dniInput) return;

      if (paisSelect.value === "ES") {
        dniLabel.style.display = "block";
        dniInput.style.display = "block";
      } else {
        dniLabel.style.display = "none";
        dniInput.style.display = "none";
        dniInput.value = "";
        if (errorDni) errorDni.innerHTML = "";
      }
    }

    window.mostrarOcultarDNI = mostrarOcultarDNI;

    function validarNombre() {
      let valido = false;
      const regNombre = /^[A-ZÁÉÍÓÚÜÑa-záéíóúüñ]+(?:-[A-ZÁÉÍÓÚÜÑa-záéíóúüñ]+)?(?: [A-ZÁÉÍÓÚÜÑa-záéíóúüñ]+(?:-[A-ZÁÉÍÓÚÜÑa-záéíóúüñ]+)?)+$/;
      const dobleEspacio = /  /g;
      const limiteCaracteres = /^.{1,50}$/;

      if (nombre.value.trim() === "") {
        errorNombre.innerHTML = "<br>El nombre es requerido";
        valido = false;
      } else if (!limiteCaracteres.test(nombre.value)) {
        errorNombre.innerHTML = "El máximo son 50 caracteres";
        valido = false;
      } else if (dobleEspacio.test(nombre.value)) {
        errorNombre.innerHTML = "No se permiten dos espacios seguidos";
        valido = false;
      } else if (!regNombre.test(nombre.value)) {
        errorNombre.innerHTML = "Debes introducir un apellido";
        valido = false;
      } else {
        errorNombre.innerHTML = "";
        valido = true;
      }

      return valido;
    }

    function validarEmailRegistro() {
      let valido = false;
      const regEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,5})+$/;

      if (email.value.trim() === "") {
        errorEmail.innerHTML = "<br>El email es requerido";
        valido = false;
      } else if (!regEmail.test(email.value)) {
        errorEmail.innerHTML = "Debes introducir un email válido";
        valido = false;
      } else {
        errorEmail.innerHTML = "";
        valido = true;
      }

      return valido;
    }

    function validarPassword() {
      let valido = false;

      const min8Caracteres = /^.{8,}$/;
      const max15Caracteres = /^.{8,15}$/;
      const contieneMayuscula = /[A-Z]/;
      const contieneMinuscula = /[a-z]/;
      const contieneDigito = /\d/;
      const noContieneEspacios = /^\S+$/;
      const contieneCaracterEspecial = /[¡!@#$%^&*(),.¿?":{}|<>_/\\'ºª·€¬=\[\]\+\-;]/;

      if (password.value.trim() === "") {
        errorPassword.innerHTML = "La contraseña es requerida";
        if (listaRequisitosPassword) listaRequisitosPassword.style.display = "none";
        return false;
      }

      if (caracteresMinimos) caracteresMinimos.style.color = min8Caracteres.test(password.value) ? "green" : "red";
      if (caracteresMaximos) caracteresMaximos.style.color = max15Caracteres.test(password.value) ? "green" : "red";
      if (mayusculaObligatoria) mayusculaObligatoria.style.color = contieneMayuscula.test(password.value) ? "green" : "red";
      if (minusculaObligatoria) minusculaObligatoria.style.color = contieneMinuscula.test(password.value) ? "green" : "red";
      if (digitoObligatorio) digitoObligatorio.style.color = contieneDigito.test(password.value) ? "green" : "red";
      if (espaciosProhibidos) espaciosProhibidos.style.color = noContieneEspacios.test(password.value) ? "green" : "red";
      if (caracterEspecialObligatorio) caracterEspecialObligatorio.style.color = contieneCaracterEspecial.test(password.value) ? "green" : "red";

      valido =
        min8Caracteres.test(password.value) &&
        max15Caracteres.test(password.value) &&
        contieneMayuscula.test(password.value) &&
        contieneMinuscula.test(password.value) &&
        contieneDigito.test(password.value) &&
        noContieneEspacios.test(password.value) &&
        contieneCaracterEspecial.test(password.value);

      if (valido) {
        errorPassword.innerHTML = "";
        if (listaRequisitosPassword) listaRequisitosPassword.style.display = "none";
      } else {
        errorPassword.innerHTML = "";
        if (listaRequisitosPassword) listaRequisitosPassword.style.display = "block";
      }

      return valido;
    }

    function validarPasswordRepeticion() {
      let valido = false;

      if (passwordRepetida.value.trim() === "") {
        errorPasswordRepetida.innerHTML = "No puede estar en blanco";
        valido = false;
      } else if (passwordRepetida.value !== password.value) {
        errorPasswordRepetida.innerHTML = "La contraseña no coincide";
        valido = false;
      } else {
        errorPasswordRepetida.innerHTML = "";
        valido = true;
      }

      return valido;
    }

    function validarFecha() {
      let valido = true;
      let fechaNacimiento = fecha.value;

      if (fechaNacimiento.trim() === "") {
        errorFecha.innerHTML = "";
        return true;
      }

      fechaNacimiento = new Date(fechaNacimiento);
      fechaNacimiento.setHours(0);

      const fechaActual = new Date();

      if (fechaNacimiento > fechaActual) {
        errorFecha.innerHTML = "La fecha de nacimiento no puede ser mayor al día de hoy.";
        return false;
      }

      const diferenciaMilisegundos = fechaActual - fechaNacimiento;
      const edad = Math.floor(diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 365.25));

      if (fechaNacimiento.toString() === "Invalid Date") {
        errorFecha.innerHTML = "Debes introducir una fecha válida";
        valido = false;
      } else if (edad > 120) {
        errorFecha.innerHTML = "La edad no puede ser mayor a 120 años";
        valido = false;
      } else if (edad < 18) {
        errorFecha.innerHTML = "Debes ser mayor de edad";
        valido = false;
      } else {
        errorFecha.innerHTML = "";
        valido = true;
      }

      return valido;
    }

    function eliminaGuiones(cadena) {
      return cadena.replace(/-/g, "");
    }

    function validarDNI() {
      const paisSelect = document.getElementById("pais");
      if (!paisSelect || paisSelect.value !== "ES") return true;

      let valido = false;
      const regexDNI = /^\d{8}[a-zA-Z]$/;
      const regexDNICerosOmitidos = /^\d{1,7}[a-zA-Z]$/;

      if (dni.value.trim() === "") {
        errorDni.innerHTML = "El DNI es obligatorio";
        return false;
      }

      dni.value = eliminaGuiones(dni.value);

      if (!regexDNI.test(dni.value)) {
        if (regexDNICerosOmitidos.test(dni.value)) {
          errorDni.innerHTML = "Te falta añadir los ceros";
        } else {
          errorDni.innerHTML = "Debes introducir un DNI válido";
        }
        return false;
      }

      const numeroDNI = dni.value.slice(0, 8);
      const letraDNI = dni.value.charAt(8).toUpperCase();
      const letrasPosibles = "TRWAGMYFPDXBNJZSQVHLCKE";
      const letraCalculada = letrasPosibles.charAt(numeroDNI % 23);

      if (letraDNI !== letraCalculada) {
        errorDni.innerHTML = "La letra del DNI no es válida";
        valido = false;
      } else {
        errorDni.innerHTML = "";
        valido = true;
      }

      return valido;
    }

    function validarFormulario() {
      const nombreValido = validarNombre();
      const emailValido = validarEmailRegistro();
      const contrasenaValida = validarPassword();
      const confirmacionContrasenaValida = validarPasswordRepeticion();
      const fechaValida = validarFecha();
      const dniValido = validarDNI();

      return nombreValido && emailValido && contrasenaValida && confirmacionContrasenaValida && fechaValida && dniValido;
    }

    function cambiaColorInput(elemento, esValido) {
      if (elemento.value === "") {
        elemento.style.backgroundColor = "white";
      } else if (esValido) {
        elemento.style.backgroundColor = verde;
      } else {
        elemento.style.backgroundColor = rojo;
      }
    }

    formularioRegistro.addEventListener("submit", function (e) {
      e.preventDefault();

      if (validarFormulario()) {
        parrafo.style.color = "black";
        parrafo.innerHTML = "Se ha enviado el formulario";
      } else {
        parrafo.style.color = "red";
        parrafo.innerHTML = "Hay errores en el formulario";
      }
    });

    nombre.addEventListener("input", function () {
      cambiaColorInput(nombre, validarNombre());
    });

    email.addEventListener("input", function () {
      cambiaColorInput(email, validarEmailRegistro());
    });

    password.addEventListener("input", function () {
      cambiaColorInput(password, validarPassword());
    });

    passwordRepetida.addEventListener("input", function () {
      cambiaColorInput(passwordRepetida, validarPasswordRepeticion());
    });

    if (dni) {
      dni.addEventListener("input", function () {
        cambiaColorInput(dni, validarDNI());
      });
    }

    if (fecha) {
      fecha.addEventListener("input", validarFecha);
    }

    mostrarOcultarDNI();
  }
});
 