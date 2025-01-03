import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

class SpaceVisualization {
    constructor() {
        this.init();
    }

    init() {
        // Create scene
        this.scene = new THREE.Scene();
        
        // Add stars background
        this.addStarfield();
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 5;

        // Create renderer
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('canvas-container').appendChild(this.renderer.domElement);

        // Add controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        // Create Earth
        this.createEarth();

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);

        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(10, 10, 10);
        this.scene.add(pointLight);

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize(), false);

        // Start animation
        this.animate();
    }

    createEarth() {
        // Create Earth sphere
        const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
        
        // Load Earth texture
        const textureLoader = new THREE.TextureLoader();
        
        // Load both texture and bump map
        textureLoader.load(
            'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
            (texture) => {
                const earthMaterial = new THREE.MeshPhongMaterial({
                    map: texture,
                    shininess: 25
                });
                
                this.earth = new THREE.Mesh(earthGeometry, earthMaterial);
                this.scene.add(this.earth);

                // Add cloud layer
                textureLoader.load(
                    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
                    (cloudTexture) => {
                        const cloudGeometry = new THREE.SphereGeometry(1.02, 32, 32);
                        const cloudMaterial = new THREE.MeshPhongMaterial({
                            map: cloudTexture,
                            transparent: true,
                            opacity: 0.4
                        });
                        this.clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
                        this.scene.add(this.clouds);
                    }
                );
            }
        );
    }

    addStarfield() {
        const starsGeometry = new THREE.BufferGeometry();
        const starsMaterial = new THREE.PointsMaterial({
            color: 0xFFFFFF,
            size: 0.1
        });

        const starsVertices = [];
        for (let i = 0; i < 5000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starsVertices.push(x, y, z);
        }

        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
        const starField = new THREE.Points(starsGeometry, starsMaterial);
        this.scene.add(starField);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Rotate Earth
        if (this.earth) {
            this.earth.rotation.y += 0.002;
        }
        
        // Rotate clouds if they exist
        if (this.clouds) {
            this.clouds.rotation.y += 0.0025;
        }

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

// Create instance
new SpaceVisualization();