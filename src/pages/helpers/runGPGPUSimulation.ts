import * as THREE from 'three'
import { GPUComputationRenderer } from './GPUComputationRenderer'
import fragmentShader from './fragmentShader'

// data array
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

// define texture size
const textureWidth = Math.sqrt(data.length / 4)
const textureHeight = textureWidth

const runGPGPUSimulation = () => {
  // init THREE
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(10, 10) // use texture width and height

  const gpuCompute = new GPUComputationRenderer(textureWidth, textureHeight, renderer)

  // create input texture
  const inputTexture = gpuCompute.createTexture()
  for (let i = 0; i < data.length; i++) {
    inputTexture.image.data[i] = data[i];
  }
  
  // configure shader to run
  const simulation = gpuCompute.addVariable("inputTexture", fragmentShader, inputTexture)
  gpuCompute.setVariableDependencies(simulation, [simulation])

  const error = gpuCompute.init();
  
  if (error !== null) {
    console.error({ error });
  }
  
  // run shader
  gpuCompute.compute()

  // get data from output texture, values will be [2, 4, 6, 8, .., 32]
  const gl = renderer.getContext();
  let pixels = new Uint8Array(textureWidth * textureHeight * 4);
  gl.readPixels(0, 0, textureWidth, textureHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

  console.table({ pixels })
}

export default runGPGPUSimulation
