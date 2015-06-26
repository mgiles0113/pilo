/******************************************************************************
 *                                 SETUP                                      *
 ******************************************************************************
 *  SUMMARY:                                                                  *
 *                                                                            *
 *                                                                            *
 ******************************************************************************
 *  EVENTS:                                                                   *
 *                                                                            *
 *                                                                            *
 ******************************************************************************
 *  FUNCTIONS:                                                                *
 *                                                                            *
 *                                                                            *
 *****************************************************************************/
// create global objects and variable
var gameBoard = Object(),
    player = Object(),
    pilo = Object(),
    keys = [];

// gameboard settings
gameBoard.size = 900;
gameBoard.color = 'black';
gameBoard.div = document.createElement('div');
gameBoard.style = 'background-color: ' + gameBoard.color;
gameBoard.style += '; width: ' + gameBoard.size + 'px';
gameBoard.style += '; height:' + gameBoard.size + 'px';
gameBoard.style += '; margin: auto;';
gameBoard.style += '; border-radius: 2.5px;';
gameBoard.div.setAttribute('id', 'gameBoard');
gameBoard.div.style.cssText = gameBoard.style;
// place game board
document.getElementsByTagName("body")[0].appendChild(gameBoard.div);

// player settings
player.size = 5;
player.color = 'white';
player.pos = Object();
player.pos.x = 0;
player.pos.y = 0;
// place initial player
showPlayer();
// pilo settings
pilo.size = 5;
pilo.color = 'aqua';
pilo.pos = Object();
pilo.pos.x = 20;
pilo.pos.y = 20;
pilo.speed = 200;
pilo.moveVec = genRandMoveVector();
showPilo();
autoMovePilo();




/******************************************************************************
 *                                   PILO                                     *
 ******************************************************************************
 *  SUMMARY:                                                                  *
 *                                                                            *
 *                                                                            *
 ******************************************************************************
 *  EVENTS:                                                                   *
 *    setInterval - performs action based on time.                            *
 *      action - pilo moves based on random generator.                        *
 ******************************************************************************
 *  FUNCTIONS:                                                                *
 *    autoAnimatePilo() - generate random movement vector and activate move.  *
 *    movePilo(d) - move pilo based on on direction specified.                *
 *    removePilo() - remove pilo from view.                                   *
 *    showPilo() - displays pilo with given parameters.                       *
 *****************************************************************************/

/******************************************************************************
  name: autoAnimatePilo()
  description: generate random movement vector and activate move.
  parameters: none
******************************************************************************/
function autoMovePilo() {
  pilo.moveVec = genRandMoveVector();
  console.log(pilo.moveVec.distance);
  pilo.autoMove = setInterval(function() {movePilo(pilo.moveVec.direction)}, pilo.speed);
  pilo.changeDirection = setTimeout(function(){
    clearInterval(pilo.autoMove);
    autoMovePilo();
  }, (pilo.speed * pilo.moveVec.distance));
}
/******************************************************************************
  name: showPilo()
  description: display pilo based on position.
  parameters: none
******************************************************************************/
function showPilo() {
  style = 'background-color: ' + pilo.color + ';';
  style += 'display: inline-block;';
  style += 'position: absolute;';
  style += 'width: ' + pilo.size + 'px;';
  style += 'height: ' + pilo.size + 'px;';
  style += 'margin-left: ' + pilo.pos.x + 'px;';
  style += 'margin-top: ' + pilo.pos.y + 'px;';
  style += 'border-radius: 50%;';
  pilo.div = document.createElement('div');
  pilo.div.setAttribute('id', 'pilo');
  pilo.div.style.cssText = style;
  document.getElementById('gameBoard').appendChild(pilo.div);
};

/******************************************************************************
  name: removePilo()
  description: remove pilo from view.
  parameters: none
******************************************************************************/
function removePilo() {
  document.getElementById('pilo').remove();
};

/****************************************************************************** 
  name: movePilo(d)
  description: move pilo based on on direction specified
  parameters:
    d - direction that will be translated to changes in position x and y.
******************************************************************************/
function movePilo(d) {
  if (d == 'dr') {
    if (pilo.pos.x < (gameBoard.size - pilo.size)) {
      pilo.pos.x += pilo.size;
    }
    if (pilo.pos.y < (gameBoard.size - pilo.size)) {
      pilo.pos.y += pilo.size;
    }
  }
  else if (d == 'ur') {
    if (pilo.pos.x < (gameBoard.size - pilo.size)) {
      pilo.pos.x += pilo.size;
    }
    if (pilo.pos.y >= pilo.size) {
      pilo.pos.y -= pilo.size;
    }
  }
  else if (d == 'dl') {
    if (pilo.pos.y < (gameBoard.size - pilo.size)) {
      pilo.pos.y += pilo.size;
    }
    if (pilo.pos.x >= pilo.size) {
      pilo.pos.x -= pilo.size;
    }
  }
  else if (d == 'ul') {
    if (pilo.pos.x >= pilo.size) {
      pilo.pos.x -= pilo.size;
    }
    if (pilo.pos.y >= pilo.size) {
      pilo.pos.y -= pilo.size;
    }
  }
  else if (d == 'l') {
    if (pilo.pos.x >= pilo.size) {
      pilo.pos.x -= pilo.size;
    }
  }
  else if (d == 'u') {
    if (pilo.pos.y >= pilo.size) {
      pilo.pos.y -= pilo.size;
    }
  }
  else if (d == 'r') {
    if (pilo.pos.x < (gameBoard.size - pilo.size)) {
      pilo.pos.x += pilo.size;
    }
  }
  else if (d == 'd') {
    if (pilo.pos.y < (gameBoard.size - pilo.size)) {
      pilo.pos.y += pilo.size;
    }
  }
  // remove player from current position
  removePilo();
  // add player in new position
  showPilo();
};

/******************************************************************************
 *                                  PLAYER                                    *
 ******************************************************************************
 *  SUMMARY:                                                                  *
 *                                                                            *
 *                                                                            *
 ******************************************************************************
 *  EVENTS:                                                                   *
 *    keydown - detects when a key is pressed.                                *
 *      action - keysPressed(e)                                               *
 *    keyup - detects when a pressed key is released.                         *
 *      action - keysReleased(e)                                              *
 ******************************************************************************
 *  FUNCTIONS:                                                                *
 *    keysPressed(e) - detects keyboard input and responds accordingly.       *
 *    keysReleased(e) - remove code from active array when key is released.   *
 *    movePlayer(s) - move player based on specified direction.               *
 *    removePlayer() - remove player from view, place in new position.        *
 *    showPlayer() - displays the player with given parameters.               *
 *****************************************************************************/

// Detect arrow key down
window.addEventListener("keydown", keysPressed, false);
// Detect arrow key up
window.addEventListener("keyup", keysReleased, false);

/****************************************************************************** 
  name: keysPressed(e)
  description: detects keyboard input and responds accordingly.
  parameters:
    e - keyboard event that contains the value of the keycode.
******************************************************************************/
function keysPressed(e) {
  // store an entry for every key pressed
  keys[e.keyCode] = true;
  // down and right arrows are pressed simultaneously
  if (keys[39] && keys[40]) {
    movePlayer('dr');
  }
  // up and right arrows are pressed simultaneously
  else if (keys[38] && keys[39]) {
    movePlayer('ur');
  }
  // up and left arrows are pressed simultaneously
  else if (keys[37] && keys[38]) {
    movePlayer('ul');
  }
  // down and left arrows are pressed simultaneously
  else if (keys[37] && keys[40]) {
    movePlayer('dl');
  }
  // left arrow is pressed
  else if (keys[37]) {
    movePlayer('l');
  }
  // up arrow is pressed
  else if (keys[38]) {
    movePlayer('u');
  }
  // right arrow is pressed
  else if (keys[39]) {
    movePlayer('r');
  }
  // down arrow is pressed
  else if (keys[40]) {
    movePlayer('d');
  }
};

/****************************************************************************** 
  name: keysReleased(e)
  description: remove code from active array when key is released.
  parameters:
    e - keyboard event that contains the value of the keycode.
******************************************************************************/
function keysReleased(e) {
  keys[e.keyCode] = false;
};

/****************************************************************************** 
  name: showPlayer()
  description: display player with based on position.
  parameters: none
******************************************************************************/
function showPlayer() {
  style = 'background-color: ' + player.color + ';';
  style += 'display: inline-block;';
  style += 'position: absolute;';
  style += 'width: ' + player.size + 'px;';
  style += 'height: ' + player.size + 'px;';
  style += 'margin-left: ' + player.pos.x + 'px;';
  style += 'margin-top: ' + player.pos.y + 'px;';
  style += 'border-radius: 50%;';
  player.div = document.createElement('div');
  player.div.setAttribute('id', 'player');
  player.div.style.cssText = style;
  document.getElementById('gameBoard').appendChild(player.div);
};

/****************************************************************************** 
  name: removePlayer()
  description: remove player from view.
  parameters: none
******************************************************************************/
function removePlayer() {
  document.getElementById('player').remove();
};

/****************************************************************************** 
  name: movePlayer(d)
  description: move player based on specified direction.
  parameters:
    d - direction that will be translated to changes in position x and y.
******************************************************************************/
function movePlayer(d) {
  if (d == 'dr') {
    if (player.pos.x < (gameBoard.size - player.size)) {
      player.pos.x += player.size;
    }
    if (player.pos.y < (gameBoard.size - player.size)) {
      player.pos.y += player.size;
    }
  }
  else if (d == 'ur') {
    if (player.pos.x < (gameBoard.size - player.size)) {
      player.pos.x += player.size;
    }
    if (player.pos.y >= player.size) {
      player.pos.y -= player.size;
    }
  }
  else if (d == 'dl') {
    if (player.pos.y < (gameBoard.size - player.size)) {
      player.pos.y += player.size;
    }
    if (player.pos.x >= player.size) {
      player.pos.x -= player.size;
    }
  }
  else if (d == 'ul') {
    if (player.pos.x >= player.size) {
      player.pos.x -= player.size;
    }
    if (player.pos.y >= player.size) {
      player.pos.y -= player.size;
    }
  }
  else if (d == 'l') {
    if (player.pos.x >= player.size) {
      player.pos.x -= player.size;
    }
  }
  else if (d == 'u') {
    if (player.pos.y >= player.size) {
      player.pos.y -= player.size;
    }
  }
  else if (d == 'r') {
    if (player.pos.x < (gameBoard.size - player.size)) {
      player.pos.x += player.size;
    }
  }
  else if (d == 'd') {
    if (player.pos.y < (gameBoard.size - player.size)) {
      player.pos.y += player.size;
    }
  }
  // remove player from current position
  removePlayer();
  // add player in new position
  showPlayer();
};

/******************************************************************************
 *                                  GENERAL                                   *
 ******************************************************************************
 *  SUMMARY:                                                                  *
 *                                                                            *
 *                                                                            *
 ******************************************************************************
 *  EVENTS:                                                                   *
 ******************************************************************************
 *  FUNCTIONS:                                                                *
 *    genRandMoveVector() - return random movement of distance and direction. *
 *****************************************************************************/
function genRandMoveVector() {
  var randMoveVector = Object();
  randMoveVector.direction = Math.floor((Math.random() * 8) + 1);
  randMoveVector.distance = Math.floor((Math.random() * 30) + 1);
  
  if (randMoveVector.direction == 1) {
    randMoveVector.direction = 'ul';
  }
  else if (randMoveVector.direction == 2) {
    randMoveVector.direction = 'u';
  }
  else if (randMoveVector.direction == 3) {
    randMoveVector.direction = 'ur';
  }
  else if (randMoveVector.direction == 4) {
    randMoveVector.direction = 'r';
  }
  else if (randMoveVector.direction == 5) {
    randMoveVector.direction = 'dr';
  }
  else if (randMoveVector.direction == 6) {
    randMoveVector.direction = 'd';
  }
  else if (randMoveVector.direction == 7) {
    randMoveVector.direction = 'dl';
  }
  else if (randMoveVector.direction == 8) {
    randMoveVector.direction = 'l';
  }
  return randMoveVector;
}