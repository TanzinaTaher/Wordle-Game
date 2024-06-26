import * as THREE from 'three';


// Loaders for Font 
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

import Block from './Block';
import { validKeys } from './Utils';

export default class Wordle {
  constructor() {
    this.level = 0;
    this.letterIndex = 0;
    this.currentWord = '';
    this.word = 'FLAME'; // The word need to be guessed
	
	// Creates a THREE.Group named wordleGroup and positions it within the scene
    this.wordleGroup = new THREE.Group();
    this.wordleGroup.position.x = -20;
    this.wordleGroup.position.y = -20;
    this.createBoard();
    this.setUpFont();
  }

  createBoard() {
	
// These blocks are positioned on a 5x5 grid using x and y coordinates	
    this.blocks = [
      new Block('', 0, 40),
      new Block('', 10, 40),
      new Block('', 20, 40),
      new Block('', 30, 40),
      new Block('', 40, 40),

      new Block('', 0, 30),
      new Block('', 10, 30),
      new Block('', 20, 30),
      new Block('', 30, 30),
      new Block('', 40, 30),

      new Block('', 0, 20),
      new Block('', 10, 20),
      new Block('', 20, 20),
      new Block('', 30, 20),
      new Block('', 40, 20),

      new Block('', 0, 10),
      new Block('', 10, 10),
      new Block('', 20, 10),
      new Block('', 30, 10),
      new Block('', 40, 10),

      new Block('', 0, 0),
      new Block('', 10, 0),
      new Block('', 20, 0),
      new Block('', 30, 0),
      new Block('', 40, 0),
    ];

	// Adding each block's group to the wordleGroup
    this.blocks.forEach((block) => this.wordleGroup.add(block.blockGroup));
  }

 
  addLetter(event) {
    if (event.key === 'Enter') {
      // NOTE: Only allow user to press 'Enter' if the word is 5 characters long.
      if (this.currentWord.length === 5) {
        for (let i = 0; i < 5; i++) {
		  
          // Tt iterates over each character of the predefined word (in this case, 'FLAME')		  
          const letter = this.word[i];
          const block = this.blocks[i + this.level * 5];
          block.checkLetter(this.word, letter);
        }
        this.level += 1;
        this.currentWord = '';
      }
    } else if (event.key === 'Backspace') {
      this.letterIndex -= 1;
      this.currentWord = this.currentWord.slice(0, -1);
      const block = this.blocks[this.letterIndex];
      block.removeLetter();
    } else if (validKeys.includes(event.key)) {
	  // // Handle valid letter key press	
      if (this.currentWord.length === 5) {
        return;
      }
      const block = this.blocks[this.letterIndex];
      block.addLetter(event.key);
      this.letterIndex += 1;
      this.currentWord += event.key;
    }
  }

  setUpFont() {
    this.ttfLoader = new TTFLoader();
    this.fontLoader = new FontLoader();
    this.ttfLoader.load(
      './fonts/JetBrainsMonoExtraBold.ttf',
      (unparsedFont) => {
		// Parsing the loaded font  
        this.parsedFont = this.fontLoader.parse(unparsedFont);
		// // Setting the font for each block
        this.blocks.forEach((block) => block.setFont(this.parsedFont));
      }
    );
  }
}
