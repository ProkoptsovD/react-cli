const { Command } = require("commander");
const { createFolderWitFiles } = require("../operations");
const program = new Command();

program
  .option("-g, --generate", "action type")
  .option("-c, --component <name>", "type of what you want to generate")
  .option("-s, --skip <options...>", "choose what to skip")
  .option("-T, --template <type>", "choose type of component - functional or class")
  .option("-S, --styles <type>", "choose styles: styled components, css, scss")
  .option("-ext, --extension <file extension>", "choose file extension: js, jsx, ts, tsx")

program.parse(process.argv);

const argv = program.opts();
const params = {
  name: '',
  skip: {
    'reexport': false,
    'styles': false,
    'dir': false
  },
  template: 'func',
  styles: 'css',
  ext: 'js'
};

function parseAction ({ generate, component, skip, template, styles, extension }) {
    if(generate) {
      if(component) {
        // generate component with name
        params.name = component;

        // define what files should be skiped before generating
        if(skip && skip.length) {
          skip.forEach(option => {
            if(option === 'all') {
              params.skip = {
                'reexport': true,
                'styles': true,
                'dir': true
              }
              return;
            }
            params.skip[option] = params.skip[option] === undefined ? false : true;
          })
        }
        // define type of react component - class or functional
        if(template) params.template = template === 'class' ? template : 'func';
        //define preferable way of styling components
        if(styles) {
          switch(styles) {
            case 'styled':
              params.styles = 'styled';
              break;
            case 'css':
              params.styles = 'css';
              break;
            default:
              params.styles = 'scss';
              break;
          }
        }
        if(extension) params.ext = extension;
      }
    }
    createFolderWitFiles(params);
}

const invokeAction = () => parseAction(argv);

module.exports = {
  invokeAction
}