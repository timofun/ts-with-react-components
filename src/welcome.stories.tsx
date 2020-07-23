import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module)
  .add('welcome', () => {
    return (
      <>
        <h1>欢迎来到 funs-react-ui 组件库</h1>
        <p>funs-react-ui 是一个基于react-hooks-ts的组件库，为了更好地学习react开发</p>
        <h3>安装试试</h3>
        <code>
          npm install funs-react-ui --save
        </code>
      </>
    )
  }, { info : { disable: true }})
