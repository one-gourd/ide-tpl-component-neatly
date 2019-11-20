import Router from 'ette-router';
import { buildNormalResponse } from 'ide-lib-base-component';
import { createModel } from 'ide-lib-engine';

import { IContext } from './helper';
import { [CLASSNAME]Model } from '../../index';


export const router = new Router();

//__START:ROUTE
// 创新新的 model 
router.post('createModel', '/model', function (ctx: IContext) {
  const { stores, request } = ctx;
  const { model } = request.data;

  stores.setModel(createModel([CLASSNAME]Model, model));

  buildNormalResponse(ctx, 200, { success: true });
});

//__END:ROUTE