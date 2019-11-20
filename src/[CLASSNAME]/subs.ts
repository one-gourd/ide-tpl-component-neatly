import { ValueOf, getSubRouterPrefix } from 'ide-lib-base-component';
import { IComponentConfig } from 'ide-lib-engine';

//__START:IMPORT_SUB
//__END:IMPORT_SUB


//__START:IMPORT_SOLUTION
//__END:IMPORT_SOLUTION


export interface ISubProps {
  //__START:SUB_PROP
  //__END:SUB_PROP
}

// component: 子组件属性列表
export const subComponents: Record<
  keyof ISubProps,
  IComponentConfig<ValueOf<ISubProps>, any>
> = {
  //__START:SUB_CONFIGS
  //__END:SUB_CONFIGS
};



// 获取子组件名映射表，即: {headerBar: "headerBar"}
export const ESubAppNames: { [key: string]: string } = {};
for (const name in subComponents) {
  if (subComponents.hasOwnProperty(name)) {
    ESubAppNames[name] = (subComponents as any)[name].namedAs
  }
}

