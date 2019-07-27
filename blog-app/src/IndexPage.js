import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { HashRouter as Router, Route, Link, withRouter, } from "react-router-dom";
//import {Router,Route,hashHistory} from "react-router"
import "antd/dist/antd.css";
import { createHashHistory} from 'history';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const history=createHashHistory();


class Indexpage extends Component {
    handleRegister(e) {
        if (e.key == 3) {
            history.push('/Register');
        }
        if (e.key == 2) {
            history.push('/Login');
        }
        if (e.key == 1) {
            history.push('');
        }
    }

    handleBlogList(e) {
        if (e.key == 5) {
            history.push('/BlogList');
        }
    }

    render() {
        return (
            
                <Layout>
                    <Header className="header">
                        <div className="logo" />
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            defaultSelectedKeys={['1']}
                            style={{ lineHeight: '64px' }}
                            onClick={this.handleRegister.bind(this)}
                        >
                            <Menu.Item key="1">游客</Menu.Item>
                            <Menu.Item key="2">登录</Menu.Item>
                            <Menu.Item key="3">注册</Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{ padding: '0 50px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item> 许震宇 的个人博客</Breadcrumb.Item>
                        </Breadcrumb>
                        <Layout style={{ padding: '24px 0', background: '#fff' }}>
                            <Sider width={200} style={{ background: '#fff' }}>
                                <Menu
                                    mode="inline"
                                    //defaultSelectedKeys={['1']}
                                    //defaultOpenKeys={['sub1']}
                                    style={{ height: '100%' }}
                                >
                                    <SubMenu
                                        key="sub1"
                                        title={
                                            <span>
                                                <Icon type="user" />
                                                我的
                                        </span>
                                        }
                                    >
                                        <Menu.Item key="1">我的博客</Menu.Item>
                                        <Menu.Item key="2">我的评论</Menu.Item>
                                        <Menu.Item key="3">个人信息</Menu.Item>
                                        <Menu.Item key="4">账号管理</Menu.Item>
                                    </SubMenu>
                                    <SubMenu
                                        key="sub2"
                                        title={
                                            <span>
                                                <Icon type="laptop" />
                                                社交
                                            </span>
                                        }
                                        onClick={this.handleBlogList.bind(this)}
                                    >
                                        <Menu.Item key="5">博客园地</Menu.Item>
                                        <Menu.Item key="6">关注的人</Menu.Item>
                                        <Menu.Item key="7">我的粉丝</Menu.Item>
                                    </SubMenu>
                                    <SubMenu
                                        key="sub3"
                                        title={
                                            <span>
                                                <Icon type="notification" />
                                                关于
                                        </span>
                                        }
                                    >
                                        <Menu.Item key="9">管理员权限</Menu.Item>
                                        <Menu.Item key="10">option10</Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Sider>
                            <Content style={{ padding: '0 24px', minHeight: 575 }}>
                                
                            {this.props.children}
                            </Content>
                        </Layout>
                    </Content>
                    <Footer></Footer>
                </Layout>
            
        )



    }
}

export default Indexpage
