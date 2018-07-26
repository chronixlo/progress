import {action, computed, observable, toJS} from 'mobx';
import Enemy from './entities/Enemy';
import Player from './entities/Player';

const STAGEMULTI = 1.5;

class Store {
  @observable player = new Player();
  @observable enemy = new Enemy(1);
  @observable killed = 0;
  @observable stage = 1;
  @observable highestStage = 1;
  @observable autoAdvance = true;
  

  frame = 0;

  constructor() {
    this.loadGame();
    this.tick();
    setInterval(this.tick, 300);
    setInterval(this.saveGame, 5000);
  }

  @action.bound
  toggleAutoAdvance() {
    this.autoAdvance = !this.autoAdvance;
  }

  @action
  loadGame() {
    let store = JSON.parse(localStorage.getItem('store'));

    if (!store) {
      return;
    }

    this.autoAdvance = store.autoAdvance;
    this.highestStage = store.highestStage;
    this.stage = this.autoAdvance ? this.highestStage : store.stage;
    this.player = new Player(store.player);
    this.enemy = new Enemy(this.stageLevel);
  }

  @action.bound
  saveGame() {
    let store = {
      player: this.player.serialized,
      highestStage: this.highestStage,
      stage: this.stage,
      autoAdvance: this.autoAdvance
    };

    localStorage.setItem('store', JSON.stringify(store));
  }

  @action.bound
  tick() {
    const player = this.player;
    this.frame++;

    if (!player.alive) {
      if (this.autoAdvance) {
        this.stage = this.highestStage;
      }

      this.resetStage();

      return;
    }

    if (!this.enemy.alive) {
      let chance = (this.killed + 10) / 100;

      player.addItems(this.enemy.getLoot(chance));

      let enemyLevel = Math.floor(this.stageLevel + this.killed / 10);

      let isBoss = false;

      if ((this.killed + 1) % 10 === 0) {
        isBoss = true;
      }

      this.enemy = new Enemy(enemyLevel, isBoss);
      this.killed++;

      if (this.killed === 10 && this.stage === this.highestStage) {
        this.highestStage++;
      }

      return;
    }

    else if (this.canAttack(player)) {
      this.attack(player, this.enemy);
    }

    else if (this.enemy.alive && this.canAttack(this.enemy)) {
      this.attack(this.enemy, this.player);
    }
  }
  
  @action
  attack(origin, target) {
    origin.lastAttackFrame = this.frame;
    let hit = Math.floor(Math.random() * (origin.stats.str.level + 1));
    hit += 4;
    hit = Math.min(hit, target.health);

    let lifestealHit = Math.floor(Math.random() * (origin.stats.att.level / 10));

    if (origin.damageTaken < lifestealHit) {
      origin.damageTaken = 0;
    } else {
      origin.damageTaken -= lifestealHit;
    }

    origin.lastHeal = lifestealHit;

    target.damageTaken += hit;
    target.lastHit = hit;

    return hit;
  }

  canAttack(character) {
    return this.frame - character.lastAttackFrame > character.attackInterval;
  }

  @action.bound
  setStage(diff) {
    let newStage = this.stage + diff;

    if (newStage > 0 && newStage <= this.highestStage) {
      this.stage = newStage;
      this.resetStage();
    }
  }

  @action.bound
  resetStage() {
    this.player.damageTaken = 0;
    this.enemy = new Enemy(this.stageLevel);
    this.killed = 0;
  }

  setTraining(name) {
    this.training = name;
  }

  @computed
  get stageLevel() {
    return Math.floor(this.stage * STAGEMULTI);
  }
}

export default new Store();