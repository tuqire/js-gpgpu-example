import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import runGPGPUSimulation from './helpers/runGPGPUSimulation'
import runJSSimulation from './helpers/runJSSimulation'

import styles from '../../styles/Home.module.css'

const Home: NextPage = () => {
  const [length, setLength] = useState(100000)

  return (
    <div className={styles.container}>
      <Head>
        <title>JS GPGPU Example</title>
        <meta name="description" content="JS GPGPU Example" />
      </Head>
      <>
        Num calculations <input type="number" min={100000} value={length} onChange={(ev) => setLength(Number(ev.target.value))} />
        <button onClick={() => runJSSimulation(length)}>Run JS</button>
        <button onClick={() => runGPGPUSimulation(length)}>Run GPGPU</button>
      </>
    </div>
  )
}

export default Home
