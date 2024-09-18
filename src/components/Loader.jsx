import { Html } from '@react-three/drei'
import React from 'react'

function Loader() {
    return (
        <Html>
          <div className='absolute op-0 left-0 w-full justify-center items-center'>
            <div className='w-[10vw] h-[10vw] rounde-full'></div>
          </div>
        </Html>
    )
}

export default Loader
