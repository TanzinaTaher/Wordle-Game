import * as THREE from 'three';


import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';

export default class Block {
  constructor(letter, xOffset, yOffset) {
    this.animate = false;
    this.letter = letter;
    
	//xOffset and yOffset parameters to the corresponding properties of the Block instance to determine the initial position of the block.
	this.xOffset = xOffset;
    this.yOffset = yOffset;
	
	// THREE.Group is a container for grouping multiple 3D objects together.
    this.blockGroup = new THREE.Group();
    
	//Setting the initial position of the blockGroup based on the provided xOffset and yOffset values
	this.blockGroup.position.x = xOffset;
    this.blockGroup.position.y = yOffset;
    this.addBlock();

    
	//If the animate property is true, the blockGroup's rotation around the z-axis is animated using a sine wave pattern. 
	//The requestAnimationFrame function is called at the end of each animation frame to creates a continuous animation loop
	const animate = (t) => {
      if (this.animate) {
        this.blockGroup.rotation.z =
		
		//The value of Math.PI and the division by 32 adjust the magnitude and speed of the rotation, respectively.
          (Math.sin(Date.now() * 0.01) * Math.PI) / 32;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }


  //parsedFont is a font object that can be used to render text allowing to assign a parsed font to the block so that it can later use this font to display text
  setFont(parsedFont) {
    this.parsedFont = parsedFont;
  }





  checkLetter(word, letter) {
    if (this.letter === letter) {
      
	  //If the letter of the current block matches the provided letter, the block's material color is set to green (#008000), 
	  //indicating a correct letter match. Additionally, the animate property is set to true, which triggers the rotation animation effect.
	  this.block.material.color.set('#008000');
      this.animate = true;
    } else if (word.includes(this.letter)) {
      
	  //If the letter of the current block is not a match but is present in the word, the block's material color is set to yellow (#f7df1e). 
	  //This highlights letters that are present in the word but are not currently associated with this block.
	  this.block.material.color.set('#f7df1e');
    }
  }

  addBlock() {
    // Creating a new RoundedBoxGeometry with width=8, height=8, depth=8, radius=4, and segments=2
	const geometry = new RoundedBoxGeometry(8, 8, 8, 4, 2);
    
	//// Creating a new MeshPhongMaterial with #8B008B color, transparency, and opacity
	const material = new THREE.MeshPhongMaterial({
      color: '#8B008B',  //#fafafa --> WHITE
      transparent: true,
      opacity: 0.8,
    });
    //// Creating a new Mesh using the geometry and material, representing the block
	this.block = new THREE.Mesh(geometry, material);
   
   // // Adding the block Mesh to the blockGroup
   this.blockGroup.add(this.block);
  }

  removeLetter() {
	  
	// Removes the letterMesh from the blockGroup  
    this.blockGroup.remove(this.letterMesh);
    this.block.material.opacity = 0.50;
  }

  addLetter(letter) {
    this.letter = letter;
    // Creating a new TextGeometry for the letter using the parsedFont and specific settings
	const letterGeometry = new TextGeometry(letter, {
      font: this.parsedFont,
      size: 4,
      height: 2,
    });
    // Creating a new MeshNormalMaterial for the letter (displays normals as colors)
    const letterMaterial = new THREE.MeshNormalMaterial({});
	
    //  // Creating a new Mesh using the letter geometry and material, representing the letter
	this.letterMesh = new THREE.Mesh(letterGeometry, letterMaterial);
	
	// Setting the position of the letter within the blockGroup (relative to the block's position)
    this.letterMesh.position.x = -2;
    this.letterMesh.position.y = -2;
    this.letterMesh.position.z = -1;
	
	// Adding the letter Mesh to the blockGroup
	
    this.blockGroup.add(this.letterMesh);
    this.block.material.opacity = 0.5;
  }
}
