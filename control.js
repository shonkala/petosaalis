"use strict";

class Controller {
  constructor() {
    this.crits = this._createCrits(10, 10);
    this.world = new World(XLIM, YLIM, this.crits);
    this.view = new View(this.world);
  }

  _createCrits(plants, animals) {
    let crits = [];
    for (let i = 0; i < plants; i++)
      crits.push(new Plant(randomInt(1, XLIM), randomInt(1, YLIM), "grass"));
    for (let i = 0; i < plants; i++)
      crits.push(new Animal(randomInt(1, XLIM), randomInt(1, YLIM), "cow"));
    return crits;
  }

  runAnimation() {
    this.view.drawCreatures(this.crits);
    let timerId = setTimeout(function tick() {
      control._update();
      timerId = setTimeout(tick, 1000);
    }, 1000);
  }

  _update() {
    this.world.updateState();
    this.view.drawBackground();
    this.view.drawCreatures(this.crits);
  }
}

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max - 1);
  return Math.floor(Math.random() * (max - min)) + min;
}
