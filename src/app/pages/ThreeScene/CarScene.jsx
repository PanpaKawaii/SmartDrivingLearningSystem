import { useEffect, useRef } from "react";
import * as THREE from "three";
import { initCarControls } from "./CarControls";
import "./ThreeScene.css";
import { OBB } from 'three/examples/jsm/math/OBB.js';


/* ================= ENVIRONMENT ================= */

function createEnvironment(scene, colliders) {
    const material = new THREE.MeshStandardMaterial({ color: 0x7777ff });

    const blocks = [
        { x: -6, z: -15, s: 3 },
        { x: 6, z: -25, s: 3 },
        { x: -8, z: -40, s: 4 },
        { x: 8, z: -55, s: 4 },
        { x: 0, z: -80, s: 6 },
    ];

    blocks.forEach((b) => {
        const box = new THREE.Mesh(
            new THREE.BoxGeometry(b.s, b.s, b.s),
            material
        );
        box.position.set(b.x, b.s / 4, b.z);
        scene.add(box);
        colliders.push(box);
    });
}

/* ================= SCENE ================= */

export default function CarScene() {
    const mountRef = useRef(null);

    useEffect(() => {
        /* ===== Scene ===== */
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1e1e1e);

        /* ===== Main Camera (First Person) ===== */
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            500
        );

        /* ===== MiniMap Camera ===== */
        const miniCamera = new THREE.OrthographicCamera(
            -30, 30, 30, -30, 0.1, 200
        );
        miniCamera.rotation.x = -Math.PI / 2;

        /* ===== Renderer ===== */
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.autoClear = false;
        mountRef.current.appendChild(renderer.domElement);

        /* ===== Car ===== */
        const car = new THREE.Object3D();
        car.position.set(0, 0, 5);
        scene.add(car);

        const body = new THREE.Mesh(
            new THREE.BoxGeometry(2, 1, 4),
            new THREE.MeshStandardMaterial({ color: 0xff3333 })
        );
        body.position.y = 0.5;
        car.add(body);

        // ===== Hiển thị kích thước xe (debug) =====
        const carHelper = new THREE.BoxHelper(car, 0x00ff00);
        scene.add(carHelper);

        /* ===== First Person Camera ===== */
        car.add(camera);
        camera.position.set(0, 1, 1.5);
        camera.lookAt(new THREE.Vector3(0, 1, 5));

        /* ===== Ground ===== */
        const ground = new THREE.Mesh(
            new THREE.PlaneGeometry(300, 300),
            new THREE.MeshStandardMaterial({ color: 0x444444 })
        );
        ground.rotation.x = -Math.PI / 2;
        scene.add(ground);

        /* ===== Lights ===== */
        scene.add(new THREE.AmbientLight(0xffffff, 0.5));
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(20, 30, 10);
        scene.add(dirLight);

        // ===== Car OBB (local space) =====
        const carOBB = new OBB(
            new THREE.Vector3(0, 0.5, 0),   // center (local)
            new THREE.Vector3(1, 0.5, 2)    // half size (w/2, h/2, d/2)
        );

        /* ===== Environment ===== */
        const environmentColliders = [];
        createEnvironment(scene, environmentColliders);

        // tạo OBB world từ local OBB
        const worldOBB = carOBB.clone();
        worldOBB.applyMatrix4(car.matrixWorld);

        /* ===== Controls ===== */
        const controls = initCarControls(car);
        const clock = new THREE.Clock();

        const GROUND_Y = 0;

        /* ===== Animate ===== */
        function animate() {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();

            const prevPos = car.position.clone();

            carHelper.update();
            controls.update(delta);
            const movement = car.position.clone().sub(prevPos);

            // collision
            let hit = false;

            // tạo OBB world từ local OBB
            const worldOBB = carOBB.clone();
            worldOBB.applyMatrix4(car.matrixWorld);

            for (const o of environmentColliders) {
                const box = new THREE.Box3().setFromObject(o);
                if (worldOBB.intersectsBox3(box)) {
                    hit = true;
                    break;
                }
            }

            if (hit) {
                // pháp tuyến va chạm (xấp xỉ)
                const collisionNormal = new THREE.Vector3();

                // tìm hướng va chạm
                for (const o of environmentColliders) {
                    const box = new THREE.Box3().setFromObject(o);
                    if (worldOBB.intersectsBox3(box)) {
                        box.getCenter(collisionNormal)
                            .sub(car.position)
                            .normalize();
                        break;
                    }
                }

                // loại bỏ thành phần đâm vào vật
                const slide = movement.clone().projectOnPlane(collisionNormal);

                // đặt lại vị trí: prev + slide
                car.position.copy(prevPos).add(slide);
            }

            car.position.y = GROUND_Y;
            // car.position.y += (GROUND_Y - car.position.y) * 0.2;
            // if (car.position.y < GROUND_Y) {
            //     car.position.y = GROUND_Y;
            // }

            const newWorldOBB = carOBB.clone();
            newWorldOBB.applyMatrix4(car.matrixWorld);

            /* ===== MiniMap follow ===== */
            miniCamera.position.set(
                car.position.x,
                50,
                car.position.z
            );
            miniCamera.updateProjectionMatrix();

            // ===== Main view =====
            renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
            renderer.setScissorTest(false);
            renderer.render(scene, camera);

            // ===== Minimap =====
            const size = 220;
            const x = 20;
            const y = window.innerHeight - size - 20;

            renderer.setScissorTest(true);
            renderer.setScissor(x, y, size, size);
            renderer.setViewport(x, y, size, size);

            renderer.render(scene, miniCamera);
            renderer.setScissorTest(false);
        }

        animate();

        return () => {
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return <div className="three-scene" ref={mountRef} />;
}
