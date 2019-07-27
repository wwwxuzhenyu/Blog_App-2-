import React, { Component } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';


class CommentApp extends Component {
    /*  
        constructor(){
            super();
            this.state={
                comments:[]
            }
        }
    */
    static defaultProps = {
        comments: []
    }
    /*    
        componentWillMount(){                                                    //开始挂载时加载评论
            this._loadComments()
        }
     
        _loadComments(){                                                          //从localstorage当中加载评论
            let comments=localStorage.getItem('comments')
            if(comments){
                comments=JSON.parse(comments)
                this.setState({comments})
            }
        }
    
        _saveComments(comments){                                                   //把评论保存到localstorage当中
            localStorage.setItem('comments',JSON.stringify(comments))
        }
        
        handleSummitComment(comment){
            if (!comment) return
            if (!comment.username) return alert('请输入用户名')
            if (!comment.content) return alert('请输入评论内容')
            const comments=this.state.comments
            comments.push(comment)
            this.setState({comments})
            this._saveComments(comments)
        }
        
        handleDeleteComment(index){
            console.log(index)
            const comments= this.state.comments
            comments.splice(index,1)                                           //删除序号为index的一条评论
            this.setState({comments})
            this._saveComments(comments)
        }
    */
    handleDeleteComment(index) {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index)
        }
    }

    handleSummitComment(comment) {
        if (this.props.onSummitComment) {
            this.props.onSummitComment(comment)
        }
        else{console.log('error(2)!')}
    }

    render() {
        return (
            <div className='wrapper'>
                <CommentList comments={this.props.comments}
                    onDeleteComment={this.handleDeleteComment.bind(this)} />
                <CommentInput
                    onSubmit={this.handleSummitComment.bind(this)} />

            </div>
        )
    }

}

export default CommentApp