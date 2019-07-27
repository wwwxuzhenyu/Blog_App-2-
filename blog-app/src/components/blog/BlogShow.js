import React, { Component } from 'react';
//import PubSub from 'pubsub-js';
import { Button } from 'antd';
import { createHashHistory } from 'history';
import CommentApp from '../../CommentApp.js';
import { connect } from 'react-redux';
import { deleteBlog } from '../../reducers/Blogs';
import { operateComment } from '../../reducers/Blogs';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const history = createHashHistory();
//var Blogshow
var BlogEditSign


class BlogShow extends Component {
    constructor() {
        super()
        this.state = {
            blog: {
                id: 0,
                title: '0',
                description: '0',
                content: '0',
                comments: [],
                avatar: '0'
            }
        }
    }
    /*
    componentWillMount() {
        if (Blogshow) { PubSub.unsubscribe(Blogshow) }
        Blogshow = PubSub.subscribe('BlogShow', (msg, data) => {
            this.setState({
                blog: {
                    title: data.title,
                    description: data.description,
                    content: data.content,
                    id: data.id
                }
            })

        })
        PubSub.publish('BlogShowSign', true)
    }
    */

    componentWillMount() {
        var showindex = this.props.blogs.findIndex((value, index, arr) => {
            return (value.id == this.props.operateid)
        })
        const Blogs = [...this.props.blogs]
        const Blog = Blogs[showindex]
        this.setState({ blog: Blog })
        /*
          this.setState({
            blog:{
                id:Blog.id,
                title:Blog.title,
                description:Blog.description,
                content:Blog.content,
                comments:Blog.comments
            }
        })
        */
        console.log(this.props.blogs)
    }


    /*                            //*************************************************** 昨天写到这，博客的删除
        BlogDelete(){
            PubSub.publish('BlogDelete',true)
            history.push('/BlogOperate')
        }
    */

    BlogDelete() {
        /* 
        this.props.deleteBlog(blog.id)
        const { blogs } = this.props
        var deleteid = blogs.findIndex((value, index, arr) => {
            return (value.id == blog.id)
          })
        const newBlogs = [...blogs.splice(deleteid, 1)]
        localStorage.setItem('Blogs', newBlogs)
        history.push('/BlogList')
        */
        confirmAlert({
            title: 'Confirm to delete',
            message: '确定删除博客？',
            buttons: [
                {
                    label: '确定',
                    onClick: () => {
                        this.props.deleteBlog(this.props.operateid)

                        const Blogs = [...this.props.blogs]
                        localStorage.setItem('Blogs', JSON.stringify(Blogs))

                        alert('操作成功')
                        history.push('/BlogList')
                    }
                },
                {
                    label: '再想想'

                }
            ]
        })

    }
    /* 
        BlogEdit() {
            var EditBlog = {
                id: this.state.blog.id,
                title: this.state.blog.title,
                description: this.state.blog.description,
                content: this.state.blog.content
            }
            if (BlogEditSign) { PubSub.unsubscribe(BlogEditSign) }
            BlogEditSign = PubSub.subscribe('EditSign', (msg, data) => {
                if (data) {
                    console.log(data)
                    PubSub.publish('BlogEdit', EditBlog)
                    console.log(EditBlog)
                }
            })
            history.push('/BlogEditing')
        }
    */

    BlogEdit() {
        history.push('/BlogEditing')
    }

    //*********************************************评论功能函数************************************************** 
    handleDeleteComment(index) {
        console.log(index)
        const comments = this.state.blog.comments
        comments.splice(index, 1)                                           //删除序号为index的一条评论
        this.setState({ comments })
        const blog = this.state.blog
        this.props.operateComment(blog)
        const Blogs = [...this.props.blogs]
        localStorage.setItem('Blogs', JSON.stringify(Blogs))
        //this._saveComments(comments)*/
    }



    handleSummitComment(comment) {
        if (!comment) return
        if (!comment.username) return alert('请输入用户名')
        if (!comment.content) return alert('请输入评论内容')
        const Comments = this.state.blog.comments
        Comments.push(comment)
        this.setState({ comments: Comments })
        console.log(Comments)
        const blog = this.state.blog
        this.props.operateComment(blog)
        const Blogs = [...this.props.blogs]
        localStorage.setItem('Blogs', JSON.stringify(Blogs))
        //this._saveComments(comments)
    }

    render() {
        return (
            <div className="blogshow">
                <div className="blogshow-title">{this.state.blog.title}</div>
                <div className="blogshow-description">{this.state.blog.description}</div>
                <div
                    className='blogshow-content'
                    dangerouslySetInnerHTML={{ __html: this.state.blog.content }} />
                <div className="wrapped-buttons">
                    <Button onClick={this.BlogEdit.bind(this)} type="dashed">编辑</Button>&nbsp;&nbsp;
                    <Button onClick={this.BlogDelete.bind(this)} type="danger" ghost>删除</Button>
                </div>
                <CommentApp comments={this.state.blog.comments}
                    onDeleteComment={this.handleDeleteComment.bind(this)}
                    onSummitComment={this.handleSummitComment.bind(this)}></CommentApp>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        operateid: state.operateid[0]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteBlog: (blogId) => {
            dispatch(deleteBlog(blogId))
        },
        operateComment: (blog) => {
            dispatch(operateComment(blog))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogShow)