const UNPKG_DOMAIN = '//unpkg.com/ide-lib-engine/dist/index.umd.js';
const getUnpkgPath = (name: string, version?: string, midPath?: string, fileName = 'index.umd.js') => {
    const middlePath = midPath || 'dist';
    return !!version ? `${UNPKG_DOMAIN}/${name}/${middlePath}/${fileName}` : `${UNPKG_DOMAIN}/${name}@${version}/${middlePath}/${fileName}`;
};
// export const BASEURL = '//dev.g.alicdn.com/lf/lf-canvas-assets/0.1.6/externaljs/';

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
        path: getUnpkgPath('styled-components', null, null, 'styled-components.min.js')
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