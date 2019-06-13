import React, { useCallback } from 'react';
import { Button } from 'antd';
import { IBaseTheme, IBaseComponentProps } from 'ide-lib-base-component';

import { TComponentCurrying } from 'ide-lib-engine';

import { StyledContainer } from './styles';
import { ISubProps } from './subs';

export interface I[CLASSNAME]Event {
  /**
   * 点击回调函数
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
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
  /**
   * 是否展现
   */
  visible?: boolean;

  /**
   * 文案
   */
  text?: string;
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
    visible, text, styles, onClick } = props;
  
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
