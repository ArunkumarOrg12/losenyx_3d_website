"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0.4, 13);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight("#7f8ba1", 0.5);
    scene.add(ambient);

    const redLight = new THREE.PointLight("#ff3a32", 26, 45);
    redLight.position.set(0, -1.2, 6.5);
    scene.add(redLight);

    const blueLight = new THREE.PointLight("#8fb5ff", 7, 40);
    blueLight.position.set(-7, 4, 5);
    scene.add(blueLight);

    const ringGroup = new THREE.Group();
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: "#ff4337",
      transparent: true,
      opacity: 0.42,
    });

    const ringA = new THREE.Mesh(new THREE.TorusGeometry(2.65, 0.045, 18, 220), ringMaterial);
    ringA.rotation.x = Math.PI / 2;
    ringGroup.add(ringA);

    const ringB = new THREE.Mesh(new THREE.TorusGeometry(3.55, 0.025, 18, 220), ringMaterial.clone());
    (ringB.material as THREE.MeshBasicMaterial).opacity = 0.24;
    ringB.rotation.x = Math.PI / 2;
    ringGroup.add(ringB);
    scene.add(ringGroup);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.15, 4),
      new THREE.MeshPhysicalMaterial({
        color: "#1b202d",
        emissive: "#53100b",
        emissiveIntensity: 0.9,
        roughness: 0.2,
        metalness: 0.75,
        wireframe: true,
        transparent: true,
        opacity: 0.58,
      }),
    );
    core.position.y = 0.38;
    scene.add(core);

    const innerCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.72, 40, 40),
      new THREE.MeshBasicMaterial({
        color: "#ff4939",
        transparent: true,
        opacity: 0.92,
      }),
    );
    innerCore.position.copy(core.position);
    scene.add(innerCore);

    const particleCount = 120;
    const linePositions = new Float32Array(particleCount * 6);
    const pointPositions = new Float32Array(particleCount * 3);

    for (let index = 0; index < particleCount; index += 1) {
      const radius = 4 + Math.random() * 5.5;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 4.8;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius * 0.8;

      pointPositions[index * 3] = x;
      pointPositions[index * 3 + 1] = y;
      pointPositions[index * 3 + 2] = z;

      linePositions[index * 6] = x;
      linePositions[index * 6 + 1] = y;
      linePositions[index * 6 + 2] = z;
      linePositions[index * 6 + 3] = core.position.x;
      linePositions[index * 6 + 4] = core.position.y;
      linePositions[index * 6 + 5] = core.position.z;
    }

    const pointGeometry = new THREE.BufferGeometry();
    pointGeometry.setAttribute("position", new THREE.BufferAttribute(pointPositions, 3));
    const points = new THREE.Points(
      pointGeometry,
      new THREE.PointsMaterial({
        color: "#ff5f52",
        size: 0.08,
        transparent: true,
        opacity: 0.85,
      }),
    );
    scene.add(points);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(
      lineGeometry,
      new THREE.LineBasicMaterial({
        color: "#ff3d32",
        transparent: true,
        opacity: 0.22,
      }),
    );
    scene.add(lines);

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(7.6, 120),
      new THREE.MeshBasicMaterial({
        color: "#09111b",
        transparent: true,
        opacity: 0.28,
      }),
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.2;
    scene.add(floor);

    let frameId = 0;
    const pointer = { x: 0, y: 0 };

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const handleResize = () => {
      if (!mount) {
        return;
      }

      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };

    const animate = () => {
      frameId = window.requestAnimationFrame(animate);
      const time = performance.now() * 0.001;

      core.rotation.x += 0.003;
      core.rotation.y += 0.004;
      ringGroup.rotation.z += 0.0025;
      innerCore.scale.setScalar(1 + Math.sin(time * 2.6) * 0.05);
      redLight.intensity = 23 + Math.sin(time * 3) * 3;

      points.rotation.y += 0.001;
      points.rotation.x = Math.sin(time * 0.4) * 0.08;
      lines.rotation.y += 0.0008;

      camera.position.x += (pointer.x * 0.8 - camera.position.x) * 0.03;
      camera.position.y += (-pointer.y * 0.35 + 0.4 - camera.position.y) * 0.03;
      camera.lookAt(0, 0.1, 0);
      renderer.render(scene, camera);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove);
    animate();

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      pointGeometry.dispose();
      lineGeometry.dispose();
      (points.material as THREE.PointsMaterial).dispose();
      (lines.material as THREE.LineBasicMaterial).dispose();
      ringA.geometry.dispose();
      ringB.geometry.dispose();
      core.geometry.dispose();
      innerCore.geometry.dispose();
      floor.geometry.dispose();
      ringMaterial.dispose();
      (ringB.material as THREE.MeshBasicMaterial).dispose();
      (core.material as THREE.MeshPhysicalMaterial).dispose();
      (innerCore.material as THREE.MeshBasicMaterial).dispose();
      (floor.material as THREE.MeshBasicMaterial).dispose();
      renderer.dispose();

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
