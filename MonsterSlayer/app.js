new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function() {
      var damage = this.calculateDamage(3, 10);
      var critical = (damage === 10 ? 'Critical!' : '');
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        log: critical + ' Player hits ' + damage
      });
      if (this.battleStatus()) {
        return;
      }
      this.monsterAttacks();
    },
    specialAttack: function() {
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        log: 'Special Attack! Player hits ' + damage
      });
      if (this.battleStatus()) {
        return;
      }
      this.monsterAttacks();
    },
    heal: function() {
      (this.playerHealth <= 90 ? this.playerHealth += 10 : this.playerHealth = 100)
      this.turns.unshift({
        isPlayer: true,
        log: 'Player recovered 10% of his health!'
      });
      this.monsterAttacks();
    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    monsterAttacks: function() {
      var damage = this.calculateDamage(5, 12);
      var critical = (damage === 12 ? 'Critical!' : '');
      this.playerHealth -= damage;
      this.turns.unshift({
        isPlayer: false,
        log: critical + ' Monster hits ' + damage
      });
      this.battleStatus();
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    battleStatus: function() {
      if (this.monsterHealth <= 0) {
        if (confirm('You won! New game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('The monster defeated you! New game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    }
  }
});
