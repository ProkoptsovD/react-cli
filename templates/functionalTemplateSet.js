const functionalComponentTemplate = (componentName) => `const ${componentName}Component = () => {
    return (
        <div>Works</div>
    )
}

export default ${componentName}Component;
`;

const classComponentTemplate = (componentName) => `import { Component } from 'react';

class ${componentName}Component extends Component {
    render() {
        <div>Works</div>
    }
}

export default ${componentName}Component;
`;

const indexTemplate = (componentNameWithExt) => `export { default } from './${componentNameWithExt}';`;

module.exports = {
    functionalComponentTemplate,
    classComponentTemplate,
    indexTemplate
}