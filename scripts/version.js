const { execSync } = require('child_process')
const path = require('path')

const directories = [
  'constraints',
  'extract-html-table',
  'json-extractor',
  'markdown-extractor',
  'xlsx-extractor',
  'xml-extractor',
]

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
