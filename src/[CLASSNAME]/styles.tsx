import styled from 'styled-components';
// import { desaturate } from 'polished';
import { IBaseStyledProps } from 'ide-lib-base-component';
import { I[CLASSNAME]Props } from './index';

interface IStyledProps extends I[CLASSNAME]Props, IBaseStyledProps {}

export const StyledContainer = styled.div.attrs({
  style: (props: Partial<IStyledProps>) => props.style || {}  // 优先级会高一些，行内样式
})<IStyledProps>`
  display: ${(props: IStyledProps) => (props.visible ? 'block' : 'none')};
  border-radius: 5px;
  background: ${(props: IStyledProps) => props.theme.main};
  width: 100%;
  height: 200px;
  padding: 10px 20px;
`;

