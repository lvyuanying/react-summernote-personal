import React from 'react'
import { render } from 'react-dom'
// import ReactSummernote from '../../src/index.jsx' // 引入组件
import ReactSummernote from 'react-summernote-personal'

const App = () => <ReactSummernote />
render(<App />, document.getElementById('root'))