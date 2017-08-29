/*******************************************************
 * Copyright (C) 2017 David Freire <dfreire (dot) inbox (at) gmail (dot) com>
 * 
 * This file is part of Nature Project 1.
 * 
 * Nature Project 1 can not be copied and/or distributed without the express
 * permission of David Freire.
 *******************************************************/

//Initialize variables
//Walker default size
var x_size = 48;
var y_size=48;

//The walker breathe frequency
var breathe_frec = 0.01
var xoff = 0;

//Arrays with the move possibilities
var vertical_wall_angles = []
var horizontal_wall_angles = []

//Angle and magnitude variables
var h = 3/4;
var speed = 0.5;
var oscillation = 0.1


//Setup function. Executed only once.
function setup() {
  //Create the canvas
  createCanvas(640,350);
  //Create the walker object (it behaves like a butterfly)
  w = new Walker();
  
  //Fill the radians (PI not included here because h will help me to provide rotation to the object)
  //Go right
  vertical_wall_angles.push(5/3);
  vertical_wall_angles.push(7/4);
  vertical_wall_angles.push(11/6);
  vertical_wall_angles.push(1/6);
  vertical_wall_angles.push(1/4);
  vertical_wall_angles.push(1/3);
  //Go left
  vertical_wall_angles.push(2/3);
  vertical_wall_angles.push(3/4);
  vertical_wall_angles.push(5/6);
  vertical_wall_angles.push(7/6);
  vertical_wall_angles.push(5/4);
  vertical_wall_angles.push(4/3);
  
  
  //Go up
  horizontal_wall_angles.push(1/6);
  horizontal_wall_angles.push(1/4);
  horizontal_wall_angles.push(1/3);
  horizontal_wall_angles.push(2/3);
  horizontal_wall_angles.push(3/4);
  horizontal_wall_angles.push(5/6);
  //Go down
  horizontal_wall_angles.push(7/6);
  horizontal_wall_angles.push(5/4);
  horizontal_wall_angles.push(4/3);
  horizontal_wall_angles.push(5/3);
  horizontal_wall_angles.push(7/4);
  horizontal_wall_angles.push(11/6);
  
}


//Draw function. Repeteadly executed.
function draw() {
  background(51);
  
  //Update breathe frequency
  var breathe_status = w.breathe();
  xoff= xoff+breathe_frec;
  
  //Compute movement and move
  w.computeMov()
  w.display(breathe_status);
  w.update();
}


//Walker object implementation
function Walker() {
  //Initial values for pos, vel and acc.
  this.pos = createVector(width/2, height/2);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0.01);
  this.acc = p5.Vector.fromAngle(h * PI)
  this.acc.setMag(speed)
  
  
  //Computes acc vector and reset vel vector if necessary.
  this.computeMov = function(){
   
    //If we reach the top of the screen...we must change direction.
    if(this.pos.y+(y_size/2) > height){
      fill(128);
      //Pick a random direction (new angle) between those directions that are logical.
      h = horizontal_wall_angles[int(random(6,11))];
      this.acc = p5.Vector.fromAngle(h * PI)
      //The input parameter in this magnitude is 0.01 so the butterfly can rest.
      this.acc.setMag(0.01)
      this.vel.x = 0;
      this.vel.y = 0;
      //breathes faster...it is enjoying the border!
      breathe_frec = 0.04
      //Butterfly oscillation (left or right)
      if (random(0,1)>0.5){
        oscillation = -0.1; //left
      }else{
        oscillation = 0.1; //right
      }
      
    }else{
      //If we reach the down of the screen...we must change direction.
      if(this.pos.y-(y_size/2) < 0){
        fill(128);
        //Pick a random direction (new angle) between those directions that are logical.
        h = horizontal_wall_angles[int(random(0,5))];
        this.acc = p5.Vector.fromAngle(h * PI)
        this.acc.setMag(speed)
        this.vel.x = 0;
        this.vel.y = 0;
        
        if (random(0,1)>0.5){
          oscillation = -0.1; //left
        }else{
          oscillation = 0.1; //right
        }
        
        
        breathe_frec = 0.04
      }else{
        //If we reach the width of the screen...we must change direction.
        if(this.pos.x+(x_size/2) > width){
          fill(128);
          //Pick a random direction (new angle) between those directions that are logical.
          h = vertical_wall_angles[int(random(6,11))];
          this.acc = p5.Vector.fromAngle(h * PI)
          this.acc.setMag(speed)
          this.vel.x = 0;
          this.vel.y = 0;
          breathe_frec = 0.04
          
          if (random(0,1)>0.5){
            oscillation = -0.1; //left
          }else{
            oscillation = 0.1; //right
          }
      
          }else{
            //If we reach the left border of the screen...we must change direction.
            if(this.pos.x-(x_size/2) < 0){
              fill(128);
              //Pick a random direction (new angle) between those directions that are logical.
              h = vertical_wall_angles[int(random(0,5))];
              this.acc = p5.Vector.fromAngle(h * PI)
              this.acc.setMag(speed)
              this.vel.x = 0;
              this.vel.y = 0;
              breathe_frec = 0.04;
              
              if (random(0,1)>0.5){
                oscillation = -0.1; //left
              }else{
                  oscillation = 0.1; //right
              }
              
            }else{
              breathe_frec = 0.01
              //This makes possible the oscillation of the object..it is a butterfly!
              h = h + oscillation;
              this.acc = p5.Vector.fromAngle(h * PI);
              this.acc.setMag(speed);
              fill(255);
            }
          }
      }
    }
  }
  
  //Display the walker
  this.display = function(breathe_status){
    ellipse(this.pos.x, this.pos.y, breathe_status, y_size);
    
  }
  
  //Updates the velocity and the position vectors
  this.update = function(){
    this.vel.add(this.acc);
    this.pos.add(this.vel);
  }
  
  //Computes the breathing of the object (it is a perturbance in the objects width)
  this.breathe = function(){
    var b = noise(xoff) * x_size;
    return b;
  }
  
  
}