// src/components/ThreeScene.jsx
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { initPlayerControls } from "./PlayerControls";

import "./ThreeScene.css";

export default function ThreeScene() {
    const mountRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x202020);

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Player
        const player = new THREE.Object3D();
        player.position.set(0, 1.6, 5);
        scene.add(player);

        camera.position.set(0, 0, 0);
        player.add(camera);

        // Light
        scene.add(new THREE.AmbientLight(0xffffff, 0.4));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(5, 10, 7);
        scene.add(dirLight);

        // Ground
        const ground = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100),
            new THREE.MeshStandardMaterial({ color: 0x555555 })
        );
        ground.rotation.x = -Math.PI / 2;
        scene.add(ground);

        // Test box
        const box = new THREE.Mesh(
            new THREE.BoxGeometry(2, 2, 2),
            new THREE.MeshStandardMaterial({ color: 0x00ff00 })
        );
        box.position.set(0, 1, -5);
        scene.add(box);
        // Test box
        const box2 = new THREE.Mesh(
            new THREE.BoxGeometry(2, 3, 4),
            new THREE.MeshStandardMaterial({ color: 0x0000ff })
        );
        box2.position.set(10, 1, -5);
        scene.add(box2);

        // ===== Minimap Camera =====
        const minimapSize = 200; // px
        const minimapCamera = new THREE.OrthographicCamera(
            -20, 20, 20, -20,
            0.1,
            1000
        );

        minimapCamera.position.set(
            player.position.x,
            50,
            player.position.z
        );
        minimapCamera.lookAt(player.position);

        const controls = initPlayerControls(
            player,
            camera,
            renderer.domElement
        );

        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);

            const delta = clock.getDelta();
            controls.update(delta);

            // ===== Main View =====
            renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
            renderer.setScissorTest(false);
            renderer.render(scene, camera);

            // ===== Minimap View =====
            renderer.setScissorTest(true);
            renderer.setScissor(
                window.innerWidth - minimapSize - 10,
                window.innerHeight - minimapSize - 10,
                minimapSize,
                minimapSize
            );
            renderer.setViewport(
                window.innerWidth - minimapSize - 10,
                window.innerHeight - minimapSize - 10,
                minimapSize,
                minimapSize
            );

            renderer.render(scene, minimapCamera);
            renderer.setScissorTest(false);
        }
        animate();

        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return <div className="three-scene" ref={mountRef} />;
}
