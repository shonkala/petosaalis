class Creature {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.hunger = true;
    this.age = 0;
    this.lastAte = 0;
    this.alive = true;
  }
  eat() {
    this.hunger = false;
    this.lastAte = 0;
  }
  grow() {
    return false;
  }
  kill() {
    this.alive = false;
  }
}

class Plant extends Creature {
  move() {
    this.age += 1;
  }
  grow() {
    if (this.age % 10 == 0) {
      return true;
    }
  }
  child(x, y) {
    let child = new Plant(x, y, this.type);
    return child;
  }
}

class Animal extends Creature {
  move() {
    this.age += 1;
    this.lastAte += 1;
    if (this.age > 500 || this.lastAte > 50) this.alive = false;
    let pos = randomWalk(this.x, this.y);
    this.x = pos.x;
    this.y = pos.y;
  }
  grow() {
    if (this.age % 75 == 0) {
      return true;
    }
  }
  child(x, y) {
    let child = new Animal(x, y, this.type);
    return child;
  }
}

function randomWalk(x, y) {
  let rand = Math.random();
  let dx = 0,
    dy = 0;
  if (rand < 0.25) dx = -1;
  else if (rand < 0.5) dx = 1;
  else if (rand < 0.75) dy = -1;
  else dy = 1;
  return checkLimits(x + dx, y + dy);
}

function checkLimits(x, y) {
  if (x == 0) x = 1;
  if (x >= XLIM - 1) x = XLIM - 2;
  if (y == 0) y = 1;
  if (y >= YLIM - 1) y = YLIM - 2;
  return { x, y };
}
