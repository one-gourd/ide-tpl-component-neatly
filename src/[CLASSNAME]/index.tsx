import React, { useCallback } from 'react';
import { Button } from 'antd';
import { IBaseTheme, IBaseComponentProps } from 'ide-lib-base-component';

import { TComponentCurrying } from 'ide-lib-engine';

import { StyledContainer } from './styles';
import { ISubProps } from './subs';

//__START:MODS
//__END:MODS


export interface I[CLASSNAME]Event {
  //__START:EVENTS
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // 点击回调函数
  //__END:EVENTS
}

// export interface I[CLASSNAME]Styles extends IBaseStyles {
//   container?: React.CSSProperties;
// }

export interface I[CLASSNAME]Theme extends IBaseTheme {
  main: string;
}

export interface I[CLASSNAME]Props
  extends I[CLASSNAME]Event,
  ISubProps,
  IBaseComponentProps {

  //__START:PROPS
  visible?: boolean; // 是否展现

  text?: string; // 文案
  //__END:PROPS
}

export const DEFAULT_PROPS: I[CLASSNAME]Props = {
  visible: true,
  theme: {
    main: '#25ab68'
  },
  [SUBCOMP_START]
  headerBar: {
    buttons: [
      {
        id: 'edit',
        title: '编辑',
        icon: 'edit'
      }
    ]
  },
  [SUBCOMP_END]
  styles: {
    container: {}
  }
};

export const [CLASSNAME]Currying: TComponentCurrying<
  I[CLASSNAME]Props,
  ISubProps
> = subComponents => props => {
  const { 
    [SUBCOMP_START]
    headerBar, 
    [SUBCOMP_END]
    styles,
    //__START:USE_PROP
    visible,
    text,
    onClick,
    //__END:USE_PROP
     } = props;
  
  [SUBCOMP_START]
  const { HeaderBar } = subComponents as Record<
    string,
    React.FunctionComponent<typeof props>
  >;
  [SUBCOMP_END]


  const onClickButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick && onClick(e);
    },
    [onClick]
  );

  return (
    <StyledContainer
      style={styles.container}
      visible={visible}
      // ref={this.root}
      className="[NAME]-container"
    >
      <Button onClick={onClickButton}>{text || '点我试试'}</Button>
    [SUBCOMP_START]
      <HeaderBar {...headerBar} />
    [SUBCOMP_END]
    </StyledContainer>
  );
};
