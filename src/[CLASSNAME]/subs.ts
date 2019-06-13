import { ValueOf, getSubRouterPrefix } from 'ide-lib-base-component';
import { IComponentConfig } from 'ide-lib-engine';

[SUBCOMP_START]
import {
  HeaderBar,
  Stores as HeaderBarStores,
  HeaderBarAddStore,
  IHeaderBarProps,
  DEFAULT_PROPS as DEFAULT_PROPS_HEADER_BAR,
  HeaderBarFactory
} from 'ide-header-bar';
[SUBCOMP_END]


export interface ISubProps {
  [SUBCOMP_START]
  headerBar?: IHeaderBarProps;
  [SUBCOMP_END]
}

// component: 子组件属性列表
export const subComponents: Record<
  keyof ISubProps,
  IComponentConfig<ValueOf<ISubProps>, any>
> = {
  [SUBCOMP_START]
  headerBar: {
    className: 'HeaderBar',
    namedAs: 'headerBar',
    defaultProps: DEFAULT_PROPS_HEADER_BAR,
    normal: HeaderBar,
    addStore: HeaderBarAddStore,
    storesModel: HeaderBarStores,
    factory: HeaderBarFactory,
    routeScope: ['headerbar'] // 能通过父组件访问到的路径
  }
  [SUBCOMP_END]
};



[SUBCOMP_START]
// 获取子组件名映射表，即: {headerBar: "headerBar"}
export const ESubAppNames: { [key: string]: string } = {};
for (const name in subComponents) {
  if (subComponents.hasOwnProperty(name)) {
    ESubAppNames[name] = (subComponents as any)[name].namedAs
  }
}
[SUBCOMP_END]

