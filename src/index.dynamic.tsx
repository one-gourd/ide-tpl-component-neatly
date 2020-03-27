/* ----------------------------------------------------
    支持动态加载资源的入口文件，请勿更改当前文件名
----------------------------------------------------- */
import {
  loadScriptsQueue,
  IScriptsLoadResult,
  mitt
} from 'ide-lib-utils';

import { dependScripts } from './deps';

// let mainModuleOrNull: IPlainObject = {};
let lastLoadResult: IScriptsLoadResult = {};

// 动态引入类型，可以知道当前模块导出的变量（不包含 interface 等内容）
export type T[CLASSNAME] = typeof import('.'); // This is the import type!

// export interface  extends typeof import('./mainModule') {};
export type ModuleLoadedHandler = (mainModule: T[CLASSNAME]) => void;

const emitter = mitt();

export const load[CLASSNAME] = () => {
  const promise = new Promise((resolve, reject) => {
    emitter.on('loaded:[CLASSNAME]', (e: { mainModule: T[CLASSNAME] }) => {
      resolve(e && e.mainModule);
    });

    emitter.on('noload:[CLASSNAME]', (e: { error: any }) => {
      reject(e && e.error);
    });
  });

  console.log('Start loading [CLASSNAME] Module...');

  loadScriptsQueue(dependScripts, {
    lastLoadResult
  })
    .then(result => {
      console.log('load result: ', result);
      // 再动态加载组件
      import(/* webpackChunkName: "main" */ './index').then(
        mainModule => {
          emitter.emit('loaded:[CLASSNAME]', { mainModule });
        }
      );
    })
    .catch(err => {
      emitter.emit('noload:[CLASSNAME]', { error: err });
    });

  return promise;
};



