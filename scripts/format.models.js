import { exec } from 'child_process'
import fs from 'fs'
import path from 'path'

const __dirname = path.resolve()

const pathFolder = path.resolve(__dirname, 'models')

console.log(`Start models formatting in ${pathFolder}...`)

const formatModel = filePath => {
  return new Promise((resolve, reject) => {
    exec(
      `pnpm zenstack format --schema ${filePath}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error formatting ${filePath}:`, stderr)
          reject(error)
        } else {
          console.log(`Formatted ${filePath}`)
          resolve(stdout)
        }
      },
    )
  })
}

const files = fs
  .readdirSync(pathFolder)
  .filter(file => file.endsWith('.zmodel'))
const formatPromises = files.map(file =>
  formatModel(path.join(pathFolder, file)),
)

Promise.all(formatPromises)
  .then(() => {
    console.log('All models formatted successfully.')
  })
  .catch(error => {
    console.error('Error formatting some models:', error)
  })
