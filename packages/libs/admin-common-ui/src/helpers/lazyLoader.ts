import loadable, { LoadableLibrary, LoadableComponent } from '@loadable/component';

// export { LoadableLibrary } from '@loadable/component';

export const loadComponent = (path: string, onLoaded?: (loadedLib: LazyModule) => void): LoadableComponent<{}> => {
	return loadable(async () => {
		const loadedPackage: any = await import(path);
		const loadedModule = loadedPackage.default as LazyModule;
		onLoaded(loadedModule);
		return loadedModule.rootComponent;
	});
};

export const loadLib = <TModule extends LazyModule>(path: string, onLoaded?: (loadedLib: TModule) => void): LoadableLibrary<TModule> => {
	return loadable.lib(async () => {
		const loadedLib: TModule = await import(path);
		onLoaded(loadedLib);
		return loadedLib;
	});
};

