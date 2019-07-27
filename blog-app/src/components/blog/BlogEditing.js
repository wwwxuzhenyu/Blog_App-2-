import React, { Component } from 'react';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { Input } from 'antd';
import { Button } from 'antd';
import PubSub from 'pubsub-js';                        //引入PubSub
import { createHashHistory } from 'history';
import { connect } from 'react-redux'
import { editBlog } from '../../reducers/Blogs'

const history = createHashHistory();
//var ID=(new Date()).getTime()
var getblog


class BlogEditing extends Component {
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
        this.handleChange = this.handleChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
    }

    componentWillMount() {
        //console.log(this.props.blogs)
        var showindex = this.props.blogs.findIndex((value, index, arr) => {
            return (value.id == this.props.operateid)
        })
        //console.log(this.props.operateid)
        //console.log(showindex)  
        const Blogs = [...this.props.blogs]
        const Blog = Blogs[showindex]
        this.setState({ blog: Blog })
        //console.log(Blog)
    }
    /* 
        componentDidMount(){
            if(getblog){PubSub.unsubscribe(getblog)}
            getblog=PubSub.subscribe('BlogEdit',(msg,data)=>{
                console.log(data)
                this.setState({
                    title:data.title,
                    description:data.description,
                    content:data.content,
                    id:data.id
                })
            })
            PubSub.publish('EditSign',true)
        }
    */
    handleChange(value) {
        this.setState({ blog: { ...this.state.blog, content: value } })
    }

    handleTitleChange(e) {
        this.setState({ blog: { ...this.state.blog, title: e.target.value } })                    //onChange函数返回一个对象，因此要先将它取value
    }

    handleDescriptionChange(e) {
        this.setState({ blog: { ...this.state.blog, description: e.target.value } })              //onChange函数返回一个对象，因此要先将它取value
    }
    /*
        BlogSubmit() {
             
            if (this.state.title&&this.state.description) {
               
                const blog = {
                    id:this.state.id,
                    title: this.state.title,
                    content: this.state.content,
                    description: this.state.description,
                    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                   // href: '/#/BlogShow',
                }
                PubSub.publish('BlogEdited', blog)
    
                history.push('/BlogOperate')
            }
            else if(!this.state.title){
                alert("标题不能为空！")
            }
            else{
                alert("概要内容不能为空！")
            }
        
        console.log(this.state)
        }*/

    BlogSubmit() {

        if (this.state.blog.title && this.state.blog.description) {

            const blog = {
                id: this.state.blog.id,
                title: this.state.blog.title,
                content: this.state.blog.content,
                description: this.state.blog.description,
                avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
                comments: this.state.blog.comments
                // href: '/#/BlogShow',
            }
            this.props.editBlog(blog)
            const Blogs = [...this.props.blogs]
            localStorage.setItem('Blogs', JSON.stringify(Blogs))
            alert("操作成功!")
            history.push('/BlogList')
        }
        else if (!this.state.blog.title) {
            alert("标题不能为空！")
        }
        else {
            alert("概要内容不能为空！")
        }

        console.log(this.state)
    }

    render() {
        return (
            <div>
                <p>请输入标题</p>
                <Input placeholder="标题"
                    value={this.state.blog.title}
                    onChange={this.handleTitleChange}></Input>
                <br />
                <br />
                <p>请输入概要</p>
                <Input placeholder="概要"
                    value={this.state.blog.description}
                    onChange={this.handleDescriptionChange}></Input>
                <br />
                <br />
                <p>请输入博客内容</p>
                <ReactQuill value={this.state.blog.content}
                    onChange={this.handleChange} />
                <br />
                <Button type="primary"
                    onClick={this.BlogSubmit.bind(this)}>
                    提交
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        operateid: state.operateid
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editBlog: (blog) => {
            dispatch(editBlog(blog))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BlogEditing)