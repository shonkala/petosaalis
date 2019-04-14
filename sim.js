'use strict'

class World {
  constructor(w, h, creatures) {
    this.width = w
    this.height = h
    this.time = 0
    this.creatures = (creatures ? creatures : [])
  }
  progress() {
    this.time++
  }
  addCreature(creature) {
    this.creatures.push(creature)
  }
}

class Creature {
  constructor(x, y, type) {
    this.x = x
    this.y = y
    this.type = type
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
