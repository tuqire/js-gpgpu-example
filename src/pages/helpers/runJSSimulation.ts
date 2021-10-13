const runJSSimulation = (numCalculations: number) => {
  const data = new Array(1000000).fill(0).map((_, i) => i)
  const numCalculationsPerItem = (numCalculations / 1000000)

  const now = new Date();
  console.log(`started: ${now}`)

  for(let i = 0; i < data.length; i++ ){
    for (let j = 0; j < numCalculationsPerItem; j++) {
      data[i] *= Math.sin(i + j + numCalculations);
    }
  }

  console.log(`took ${new Date() - now} milliseconds`)
}

export default runJSSimulation
