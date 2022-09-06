### Simple CLI for generating react components like Angular CLI does

## Commands

`rlc` - name of package

================================================
`--generate --component <component name>` or `-g -c <component name>` - generetes folder and files with the passed name: file with functional React component, index file for reexport and file with styles

=================================================
`--skip <option>` or `-s <option>` allows not to render some files or folder.
Options
`reexport` - skips index file with reexport `--skip reexport`
`styles` - skips file with styles `--skip styles`
`dir` - skips parent dirirectory and generates files only
By default all three files and parent directory are generated

================================================

`--template <component type>` or `-T <component type` - allows to generate file with template of functional or class component. Types `func` or `class` are accepted. Functional component template is default

================================================

`--styels <styles format>` or `-S <styles format>` - here you can pick up your prefered way of styling components.
Options: `css`, `scss`, `styled`. Css styles format is default
