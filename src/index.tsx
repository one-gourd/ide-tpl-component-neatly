import { Instance } from 'mobx-state-tree';
import { initSuitsFromConfig } from 'ide-lib-engine';

export * from './[CLASSNAME]/config';
export * from './[CLASSNAME]/';

import { [CLASSNAME]Currying } from './[CLASSNAME]/';
import { config[CLASSNAME] } from './[CLASSNAME]/config';

const {
    ComponentModel: [CLASSNAME]Model,
    StoresModel: [CLASSNAME]StoresModel,
    NormalComponent: [CLASSNAME],
    ComponentHOC: [CLASSNAME]HOC,
    ComponentAddStore: [CLASSNAME]AddStore,
    ComponentFactory: [CLASSNAME]Factory
} = initSuitsFromConfig([CLASSNAME]Currying,config[CLASSNAME]);

export {
    [CLASSNAME]Model,
    [CLASSNAME]StoresModel,
    [CLASSNAME],
    [CLASSNAME]HOC,
    [CLASSNAME]AddStore,
    [CLASSNAME]Factory
};

export interface I[CLASSNAME]Model extends Instance<typeof [CLASSNAME]Model> { }

// 定义版本号
declare const __VERSION__: string;
export const VERSION_[CLASSNAME] = __VERSION__;
