const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

const directories = fs.readdirSync(process.cwd())
  .filter(file => 
    fs.statSync(path.join(process.cwd(), file)).isDirectory() && 
    file !== 'scripts' && 
    !file.startsWith('.')  // Exclude hidden directories
  )

directories.forEach((dir) => {
  try {
    const fullPath = path.resolve(__dirname, '..', dir)
    console.log(`\nInstalling dependencies in ${dir}...`)
    execSync('npm install', {
      cwd: fullPath,
      stdio: 'inherit',
    })
    console.log(`✅ Finished installing dependencies in ${dir}`)
  } catch (error) {
    console.error(`❌ Error installing dependencies in ${dir}:`, error.message)
  }
})
