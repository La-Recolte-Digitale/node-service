const fs = require('fs')
const packageJson = require('./package.json')
const jsconfig = require('./jsconfig.json')

const jsConfigAlias = jsconfig.compilerOptions.paths

const fromJsconfigToModuleAlias = alias => {
  const _moduleAliases = {}
  for (const key in alias) {
    const moduleAliasKey = key.replace('/*', '')
    const moduleAliasValue = alias[key][0].replace('*', '')
    _moduleAliases[moduleAliasKey] = moduleAliasValue
  }

  return _moduleAliases
}

const fromJsconfigToJestAlias = alias => {
  const moduleNameMapper = {}
  for (const key in alias) {
    const moduleAliasKey = key
      .replace('@', '^@')
      .replace('/*', '')
      .concat('(.*)$')
    const moduleAliasValue = `<rootDir>/${alias[key][0].replace('/*', '$1')}`
    moduleNameMapper[moduleAliasKey] = moduleAliasValue
  }

  return moduleNameMapper
}
const updatePackageAlias = alias => {
  const _moduleAliases = fromJsconfigToModuleAlias(alias)
  const moduleNameMapper = fromJsconfigToJestAlias(alias)

  packageJson._moduleAliases = _moduleAliases
  packageJson.jest.moduleNameMapper = moduleNameMapper
  fs.writeFile('package.json', JSON.stringify(packageJson), function (err) {
    if (err) return console.log(err)
  })
}

updatePackageAlias(jsConfigAlias)
