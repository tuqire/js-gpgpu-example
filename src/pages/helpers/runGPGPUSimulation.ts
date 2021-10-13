import * as THREE from 'three'
import { GPUComputationRenderer } from 'gpucomputationrender-three'
import fragmentShader from './fragmentShader'

const runGPGPUSimulation = () => {
  // init THREE
  const renderer = new THREE.WebGLRenderer()

  // data array
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

  // define texture size
  const textureWidth = Math.sqrt(data.length)
  const textureHeight = textureWidth

  // create input texture
  const inputTexture = new THREE.DataTexture(new Uint16Array(data), textureWidth, textureHeight)

  // configure shader to run
  const gpuCompute = new GPUComputationRenderer(textureWidth, textureHeight, renderer)
  const simulation = gpuCompute.addVariable("inputTexture", fragmentShader, inputTexture)

  // run shader
  gpuCompute.compute()

  // get data from output texture
  const outputTexture = gpuCompute.getCurrentRenderTarget(simulation).texture
}

export default runGPGPUSimulation
