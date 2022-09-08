const path = require('path');
const fs = require('fs').promises;

const {
  functionalComponentTemplate,
  indexTemplate,
  classComponentTemplate
} = require('./templates/functionalTemplateSet');
const { capitalize } = require('./utils/capitalize');

const { resolvePath } = require('./utils/resolvePath');
const { narrowExtension } = require('./utils/narrowExtension');

/**
 * @param {{
 *  pathName: string,
 *  fileName: string,
 *  componentType: 'func' | 'class',
 *  ext: 'js' | 'jsx' | 'ts' | 'tsx'
 * }} config
 * @param { 'index' | 'component' | 'styles' } fileType
 * @return { void } function returns nothing
 */
const createFile = async ({ pathName, name, styles, template, ext }, fileType) => {
  try {
    const capitalizedName = capitalize(name);
    let fileName = capitalizedName + 'Component';
    let subName = ''
    let templateCode = '';
    let fileExt = ext;

    switch(fileType) {
      case 'index':
        templateCode = indexTemplate(capitalizedName + '.' + fileExt);
        fileName = 'index';
        fileExt = narrowExtension(fileExt);
        break;
      case 'component':
        const tmplDictionary = { func: functionalComponentTemplate, class: classComponentTemplate }
        templateCode = tmplDictionary[template](capitalizedName);
        break;
      case 'styles':
        const isStyled = styles === 'styled';

        templateCode = '';
        subName = isStyled ? '.styled' : '.module';
        fileExt = isStyled ? 'js' : styles;
      default:
        templateCode = '';
      ;
    }

    const fileNameWithExt = fileName + subName + '.' + fileExt;
    const resolvedPath = path.resolve(pathName + '/' + fileNameWithExt);

    fs.writeFile(resolvedPath, templateCode, 'utf8');
  } catch (err) {
    console.error(err);
  }
} 

const createFolder = async (name) => {
    try {
        const directoryWhereCreateComponent = resolvePath();
        const dirContent = await fs.readdir(directoryWhereCreateComponent);
        const capitalizedName = capitalize(name);
        const dirNameWithPath = resolvePath(capitalizedName);
        const length = dirContent.length;

        for (let i = 0; i < length; i += 1) {
          const hasDir = dirContent[i] === capitalizedName;

          if(hasDir) throw new Error(`Directory ${name} already exists`);
        }
       
        await fs.mkdir(dirNameWithPath);

        return { pathName: dirNameWithPath, name: capitalizedName};
      } catch (err) {
        console.error(err);
      }
}

const createFolderWitFiles = async ({ skip, ...restArgs }) => {
  let config = null;

  if(skip?.dir) {
    config = { ...restArgs, pathName: resolvePath() };

    if(!skip?.reexport) createFile(config, 'index');
    if(!skip?.styles) createFile(config, 'styles');
  
  } else {
    const dirNameAndPath = await createFolder(restArgs?.name);
    config = { ...restArgs, ...dirNameAndPath };

    if(!skip?.reexport) createFile(config, 'index');
    if(!skip?.styles) createFile(config, 'styles');
  }
  
  createFile(config, 'component');
}

module.exports = {
  createFolderWitFiles
}