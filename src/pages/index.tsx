import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import runGPGPUSimulation from './helpers/runGPGPUSimulation'
import styles from '../../styles/Home.module.css'

const Home: NextPage = () => {
  useEffect(() => {
    runGPGPUSimulation()
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>JS GPGPU Example</title>
        <meta name="description" content="JS GPGPU Example" />
      </Head>
    </div>
  )
}

export default Home
