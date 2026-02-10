import React, {Suspense, useEffect} from 'react';
import './index.css'
import {Canvas} from "@react-three/fiber";
import {CubeCamera, Environment, OrbitControls, PerspectiveCamera, SpotLight} from "@react-three/drei";
import Ground from "./componsable/Ground.jsx";
import {Car} from "./componsable/Car";
import {Rings} from "./componsable/Rings";
import {
    EffectComposer,
    DepthOfField,
    Bloom,
    ChromaticAberration,
} from "@react-three/postprocessing";
import {BlendFunction} from "postprocessing";
import {FloatingGrid} from "./componsable/FloatingGrid";

function CarShow() {
  return (
    <>
      <OrbitControls target={[0,0.35,0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[0,0,5]} />
      <color args={[0,0,0]} attach="background" />
       <SpotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
    />
    <SpotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
            />
      <Ground />
      <CubeCamera resolution={256} frames={60}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>
      
      <Rings/>
      <FloatingGrid/>
      
      <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={1.5}
          width={300}
          height={300}
          kernelSize={5}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.025}
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL}
          offset={[0.0005, 0.0012]}
        />
      </EffectComposer>  
    </>
  )
}

// 加载动画
function Loader() {
  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white' }}>
      正在启动小米 SU7...
    </div>
  );
}
function App() {
    return (
        <>
            <div
                className="loading"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 9,
                    pointerEvents: 'none',
                    width: '100vw',
                    height: '100vh',
                    background: '#000',
                    color: '#fff',
                    fontSize: '40px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                Loading...
            </div>
                <Canvas shadows dpr={[1,1.5]}>
                  <Suspense fallback={null}>
                    <CarShow/>
                    </Suspense>
                </Canvas>
        </>
    )
}

export default App
