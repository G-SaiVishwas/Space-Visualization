import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class SpaceVisualization {
  constructor() {
    this.planets = new Map();
    this.init();
    this.createSolarSystem();
    this.animate();
    this.initNASAAPOD(); // Initialize NASA APOD
  }

  init() {
    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000);

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 50;
    this.camera.position.y = 20;

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document
      .getElementById("canvas-container")
      .appendChild(this.renderer.domElement);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(0, 0, 0);
    this.scene.add(pointLight);
  }

  async initNASAAPOD() {
    try {
      const response = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY"
      );
      const data = await response.json();

      // Create APOD container
      const apodContainer = document.createElement("div");
      apodContainer.id = "apod-container";
      apodContainer.style.cssText = `
                position: fixed;
                left: 20px;
                top: 20px;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 20px;
                border-radius: 10px;
                font-family: Arial, sans-serif;
                max-width: 300px;
                z-index: 1000;
            `;

      apodContainer.innerHTML = `
                <h3>NASA Picture of the Day</h3>
                <h4>${data.title}</h4>
                <img src="${data.url}" alt="${
        data.title
      }" style="width: 100%; border-radius: 5px;">
                <p style="font-size: 0.8em;">${data.explanation.substring(
                  0,
                  200
                )}...</p>
                <p style="font-size: 0.7em;">Date: ${data.date}</p>
                ${
                  data.copyright
                    ? `<p style="font-size: 0.7em;">© ${data.copyright}</p>`
                    : ""
                }
            `;

      document.body.appendChild(apodContainer);
    } catch (error) {
      console.error("Error fetching NASA APOD:", error);
    }
  }
  createSolarSystem() {
    // Create Sun
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const textureLoader = new THREE.TextureLoader();

    // Load sun texture
    textureLoader.load(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7VwyE5iw-iGoEvUj9BV5mnCSpmUi-By-42Q&s",
      (texture) => {
        const sunMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          emissive: 0xffff00,
          emissiveIntensity: 0.5,
        });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        this.scene.add(sun);
      },
      undefined,
      (error) => {
        console.error("Error loading sun texture:", error);
        // Fallback to basic yellow material
        const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const sun = new THREE.Mesh(sunGeometry, sunMaterial);
        this.scene.add(sun);
      }
    );

    // Planet data with texture URLs
    const planetData = [
      {
        name: "Mercury",
        size: 1,
        distance: 10,
        textureUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE7q_NoC49WiU1JYZAZdMEHD5sl_Bli3TiOw&s",
        info: {
          diameter: "4,879 km",
          dayLength: "176 Earth days",
          yearLength: "88 Earth days",
          temperature: "-180°C to 430°C",
          moons: "0",
          gravity: "3.7 m/s²",
        },
      },
      {
        name: "Venus",
        size: 1.5,
        distance: 15,
        textureUrl:
          "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a914cfe7-dc0e-4514-a4cd-9e613759b5c5/dhginpx-1b8d4594-de39-46fe-bcc7-c850ccd159cb.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2E5MTRjZmU3LWRjMGUtNDUxNC1hNGNkLTllNjEzNzU5YjVjNVwvZGhnaW5weC0xYjhkNDU5NC1kZTM5LTQ2ZmUtYmNjNy1jODUwY2NkMTU5Y2IuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.JosD1N6PWJ8SioTSXVq96PDf31G6PLmOW-C3l1Cu1oE",
        info: {
          diameter: "12,104 km",
          dayLength: "243 Earth days",
          yearLength: "225 Earth days",
          temperature: "462°C",
          moons: "0",
          gravity: "8.87 m/s²",
        },
      },
      {
        name: "Earth",
        size: 2,
        distance: 20,
        textureUrl:
          "https://media.istockphoto.com/id/172208211/photo/earth-map-with-clouds.jpg?s=612x612&w=0&k=20&c=zG2Kh28E2UiW_GdlhE75McrrEFSpH8OGuJKI4zcZW9I=",
        info: {
          diameter: "12,742 km",
          dayLength: "24 hours",
          yearLength: "365.25 days",
          temperature: "-88°C to 58°C",
          moons: "1",
          gravity: "9.81 m/s²",
        },
      },
      {
        name: "Mars",
        size: 1.2,
        distance: 25,
        textureUrl:
          "https://t3.ftcdn.net/jpg/06/96/83/32/360_F_696833251_1ahM6zJxrkzigXzDG4bpDXzaaCZ9Yzco.jpg",
        info: {
          diameter: "6,779 km",
          dayLength: "24 hours 37 minutes",
          yearLength: "687 Earth days",
          temperature: "-140°C to 20°C",
          moons: "2",
          gravity: "3.72 m/s²",
        },
      },
      {
        name: "Jupiter",
        size: 3,
        distance: 35,
        textureUrl:
          "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a914cfe7-dc0e-4514-a4cd-9e613759b5c5/dhwa53z-b4f134c0-083f-4e5a-98a7-ccb0c287f488.jpg/v1/fill/w_1024,h_512,q_75,strp/jupiter_texture_by_planetmapmaker_dhwa53z-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTEyIiwicGF0aCI6IlwvZlwvYTkxNGNmZTctZGMwZS00NTE0LWE0Y2QtOWU2MTM3NTliNWM1XC9kaHdhNTN6LWI0ZjEzNGMwLTA4M2YtNGU1YS05OGE3LWNjYjBjMjg3ZjQ4OC5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.x5KkIvqHBHBT2qNQ4RTMPespqlTNtJRRkbv0pV3FqCs",
        info: {
          diameter: "139,820 km",
          dayLength: "10 hours",
          yearLength: "11.9 Earth years",
          temperature: "-110°C",
          moons: "79",
          gravity: "24.79 m/s²",
        },
      },
    ];

    // Create planets
    planetData.forEach((data) => {
      const geometry = new THREE.SphereGeometry(data.size, 32, 32);

      // Start with a basic material
      const material = new THREE.MeshPhongMaterial({
        color: 0x808080,
        shininess: 5,
      });

      const planet = new THREE.Mesh(geometry, material);
      planet.position.x = data.distance;

      // Create orbit
      const orbitGeometry = new THREE.RingGeometry(
        data.distance - 0.1,
        data.distance + 0.1,
        64
      );
      const orbitMaterial = new THREE.MeshBasicMaterial({
        color: 0x666666,
        side: THREE.DoubleSide,
        opacity: 0.3,
        transparent: true,
      });
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbit.rotation.x = Math.PI / 2;

      this.scene.add(orbit);
      this.scene.add(planet);

      // Load texture
      textureLoader.load(
        data.textureUrl,
        (texture) => {
          planet.material = new THREE.MeshPhongMaterial({
            map: texture,
            shininess: 5,
          });
        },
        undefined,
        (error) => {
          console.error(`Error loading texture for ${data.name}:`, error);
        }
      );

      this.planets.set(data.name, {
        mesh: planet,
        distance: data.distance,
        angle: 0,
        speed: 0.02 / data.distance,
        info: data.info,
      });
    });

    this.setupClickDetection();
  }
  setupClickDetection() {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener("click", (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, this.camera);
      const intersects = raycaster.intersectObjects(this.scene.children);

      if (intersects.length > 0) {
        this.planets.forEach((planetData, name) => {
          if (intersects[0].object === planetData.mesh) {
            this.showPlanetInfo(name, planetData);
          }
        });
      }
    });
  }

  showPlanetInfo(name, planetData) {
    const infoPanel =
      document.getElementById("info-panel") || this.createInfoPanel();
    infoPanel.innerHTML = `
            <h3>${name}</h3>
            <p>Distance from Sun: ${planetData.distance} units</p>
            <p>Orbital Speed: ${planetData.speed.toFixed(4)}</p>
            <hr style="border: 1px solid rgba(255,255,255,0.2); margin: 10px 0;">
            <h4>Planet Details</h4>
            <p>Diameter: ${planetData.info.diameter}</p>
            <p>Day Length: ${planetData.info.dayLength}</p>
            <p>Year Length: ${planetData.info.yearLength}</p>
            <p>Temperature: ${planetData.info.temperature}</p>
            <p>Moons: ${planetData.info.moons}</p>
            <p>Gravity: ${planetData.info.gravity}</p>
        `;
    infoPanel.style.display = "block";
  }

  createInfoPanel() {
    const panel = document.createElement("div");
    panel.id = "info-panel";
    panel.style.cssText = `
            position: fixed;
            right: 20px;
            top: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px;
            border-radius: 10px;
            font-family: Arial, sans-serif;
            max-width: 300px;
            font-size: 14px;
            z-index: 1000;
        `;
    document.body.appendChild(panel);
    return panel;
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Update planet positions and rotations
    this.planets.forEach((planetData) => {
      planetData.angle += planetData.speed;
      planetData.mesh.position.x =
        Math.cos(planetData.angle) * planetData.distance;
      planetData.mesh.position.z =
        Math.sin(planetData.angle) * planetData.distance;

      // Add rotation to planets
      planetData.mesh.rotation.y += 0.01;
    });

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  // Handle window resizing
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}

// Add window resize listener
window.addEventListener("resize", () => {
  if (spaceVisualization) {
    spaceVisualization.onWindowResize();
  }
});

// Create instance
const spaceVisualization = new SpaceVisualization();
