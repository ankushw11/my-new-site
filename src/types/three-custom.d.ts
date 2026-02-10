import { Object3DNode } from "@react-three/fiber";
import { ShaderMaterial } from "three";

// Custom shader materials created via drei's shaderMaterial + R3F extend()
declare global {
  namespace JSX {
    interface IntrinsicElements {
      gridMaterial: any;
      dotGridMaterial: any;
      perspectiveGridMaterial: any;
    }
  }
}
