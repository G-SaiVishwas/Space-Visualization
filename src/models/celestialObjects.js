import * as THREE from 'three';

class CelestialObject {
    constructor(name, radius, textureUrl) {
        this.name = name;
        this.radius = radius;
        this.textureUrl = textureUrl;
        this.mesh = null;
    }

    async create() {
        const geometry = new THREE.SphereGeometry(this.radius, 32, 32);
        const texture = await new THREE.TextureLoader().load(this.textureUrl);
        const material = new THREE.MeshPhongMaterial({ map: texture });
        this.mesh = new THREE.Mesh(geometry, material);
        return this.mesh;
    }
}