import * as THREE from 'three'
import PhysicsRenderer from './PhysicsRenderer'
import fragmentShader from './fragmentShader'


const runGPGPUSimulation = (length: number) => {
  // data array
  const data = new Array(length).fill(0).map((_, i) => i)
  
  // define texture size
  const textureSize = Math.sqrt(data.length / 4)
  
  function createTexture(){
    const _data = new Float32Array(data);
  
    const texture = new THREE.DataTexture( 
      _data,
      textureSize,
      textureSize,
      THREE.RGBAFormat,
      THREE.FloatType
    );
  
    texture.minFilter =  THREE.NearestFilter,
    texture.magFilter = THREE.NearestFilter,
  
    texture.needsUpdate = true;
  
    return texture;
  }

  const now = new Date();
  console.log(`started: ${now}`)

  // init THREE
  const renderer = new THREE.WebGLRenderer()

  // create texture
  const physicsRenderer = new PhysicsRenderer(textureSize, fragmentShader, renderer);
  const texture = createTexture();
  physicsRenderer.reset(texture);

  physicsRenderer.update();

  // const gl = renderer.getContext()
  // const results = new Uint8Array(textureSize * textureSize * 4);
  // renderer.readRenderTargetPixels(renderer, 0, 0, textureSize, textureSize, results);
  // console.table({ results })

  console.log(`took ${new Date() - now} milliseconds`)

}

export default runGPGPUSimulation
