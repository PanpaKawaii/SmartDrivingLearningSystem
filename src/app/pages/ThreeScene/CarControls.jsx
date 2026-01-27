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
    const turnSpeed = 1.8;

    window.addEventListener("keydown", (e) => {
        if (e.code === "KeyW") keys.forward = true;
        if (e.code === "KeyS") keys.backward = true;
        if (e.code === "KeyA") keys.left = true;
        if (e.code === "KeyD") keys.right = true;
    });

    window.addEventListener("keyup", (e) => {
        if (e.code === "KeyW") keys.forward = false;
        if (e.code === "KeyS") keys.backward = false;
        if (e.code === "KeyA") keys.left = false;
        if (e.code === "KeyD") keys.right = false;
    });

    return {
        update(delta) {
            // ===== Speed =====
            if (keys.forward) {
                speed -= acceleration * delta;
            } else if (keys.backward) {
                speed += acceleration * delta;
            } else {
                // ma sát
                speed *= 0.95;
            }

            speed = THREE.MathUtils.clamp(speed, -maxSpeed, maxSpeed);

            // ===== Turn =====
            if (Math.abs(speed) > 0.5) {
                if (keys.left) {
                    car.rotation.y -= turnSpeed * delta * Math.sign(speed);
                }
                if (keys.right) {
                    car.rotation.y += turnSpeed * delta * Math.sign(speed);
                }
            }

            // ===== Move forward =====
            const forward = new THREE.Vector3(0, 0, 1);
            forward.applyQuaternion(car.quaternion);

            car.position.addScaledVector(forward, speed * delta);
        },
    };
}
