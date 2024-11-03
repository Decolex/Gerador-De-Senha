// Comentários explicativos
// get = pegar algo
// set = colocar algo ou trocar os atributos das coisas
// atributo password = faz a palavra virar colinha
// text = atributo de texto
// type = tipo
// keyup = registra quando a tecla é levantada
// click = registra que o botão criado ou que o mouse clicou em determinado local
// length = identifica o número de caracteres
// style = estilo de uma variável (cor, tamanho, etc.)
// value = serve para puxar os dados de um campo
// # = Seleciona o elemento com o ID "meuElemento"
// Boas práticas: deixar as variáveis no início do código

let btn = document.querySelector('#verSenha');
let btnConfirm = document.querySelector('#verConfirmSenha');

let usuario = document.querySelector('#usuario');
let labelUsuario = document.querySelector('#labelUsuario');
let validUsuario = false;

let senha = document.querySelector('#senha');
let labelSenha = document.querySelector('#labelSenha');
let validSenha = false;

let confirmSenha = document.querySelector('#confirmSenha');
let labelConfirmSenha = document.querySelector('#labelConfirmSenha');
let validConfirmSenha = false;

let msgError = document.querySelector('#msgError');
let msgSuccess = document.querySelector('#msgSuccess');

//-----------------------------------------------------------

usuario.addEventListener('keyup', () => {
    if (usuario.value.length <= 4) {
        labelUsuario.setAttribute('style', 'color: red');
        labelUsuario.innerHTML = '<strong> Usuário *Insira no mínimo 5 caracteres</strong>';
        usuario.setAttribute('style', 'border-color: red');
        validUsuario = false;
    } else {
        labelUsuario.setAttribute('style', 'color: green');
        labelUsuario.innerHTML = 'Usuário';
        usuario.setAttribute('style', 'border-color: green');
        validUsuario = true;
    }
});

senha.addEventListener('keyup', () => {
    const regex = /[!@#$%^&*(),.?":{}|<>]/;
    let valid = true;
    if (senha.value.length >= 6 && regex.test(senha.value)) {
        labelSenha.setAttribute('style', 'color: green');
        labelSenha.innerHTML = 'Senha';
        senha.setAttribute('style', 'border-color: green');
        validSenha = true;
}   else {
        labelSenha.setAttribute('style', 'color: red');
        labelSenha.innerHTML = '<strong> Senha *Insira no mínimo 6 caracteres e um caracter especial </strong>';
        senha.setAttribute('style', 'border-color: red');
        validSenha = false;
}

});

confirmSenha.addEventListener('keyup', () => {
    if (senha.value !== confirmSenha.value) {
        labelConfirmSenha.setAttribute('style', 'color: red');
        labelConfirmSenha.innerHTML = '<strong>Confirmar Senha *Senhas não são iguais</strong>';
        confirmSenha.setAttribute('style', 'border-color: red');
        validConfirmSenha = false;
    } else {
        labelConfirmSenha.setAttribute('style', 'color: green');
        labelConfirmSenha.innerHTML = 'Confirmar Senha';
        confirmSenha.setAttribute('style', 'border-color: green');
        validConfirmSenha = true;
    }
});

function cadastrar() {
    if (validSenha && validUsuario && validConfirmSenha) {
        let listaUser = JSON.parse(localStorage.getItem("listaUser") || "[]");

        listaUser.push({
            userCad: usuario.value,
            senhaCad: senha.value,
            
        });

        localStorage.setItem("listaUser", JSON.stringify(listaUser));

        msgSuccess.setAttribute('style', 'display: block');
        msgSuccess.innerHTML = '<strong> Cadastro realizado com sucesso! Redirecionando... </strong>';
        msgError.setAttribute('style', 'display: none');
        
        setTimeout(() => {
            window.location.href = "../Tela-Gerador/TelaGerador.html"; 
        }, 1000);

    } else {
        msgError.setAttribute('style', 'display: block');
        msgError.innerHTML = '<strong> Preencha todos os campos corretamente </strong>';
        msgSuccess.setAttribute('style', 'display: none');
    }
}

btn.addEventListener('click', () => { 

    // TIRA A COR CINZA E FICA AZUL E TIRA O TRAÇO

    let inputSenha = document.querySelector('#senha');
    if (inputSenha.getAttribute('type') == 'password') {
        inputSenha.setAttribute('type', 'text');
        btn.classList.add('fa-eye'); 
        btn.classList.remove('fa-eye-slash'); 
    } else {

    // VOLTA AO PADRÃO "COR CINZA COM TRAÇO"

        inputSenha.setAttribute('type', 'password');
        btn.classList.add('fa-eye-slash'); 
        btn.classList.remove('fa-eye');
    }
});

btnConfirm.addEventListener('click', () => { 

    // TIRA A COR CINZA E FICA AZUL E TIRA O TRAÇO
    
    let inputConfirmSenha = document.querySelector('#confirmSenha');
    if (inputConfirmSenha.getAttribute('type') == 'password') {
        inputConfirmSenha.setAttribute('type', 'text');
        btnConfirm.classList.add('fa-eye'); 
        btnConfirm.classList.remove('fa-eye-slash'); 
    } else { 

        // VOLTA AO PADRÃO "COR CINZA COM TRAÇO"

        inputConfirmSenha.setAttribute('type', 'password');
        btn.classList.add('fa-eye-slash'); 
        btn.classList.remove('fa-eye');
    }
});
