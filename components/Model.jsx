import { useGLTF } from '@react-three/drei';
import { forwardRef } from 'react';

const Model = forwardRef((props, ref) => {
  const { nodes, materials } = useGLTF('flower.glb');

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={ref}
        geometry={nodes.Plane007.geometry}
        material={materials[Object.keys(materials)[0]] || nodes.Plane007.material}
      />
    </group>
  );
});

export default Model;