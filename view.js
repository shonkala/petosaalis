"use strict";
class View {
  constructor(world) {
    let o = {
      width: world.width,
      height: world.height,
      forceSquareRatio: true
    };

    this.display = new ROT.Display(o);

    document.body.appendChild(this.display.getContainer());

    for (let i = 0; i < o.width; i++) {
      for (let j = 0; j < o.height; j++) {
        if (!i || !j || i + 1 == o.width || j + 1 == o.height) {
          this.display.draw(i, j, "#", "gray");
        } else {
          this.display.draw(i, j, ".", "#666");
        }
      }
    }

    this.display.draw(o.width >> 1, o.height >> 1, "@", "goldenrod");
  }
}
