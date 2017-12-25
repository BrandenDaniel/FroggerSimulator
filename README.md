Arcade Game processes explained:
app.js

============
Enemy Class
============
*constructor()
	- points to Enemy's x & y position, speed, and image/sprite

*update()	
	- time delta allows the enemy to smoothly glide relatively through the screen in all computers
	- first if else statement ensures the enemy resets it's x position at -60px when it travels beyond the width of the campus. -60px so the head of the enemy will show first instead of the whole body instantly appearing
	- second if else statement ensures that the player will only reset when the character is in range of the enemy by 50px (player and enemy will have a 50px hit box)
		- second section of the second if else statement resets the scoreboard to an updated score everytime player gets hit by enemy (-2 points)
*render()	
	- constant visual display of the enemy

============
Point Class
============
*constructor
	- points to Star's x & y position, speed, and image/sprite

*update()
	- first if else statement ensures the star point's position randomly relocates on the stone blocks when players get in range
		- second section of first if else statement resets the scoreboard to an updated score everytime player gets in range of star points (+3 points)
	- second if else statement makes sure that the score doesn't go below 0, even if the player scores below 0

*render()
	- constant visual display of the star points

============
Player Class
============
*constructor()
	- points to Player's x & y position, speed, and image/sprite

*update()
	- first if else statement ensures that player will not be able to travel beyond 380px (bottom row) of the canvas and will remain at 380px + if player travels in range of the water player resets back to 202x 380y
		- second section of first if else statement resets the scoreboard to an updated score everytime player gets in range of water (+1 point)
	- second if else statement ensures player's position will remain at 400px(x) or 0px(x) when player attempts to travel beyond those coordinates

*render()
	- constant visual display of player

*handleInput()
	- if user's keyboard press input matches the directional statements, player will move left by 50px, up by 30px, right by 50px and down by 30 px

=====================
keyup event listenter
=====================
	- listens for keyup events/inputs and stores allowed keys as an object in a variable

======================================
global variables, loops, and instances
======================================
	- score variable initialize
	- allEnemies empty array initialize
	- instance of Player in var player with x & y coordinates and speed
	- instance of Point in var points with randomised x & y coordinates
	- all 3 enemy's y position assigned to an array 
	- for loop creates 3 enemies to variable enemy that has a randomised speed, which is then pushed to the allEnemies array to render in engine.js