let atacante = null;
let defensor = null;

function carregarPokemon() {
  const nomePkm = document.querySelector("#pkm_name").value.trim().toLowerCase();
  if (!nomePkm) return alert("Digite um nome de Pokémon");

  fetch(`https://pokeapi.co/api/v2/pokemon/${nomePkm}`)
    .then(resp => {
      if (!resp.ok) throw new Error("Pokémon não encontrado");
      return resp.json();
    })
    .then(data => {
      const p = new PokemonClass();
      p.nome = data.name;
      p.tipo = data.types.map(t => t.type.name);
      p.peso = data.weight;
      p.sprite = data.sprites.front_default;
      p.hp = data.stats[0].base_stat;
      p.ataque = data.stats[1].base_stat;
      p.defesa = data.stats[2].base_stat;

      document.getElementById("resultado").innerHTML = `
        <h1>${p.nome}</h1>
        <ul>
          <li>Tipo: ${p.tipo}</li>
          <li>Peso: ${p.peso}</li>
          <li>HP: ${p.hp}</li>
          <li>Ataque: ${p.ataque}</li>
          <li>Defesa: ${p.defesa}</li>
        </ul>
        <img src="${p.sprite}" alt="${p.nome}">
      `;

      // inicializa barra
      const hpBar = document.getElementById("hp1");
      hpBar.dataset.max = p.hp;
      hpBar.style.width = "100%";

      atacante = p;
    })
    .catch(err => alert(err.message));
}

function carregarPokemonAdversario() {
  const nomePkm = document.querySelector("#pkm_name2").value.trim().toLowerCase();
  if (!nomePkm) return alert("Digite um nome de Pokémon");

  fetch(`https://pokeapi.co/api/v2/pokemon/${nomePkm}`)
    .then(resp => {
      if (!resp.ok) throw new Error("Pokémon não encontrado");
      return resp.json();
    })
    .then(data => {
      const p = new PokemonClass();
      p.nome = data.name;
      p.tipo = data.types.map(t => t.type.name);
      p.peso = data.weight;
      p.sprite = data.sprites.front_default;
      p.hp = data.stats[0].base_stat;
      p.ataque = data.stats[1].base_stat;
      p.defesa = data.stats[2].base_stat;

      document.getElementById("resultado2").innerHTML = `
        <h1>${p.nome}</h1>
        <ul>
          <li>Tipo: ${p.tipo}</li>
          <li>Peso: ${p.peso}</li>
          <li>HP: ${p.hp}</li>
          <li>Ataque: ${p.ataque}</li>
          <li>Defesa: ${p.defesa}</li>
        </ul>
        <img src="${p.sprite}" alt="${p.nome}">
      `;

      // inicializa barra
      const hpBar = document.getElementById("hp2");
      hpBar.dataset.max = p.hp;
      hpBar.style.width = "100%";

      defensor = p;
    })
    .catch(err => alert(err.message));
}

function iniciarDuelo() {
  if (!atacante || !defensor) {
    alert("Selecione 2 pokémons!");
    return;
  }

  let hpAtacante = atacante.hp;
  let hpDefensor = defensor.hp;

  const hp1El = document.getElementById("hp1");
  const hp2El = document.getElementById("hp2");

  let turno = 1;
  let log = "";

  const resultadoBatalhaEl = document.getElementById("resultadoBatalha");
  const resultadoLogEl = document.getElementById("resultadoLog");
  resultadoBatalhaEl.innerHTML = "";
  resultadoLogEl.innerHTML = "";

  const intervalo = setInterval(() => {
    if (hpAtacante > 0 && hpDefensor > 0) {
      if (turno % 2 === 1) {
        const dano = Math.max(1, atacante.ataque - defensor.defesa);
        hpDefensor = Math.max(0, hpDefensor - dano);
        hp2El.style.width = (hpDefensor / defensor.hp * 100) + "%";
        log += `<p>${atacante.nome} atacou ${defensor.nome} e causou ${dano} de dano</p>`;
      } else {
        const dano = Math.max(1, defensor.ataque - atacante.defesa);
        hpAtacante = Math.max(0, hpAtacante - dano);
        hp1El.style.width = (hpAtacante / atacante.hp * 100) + "%";
        log += `<p>${defensor.nome} atacou ${atacante.nome} e causou ${dano} de dano</p>`;
      }
      resultadoLogEl.innerHTML = log;
      turno++;
    } else {
      clearInterval(intervalo);
      if (hpAtacante <= 0 && hpDefensor <= 0) {
        resultadoBatalhaEl.innerHTML = `<p>Empate! Ambos caíram ao mesmo tempo.</p>`;
      } else if (hpAtacante <= 0) {
        resultadoBatalhaEl.innerHTML = `<p>${defensor.nome} venceu a batalha!</p>`;
      } else {
        resultadoBatalhaEl.innerHTML = `<p>${atacante.nome} venceu a batalha!</p>`;
      }
    }
  }, 1000);
}
