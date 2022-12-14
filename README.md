
## Simple CLI for generating react components like Angular CLI does

### How to install

It's easy, just run `npm i react-cli-rlc`

## Usage

Navigate to the directory in your project where you need to create a component.
Then type command in the terminal `rlc -g -c myTest`. This command will generate:

1. **Folder** - named `MyTest`. Every passed name wil be capitalized.
2. **File with component** - named `MyTestComponent.js`. Programm adds word `Component` to original name and sets with deafult file extension `js`.
3. **File with styles** - named `MyTestComponent.module.css`. Programm add word `Component` to original name + concatenates prefix `module`. Thus you may write your styles that won't override each other.
4. **File with reexport** - named `index.js` which serves for reexporting files from your component making imports to other files more beautiful.

Also, file with component will contain some template code as well as index file.

## Commands

+ `rlc` - name of package. Works the same as `node` or `npm`.

+ `--generate` - tells programm what should be generated. For now it's a components only, so after `--generate` or `-g` there should be flag `--component` or `-c` and component name right after it `<component name>`.

+ `--component <component name>` or `-g -c <component name>` - generates folder and files with the passed name: file with functional React component, index file for reexport and file with styles, e.g `--genarate --component test` or `-g -c <component name>` will create : folder `Test` => `TestComponent.js` => `TestComponent.module.scss` => `index.js`.


+ `--extension <file extension>` or `-ext <file extension>` - sets the extensions of component file. Thus you can make your component in `js`, `jsx` , `ts`, `tsx`. By default `js` extension is applied. Also, if you set `jsx` or `tsx` extension of index file will remain `js` or `ts` nevertheless.


+ `--skip <option>` or `-s <option>` - allows not to render some files or folder.

   **Options**:
   - `reexport` - skips index file with reexport, e.g `--skip reexport` or `-s reexport`.
   - `styles` - skips file with styles, e.g `--skip styles` or `-s styles`.
   - `dir` - skips parent dirirectory and generates files only, e.g `--skip dir` or `-s dir`.
By default all three files and parent directory are generated.

Also you may pass several options to skip several files, e.g `--skip dir styles reexport`. In this case only one file with a react component wil be created.


+ `--template <component type>` or `-T <component type` - allows to generate file with template of functional or class component. Types `func` or `class` are accepted, e.g `--template class` or `-T class`. Functional component template `func` is default.

+ `--styles <styles format>` or `-S <styles format>` - here you can pick up your prefered way of styling components.

   **Options**:
   - `css` - creates file with **css** extension, e.g `--styles css` or `-S css`.
   - `scss` - creates file with **scss** extension, e.g `--styles scss` or `-S scss`.
   - `styled` - creates file with **js** extension and prefix **styled**, like **TestComponent.styled.js** in order to allow you to work with `styled-component` library or `@emotion`, e.g `--styles styled` or `-S styled`.
CSS styles format `css` is default.
