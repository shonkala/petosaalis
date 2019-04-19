"use strict";

class World {
  constructor(w, h, creatures) {
    this.width = w;
    this.height = h;
    this.time = 0;
    this.creatures = creatures ? creatures : [];
  }

  updateState() {
    this.progress();
    this.creatures.forEach(creature => {
      creature.move();
      if (
        creature instanceof Plant &&
        creature.grow() &&
        this.creatures.length < CLIM
      ) {
        let { x, y } = randomWalk();
        let newx = creature.x + x;
        let newy = creature.y + y;
        let pos = checkLimits(newx, newy);
        newx = pos.x;
        newy = pos.y;
        let result = this.creatures.find(c => {
          if (c instanceof Plant && c.x == newx && c.y == newy) return true;
        });
        if (!result) {
          let child = new Plant(newx, newy, creature.type);
          this.addCreature(child);
        }
      }
      if (creature instanceof Animal && creature.hunger == true) {
        this.creatures.forEach((c, index, array) => {
          if (c instanceof Plant && c.x == creature.x && c.y == creature.y)
            array.splice(index, 1);
        });
        creature.eat();
      }
    });
  }

  progress() {
    this.time++;
  }
  addCreature(creature) {
    this.creatures.push(creature);
  }
  killCreature(creature) {}
}

class Creature {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.hunger = true;
    this.age = 0;
    this.lastAte = 0;
  }
  eat() {
    this.hunger = false;
    this.lastAte = 0;
  }
  grow() {
    return false;
  }
}

class Plant extends Creature {
  move() {
    this.age += 1;
  }
  grow() {
    if (this.age % 5 == 0) {
      return true;
    }
  }
}

class Animal extends Creature {
  move() {
    this.age += 1;
    this.lastAte += 1;
    let { x, y } = randomWalk();
    x = this.x + x;
    y = this.y + y;
    let pos = checkLimits(x, y);
    this.x = pos.x;
    this.y = pos.y;
  }
  eat() {}
}

function randomWalk() {
  let rand = Math.random();
  let x = 0,
    y = 0;
  if (rand < 0.25) x = -1;
  else if (rand < 0.5) x = 1;
  else if (rand < 0.75) y = -1;
  else y = 1;
  return { x, y };
}

function checkLimits(x, y) {
  if (x == 0) x = 1;
  if (x >= XLIM - 1) x = XLIM - 2;
  if (y == 0) y = 1;
  if (y >= YLIM - 1) y = YLIM - 2;
  return { x, y };
}
