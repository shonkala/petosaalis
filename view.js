"use strict";

const charStyles = {
  cow: "C",
  grass: "v",
  tiger: "T"
};
const colorStyles = {
  cow: "sandybrown",
  grass: "springgreen",
  tiger: "yellow"
};

class View {
  constructor(world) {
    this.o = {
      width: world.width,
      height: world.height,
      forceSquareRatio: true
    };

    this.display = new ROT.Display(this.o);

    container1.appendChild(this.display.getContainer());
    this.drawBackground();
  }

  drawBackground() {
    for (let i = 0; i < this.o.width; i++) {
      for (let j = 0; j < this.o.height; j++) {
        if (!i || !j || i + 1 == this.o.width || j + 1 == this.o.height) {
          this.display.draw(i, j, "~", "steelblue");
        } else {
          this.display.draw(i, j, ".", "#666");
        }
      }
    }
  }

  drawCreatures(creatures) {
    creatures.forEach(creature => {
      this.display.draw(
        creature.x,
        creature.y,
        charStyles[creature.type],
        colorStyles[creature.type]
      );
    });
  }

  showPopulation(population) {
    while (stats_list.firstChild) stats_list.firstChild.remove();
    for (let type in population) {
      let li = document.createElement("li");
      li.appendChild(document.createTextNode(`${type}: ${population[type]}`));
      li.style.color = colorStyles[type];
      stats_list.appendChild(li);
    }
  }
}
