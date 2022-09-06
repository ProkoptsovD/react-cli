const path = require('path');
const fs = require('fs').promises;

const {
  functionalComponentTemplate,
  indexTemplate,
  classComponentTemplate
} = require('./templates/functionalTemplateSet');
const { capitalize } = require('./utils/capitalize');

const { resolvePath } = require('./utils/resolvePath');

/**
 * @param {{ pathName: string, fileName: string }} dir object with path to folder and file name to be created 
 * @param {'index' | 'component' | 'styles'} fileType type of file to generate
 * @param {'func' | 'class'} componentType what template to use
 * @param {'js' | 'jsx' | 'ts' | 'tsx' | 'css' | 'scss'} ext file extension
 * @return { void } function returns nothing
 */
const createFile = async ({ pathName, fileName }, fileType, componentType, ext = 'js') => {
  try {
    let name = fileName + 'Component';
    let subName = ''
    let template = '';
    let fileExt = ext;

    switch(fileType) {
      case 'index':
        name = 'index';
        template = indexTemplate(name + subName + '.' + fileExt);
        break;
      case 'component':
        template = componentType === 'func' ? functionalComponentTemplate(fileName) : classComponentTemplate(fileName);
        break;
      case 'styles':
        const isStyled = ext === 'styled';
        template = '';
        subName = ext === 'styled' ? '.styled' : '.module';
        fileExt = isStyled ? 'js' : ext;
      default:
        template = '';
      ;
    }

    const fileNameWithExt = name + subName + '.' + fileExt;
    const resolvedPath = path.resolve(pathName + '/' + fileNameWithExt);

    fs.writeFile(resolvedPath, template, 'utf8');
  } catch (err) {
    console.error(err);
  }
} 

const createFolder = async ({ name }) => {
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

        return { pathName: dirNameWithPath, fileName: capitalizedName};
      } catch (err) {
        console.error(err);
      }
}

const createFolderWitFiles = async (params) => {
  let dir = null;

  if(params?.skip?.dir) {
    dir = { pathName: resolvePath(), fileName: capitalize(params?.name) };

    if(!params?.skip?.reexport) createFile(dir, 'index');
    if(!params?.skip?.styles) createFile(dir, 'styles', null, params?.styles ?? 'css');
  
  } else {
    dir = await createFolder(params);

    if(!params?.skip?.reexport) createFile(dir, 'index');
    if(!params?.skip?.styles) createFile(dir, 'styles', null, params?.styles ?? 'css');
  }
  
  createFile(dir, 'component', params.template);
}

module.exports = {
  createFolderWitFiles
}