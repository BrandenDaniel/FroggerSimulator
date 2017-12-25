/*jshint esversion: 6 */

// Enemies our player must avoid
class Enemy {
  constructor(x, y, speed) {
    // letiables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
  }

  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
  update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 555) {
      this.x = -60; //when ememy is visually off the canvas, enemy then resets initially at -60 position so it can smoothly appear starting from it's head
      this.speed = 100 + Math.floor(Math.random() * 330); //the added 100 ensures that the enemy will travel at minimum 100 and at maximum of 430 (100+330)
    }

    if (player.x < this.x + 50 && //player resets when oncomming(front) enemy interseccts with the player's full visual width (about 50)
      player.x + 50 > this.x && //player resets when player visual width(about 50) is too close to the enemy from the back
      player.y < this.y + 50 && //player resets when the height of player(upwards) exceed's enemy's position
      50 + player.y > this.y) { //player resets when the height of player(downwards) exceed's enemy's position
      player.x = 200; //reset position when player dies
      player.y = 380;

      $('.num').empty(); //empty the .num span, getting ready to replace with updated score
      score -= 2; //score decrements by 2 and minuses score's total value when player gets in range of enemy
      $('.num').append(score); //updated score then gets appended to .num span
    }
  }

  // Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

class Point { //class for Star.png
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Star.png';
  }

  update() {
    if (player.x < this.x + 50 && //star randomly relocates when oncomming(front) player interseccts with the star's full visual width (about 50)
      player.x + 50 > this.x && //star randomly relocates when player visual width(about 50) is too close to the star from the back
      player.y < this.y + 50 && //star randomly relocates when the height of player(upwards) exceed's star's position
      50 + player.y > this.y) { //player randomly relocates when the height of player(downwards) exceed's star's position
      this.x = Math.floor(Math.random() * 404); //star randomly relocates when player gets in range
      this.y = 72 + Math.floor(Math.random() * 165);

      $('.num').empty(); //empty the .num span, getting ready to replace with updated score
      score += 3; //score increments by 3 and adds to score if player gets in range of star
      $('.num').append(score); //updated score then gets appends to .num span
    }

    if (score <= 0) { //if score is less than or equals to 0 then score will not be able to decrement lower than 0
      $('.num').empty(); //empty the .num span, getting ready to replace with updated score
      score = 0; //score's value will reset to 0
      $('.num').append(score); //updated score then gets appends to .num span
    }
  }

  render() { //constant render of star's spirite
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
  }

  //Updates the position of player
  update() {
    if (this.y > 380) { //if player attempts to go over the 380 limit, player will remain at the 380 position
      this.y = 380;
    } else if (this.y < 0) { //if player a reaches to the top of the canvas (where the water is), player will be relocated to the default location
      this.x = 202;
      this.y = 380;

      $('.num').empty(); //empty the .num span, getting ready to replace with updated score
      score++; //score increments by 1 when player gets in range of the water
      $('.num').append(score); //updated score then gets appends to .num span
    }

    if (this.x > 400) { //if player attempts to go over 400 on the right or 0 on the left, player's position with remain at the 400 or 0 position
      this.x = 400;
    } else if (this.x < 0) {
      this.x = 0;
    }
  }

  render() { //constant render of player's spirite
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  handleInput(keyInput) { //consditions for which keys are pressed
    if (keyInput === 'left') { //player moves 50px to the left is keyboard input is left
      this.x -= this.speed + 50;
    } else if (keyInput === 'up') { //player moves 30px up if keyboard input is up
      this.y -= this.speed + 30;
    } else if (keyInput === 'right') { //player moves 50px to the right is keyboard input is right
      this.x += this.speed + 50;
    } else if (keyInput === 'down') { //player moves 30px down if keyboard input is down
      this.y += this.speed + 30;
    }
  }
}

let score = 0; //score's value starts at 0
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
// Place the player object in a letiable called player
let player = new Player(202, 380, 50); //creating boy character at x(202), y(380) and speed of 50
let points = new Point(Math.floor(Math.random() * 404), 72 + Math.floor(Math.random() * 165)); //creating star point at a random x & y position under certain bounderies
let enemyPosition = [60, 143, 225]; //3 different y positions for 3 enemies

for (let i = 0; i < enemyPosition.length; i++) { //creates 3 enemies with enemyPosition's y location with a randomised speed. The update function will handle the enemy's new randomised speed when it fullfils it's conditions
  let enemy = new Enemy(-60, enemyPosition[i], 100 + Math.floor(Math.random() * 330));
  allEnemies.push(enemy);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});
