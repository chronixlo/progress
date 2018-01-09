import GREEK_GODS from '../greek_gods.json';
import DESCRIPTIONS from '../descriptions.json';

const GOD_NAMES = GREEK_GODS.greek_gods;
const DESC = DESCRIPTIONS.descriptions;

const ITEM_TYPES = ['helmet', 'armor', 'weapon'];
const WEAPON_TYPES = ['MACE', 'MAUL', 'DAGGER', 'BROADSWORD'];

const ucfirst = (str) => str[0].toUpperCase() + str.slice(1).toLowerCase();

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

class Item {
  id;
  name;
  level;
  type;
  rarity = 1;
  stats = {};
  equipped = false;


  constructor(level, isBoss = false) {
    // epic
    if (isBoss && Math.random() > 0.9) {
      this.rarity = 2;
      level += 5;
    }

    this.id = 'i' + Date.now().toString(36);
    this.level = level;
    this.type = randomFrom(ITEM_TYPES);

    let type = this.type === 'weapon' ? randomFrom(WEAPON_TYPES) : this.type;

    type = ucfirst(type);

    if (this.rarity === 2) {
      this.name = type + ' of ' + ucfirst(randomFrom(GOD_NAMES));
    } else {
      this.name = type + ' of the ' + ucfirst(randomFrom(DESC));
    }

    let remaining = level * 3;
    
    let str = Math.floor(Math.random() * (remaining + 1));
    this.stats.str = str;
    remaining -= str;

    if (!remaining) return;

    let att = Math.floor(Math.random() * (remaining + 1));
    remaining -= att;
    this.stats.att = att;
    
    if (!remaining) return;

    let hp = remaining;
    this.stats.hp = hp;
  }
}

export default Item;