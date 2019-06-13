"use strict";

class Controller {
  constructor(plants, cows, tigers) {
    let creatures = this._createCreatures(plants, cows, tigers);
    this.world = new World(XLIM, YLIM, creatures);
    this.view = new View(this.world);
  }

  runAnimation() {
    let timerId = setTimeout(function tick() {
      control._update();
      timerId = setTimeout(tick, TICK_MS);
    }, TICK_MS);
  }

  _createCreatures(plants, animals, predators) {
    let creatures = [];
    for (let i = 0; i < plants; i++)
      creatures.push(
        new Plant(randomInt(1, XLIM), randomInt(1, YLIM), "grass")
      );
    for (let i = 0; i < animals; i++)
      creatures.push(
        new Animal(randomInt(1, XLIM), randomInt(1, YLIM), "cow", {
          food: "grass",
          maxAge: 500,
          maxHunger: 75,
          breedAge: 80
        })
      );
    for (let i = 0; i < predators; i++)
      creatures.push(
        new Animal(randomInt(1, XLIM), randomInt(1, YLIM), "tiger", {
          food: "cow",
          maxAge: 1000,
          maxHunger: 100,
          breedAge: 150
        })
      );

    return creatures;
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
