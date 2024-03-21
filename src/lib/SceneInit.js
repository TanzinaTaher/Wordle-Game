import * as THREE from 'three';

// OrbitControls is a utility for adding interactive camera controls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Stats is a utility for displaying performance statistics
import Stats from 'three/examples/jsm/libs/stats.module';

export default class SceneInit {
  constructor(canvasID, camera, scene, stats, controls, renderer, fov = 35) {
    this.fov = fov;
    this.scene = scene;
    this.stats = stats;
    this.camera = camera;
    this.controls = controls;
    this.renderer = renderer;
    this.canvasID = canvasID;
  }


    // Creating a PerspectiveCamera with the specified field of view, aspect ratio based on the window dimensions, and near and far clipping planes. 
  initScene() {
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
	
	// The camera's position is set at (0, 0, 100) in the scene
    this.camera.position.z = 100;

	// A Clock object is created to manage time-based animations
    this.clock = new THREE.Clock();
	
	//  A new Scene object is created to hold all the 3D objects in the scene
    this.scene = new THREE.Scene();
	

    const canvas = document.getElementById(this.canvasID);
    
	// WebGLRenderer renders the scene onto the canvas
	this.renderer = new THREE.WebGLRenderer({
      canvas,
	  
	  // The antialias option is set to true for smoother rendering.
      antialias: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    
	
	this.renderer.setClearColor(0xff8c00); // Background Orange color
    
	// Allows the user to interactively control the camera's position and orientation using mouse or touch inputs.
	this.controls = new OrbitControls(this.camera, this.renderer.domElement);


	// Stats utility display performance statistics (FPS, memory usage) on the screen. 

    this.stats = Stats();
    
	// The dom property of the Stats object represents the HTML element that contains the statistics and is appended to the document's body.
	document.body.appendChild(this.stats.dom);

    // ambient light which is for the whole scene (An AmbientLight provides overall illumination )
    let ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    this.scene.add(ambientLight);

    // spot light which is illuminating the chart directly
    let spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 64, 32);
    this.scene.add(spotLight);

    // if window resizes
	// When the window is resized, it triggers the onWindowResize() method, which adjusts the camera's aspect ratio and updates the renderer's dimensions.
    window.addEventListener('resize', () => this.onWindowResize(), false);
  }


  //  Within each frame, the render() method is called to update the scene rendering, 
  //  update() method of the stats object is called to update the statistics,
  //  update() method of the controls object is called to handle camera controls.
  animate() {

    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.stats.update();
    this.controls.update();
  }


	// The render() method uses the renderer to render the current scene from the perspective of the camera.
  render() {

    this.renderer.render(this.scene, this.camera);
  }

	// onWindowResize() method adjusts the camera's aspect ratio based on the new window dimensions
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
