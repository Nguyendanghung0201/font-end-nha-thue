const _ = require('lodash')
const path = require('path')
const fs = require('fs')
const srcLangPath = path.resolve(__dirname, 'src', 'lang')
const publicLangPath = path.resolve(__dirname, 'public', 'languages')
const globalLang = require('./src/utils/global_lang.json')
/*
* */
const getDirectories = (source) => {
    try {
        const files = fs.readdirSync(source, { withFileTypes: true })
        return files
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name)
    } catch (e) {

    }
    return false
}

function readFile(file) {
    const data = fs.readFileSync(file)
    return data.toString().replace('export default ', '')
}

function copyFolderAndFile() {

    if (!fs.existsSync(publicLangPath)){
        fs.mkdirSync(publicLangPath)
    }

    const data = getDirectories(srcLangPath)
    if (data && data.length) {
        const objectLanguageData = {}
        for (let i = 0; i < data.length; i++) {
            for (const datum of ['vi', 'en']) {
                if (!objectLanguageData.hasOwnProperty(datum)) objectLanguageData[datum] = {}

                let sourcePath = path.join(srcLangPath, data[i], datum + '.js')
                const dataString = readFile(sourcePath)
                let dataTrans = {}
                if (dataString && dataString.length > 0) {
                    const _dataTrans = eval(`a = ${dataString}`)
                    for (const dataTransKey in _dataTrans) {
                        dataTrans[`${data[i]}.${dataTransKey}`] = _dataTrans[dataTransKey]
                    }
                    Object.assign(objectLanguageData[datum], globalLang[datum], dataTrans)
                }
            }
        }
        fs.writeFileSync(path.join(publicLangPath, 'global.json'), JSON.stringify(objectLanguageData))
    }
}

copyFolderAndFile()