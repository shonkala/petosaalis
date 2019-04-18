"use strict";

class World {
  constructor(w, h, creatures) {
    this.width = w;
    this.height = h;
    this.time = 0;
    this.creatures = creatures ? creatures : [];
  }
  progress() {
    this.time++;
  }
  addCreature(creature) {
    this.creatures.push(creature);
  }
  updateState() {
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
        let child = new Plant(newx, newy, creature.type);
        this.addCreature(child);
      }
    });
  }
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
    this.x += x;
    this.y += y;
    if (this.x == 0) this.x = 1;
    if (this.x >= XLIM - 1) this.x = XLIM - 2;
    if (this.y == 0) this.y = 1;
    if (this.y >= YLIM - 1) this.y = YLIM - 2;
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
