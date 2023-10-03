var TOP_ROW = 0; // reminder to self: top row coordinate is 0
var BG_COLOR = 0x000000; // background color
var ROCKET_COLOR = 0xF70000; // rocket color

var FireX = new Array();
var FireY = new Array();

PS.Init = function ( options )
{
	"use strict"; 
	var y;

	// 30 x 30 grid
	PS.GridSize( 30, 30 );

	//The drag effect behind the rocket bead up to the grid's height of 30
	for ( y = 0; y < 30; y += 1 )
	{
		// turning the flash true to create trail effect
		PS.BeadFlash( PS.ALL, y, true );
		PS.BeadFlashColor(PS.ALL, y, ROCKET_COLOR);
	}
	
	PS.GridBGColor( BG_COLOR );
	PS.BeadBorderWidth( PS.ALL, PS.ALL, 0 );

	// load audio files
	PS.AudioLoad( "fx_gun" );
	PS.AudioLoad( "fx_bomb1" );

	// Set color and text of title
	PS.StatusColor( 0xFFFF66 );
	PS.StatusText( "Rocketeer!" );

	PS.Clock(6);
};

PS.Click = function ( x, y, data, options )
{
	"use strict";
	// Adding x & y position of rocket drag to the animation list
	FireX.push( x );
	FireY.push( y );

	// Beginning trail of rocket
	if ( y > TOP_ROW )
	{				
		PS.BeadColor( x, y, ROCKET_COLOR ); // set the color for rocket
		PS.AudioPlay( "fx_gun" ); // play for the fire shooting off sound
	}
	// Rocket explodes/ends
	else
	{
		PS.BeadColor( x, y, BG_COLOR );	
		PS.AudioPlay( "fx_bomb1" ); // BOOM!
	}
};

PS.Tick = function ( options )
{
	"use strict";
	var length;
	var i = 0;
	var x;
	var y;

	// The length of the FireX array is the current number of rockets to fire
	length = FireX.length;

	// loop through each active rocket
	while ( i < length )
	{
		// get current position of the rocket
		x = FireX[i];
		y = FireY[i];

		// if bead is below top row, erase it and re-draw one bead lower
		if ( y > TOP_ROW )
		{
			// erase the existing rocket
			PS.BeadColor( x, y, BG_COLOR );

			// subtract 1 from y position
			y--;

			// update the y position in the array
			FireY[i] = y;

			// This helps define if the rocket has reached the top row yet
			if ( y > TOP_ROW )
			{
				// Repaint the rocket one bead lower
				PS.BeadColor( x, y, ROCKET_COLOR );
			}
			// Reaching the top to explode
			else
			{
				PS.BeadColor( x, y, BG_COLOR );	
				PS.AudioPlay( "fx_bomb1" ); //BOOM!
			}
			// point index to next fire
			i++;	
		}
		// Bead is on last row
		else
		{
			// Remove this rocket from x/y arrays
			FireX.splice( i, 1 );			
			FireY.splice( i, 1 );

			// Updating array length variable
			length--;	
		}	
	}
};


PS.Release = function (x, y, data, options)
{
	"use strict";
};

PS.Enter = function (x, y, data, options)
{
	"use strict";
};

PS.Leave = function (x, y, data, options)
{
	"use strict";
};

PS.KeyDown = function (key, shift, ctrl, options)
{
	"use strict";
};

PS.KeyUp = function (key, shift, ctrl, options)
{
	"use strict";
};

PS.Wheel = function (delta, options)
{
	"use strict";
};



