import React, { useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export function Car() {
  const gltf = useLoader(GLTFLoader,"./models/car/rx7.glb",(loader) => {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/"); // Путь к файлам декодера Draco

        loader.setDRACOLoader(dracoLoader);
        loader.load(
            "./models/car/rx7.glb",
            () => {
               document.querySelector('.loading').style.display = 'none'
            },
            (xhr) => {
              const percentLoaded = (xhr.loaded / xhr.total) * 100;
            }
        );
      }
  );

  useEffect(() => {
    gltf.scene.position.set(0, -0.035, 0);
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
        object.material.envMapIntensity = 17;
      }
    });
  }, [gltf]);

  return <primitive object={gltf.scene} />;
}

