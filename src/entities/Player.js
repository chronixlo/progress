import { action, computed, observable, toJS } from 'mobx';

const ITEM_TYPES = ['helmet', 'armor', 'weapon'];

class Player {
  @observable baseStats = {
    str: {
      id: 0,
      name: 'str',
      level: 3
    },
    att: {
      id: 1,
      name: 'att',
      level: 3
    },
    hp: {
      id: 2,
      name: 'hp',
      level: 10
    },
  };

  @observable inventory = new Map();
  
  @observable gear = {
    armor: null,
    helmet: null,
    weapon: null
  };

  @observable damageTaken = 0; 

  lastAttackFrame = 0;
  attackInterval = 2;

  constructor(data) {
    this.restore(data);
  }

  @action.bound
  restore(data) {
    if (!data) {
      return;
    }
    this.gear = data.gear;
    this.inventory.replace(data.inventory);
  }

  @computed
  get serialized() {
    return {
      gear: toJS(this.gear),
      inventory: toJS(this.inventory)
    };
  }

  @computed
  get bestItems() {
    return this.inventory.values().sort((a, b) => b.level - a.level);
  }

  @computed
  get stats() {
    const stats = toJS(this.baseStats);

    ITEM_TYPES.forEach(name => {
      if (!this.gear[name]) {
        return;
      }
      
      for (let stat in this.gear[name].stats) {
        stats[stat].level += this.gear[name].stats[stat];
      }
    });
    return stats;
  }

  @computed
  get alive() {
    return this.health > 0;
  }

  @computed
  get total() {
    let level = 0;

    for (let stat in this.stats) {
      level += this.stats[stat].level;
    };

    return ~~(level / 3);
  }

  @computed
  get health() {
    return this.maxHealth - this.damageTaken;
  }

  @computed
  get maxHealth() {
    return this.stats.hp.level * 10;
  }

  @action.bound
  addItems(items) {
    items.forEach(item =>
      this.inventory.set(item.id, item)
    );
  }

  @action.bound
  equipItem(item) {
    let oldItem = this.gear[item.type];
    if (oldItem) {
      this.inventory.set(oldItem.id, oldItem);
    }
    
    this.gear[item.type] = item;
    this.inventory.delete(item.id);
  }

  @action.bound
  clearInventory() {
    this.inventory.clear();
  }
};

export default Player;