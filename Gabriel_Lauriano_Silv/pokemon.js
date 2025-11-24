class PokemonClass {
    constructor() {
      this._nome = "";
      this._tipo = [];
      this._peso = 0;
      this._sprite = "";
      this._ataque = 0;
      this._defesa = 0;
      this._hp = 0;
    }
  
    set nome(v) { this._nome = v; }
    get nome() { return this._nome; }
  
    set tipo(v) { this._tipo = v; }
    get tipo() { return this._tipo; }
  
    set peso(v) { this._peso = v; }
    get peso() { return this._peso; }
  
    set sprite(v) { this._sprite = v; }
    get sprite() { return this._sprite; }
  
    set ataque(v) { this._ataque = v; }
    get ataque() { return this._ataque; }
  
    set defesa(v) { this._defesa = v; }
    get defesa() { return this._defesa; }
  
    set hp(v) { this._hp = v; }
    get hp() { return this._hp; }
  
    dados() {
      return `${this._nome} - ${this._tipo.join(", ")} - ${this._peso}`;
    }
  }
  