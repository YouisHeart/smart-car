import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

// based on "Chevrolet Corvette (C7)" (https://sketchfab.com/3d-models/chevrolet-corvette-c7-2b509d1bce104224b147c81757f6f43a)
// by Martin Trafas (https://sketchfab.com/Bexxie) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
export function Car() {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");

  const gltf = useLoader(
    GLTFLoader,
    "/models/car/rx7.glb",
    (loader) => loader.setDRACOLoader(dracoLoader),
  );

  useEffect(() => {
    // gltf.scene.scale.set(0.005, 0.005, 0.005);
    gltf.scene.position.set(0, -0.035, 0);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 17;
      }
    });
    // hide loading overlay once model is ready
    try {
      const el = document.querySelector('.loading');
      if (el) el.style.display = 'none';
    } catch (e) {
      // ignore
    }
  }, [gltf]);

  useFrame((state, delta) => {
    let t = state.clock.getElapsedTime() * 2;

    // 安全访问深层 children，避免结构不符合时抛出异常
    try {
      let node = gltf && gltf.scene;
      if (!node || !node.children) return;
      const path = [0, 0, 0, 0, 1, 5, 0];
      for (let idx of path) {
        if (!node.children || !node.children[idx]) return;
        node = node.children[idx];
      }
      const group = node;
      for (let i = 0; i < 4; i++) {
        if (group.children && group.children[i]) {
          group.children[i].rotation.x = t;
        }
      }
    } catch (e) {
      // 忽略运行时异常以防止渲染循环被打断
    }
  });

  return <primitive object={gltf.scene} />;
}

