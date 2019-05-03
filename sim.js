"use strict";

class World {
  constructor(w, h, creatures) {
    this.width = w;
    this.height = h;
    this.time = 0;
    this.creatures = creatures ? creatures : [];
    this.creatureTypes = new Set();
    this.creatures.forEach(c => this.creatureTypes.add(c.type));
    this.population = {};
  }

  updateState() {
    this.progressTime();
    this.population = this.countPopulation();
    this.creatures.forEach((creature, index, array) => {
      if (creature.alive == false) this.killCreature(index);
      else {
        creature.move();
        if (creature.grow() && this.creatures.length < CLIM) {
          let pos = randomWalk(creature.x, creature.y);
          let newx = pos.x;
          let newy = pos.y;
          let result = this.creatures.find(c => {
            return c.type == creature.type && c.x == newx && c.y == newy;
          });
          if (!result)
            this.addCreature(creature.child(newx, newy, creature.type));
        }
        if (creature instanceof Animal) {
          switch (creature.type) {
            case "cow":
              this.creatures.forEach((c, index, array) => {
                if (
                  c.type == creature.food &&
                  c.x == creature.x &&
                  c.y == creature.y
                ) {
                  this.killCreature(index);
                  creature.eat();
                }
              });
              break;
            case "tiger":
              this.creatures.forEach((c, index, array) => {
                if (
                  creature.lastAte > 10 &&
                  c.type == creature.food &&
                  c.x >= creature.x - 1 &&
                  c.x <= creature.x + 1 &&
                  c.y >= creature.y - 1 &&
                  c.y <= creature.y + 1
                ) {
                  this.killCreature(index);
                  creature.eat();
                }
              });
              break;
          }
        }
      }
    });
  }

  progressTime() {
    this.time++;
  }
  addCreature(creature) {
    this.creatures.push(creature);
  }
  killCreature(index) {
    this.creatures.splice(index, 1);
  }
  countPopulation() {
    let population = {};
    for (let type of this.creatureTypes.keys()) {
      population[type] = 0;
    }
    population = this.creatures.reduce((population, c) => {
      population[c.type] += 1;
      return population;
    }, population);
    return population;
  }
}
