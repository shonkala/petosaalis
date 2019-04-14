'use strict'

class World {
  constructor(w, h) {
    this.width = w
    this.height = h
    this.time = 0
    this.creatures = []
  }
  progress() {
    this.time++
  }
  addCreature(creature) {
    this.creatures.push(creature)
  }
}

class Creature {
  constructor() {
    this.hunger = true;
  }
  eat() {this.hunger = false};
}

class Plant extends Creature {
  constructor() {
    super()
  }
}

class Animal extends Creature {
  constructor() {
    super()
  }
  move() {
     let {x, y} = randomWalk(this.x, this.y)
     this.x = x
     this.y = y
   }
}

function randomWalk(x, y) {

}
