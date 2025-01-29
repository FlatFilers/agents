const fs = require('fs')
const path = require('path')
const ncc = require('@vercel/ncc')

const directories = fs.readdirSync(process.cwd())
  .filter(file => 
    fs.statSync(path.join(process.cwd(), file)).isDirectory() && 
    file !== 'scripts' && 
    !file.startsWith('.')  // Exclude hidden directories
  )

async function bundle() {
  for (const agent of directories) {
    const agentDir = path.join(process.cwd(), agent)
    const distDir = path.join(agentDir, 'dist')

    console.log(`\nBundling ${agent}...`)
    try {
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

      await fs.rmSync(distDir + '/_entry.js')
      console.log(`✅ Successfully bundled ${agent}`)
    } catch (error) {
      console.error(`❌ Error bundling ${agent}:`, error)
    }
  }
}

bundle()
