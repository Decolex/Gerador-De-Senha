const lengthSlider = document.querySelector(".pass-length input"),
  options = document.querySelectorAll(".option input"),
  copyIcon = document.querySelector(".input-box span"),
  passwordInput = document.querySelector(".input-box input"),
  passIndicator = document.querySelector(".pass-indicator"),
  generateBtn = document.querySelector(".generate-btn");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~"
};

const generatePassword = () => {
  let staticPassword = "",
    randomPassword = "",
    excludeDuplicate = false,
    passLength = lengthSlider.value;

  options.forEach((option) => {
    if (option.checked) {
      if (option.id !== "exc-duplicate" && option.id !== "spaces") {
        staticPassword += characters[option.id];
      } else if (option.id === "spaces") {
        staticPassword += `  ${staticPassword}  `;
      } else {
        excludeDuplicate = true;
      }
    }
  });

  for (let i = 0; i < passLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  passwordInput.value = randomPassword;
};

const updatePassIndicator = () => {
  passIndicator.id =
    lengthSlider.value <= 8
      ? "weak"
      : lengthSlider.value <= 16
      ? "medium"
      : "strong";
};

const updateSlider = () => {
  document.querySelector(".pass-length span").innerText = lengthSlider.value;
  generatePassword();
  updatePassIndicator();
};
updateSlider();

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.innerText = "check";
  copyIcon.style.color = "#4285F4";
  setTimeout(() => {
    copyIcon.innerText = "copy_all";
    copyIcon.style.color = "#707070";
  }, 1500);
};

document.querySelectorAll('.toggle-btn').forEach(button => {
  button.addEventListener('click', () => {
    const row = button.closest('tr');
    const senhaOculta = row.querySelector('.senha-oculta');
    const senhaVisivel = row.querySelector('.senha-visivel');
    const icon = button.querySelector('i');

    if (senhaOculta.style.display === 'none') {
      senhaOculta.style.display = 'block';
      senhaVisivel.style.display = 'none';
      icon.classList.replace('fa-eye', 'fa-eye-slash');
      button.textContent = ' Mostrar';
      button.prepend(icon);
    } else {
      senhaOculta.style.display = 'none';
      senhaVisivel.style.display = 'block';
      icon.classList.replace('fa-eye-slash', 'fa-eye');
      button.textContent = ' Ocultar';
      button.prepend(icon);
    }
  });
});

// -------------------------
copyIcon.addEventListener("click", () => {
  passwordInput.select();
  document.execCommand("copy");
  alert("Senha copiada: " + passwordInput.value);
});
// ---- tabela
const saveBtn = document.querySelector(".save-btn");
const passwordTable = document.querySelector("tbody");

saveBtn.addEventListener("click", () => {
  const password = passwordInput.value;
  if (password) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td><input type="password" value="${password}" class="senha-oculta" readonly></td>
      <td><input type="text" value="${password}" class="senha-visivel" readonly style="display: none;"></td>
      <td><button class="toggle-btn"><i class="fa fa-eye-slash"></i> Mostrar</button></td>
    `;
    passwordTable.appendChild(newRow);
    
    // Evento para alternar a visibilidade da senha
    const toggleBtn = newRow.querySelector(".toggle-btn");
    toggleBtn.addEventListener("click", () => {
      const senhaOculta = newRow.querySelector(".senha-oculta");
      const senhaVisivel = newRow.querySelector(".senha-visivel");
      if (senhaOculta.style.display === "none") {
        senhaOculta.style.display = "block";
        senhaVisivel.style.display = "none";
        toggleBtn.innerHTML = '<i class="fa fa-eye-slash"></i> Mostrar';
      } else {
        senhaOculta.style.display = "none";
        senhaVisivel.style.display = "block";
        toggleBtn.innerHTML = '<i class="fa fa-eye"></i> Ocultar';
      }
    });
  } else {
    alert("Por favor, gere uma senha antes de salvar.");
  }
});


copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);