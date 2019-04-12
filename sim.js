'use strict'

let o = {
  width: 100,

  height: 40
};

let d = new ROT.Display(o);

document.body.appendChild(d.getContainer());

for (let i = 0; i < o.width; i++) {
  for (let j = 0; j < o.height; j++) {
    if (!i || !j || i + 1 == o.width || j + 1 == o.height) {
      d.draw(i, j, "#", "gray");
    } else {
      d.draw(i, j, ".", "#666");
    }
  }
}

d.draw(o.width >> 1, o.height >> 1, "@", "goldenrod");


class Creature {
  constructor() {
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
