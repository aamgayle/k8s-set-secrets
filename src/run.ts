import * as core from '@actions/core'
import {getFilesFromDirectoriesAndURLs} from './utilities/fileUtils'
import {updateManifestFiles} from './utilities/manifestUpdateUtils'

export async function run() {
   const manifestsInput = core.getInput('manifests', {required: true})
   const manifestFilePaths = manifestsInput
      .split(/[\n,;]+/) // split into each individual manifest
      .map((manifest) => manifest.trim()) // remove surrounding whitespace
      .filter((manifest) => manifest.length > 0) // remove any blanks

   const fullManifestFilePaths = await getFilesFromDirectoriesAndURLs(
      manifestFilePaths
   )

   const updatedManifestFilePaths = updateManifestFiles(fullManifestFilePaths)
   core.exportVariable('updated-manifests', updatedManifestFilePaths)
}

run().catch(core.setFailed)
