class Contato {
    constructor(nome, email, telefone, tipoContato, mensagem) {
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.tipoContato = tipoContato;
        this.mensagem = mensagem;
    }
}

const telefoneformato = document.getElementById("telefone");
telefoneformato.addEventListener("input", function(e) {
    let valor = e.target.value.replace(/\D/g, "");
    if (valor.length > 2) valor = `(${valor.substring(0, 2)}) ${valor.substring(2)}`;
    if (valor.length > 10) valor = `${valor.substring(0, 10)}-${valor.substring(10, 14)}`;
    e.target.value = valor;
});

function Enviar(event) {
    event.preventDefault();

    const nome = document.getElementById("name").value;
    const email = document.getElementById("e-mail").value;
    const telefone = document.getElementById("telefone").value;
    const tipoContato = document.getElementById("tipodecontato").value;
    const mensagem = document.getElementById("mensagem").value;

    if (!nome || !email || !telefone || !mensagem) {
        alert("Preencha todos os campos obrigatórios!");
        return;
    }

    const novoContato = new Contato(nome, email, telefone, tipoContato, mensagem);
    console.log(novoContato);

    document.getElementById("popupcontato").style.display = "flex";
    document.getElementById("popupcontatocontent").innerHTML = `
        <h2>Obrigado, ${nome}!</h2>
        <p>Sua mensagem foi enviada com sucesso.</p>
        <button onclick="fecharPopup()">Fechar</button>
    `;
}

const formButton = document.getElementById("botao")

var checkbox = document.querySelector("#checkbox");

checkbox.addEventListener( 'change', function() {
    if(this.checked) {
        console.log(this.checked)
        formButton.disabled = false;
    } else {
        formButton.disabled = true;
    }
    
});


function fecharPopup() {
    document.getElementById("popupcontato").style.display = "none";
}