import Router from 'ette-router';
import {  buildNormalResponse } from 'ide-lib-base-component';


import { IContext } from './helper';

export const router = new Router();
//__START:ROUTE
// 可以通过 filter 返回指定的属性值
// 比如 /nodes?filter=name,screenId ，返回的集合只有这两个属性
router.get('getModelInstance', '/model', function (ctx: IContext) {
  const { stores, request } = ctx;
  const { query } = request;
  const filterArray = query && query.filter && query.filter.trim().split(',');
  [SUBCOMP_START]
  // const schemaTreeClient = getClientFromCtx(ctx, ESubApps.schemaTree); // 获取子 client
  [SUBCOMP_END]
  buildNormalResponse(ctx, 200, { attributes: stores.model.allAttibuteWithFilter(filterArray) });
});

//__END:ROUTE