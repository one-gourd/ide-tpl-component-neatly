import { types } from 'mobx-state-tree';
import {
  BASE_CONTROLLED_KEYS, JSONModel,
  EMPTY_JSON_SNAPSHOT } from 'ide-lib-base-component';

import { IStoresModel, IModuleConfig } from 'ide-lib-engine';
import { DEFAULT_PROPS, I[CLASSNAME]Props } from '.';
import { modelSolutions } from './solution/model';

import { subComponents, ISubProps } from './subs';

import {
  otherControlledKeyMap,
  mergeRule
} from './model/index';

import { modelRouters } from './router/index';

[SUBCOMP_START]
import { routerHoistTable } from './router/helper';
[SUBCOMP_END]

export const config[CLASSNAME]: IModuleConfig<I[CLASSNAME]Props, ISubProps> = {
  component: {
    className: '[CLASSNAME]',
    solution: modelSolutions,
    defaultProps: DEFAULT_PROPS,
    mergeRule,
    children: subComponents
  },
  router: {
    domain: '[DEBUGNAME]',
    list: modelRouters,
    [SUBCOMP_START]
    hoistRoutes: {
      alias: 'bar',
      routerNames: 'headerBar'
    }, // 提升访问子路由功能，相当于是强约束化的 alias
    aliases: {
      alias: 'blockbar',
      path: 'bar/headerbar'
    } // 自定义的路由别名规则
    [SUBCOMP_END]
  },
  store: {
    idPrefix: '[IDPREFIX]'
  },
  model: {
    controlledKeys: [], // 后续再初始化
    otherControlledKeyMap,
    props: {
      //__START:PROPS
      visible: types.optional(types.boolean, true),
      text: types.optional(types.string, ''),
      //__END:PROPS
      urlConfig: types.optional(JSONModel, EMPTY_JSON_SNAPSHOT)
      // language: types.optional(
      //   types.enumeration('Type', CODE_LANGUAGES),
      //   ECodeLanguage.JS
      // ),
      // children: types.array(types.late((): IAnyModelType => SchemaModel)) // 在 mst v3 中， `types.array` 默认值就是 `[]`
      // options: types.map(types.union(types.boolean, types.string))
      // 在 mst v3 中， `types.map` 默认值就是 `{}`
    }
  }
};

// 枚举受 store 控制的 key，一般来自 config.model.props 中 key
// 当然也可以自己枚举
export const SELF_CONTROLLED_KEYS = Object.keys(config[CLASSNAME].model.props); // ['visible', 'text']

export const CONTROLLED_KEYS = BASE_CONTROLLED_KEYS.concat(
  SELF_CONTROLLED_KEYS
);

// 初始化 controlledKeys
config[CLASSNAME].model.controlledKeys = CONTROLLED_KEYS;
