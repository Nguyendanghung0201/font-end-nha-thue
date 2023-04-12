const modulesFiles = require.context('@/stores', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    // set './app.js' => 'app'
    if (modulePath === './index.js') return modules;

    const moduleName = (modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')).replace(/-([a-z])/g, g => g[1].toUpperCase());

    // console.log(moduleName, modulePath);
    // camelCase(modulePath.replace(/^\.\/(.*)\.\w+$/, '$1'));
    const value = modulesFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
}, {});

export default modules
