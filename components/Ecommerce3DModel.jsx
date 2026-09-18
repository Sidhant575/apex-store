'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Ecommerce3DModel({ cartItemCount = 0, isDark = true }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, isDark ? 0.9 : 1.3));
    
    const pointLight = new THREE.PointLight(0x10b981, 3.5, 30);
    pointLight.position.set(4, 4, 4);
    scene.add(pointLight);

    const rimLight = new THREE.PointLight(0x34d399, 2, 20);
    rimLight.position.set(-4, -3, 3);
    scene.add(rimLight);

    const rootGroup = new THREE.Group();

    // Cyber Jade Delivery Package
    const boxGeo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    const boxMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x0b1e1b : 0xdcfce7,
      metalness: 0.85,
      roughness: 0.2,
    });
    const box = new THREE.Mesh(boxGeo, boxMat);
    rootGroup.add(box);

    // Glowing Emerald Ribbons
    const ribbonMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.4,
      metalness: 0.5,
      roughness: 0.2,
    });
    const ribbonV = new THREE.Mesh(new THREE.BoxGeometry(0.32, 1.62, 1.62), ribbonMat);
    const ribbonH = new THREE.Mesh(new THREE.BoxGeometry(1.62, 0.32, 1.62), ribbonMat);
    rootGroup.add(ribbonV);
    rootGroup.add(ribbonH);

    // Orbiting Satellite
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      emissive: 0x10b981,
      emissiveIntensity: 0.6,
      roughness: 0.15,
    });
    const orb = new THREE.Mesh(new THREE.DodecahedronGeometry(0.28, 0), orbMat);
    scene.add(orb);

    // Outer Energy Ring
    const ringGeo = new THREE.TorusGeometry(2.1, 0.025, 16, 80);
    const ringMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1f433d : 0x86efac,
      metalness: 0.9,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    scene.add(ring);

    scene.add(rootGroup);

    let id;
    let startTime = null;

    const animate = (timestamp) => {
      id = requestAnimationFrame(animate);
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) * 0.001;
      const speed = 0.6 + Math.min(cartItemCount, 5) * 0.3;

      rootGroup.rotation.y = elapsed * 0.45 * speed;
      rootGroup.rotation.x = 0.32;
      rootGroup.position.y = Math.sin(elapsed * 1.5) * 0.08;

      orb.position.set(
        Math.cos(elapsed * speed) * 2.1,
        Math.sin(elapsed * 2) * 0.3,
        Math.sin(elapsed * speed) * 2.1
      );
      orb.rotation.x += 0.02;
      orb.rotation.y += 0.03;

      ring.rotation.z = -elapsed * 0.25;

      renderer.render(scene, camera);
    };

    id = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(id);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [cartItemCount, isDark]);

  return <div ref={mountRef} style={{ width: '100%', height: '180px' }} />;
}