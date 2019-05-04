"use strict";

class Controller {
  constructor() {
    let crits = this._createCrits(15, 20, 5);
    this.world = new World(XLIM, YLIM, crits);
    this.view = new View(this.world);
  }

  runAnimation() {
    let timerId = setTimeout(function tick() {
      control._update();
      timerId = setTimeout(tick, TICK_MS);
    }, TICK_MS);
  }

  _createCrits(plants, animals, predators) {
    let crits = [];
    for (let i = 0; i < plants; i++)
      crits.push(new Plant(randomInt(1, XLIM), randomInt(1, YLIM), "grass"));
    for (let i = 0; i < animals; i++)
      crits.push(
        new Animal(randomInt(1, XLIM), randomInt(1, YLIM), "cow", {
          food: "grass",
          maxAge: 500,
          maxHunger: 75,
          breedAge: 80
        })
      );
    for (let i = 0; i < predators; i++)
      crits.push(
        new Animal(randomInt(1, XLIM), randomInt(1, YLIM), "tiger", {
          food: "cow",
          maxAge: 1000,
          maxHunger: 100,
          breedAge: 150
        })
      );

    return crits;
  }

  _update() {
    this.world.updateState();
    this.view.drawBackground();
    this.view.drawCreatures(
      this.world.creatures.filter(creature => creature instanceof Plant)
    );
    this.view.drawCreatures(
      this.world.creatures.filter(creature => creature instanceof Animal)
    );
    this.view.showPopulation(this.world.population);
  }
}

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max - 1);
  return Math.floor(Math.random() * (max - min)) + min;
}
