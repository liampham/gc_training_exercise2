# GrapeCity Training Session - Exercise 2.

- Author : LiamPham
- Date : 12/03/2019


## How to run this test 
- Clone source code from main repo
- Open file index.html 

## Modify source 
- Install nodejs 
- Run command : "npm run build" 


## Requirements

**Create an "Test electric board" web component.**

This board can plug any electric component to test it function well, i.e You can plug a lamp to the board, and when you turn on the power switch the lamp is on and lighting as expected. Assume that we have many kind of electric components like: TV, FAN.		

## Functional requirements	

The board is intended to be a grid and the size (rows/columns) could be customize.						

- The boad have a switch to turn on/off the power.				
- The board can turn on/off to display components name				
- We can add many kind of electric components and we want.				
- RowCount/ColumnCount: to set size of the board.
- BackgroundColor: Gets or sets background color of the board					

An electric component has at least following properties				
- **Location**	Gets or Sets the location of the component on board				
- **Name**	Gets or Sets the name of the component		
- **Forecolor**	Gets or Sets the forecolor (text color) of the component		
- **SwitchState**	Gets or Sets the power state of the component itself.		
- **State**	Indicate the current state of the component base on the board power state.						
- **ON Image/Off Image** To allow customer customize the display of the On/Off state.					

The electric component APIs should allow customer customize the way of render state, not only about image (built-in) but also something like any DOM he want, or draw anything to canvas if we use canvas to draw.							
							

## Non functional requirements					
					
- Please focus on the design with OOP principles.			
- Using TypeScript and no library references.							


