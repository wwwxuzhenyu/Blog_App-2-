import React, { Component } from 'react';
import { List, Avatar, Icon } from 'antd';
import { Button } from 'antd';
import { createHashHistory } from 'history';
import PubSub from 'pubsub-js';                        //引入PubSub
import axios from 'axios'
import { connect } from 'react-redux'
import { initBlogs, operateId } from '../../reducers/Blogs'


const history = createHashHistory();
var listData = [];                             //暂时注掉
var BlogDelete
var BlogEdit
var BlogShowSign
/*
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}


*/
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
var subscr;

class BlogList extends Component {
  constructor() {
    super()

  }
  /*                    //原始数据
    static defaultProps = {
      listData: [ {href: 'http://ant.design',
      title: `ant design part `,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'}]
    }
  */

  componentWillMount() {
    /* 
    if (subscr) { PubSub.unsubscribe(subscr) }
    subscr = PubSub.subscribe('BlogItem', (msg, data) => {
      //console.log(data)
      
      listData.push(data)
      console.log(listData)
      this._saveBlogs(listData)
      this._loadBlogs()                               //第一次写博客可以立即渲染
      
     this.SaveBlogs(data)
    })
    */
    //this._loadBlogs()                               //切换页面仍然可以显示(静态页面)
    //this.LoadBlogs()                                //动态页面
    //localStorage.removeItem('Blogs')
    this._loadBlogs()                                 //redux
  }
  /*
    _loadBlogs() {                                //*****************静态页面***************** 从localstorage当中加载博客
      let blogs = localStorage.getItem('Blogs')
      if (blogs) {
        blogs = JSON.parse(blogs)
        this.setState({ ListData: blogs })
        //console.log(blogs)
      }
    }
  */

  _loadBlogs() {                                   //*******************redux重构*********************
    let blogs = localStorage.getItem('Blogs')
    blogs = blogs ? JSON.parse(blogs) : []
    this.props.initBlogs(blogs)
  }

  /* 
    _saveBlogs(blogs) {                                  //把博客保存到localstorage当中
      localStorage.setItem('Blogs', JSON.stringify(blogs))
      console.log(localStorage.Blogs)
    } 
  */

  //*************************************************从后台加载博客******************************************************* 

  /*   
    LoadBlogs(){                          //*****************************动态从后台加载列表********************************
      axios.get('https://www.easy-mock.com/mock/5d380f53f4fa30393e8b8a72/login/getList')
           .then(res=>{
             this.setState({ListData : res.data.data.data})
           })
    }
  
    SaveBlogs(blogs){                      //********************写博客组件动态从后台加载写博客后的列表***********************
      axios.post("https://www.easy-mock.com/mock/5d380f53f4fa30393e8b8a72/login/Add",
      {params:blogs})
          .then(res=>{
            this.setState({ListData : res.data.data.data})
          })
    }
  
  */

  handleBlogWriting() {
    //PubSub.publish('ID',this.state.ListData.length)
    history.push('/BlogWriting')
  }
  /*
    handleBlogShow(item) {
      var BlogItem = {
        id: item.id,
        title: item.title,
        description: item.description,
        content: item.content
      }
      var deleteid = 0
      var editid = 0                                            //*********************************************报错问题还没解决 
      if(BlogShowSign){PubSub.unsubscribe(BlogShowSign)}        
      BlogShowSign=PubSub.subscribe('BlogShowSign',(msg,data)=>{
              if(data){
                PubSub.publish('BlogShow', BlogItem)
              }
          })
      history.push('/BlogShow')
      console.log(item.id)
      if (BlogDelete) { PubSub.unsubscribe(BlogDelete) }
      BlogDelete = PubSub.subscribe('BlogDelete', (msg, data) => {
        if (data) {
          listData = this.state.ListData
          deleteid = listData.findIndex((value, index, arr) => {
            return (value.id == item.id)
          })                          //****这里要改****
          //console.log(deleteid)
          listData.splice(deleteid, 1)
          //console.log(listData)
  
          //this.setState({ ListData: listData })          //在页面未渲染时setstage会报错
          this._saveBlogs(listData)
          //console.log(localStorage.Blogs)
          //this._loadBlogs()                              //在页面未渲染时setstage会报错
        }
      })
   */
  
//****************************************    redux 重构    ********************************************* 

  handleBlogShow(item) {
    this.props.operateId(item.id)
    history.push('/BlogShow')
  }


  //*************************************静态页面用pubsub编辑博客*******************************************
  /* 
  
      if (BlogEdit) { PubSub.unsubscribe(BlogEdit) }
      BlogEdit = PubSub.subscribe('BlogEdited', (msg, data) => {
          listData = this.state.ListData
          editid = listData.findIndex((value, index, arr) => {
            return (value.id == data.id)
          })
          //console.log(deleteid)
          listData.splice(editid, 1, data)
          //console.log(listData)
  
          //this.setState({ ListData: listData })     //在页面未渲染时setstage会报错
          this._saveBlogs(listData)
          //console.log(localStorage.Blogs)
          //this._loadBlogs()                         //在页面未渲染时setstage会报错
        }
      )}
  */


render() {
  return (
    <div>
      <Button type="primary" onClick={this.handleBlogWriting.bind(this)}>写博客</Button>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={this.props.blogs}
        footer={
          <div>
            <b>ant design</b> footer part
              </div>
        }
        renderItem={(item) => (                               //原来是item
          <List.Item
            key={item.id}                                     //原来是item.title
            actions={[
              <IconText type="star-o" text="0" />,
              <IconText type="like-o" text="0" />,
              <IconText type="message" text={item.comments.length} />,
            ]}
            extra={
              <img
                width={272}
                alt="logo"
                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
              />
            }
            onClick={this.handleBlogShow.bind(this, item)}           //page not defined
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
    //mountNode

  )

}
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initBlogs: (blogs) => {
      dispatch(initBlogs(blogs))
    },
    operateId: (operateid) => {
      dispatch(operateId(operateid))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)
