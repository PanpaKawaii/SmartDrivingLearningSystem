// src/components/CarControls.jsx
import * as THREE from "three";

export function initCarControls(car) {
    const keys = {
        forward: false,
        backward: false,
        left: false,
        right: false,
    };

    let speed = 0;
    const maxSpeed = 20;
    const acceleration = 30;
    const brakeForce = 40;
    const friction = 10;
    const turnSpeed = 1.5;

    // ===== Keyboard =====
    document.addEventListener("keydown", (e) => {
        if (e.code === "KeyW") keys.forward = true;
        if (e.code === "KeyS") keys.backward = true;
        if (e.code === "KeyA") keys.left = true;
        if (e.code === "KeyD") keys.right = true;
    });

    document.addEventListener("keyup", (e) => {
        if (e.code === "KeyW") keys.forward = false;
        if (e.code === "KeyS") keys.backward = false;
        if (e.code === "KeyA") keys.left = false;
        if (e.code === "KeyD") keys.right = false;
    });

    return {
        update(delta) {
            // ===== Tốc độ =====
            if (keys.forward) {
                speed += acceleration * delta;
            } else if (keys.backward) {
                speed -= acceleration * delta;
            } else {
                // Ma sát
                if (speed > 0) speed -= friction * delta;
                if (speed < 0) speed += friction * delta;
            }

            speed = THREE.MathUtils.clamp(speed, -maxSpeed / 2, maxSpeed);

            // ===== Đánh lái =====
            if (keys.left) {
                car.rotation.y += turnSpeed * delta * (speed / maxSpeed);
            }
            if (keys.right) {
                car.rotation.y -= turnSpeed * delta * (speed / maxSpeed);
            }

            // ===== Di chuyển =====
            const forwardVector = new THREE.Vector3(0, 0, -1);
            forwardVector.applyQuaternion(car.quaternion);

            car.position.addScaledVector(forwardVector, speed * delta);
        },
    };
}
