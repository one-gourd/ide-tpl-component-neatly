import Router from 'ette-router';
import { updateStylesMiddleware, updateThemeMiddleware, buildNormalResponse, updateCStateMiddleware } from 'ide-lib-base-component';
import { mergeWithLevel } from 'ide-lib-utils';


import { IContext } from './helper';
import { otherControlledKeyMap, mergeRule } from '../model/index';

export const router = new Router();

//__START:ROUTE
// 更新单项属性
router.put('updateModel', '/model', function(ctx: IContext) {
  const { stores, request } = ctx;
  const { name, value } = request.data;

  //   stores.setSchema(createSchemaModel(schema));
  const originValue = stores.model[name];

  // 如果是有 mergeRule 的属性，需要额外的操作
  let pickedOrigin: { [key: string]: any } = {};
  let targetValue = value;
  if (otherControlledKeyMap[name]) {
    // 为 0 表示全部
    if (otherControlledKeyMap[name].length === 0) {
      pickedOrigin = originValue;
    } else {
      otherControlledKeyMap[name].forEach((keyName: string) => {
        pickedOrigin[keyName] = originValue[keyName];
      });
    }
  }
  // 是否有对应的 merge 规则
  if (mergeRule[name]) {
    targetValue = mergeWithLevel(pickedOrigin, value, mergeRule[name].level);
  }

  const isSuccess = stores.model.updateAttribute(name, targetValue);

  buildNormalResponse(ctx, 200, { success: isSuccess, origin: originValue }, `属性 ${name} 的值从 ${originValue} -> ${value} 的变更: ${isSuccess}`);
});
//__END:ROUTE

// 更新 cstate 属性
router.put('updateCstate', '/model/cstate', updateCStateMiddleware);


// 更新 css 属性
router.put('updateStyles', '/model/styles/:target', updateStylesMiddleware('model'));


// 更新 theme 属性
router.put('updateTheme', '/model/theme/:target', updateThemeMiddleware('model'));
