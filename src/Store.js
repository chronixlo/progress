import {action, computed, observable, toJS} from 'mobx';
import Enemy from './entities/Enemy';
import Player from './entities/Player';

const STAGEMULTI = 1;

class Store {
  @observable player = new Player();
  @observable enemy = new Enemy(1);
  @observable lastIn = null;
  @observable lastOut = null;
  @observable killed = 0;
  @observable stage = 1;
  @observable highestStage = 1;
  

  frame = 0;

  constructor() {
    this.loadGame();
    this.tick();
    setInterval(this.tick.bind(this), 300);
    setInterval(this.saveGame, 5000);
  }

  @action
  loadGame() {
    let store = JSON.parse(localStorage.getItem('store'));

    if (!store) {
      return;
    }

    this.stage = store.stage;
    this.highestStage = store.highestStage;
    this.player = new Player(store.player);
    this.enemy = new Enemy(this.stageLevel);
  }

  @action.bound
  saveGame() {
    let store = {
      player: this.player.serialized,
      highestStage: this.highestStage,
      stage: this.stage,
    };

    localStorage.setItem('store', JSON.stringify(store));
  }

  @action
  tick() {
    const player = this.player;
    this.frame++;

    if (!this.player.alive) {
      this.resetStage();

      return;
    }

    if (!this.enemy.alive) {
      let chance = (this.killed + 10) / 100;

      player.addItems(this.enemy.getLoot(chance));

      let enemyLevel = ~~(this.stageLevel + this.killed / 10);

      let isBoss = false;

      if ((this.killed + 1) % 10 === 0) {
        isBoss = true;
      }

      this.enemy = new Enemy(enemyLevel, isBoss);
      this.killed++;

      if (this.killed >= 10) {
        this.highestStage = this.stage + 1;
      }

      return;
    }

    else if (this.canAttack(this.player)) {
      let out = this.attack(this.player, this.enemy);

      this.lastOut = out;
    }

    else if (this.enemy.alive && this.canAttack(this.enemy)) {
      this.lastIn = this.attack(this.enemy, this.player);
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

    target.damageTaken += hit;

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
    return this.stage * STAGEMULTI;
  }
}

export default new Store();