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
    let o = {
      width: world.width,
      height: world.height,
      forceSquareRatio: true
    };

    this.display = new ROT.Display(o);

    document.body.appendChild(this.display.getContainer());

    // Draw the background
    for (let i = 0; i < o.width; i++) {
      for (let j = 0; j < o.height; j++) {
        if (!i || !j || i + 1 == o.width || j + 1 == o.height) {
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
