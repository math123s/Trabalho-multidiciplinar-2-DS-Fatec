const STORAGE_KEY = "treinadores";
let treinadores = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

document.querySelector("#formTreinador").addEventListener("submit", function (e) {
  e.preventDefault();

  const nome = document.querySelector("#nome").value.trim();
  const idade = document.querySelector("#idade").value.trim();
  const cidade = document.querySelector("#cidade").value.trim();
  const pokemonsInput = document.querySelector("#pokemons").value.trim();

  const pokemons = pokemonsInput ? pokemonsInput.split(",").map(p => p.trim()) : [];

  const novo = new TreinadorClass(nome, idade, cidade, pokemons);
  treinadores.push(novo);
  _salvar();
  _renderizarLista();
  this.reset();
});

function _salvar() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(treinadores));
}

function _renderizarLista() {
  const ul = document.querySelector("#listaTreinadores");
  ul.innerHTML = "";

  treinadores.forEach((t, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${t.nome}</strong> (${t.idade} anos) - ${t.cidade}<br>
      <em>Pokémons:</em> ${t.pokemons.join(", ")}<br>
      <button onclick="editarTreinador(${i})">Editar</button>
      <button onclick="removerTreinador(${i})">Excluir</button>
      <button onclick="irParaBatalha()">Continuar</button>
      <hr>
    `;
    ul.appendChild(li);
  });
}

function removerTreinador(idx) {
  treinadores.splice(idx, 1);
  _salvar();
  _renderizarLista();
}

function editarTreinador(idx) {
  const t = treinadores[idx];
  const novoNome = prompt("Novo nome:", t.nome);
  const novaIdade = prompt("Nova idade:", t.idade);
  const novaCidade = prompt("Nova cidade:", t.cidade);
  const novosPokemons = prompt("Novos Pokémons (separados por vírgula):", t.pokemons.join(", "));

  if (!novoNome || !novaIdade || !novaCidade) {
    return alert("Todos os campos devem ser preenchidos.");
  }

  t.atualizar(novoNome, novaIdade, novaCidade, novosPokemons ? novosPokemons.split(",").map(p => p.trim()) : []);
  _salvar();
  _renderizarLista();
}

function irParaBatalha() {
  window.location.href = "index.html";
}

// inicializa
_renderizarLista();
