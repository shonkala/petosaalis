"use strict";

class Controller {
  constructor() {
    let crits = this._createCrits(10, 10);
    this.world = new World(XLIM, YLIM, crits);
    this.view = new View(this.world);
  }

  runAnimation() {
    let timerId = setTimeout(function tick() {
      control._update();
      timerId = setTimeout(tick, TICK_MS);
    }, TICK_MS);
  }

  _createCrits(plants, animals) {
    let crits = [];
    for (let i = 0; i < plants; i++)
      crits.push(new Plant(randomInt(1, XLIM), randomInt(1, YLIM), "grass"));
    for (let i = 0; i < plants; i++)
      crits.push(new Animal(randomInt(1, XLIM), randomInt(1, YLIM), "cow"));
    return crits;
  }

  _update() {
    this.world.updateState();
    this.view.drawBackground();
    this.view.drawCreatures(this.world.creatures);
    console.log(
      `Creatures: ${this.world.creatures.length}, Time: ${this.world.time}`
    );
  }
}

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max - 1);
  return Math.floor(Math.random() * (max - min)) + min;
}
