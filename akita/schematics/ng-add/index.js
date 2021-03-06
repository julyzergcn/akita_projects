"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.akitaNgAdd = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const schematics_utilities_1 = require("schematics-utilities");
const ts = require("typescript");
const utils_1 = require("./utils");
function addPackageJsonDependencies(options) {
    return (host, context) => {
        const dependencies = [
            {
                type: schematics_utilities_1.NodeDependencyType.Default,
                version: '^7.0.0',
                name: '@datorama/akita',
            },
        ];
        if (options.withRouter || options.router) {
            dependencies.push({
                type: schematics_utilities_1.NodeDependencyType.Default,
                version: '^7.0.0',
                name: '@datorama/akita-ng-router-store',
            });
        }
        if (options.devtools) {
            dependencies.push({
                type: schematics_utilities_1.NodeDependencyType.Dev,
                version: '^7.0.0',
                name: '@datorama/akita-ngdevtools',
            });
        }
        if (options.httpEntityService) {
            dependencies.push({
                type: schematics_utilities_1.NodeDependencyType.Default,
                version: '^7.0.0',
                name: '@datorama/akita-ng-entity-service',
            });
        }
        dependencies.forEach((dependency) => {
            (0, schematics_utilities_1.addPackageJsonDependency)(host, dependency);
            context.logger.log('info', `✅️ Added "${dependency.name}" into ${dependency.type}`);
        });
        return host;
    };
}
function installPackageJsonDependencies() {
    return (host, context) => {
        context.addTask(new tasks_1.NodePackageInstallTask());
        context.logger.log('info', `🔍 Installing packages...`);
        return host;
    };
}
function getTsSourceFile(host, path) {
    const buffer = host.read(path);
    if (!buffer) {
        throw new schematics_1.SchematicsException(`Could not read file (${path}).`);
    }
    const content = buffer.toString();
    const source = ts.createSourceFile(path, content, ts.ScriptTarget.Latest, true);
    return source;
}
function injectImports(options) {
    return (host) => {
        if (!options.router && !options.devtools && !options.httpEntityService) {
            return;
        }
        const workspace = (0, schematics_utilities_1.getWorkspace)(host);
        const project = (0, schematics_utilities_1.getProjectFromWorkspace)(workspace, 
        // Takes the first project in case it's not provided by CLI
        options.project ? options.project : Object.keys(workspace['projects'])[0]);
        const modulePath = (0, schematics_utilities_1.getAppModulePath)(host, project.architect.build.options.main);
        const moduleSource = getTsSourceFile(host, modulePath);
        const importModule = 'environment';
        const importPath = '../environments/environment';
        if (!(0, utils_1.isImported)(moduleSource, importModule, importPath)) {
            const change = (0, utils_1.insertImport)(moduleSource, modulePath, importModule, importPath);
            if (change) {
                const recorder = host.beginUpdate(modulePath);
                recorder.insertLeft(change.pos, change.toAdd);
                host.commitUpdate(recorder);
            }
        }
        if (options.withRouter || options.router) {
            const routerChange = (0, utils_1.insertImport)(moduleSource, modulePath, 'AkitaNgRouterStoreModule', '@datorama/akita-ng-router-store');
            if (routerChange) {
                const recorder = host.beginUpdate(modulePath);
                recorder.insertLeft(routerChange.pos, routerChange.toAdd);
                host.commitUpdate(recorder);
            }
        }
        if (options.devtools) {
            const devtoolsChange = (0, utils_1.insertImport)(moduleSource, modulePath, 'AkitaNgDevtools', '@datorama/akita-ngdevtools');
            if (devtoolsChange) {
                const recorder = host.beginUpdate(modulePath);
                recorder.insertLeft(devtoolsChange.pos, devtoolsChange.toAdd);
                host.commitUpdate(recorder);
            }
        }
        if (options.httpEntityService) {
            const entityServiceChange = (0, utils_1.insertImport)(moduleSource, modulePath, 'NG_ENTITY_SERVICE_CONFIG', '@datorama/akita-ng-entity-service');
            if (entityServiceChange) {
                const recorder = host.beginUpdate(modulePath);
                recorder.insertLeft(entityServiceChange.pos, entityServiceChange.toAdd);
                host.commitUpdate(recorder);
            }
        }
        return host;
    };
}
function setSchematicsAsDefault() {
    return (host, context) => {
        const exec = require('child_process').exec;
        exec('ng config cli.defaultCollection @datorama/akita', () => {
            context.logger.log('info', `✅️ Setting Akita schematics as default`);
        });
        return host;
    };
}
function addModuleToImports(options) {
    return (host, context) => {
        const workspace = (0, schematics_utilities_1.getWorkspace)(host);
        const project = (0, schematics_utilities_1.getProjectFromWorkspace)(workspace, 
        // Takes the first project in case it's not provided by CLI
        options.project ? options.project : Object.keys(workspace['projects'])[0]);
        let importDevtools = '';
        let importRouter = '';
        let provideEntityServiceConfig = '';
        if ((options.withRouter || options.router) && options.devtools) {
            importRouter = `AkitaNgRouterStoreModule`;
        }
        if (options.devtools) {
            importDevtools = `environment.production ? [] : AkitaNgDevtools.forRoot()`;
        }
        if (options.httpEntityService) {
            provideEntityServiceConfig = `{ provide: NG_ENTITY_SERVICE_CONFIG, useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' }}`;
        }
        if (importDevtools) {
            (0, schematics_utilities_1.addModuleImportToRootModule)(host, importDevtools, null, project);
        }
        if (importRouter) {
            (0, schematics_utilities_1.addModuleImportToRootModule)(host, importRouter, null, project);
        }
        if (provideEntityServiceConfig) {
            const modulePath = (0, schematics_utilities_1.getAppModulePath)(host, project.architect.build.options.main);
            const module = (0, utils_1.getModuleFile)(host, modulePath);
            const providerChanges = (0, utils_1.addProviderToModule)(module, modulePath, provideEntityServiceConfig, null);
            (0, utils_1.applyChanges)(host, modulePath, providerChanges);
        }
        if (options.devtools) {
            context.logger.log('info', `🔥 AkitaNgDevtools is imported`);
        }
        if (options.withRouter || options.router) {
            context.logger.log('info', `🦄 AkitaNgRouterStoreModule is imported`);
        }
        if (options.httpEntityService) {
            context.logger.log('info', `🌈 NgEntityService is imported`);
        }
        return host;
    };
}
function log() {
    return (host, context) => {
        context.logger.log('info', `👏 Create your first entity store by running: ng g af todos/todos`);
        return host;
    };
}
function akitaNgAdd(options) {
    return (0, schematics_1.chain)([
        options && options.skipPackageJson ? (0, schematics_1.noop)() : addPackageJsonDependencies(options),
        options && options.skipPackageJson ? (0, schematics_1.noop)() : installPackageJsonDependencies(),
        addModuleToImports(options),
        injectImports(options),
        setSchematicsAsDefault(),
        log(),
    ]);
}
exports.akitaNgAdd = akitaNgAdd;
//# sourceMappingURL=index.js.map