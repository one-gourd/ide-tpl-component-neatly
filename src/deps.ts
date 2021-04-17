/* ----------------------------------------------------
    支持动态加载资源的入口文件，请勿更改当前文件名
----------------------------------------------------- */
import { loadScriptsQueue, IScriptsLoadResult, loadScript } from 'ide-lib-utils';
let lastLoadResult: IScriptsLoadResult = {};

const UNPKG_DOMAIN = 'unpkg.com';
const getUnpkgPath = (name: string, version?: string, midPath?: string, fileName = 'index.umd.js') => {
    const middlePath = midPath || 'dist';
    return !version ? `//${UNPKG_DOMAIN}/${name}/${middlePath}/${fileName}` : `//${UNPKG_DOMAIN}/${name}@${version}/${middlePath}/${fileName}`;
};
// export const BASEURL = '//dev.g.alicdn.com/lf/lf-canvas-assets/0.1.6/externaljs/';

declare const __PUBLIC_PATH__: string;
declare global {
    interface Window {
        lf[CLASSNAME]: any;
    }
}

const URL_INSTANCE_TREE = __PUBLIC_PATH__ + `index.dynamic.umd.js`;

export const dependScripts = [
    {
        name: 'Ette',
        path: getUnpkgPath('ette'),
    },
    {
        name: 'mobx',
        path: getUnpkgPath('mobx', '4.6.0', 'lib', 'mobx.umd.min.js')
    },
    {
        name: 'styled',
        path: getUnpkgPath('styled-components', '4.1.3', null, 'styled-components.min.js')
    },
    {
        name: 'ideLibUtils',
        path: getUnpkgPath('ide-lib-utils')
    },
    {
        name: 'ssTree',
        path: getUnpkgPath('ss-tree')
    },
    {
        name: 'mobxStateTree',
        path: getUnpkgPath('mobx-state-tree', '3.14.1', null, 'mobx-state-tree.umd.min.js'),
        deps: 'mobx'
    },
    {
        name: 'mobxReact',
        path: getUnpkgPath('mobx-react-lite', '1.0.1', null, 'index.min.js'),
        deps: 'mobx'
    },
    {
        name: 'etteRouter',
        path: getUnpkgPath('ette-router'),
        deps: 'ette'
    },
    {
        name: 'etteProxy',
        path: getUnpkgPath('ette-proxy'),
        deps: 'ette'
    },
    {
        name: 'ideBaseComponent',
        path: getUnpkgPath('ide-lib-base-component'),
        deps: ['mobx', 'styled', 'etteProxy', 'etteRouter']
    },
    // 第二优先级
    {
        name: 'ideModelUtils',
        path: getUnpkgPath('ide-model-utils'),
        deps: ['ideBaseComponent']
    },
    {
        name: 'ideLibEngine',
        path: getUnpkgPath('ide-lib-engine'),
        deps: ['ideModelUtils', 'ideBaseComponent']
    }
]

// 动态加载依赖资源
export const loadDependencies = () => loadScriptsQueue(dependScripts, {
    lastLoadResult
});


// 支持从 CDN 上动态加载组件
export const load[CLASSNAME]FromCDN = () => {
    if (window.lf[CLASSNAME]) {
        const { loadDependencies } = window.lf[CLASSNAME];
        return loadDependencies()
            /* STEP 1: 加载主体 index.dynamic 文件 */
            .then(() => loadScript(URL_INSTANCE_TREE))
            .then(() => {
                if (window.lf[CLASSNAME].load[CLASSNAME]) {
                    return window.lf[CLASSNAME].load[CLASSNAME]()
                } else {
                    throw new Error('[[CLASSNAME]] dynamic load from cdn error');
                }
            });
    }
}
