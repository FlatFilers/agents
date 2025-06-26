const { execSync } = require('node:child_process')
const path = require('node:path')
const fs = require('node:fs')

const directories = fs
  .readdirSync(process.cwd())
  .filter(
    (file) =>
      fs.statSync(path.join(process.cwd(), file)).isDirectory() &&
      file !== 'scripts' &&
      file !== 'node_modules' &&
      !file.startsWith('.'),
  )

for (const dir of directories) {
  try {
    const fullPath = path.resolve(__dirname, '..', dir)
    const packageJsonPath = path.join(fullPath, 'package.json')

    // Check if package.json exists
    if (!fs.existsSync(packageJsonPath)) {
      console.log(`⚠️ No package.json found in ${dir}, skipping...`)
      continue
    }

    // Read package.json
    const packageJson = require(packageJsonPath)
    const dependencies = packageJson.dependencies || {}

    console.log(`\nUpdating dependencies in ${dir}...`)

    // Clear npm cache for good measure
    execSync('npm cache clean --force', {
      cwd: fullPath,
      stdio: 'inherit',
    })

    // Remove node_modules and package-lock.json to force fresh install
    execSync('rm -rf node_modules package-lock.json', {
      cwd: fullPath,
      stdio: 'inherit',
    })

    // Install fresh
    execSync('npm install', {
      cwd: fullPath,
      stdio: 'inherit',
    })

    console.log(`✅ Finished updating dependencies in ${dir}`)
  } catch (error) {
    console.error(`❌ Error updating dependencies in ${dir}:`, error.message)
  }
}
