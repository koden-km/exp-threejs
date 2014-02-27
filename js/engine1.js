var Game = Game || {};
Game.demo = null;

Game.Demo = function(engine) {
	this.engine = engine;

	this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.25, 1000);
	this.camera.position.x = 5;
	this.camera.position.y = 2;
	this.camera.position.z = 15;

	this.cameraSpeed = new THREE.Vector3(1, 1, 1);

	this.scene = new THREE.Scene();

	// Lights
	// this.initDemoLightAmbient();
	// this.initDemoLightDirectional();
	this.initDemoLightPoint();

	// Materials
	this.initMaterials();

	// Shapes/Geometry
	this.initShapes();

	// Prefabs
	this.initPrefabs();

	// Misc Objects
	this.initDemoCube1();
	this.initDemoCube2();
	this.initDemoFloors();

	// this.initDemoRoad();
}

Game.Demo.prototype.initMaterials = function() {
	this.materials = {
		DebugGreenSolid: new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false }),
		DebugGreenWireframe: new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true }),

		MetalSilverSmooth: new THREE.MeshLambertMaterial({ color: 0xcccccc, wireframe: false }),
		MetalSilverShiny: new THREE.MeshPhongMaterial({ color: 0xcccccc, wireframe: false }),

		NeonSurfaceLightWhite: new THREE.MeshLambertMaterial({ color: 0xffffff, ambient: 0xffffff, emissive: 0xffffff, wireframe: false }),
		NeonSurfaceLightRed: new THREE.MeshLambertMaterial({ color: 0xff0000, ambient: 0xffffff, emissive: 0xffffff, wireframe: false }),
		NeonSurfaceLightGreen: new THREE.MeshLambertMaterial({ color: 0x00ff00, ambient: 0xffffff, emissive: 0xffffff, wireframe: false }),
		NeonSurfaceLightBlue: new THREE.MeshLambertMaterial({ color: 0x0000ff, ambient: 0xffffff, emissive: 0xffffff, wireframe: false }),
		NeonSurfaceLightOrange: new THREE.MeshLambertMaterial({ color: 0xff8000, ambient: 0xffffff, emissive: 0xffffff, wireframe: false }),
	};
}

Game.Demo.prototype.initShapes = function() {
	// Shape/Geometry
	this.shapes = {
		Box1x1x1: new THREE.CubeGeometry(1, 1, 1),
		Box2x2x2: new THREE.CubeGeometry(2, 2, 2),

		Road1Surface: new THREE.CubeGeometry(10, 0.2, 10),
		Road1Side: new THREE.CubeGeometry(10, 0.2, 0.2),
	};
}

Game.Demo.prototype.initPrefabs = function() {
	// TODO: this feature should probably be a factory of named things to instantiate,
	// or should these types just be cloned?
	this.prefabs = {
		// FloorMetalSilverShiny = ???
	};
}

Game.Demo.prototype.initDemoLightAmbient = function() {
	this.lightAmbient = new THREE.AmbientLight(0xcccccc);
	this.scene.add(this.lightAmbient);
}

Game.Demo.prototype.initDemoLightDirectional = function() {
	// eg. Sun
	this.lightDirect = new THREE.DirectionalLight(0xcccc77, 50.0);
	this.lightDirect.position = new THREE.Vector3(0, 10, 0);
	this.scene.add(this.lightDirect);
	this.lightDirectHelper = new THREE.DirectionalLightHelper(this.lightDirect, 1);
	this.scene.add(this.lightDirectHelper);
}

Game.Demo.prototype.initDemoLightPoint = function() {
	this.lightPoint = new THREE.PointLight(0xcccccc, 20.0, 20);
	// this.lightPoint = new THREE.PointLight(0xcc1010, 20.0, 20);

	this.lightPoint.translateX(2);
	this.lightPoint.translateY(2);
	this.lightPoint.translateZ(2);
	this.scene.add(this.lightPoint);
	this.lightPointHelper = new THREE.PointLightHelper(this.lightPoint, 0.2);
	this.scene.add(this.lightPointHelper);
}

Game.Demo.prototype.initDemoCube1 = function() {
	this.geometry1 = new THREE.CubeGeometry(1, 1, 1);
	this.material1 = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
	this.mesh1 = new THREE.Mesh(this.geometry1, this.material1);
	this.scene.add(this.mesh1);
}

Game.Demo.prototype.initDemoCube2 = function() {
	this.geometry2 = new THREE.CubeGeometry(2, 2, 2);
	this.material2 = new THREE.MeshLambertMaterial({ color: 0x008800, wireframe: false });
	this.mesh2 = new THREE.Mesh(this.geometry2, this.material2);
	this.mesh2.translateX(10);
	this.scene.add(this.mesh2);
}

Game.Demo.prototype.initDemoFloors = function() {
	var floorSize = new THREE.Vector3(2, 1, 2);
	var floorSegs = 1;
	var doWireframe = false;


	// Geometry
	// ---------
	var geom;

	// geom = new THREE.PlaneGeometry(floorSize.x, floorSize.y, floorSegs, floorSegs);
	// geom = new THREE.CubeGeometry(floorSize.x, floorSize.y, floorSize.z);
	geom = new THREE.CubeGeometry(floorSize.x, floorSize.y, floorSize.z, floorSegs, floorSegs, floorSegs);


	// Materials
	// ---------
	var mat;

	// Good basics
	// mat = new THREE.MeshLambertMaterial({ color: 0x000099, wireframe: doWireframe });
	mat = new THREE.MeshPhongMaterial({ color: 0x000099, wireframe: doWireframe });

	// Trying fancy
	// mat = new THREE.MeshPhongMaterial({ color: 0x000099, wireframe: false, specular: 0x808080 });
	// mat = new THREE.MeshPhongMaterial({ color: 0x000099, wireframe: false, shininess: 0.3 });

	// Predefined
	// mat = this.materials.DebugGreenSolid;
	// mat = this.materials.DebugGreenWireframe;
	// mat = this.materials.MetalSilverSmooth;
	// mat = this.materials.MetalSilverShiny;


	// Generate
	// ---------
	var repeat = 3;
	this.floors = [];
	for (var z = 0; z < repeat; z++) {
		this.floors[z] = [];
		for (var x = 0; x < repeat; x++) {
			var obj = {};

			obj.mesh = new THREE.Mesh(geom, mat);

			obj.mesh.translateX((x * floorSize.x) + x);
			obj.mesh.translateY(-1);
			// obj.mesh.translateY((y * floorSize.y) + y);
			obj.mesh.translateZ((z * floorSize.z) + z);

			// obj.mesh.rotateOnAxis(90, new THREE.Vector3( 1, 0, 0 ));

			this.floors[z][x] = obj;
			this.scene.add(this.floors[z][x].mesh);
		}
	}
}

Game.Demo.prototype.initDemoRoad = function() {
	var repeat = 1;
	for (var z = 0; z < repeat; z++) {
		var mesh = new THREE.Mesh(this.shapes.Road1Surface, this.materials.NeonSurfaceLightWhite);

		this.roads[z] = mesh;
		this.scene.add(this.roads[z]);
	}
}

Game.Demo.prototype.loop = function() {
	this.update();
	this.render();
}

Game.Demo.prototype.update = function() {
	this.moveCamera();

	if (this.mesh1) {
		this.mesh1.rotation.x += 0.01;
		this.mesh1.rotation.y += 0.02;
	}

	// if (this.engine.keyboard.pressed('shift+A')) {
	if (this.mesh2 && this.engine.keyboard.pressed('space')) {
		this.mesh2.rotation.x += 0.01;
		this.mesh2.rotation.y += 0.02;
	}

	if (this.floors) {
		for (var z = 0; z < this.floors.length; z++) {
			for (var x = 0; x < this.floors[z].length; x++) {
				var obj = this.floors[z][x];
				obj.mesh.rotation.x += 0.01;
				// obj.mesh.rotation.y += 0.02;
				obj.mesh.rotation.z += 0.01;
			}
		}
	}

	this.engine.stats.update();
}

Game.Demo.prototype.moveCamera = function() {
	// Note: This might not work properly with variable framerates.
	// Time delta should be taken into account.
	if (this.engine.keyboard.pressed('left')) {
		this.camera.position.x -= this.cameraSpeed.x;
	}
	if (this.engine.keyboard.pressed('right')) {
		this.camera.position.x += this.cameraSpeed.x;
	}
	if (this.engine.keyboard.pressed('up')) {
		this.camera.position.z -= this.cameraSpeed.z;
	}
	if (this.engine.keyboard.pressed('down')) {
		this.camera.position.z += this.cameraSpeed.z;
	}
	if (this.engine.keyboard.pressed('a')) {
		this.camera.position.y += this.cameraSpeed.y;
	}
	if (this.engine.keyboard.pressed('z')) {
		this.camera.position.y -= this.cameraSpeed.y;
	}
}

Game.Demo.prototype.render = function() {
	this.engine.renderer.render(this.scene, this.camera);
}

Game.Engine = function() {
	//this.renderer = new THREE.CanvasRenderer();
	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setSize(window.innerWidth, window.innerHeight);
	this.renderer.setClearColor(0x000000, 1.0);
	document.body.appendChild(this.renderer.domElement);

	this.stats = new Stats();
	this.stats.domElement.style.position = 'absolute';
	this.stats.domElement.style.bottom = 0;
	this.stats.domElement.style.zIndex = 100;
	document.body.appendChild(this.stats.domElement);

	this.keyboard = new THREEx.KeyboardState();
	// Note: To stop listening to the keyboard do: this.keyboard.destroy();
}

Game.Loop = function() {
	// Note: Three.js includes requestAnimationFrame shim
	requestAnimationFrame(Game.Loop);
	Game.demo.loop();
}

Game.Main = function() {
	Game.demo = new Game.Demo(new Game.Engine());
	Game.Loop();
}();
