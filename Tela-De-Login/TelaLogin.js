// Função para mostrar/ocultar a senha
let btn = document.querySelector('.fa-eye');

btn.addEventListener('click', () => {
  let inputSenha = document.querySelector('#senha');
  if (inputSenha.getAttribute('type') === 'password') {
    inputSenha.setAttribute('type', 'text');
  } else {
    inputSenha.setAttribute('type', 'password');
  }
});

// Função de login
function entrar() {
  let usuario = document.querySelector("#user");
  let userLabel = document.querySelector("#userLabel");

  let senha = document.querySelector("#senha");
  let senhaLabel = document.querySelector("#senhaLabel");

  let msgError = document.querySelector("#msgError");
  let listaUser = []; 

  let userValid = {
    nome: "",
    user: "",
    senha: ""
  };

  listaUser = JSON.parse(localStorage.getItem("listaUser")) || []; // Adicionado fallback para caso listaUser seja null

  listaUser.forEach((Element) => {
    if (usuario.value === Element.userCad && senha.value === Element.senhaCad) {
      userValid = {
        user: Element.userCad,
        CNPJ: Element.CNPJCad,
        nome: Element.nomeEmpresaCad,
        senha: Element.senhaCad
      };
    } 
  });

  if (usuario.value === userValid.user && senha.value === userValid.senha) {
    setTimeout(() => {
      window.location.href = "../Tela-Gerador/TelaGerador.html";
    }, 100);

    let token = Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2);
    localStorage.setItem("token", token);
    localStorage.setItem("userLogado", JSON.stringify(userValid));
  } else {
    userLabel.setAttribute("style", "color: red");
    usuario.setAttribute("style", "border-color: red");
    senhaLabel.setAttribute("style", "color: red");
    senha.setAttribute("style", "border-color: red");
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = "Usuário ou Senha incorretos";
    usuario.focus();

    alert("Usuário ou Senha incorretos");
  }
}
