import { Html, OrbitControls, PerspectiveCamera, View } from '@react-three/drei';
import React, { Suspense } from 'react';
import * as THREE from 'three';
import Lights from './Lights';
import IPhone from './iPhone';

export default function ModelView({ index, groupRef, gsapType, controlRef, setRotationState, item, size }) {
    return (
        <View
            index={index}
            id={gsapType}
            className={`w-full h-full ${index === 2 && 'right-[-100%]'}`} // conditional styling
        >
            {/* Ambient Light */}
            <ambientLight intensity={0.3} />

            {/* Perspective Camera */}
            <PerspectiveCamera makeDefault position={[0, 0, 4]} />
            <Lights />

            {/* Orbit Controls */}
            <OrbitControls
                makeDefault
                enableZoom={false}
                ref={controlRef}
                enablePan={false}
                rotateSpeed={0.4}
                target={new THREE.Vector3(0, 0, 0)}  // Orbit around the origin
                onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}  // Track rotation
            />

            {/* Group for 3D Model */}
            <group ref={groupRef} name={index === 1 ? 'small' : 'large'} position={[0, 0, 1]}>
                <Suspense fallback={<Html><div>Loading model...</div></Html>}>
                    <IPhone scale={index === 1 ? [15, 15, 15] : [17, 17, 17]} item={item} size={size} />
                </Suspense>
            </group>
        </View>
    );
}
