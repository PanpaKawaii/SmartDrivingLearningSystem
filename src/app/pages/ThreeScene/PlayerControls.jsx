// src/components/PlayerControls.jsx
import * as THREE from "three";

export function initPlayerControls(player, camera, domElement) {
    const keys = {};
    const velocity = new THREE.Vector3();
    const direction = new THREE.Vector3();

    let pitch = 0;
    let yaw = 0;

    const speed = 5;        // tốc độ di chuyển
    const sensitivity = 0.002; // độ nhạy chuột

    // ===== Pointer Lock =====
    domElement.addEventListener("click", () => {
        domElement.requestPointerLock();
    });

    document.addEventListener("mousemove", (e) => {
        if (document.pointerLockElement !== domElement) return;

        yaw -= e.movementX * sensitivity;
        pitch -= e.movementY * sensitivity;

        // Giới hạn nhìn lên / xuống
        pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, pitch));

        player.rotation.y = yaw;
        camera.rotation.x = pitch;
    });

    // ===== Keyboard =====
    document.addEventListener("keydown", (e) => {
        keys[e.code] = true;
    });

    document.addEventListener("keyup", (e) => {
        keys[e.code] = false;
    });

    return {
        update(delta) {
            direction.set(0, 0, 0);

            if (keys["KeyW"]) direction.z -= 1;
            if (keys["KeyS"]) direction.z += 1;
            if (keys["KeyA"]) direction.x -= 1;
            if (keys["KeyD"]) direction.x += 1;

            direction.normalize();

            velocity.copy(direction).multiplyScalar(speed * delta);

            // Di chuyển theo hướng player
            player.translateX(velocity.x);
            player.translateZ(velocity.z);
        },
    };
}
