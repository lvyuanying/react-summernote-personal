import React, { Component } from 'react'
import ReactSummernote from './react-summernote'
import styles from './react-summernote.less'
import './summernote-zh-CN'


// // Import bootstrap(v3 or v4) dependencies
import './modal';
import './dropdown';
import './tooltip'
import './bootstrap.css'

class RichTextEditor extends Component {
  constructor(props) {
    super(props)
    this.summernote = React.createRef()
  }

  state = {
    value: ''
  }

  text = ''

  componentDidMount() {
    this.setState({
      value: this.props.value
    })
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.value != this.props.value) {
      this.setState({
        value: nextProps.value
      })
    }
  }

  // setValue = (val) => {
  //   this.text = val
  //   this.setState({
  //     value: val
  //   })
  // }

  // // onChange = (content) => {
  // //   this.text = content
  // //   this.props.onChange(this.text)
  // //   // this.setState({
  // //   //   value: content
  // //   // })
  // // }

  // // getContext = () => {
  // //   return this.text
  // // }

  onImageUpload = (files) => {
    var $files = $(files);
    let that = this
    $files.each(async function(){
        var file = this
        let res = await that.props.getToken()
        const url = that.props.action
        let _form = new FormData()
        _form.append(`file`, file)
        _form.append('token', res.data.token)

        let response = await fetch(url, {
            method: 'POST',
            body: _form
        })
        let result = await response.json()
        
        let imgNode = new Image()
        imgNode.src = result[that.props.responseKey] || result.url
        that.summernote.current.insertNode(imgNode)
    })
  }

  render() {
    return (
      <ReactSummernote
        ref={this.summernote}
        value={ this.state.value }
        options={{
          lang: 'zh-CN',
          height: 350,
          dialogsInBody: true,
          toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview']]
          ]
        }}
        onChange={this.props.onChange}
        onImageUpload={this.onImageUpload}
      />
    );
  }
}

export default RichTextEditor