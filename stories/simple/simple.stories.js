import React from 'react';
import { storiesOf } from '@storybook/react';
import { wInfo } from '../../.storybook/utils';

import { [CLASSNAME], [CLASSNAME]Factory } from '../../src/';
import mdMobx from './simple-mobx.md';
import mdPlain from './simple-plain.md';

const propsNormal = {
  visible: true,
  text: ''
};
const {
  ComponentWithStore: [CLASSNAME]WithStore,
  client
} = [CLASSNAME]Factory();

function onClick(value) {
  console.log('当前值：', value);
}

const clickBtn = isClient => () => {
  if (isClient) {
    client.put(`/model`, {
      name: 'text',
      value: `gggg${Math.random()}`.slice(0, 8)
    });
  } else {
    propsNormal.text = 'hello world';
  }
};

function onClickWithStore() {
  [SUBCOMP_START]
  client.put('/alias/blockbar', {
    name: 'logo',
    value: 'https://git-scm.com/images/logos/downloads/Git-Logo-2Color.png'
  });
  [SUBCOMP_END]
}

storiesOf('基础使用', module)
  .addParameters(wInfo(mdMobx))
  .addWithJSX('使用 mobx 化的 props', () => {
    return (
      <div>
        <button onClick={clickBtn(true)}>更改文案（会响应）</button>
        <[CLASSNAME]WithStore onClick={onClickWithStore} />
      </div>
    );
  })
  .addParameters(wInfo(mdPlain))
  .addWithJSX('普通 props 对象', () => (
    <div>
      <button onClick={clickBtn(false)}>更改文案（不会响应）</button>
      <[CLASSNAME] {...propsNormal} onClick={onClick} />
    </div>
  ));
