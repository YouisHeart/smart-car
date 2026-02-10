import React, { useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import { LinearSRGBColorSpace, RepeatWrapping, TextureLoader } from "three";

export default function Ground() {                                                                 
    // thanks to https://polyhaven.com/a/rough_plasterbrick_05 !
     const [roughness, normal] = useLoader(TextureLoader, [
         "./textures/terrain-roughness.jpg",
         "./textures/terrain-normal.jpg",
     ]);

    useEffect(() => {
        [normal, roughness].forEach((t) => {
            t.wrapS = RepeatWrapping;
            t.wrapT = RepeatWrapping;
            t.repeat.set(5, 5);
            t.offset.set(0, 0);
        });

        normal.encoding = LinearSRGBColorSpace;
    }, [normal, roughness]);


    return (
       <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
            roughnessMap={roughness}
            normalMap={normal}
            roughness={0.6}
            color={[0.015, 0.015, 0.015]}
        />
        </mesh>
    );
}
