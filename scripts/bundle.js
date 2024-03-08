const fs = require('fs')
const path = require('path')
const ncc = require('@vercel/ncc')

async function bundle() {
  const agent = process.argv.slice(2)[0]
  const agentDir = path.join(process.cwd(), agent)
  const distDir = path.join(agentDir, 'dist')

  if (!agent) {
    console.error(
      'No agent provided, please provide the agent directory as an argument',
    )
    return
  }

  await fs.mkdirSync(distDir, { recursive: true })
  await fs.copyFileSync(
    path.join(process.cwd(), 'scripts/_entry.js'),
    distDir + '/_entry.js',
  )

  await ncc(path.join(distDir, '_entry.js'), {
    minify: true,
    target: 'es2020',
    cache: false,
  })
    .then(({ code }) => {
      fs.writeFileSync(path.join(distDir, 'index.js'), code, 'utf8')
    })
    .catch((error) => {
      console.error('Error bundling agent: ', error)
    })

  await fs.rmSync(distDir + '/_entry.js')
}

bundle()
