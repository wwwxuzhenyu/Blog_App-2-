import React, { Component } from 'react'
import { Button } from 'antd';
import "antd/dist/antd.css";
import { Input } from 'antd';
import PropTypes from 'prop-types'

class CommentInput extends Component {
    
    static propTypes={                                    //限定上传到组件的一定是一个函数
        onSubmit : PropTypes.func
    }
    
    handleUsernameChange(event){
        this.setState({
            username: event.target.value,
        })           
    }
    
    handleContentChange(event){
        this.setState({
            content: event.target.value,
        })
    }
    
    handleSubmit(){
        if(this.props.onSubmit){
            this.props.onSubmit({
                username:this.state.username,
                content:this.state.content,
                createdTime:+new Date()
                
            })
            console.log('1')
        }
        this.setState({content:''})
    }

    constructor(){
        super();
        this.state={
            username:'',
            content:''
        }
    }
    
    componentWillMount(){
        this._loadUsername()
    }

    _loadUsername(){
        const username= localStorage.getItem('username')
        if(username){
            this.setState({username})
        }
    }
    
    componentDidMount(){
        this.TextArea.focus()
    }

    handleUsernameBlur(event){
        this._saveUsername(event.target.value)
    }

    _saveUsername(username){
        localStorage.setItem('username',username)
    }

    render() {
        const { TextArea } = Input;
        return (
            <div className='comment-input'>
                
                <div className='comment-field'>
                    
                    <span className='comment-field-name'>用户名：</span>
                    
                    <div className='comment-field-input'>
                        <Input placeholder="用户名" 
                         value={this.state.username}
                         onChange={this.handleUsernameChange.bind(this)}
                         onBlur={this.handleUsernameBlur.bind(this)} />
                    </div>

                </div>
                <div className='comment-field'>
                    
                    <span className='comment-field-name'>评论内容：</span>
                    
                    <div className='comment-field-input'>
                        <TextArea 
                         rows={8} placeholder="请输入评论" 
                         value={this.state.content}
                         onChange={this.handleContentChange.bind(this)}
                         ref={(TextArea)=>this.TextArea=TextArea} />
                    </div>
                    
                </div>
                <div className='comment-field-button'>
                    <Button type="primary"
                            onClick={this.handleSubmit.bind(this)}>
                        发布
                    </Button>
                </div>

            </div>
        )
    }
}

export default CommentInput