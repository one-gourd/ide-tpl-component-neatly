/* ----------------------------------------------------
    支持动态加载资源的入口文件，请勿更改当前文件名
----------------------------------------------------- */
import { mitt } from 'ide-lib-utils';

import { debugComp } from './lib/debug';
import { loadDependencies } from './deps';

// 动态引入类型，可以知道当前模块导出的变量（不包含 interface 等内容）
export type T[CLASSNAME] = typeof import('.'); // This is the import type!

const emitter = mitt();

// 简单的封装，用于动态加载
export const load[CLASSNAME] = () => {
  return import(/* webpackChunkName: "main" */ './index');
};

export const load[CLASSNAME]WithDeps = () => {
  return new Promise((resolve, reject) => {
    emitter.on('loaded:[CLASSNAME]', (e: { mainModule: T[CLASSNAME] }) => {
      resolve(e && e.mainModule);
    });
    emitter.on('noload:[CLASSNAME]', (e: { error: any }) => {
      reject(e && e.error);
    });
    return loadDependencies()
      .then(async result => {
        debugComp('[load[CLASSNAME] with deps] load result: ', result);
        const mainModule = await load[CLASSNAME]();
        emitter.emit('loaded:[CLASSNAME]', { mainModule });
      })
      .catch(err => {
        emitter.emit('noload:[CLASSNAME]', { error: err });
      });
  });
};
