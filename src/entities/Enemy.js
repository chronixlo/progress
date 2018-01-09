import {computed, observable} from 'mobx';
import Item from './Item';

class Enemy {
  @observable damageTaken = 0; 
  
  @observable stats = {
    str: {
      id: 0,
      name: 'str',
      level: 1
    },
    att: {
      id: 1,
      name: 'att',
      level: 1
    },
    hp: {
      id: 2,
      name: 'hp',
      level: 1
    },
  };

  total;

  constructor(total, isBoss) {
    if (isBoss) {
      total += 3;
    }
    this.total = total;
    this.isBoss = isBoss;

    let remaining = total * 3;

    let str = Math.floor(Math.random() * (remaining - 3)) + 1;
    remaining -= str;
    let att = Math.floor(Math.random() * (remaining - 2)) + 1;
    remaining -= att;
    let hp = remaining;

    this.stats.str.level = str;
    this.stats.att.level = att;
    this.stats.hp.level = hp;
  }

  lastAttackFrame = 0;
  attackInterval = 2;

  @computed
  get alive() {
    return this.health > 0;
  }

  @computed
  get health() {
    return this.maxHealth - this.damageTaken;
  }

  @computed
  get maxHealth() {
    return this.stats.hp.level * 10;
  }

  getLoot(chance) {
    if (Math.random() > chance) {
      return [];
    }

    return [this.getItem(this.total)];
  }

  getItem(level) {
    return new Item(level, this.isBoss);
  }
};

export default Enemy;