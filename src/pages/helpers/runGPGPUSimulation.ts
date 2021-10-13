import * as THREE from 'three'
import PhysicsRenderer from './PhysicsRenderer'
import fragmentShader from './fragmentShader'

// data array
const data = new Array(10000).fill(0).map((_, i) => i)

// define texture size
const textureSize = Math.sqrt(data.length / 4)

function createPositionTexture(){
  var data = new Float32Array( textureSize * textureSize * 4 );

  for(let i =0; i < data.length; i++ ){

    //makes some weird sin based positions
    data[ i ] = Math.sin( i*.1 ) * 30;
    
  }

  const texture = new THREE.DataTexture( 
    data,
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

const runGPGPUSimulation = () => {
  // init THREE
  const renderer = new THREE.WebGLRenderer()
  document.body.querySelector("#__next")?.appendChild(renderer.domElement)

  const physicsRenderer = new PhysicsRenderer(textureSize, fragmentShader, renderer);
  var texture = createPositionTexture();
  physicsRenderer.reset(texture);

  // create input texture
  // const inputTexture = gpuCompute.createTexture()
  // for (let i = 0; i < data.length; i++) {
  //   inputTexture.image.data[i] = data[i];
  // }

  physicsRenderer.update();

  const gl = renderer.getContext()
  // gl.bindFramebuffer(gl.FRAMEBUFFER, _this.myFrameBufferObject);
  const results = new Uint8ClampedArray(textureSize * textureSize * 4);
  gl.readPixels(0, 0, textureSize, textureSize, gl.RGBA, gl.UNSIGNED_BYTE, results);
  const pixels = new Float32Array(results)
  console.table({ results })
  console.table({ pixels })
  // // print the results
  // for (let i = 0; i < textureWidth * textureHeight*4; ++i) {
  //   console.log(results[i]);
  // }
}

export default runGPGPUSimulation
