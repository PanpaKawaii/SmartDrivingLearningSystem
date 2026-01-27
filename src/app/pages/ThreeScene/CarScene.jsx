// src/components/CarScene.jsx
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { initCarControls } from "./CarControls";

import "./ThreeScene.css";

function createEnvironment(scene) {
    const boxMaterial = new THREE.MeshStandardMaterial({
        color: 0x8888ff,
    });

    const positions = [
        // Bên trái đường
        { x: -8, y: 1, z: -10, w: 2, h: 2, d: 2 },
        { x: -10, y: 1.5, z: -25, w: 3, h: 3, d: 3 },
        { x: -7, y: 2, z: -45, w: 4, h: 4, d: 4 },

        // Bên phải đường
        { x: 8, y: 1, z: -15, w: 2, h: 2, d: 2 },
        { x: 11, y: 1.5, z: -30, w: 3, h: 3, d: 3 },
        { x: 7, y: 2, z: -50, w: 4, h: 4, d: 4 },

        // Xa hơn phía trước
        { x: 0, y: 2, z: -80, w: 6, h: 4, d: 6 },
    ];

    positions.forEach((p) => {
        const box = new THREE.Mesh(
            new THREE.BoxGeometry(p.w, p.h, p.d),
            boxMaterial
        );
        box.position.set(p.x, p.y, p.z);
        scene.add(box);
    });
}

export default function CarScene() {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1e1e1e);

        const camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // ===== Car =====
        const car = new THREE.Object3D();
        car.position.set(0, 2.5, 5);
        scene.add(car);

        // Car body (visual)
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(2, 1, 4),
            new THREE.MeshStandardMaterial({ color: 0xff3333 })
        );
        body.position.y = 0.5;
        car.add(body);

        // ===== Camera (phía trước xe) =====
        const cameraOffset = new THREE.Vector3(0, 1, -8);
        car.add(camera);
        camera.position.copy(cameraOffset);
        camera.lookAt(new THREE.Vector3(0, 1, 5));

        // ===== Light =====
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(10, 20, 10);
        scene.add(light);

        // Ground
        const ground = new THREE.Mesh(
            new THREE.PlaneGeometry(200, 200),
            new THREE.MeshStandardMaterial({ color: 0x444444 })
        );
        ground.rotation.x = -Math.PI / 2;
        scene.add(ground);

        // ===== Environment blocks =====
        createEnvironment(scene);

        const controls = initCarControls(car);
        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);

            const delta = clock.getDelta();
            controls.update(delta);

            // Camera luôn nhìn về phía trước xe
            camera.lookAt(car.position.clone().add(
                new THREE.Vector3(0, 1, -10).applyQuaternion(car.quaternion)
            ));

            renderer.render(scene, camera);
        }

        animate();

        return () => {
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return <div className="three-scene" ref={mountRef} />;
}
