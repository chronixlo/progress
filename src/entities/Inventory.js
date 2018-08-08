import { action, computed, observable, toJS } from 'mobx';

const ITEM_TYPES = ['helmet', 'armor', 'weapon'];

class SortType {
  constructor(name, comparator) {
    this.name = name;
    this.comparator = comparator;
  }
}

class Inventory {
  @observable inventory = new Map();
  @observable selected = null;
  
  sortTypes = [
    new SortType(
      'Level',
      (a, b) => b.level - a.level || b.rarity - a.rarity
    ),
    new SortType(
      'Rarity',
      (a, b) =>  b.rarity - a.rarity || b.level - a.level
    ),
    new SortType(
      'Strength',
      (a, b) => b.stats.str - a.stats.str || b.level - a.level
    ),
    new SortType(
      'Attack',
      (a, b) => b.stats.att - a.stats.att || b.level - a.level
    ),
    new SortType(
      'Hitpoints',
      (a, b) => b.stats.hp - a.stats.hp || b.level - a.level
    ),
  ];

  @observable sort = this.sortTypes[0];

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
    const selected = this.selected;

    let items = this.inventory.values().filter(i => selected === null || selected === i.type);

    if (this.sort) {
      items = items.sort(this.sort.comparator);
    }

    return items;
  }

  @action.bound
  setSort(sort) {
    this.sort = sort;
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
  selectFilter(name) {
    if (name === this.selected) {
      this.selected = null;
      return;
    }
    this.selected = name;
  }

  @action.bound
  clearInventory() {
    this.inventory.clear();
  }

  @action.bound
  clearObsolete() {
    const gear = this.gear;

    if (!gear.armor || !gear.helmet || !gear.weapon) {
      return;
    }

    const cutoff = Math.min(gear.armor.level, gear.helmet.level, gear.weapon.level) - 1;

    this.inventory.forEach(action.bound((value, key) => {
      if (value.level < cutoff) {
        this.inventory.delete(key);
      }
    }))
  }
};

export default Inventory;