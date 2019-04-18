"use strict";

const charStyles = {
  cow: "C",
  grass: "v"
};
const colorStyles = {
  cow: "sandybrown",
  grass: "springgreen"
};

class View {
  constructor(world) {
    this.o = {
      width: world.width,
      height: world.height,
      forceSquareRatio: true
    };

    this.display = new ROT.Display(this.o);

    document.body.appendChild(this.display.getContainer());
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
}
