import { IContext as IEtteContext } from 'ette';
import { IStoresModel } from 'ide-lib-engine';
[SUBCOMP_START]
import { IAliasRoute } from 'ide-lib-base-component';
[SUBCOMP_END]
export interface IContext extends IEtteContext{
  stores: IStoresModel;
  [propName: string]: any;
}


[SUBCOMP_START]
// 路由提升配置表
export const routerHoistTable: IAliasRoute[] = [
  alias: 'bar',
  routerNames: 'headerBar'
];

// 根据路由提升配置表生成路由路径映射表
// ROUTER_MAP : {schemaTree: '/schemaTree'}
export const ROUTER_MAP: { [key: string]: string } = {};
routerHoistTable.forEach((item: IAliasRoute) => {
  const { alias } = item;
  ROUTER_MAP[alias] = `/${alias}`;
});
[SUBCOMP_END]