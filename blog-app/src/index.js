import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router'
import './index.css';
//import CommentApp from './CommentApp';
//import * as serviceWorker from './serviceWorker';
import IndexPage from './IndexPage';
import Register from './Register';
import Welcome from './Welcome';
import Login from './Login'
import BlogList from './components/blog/BlogList'
import BlogWriting from './components/blog/BlogWriting'
import BlogShow from './components/blog/BlogShow';
import BlogOperate from './components/blog/BlogOperate';
import BlogEditing from './components/blog/BlogEditing';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import blogsReducer from './reducers/Blogs'


const store = createStore(blogsReducer)

ReactDOM.render(
    (
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route path='/' component={IndexPage}>
                    <IndexRoute component={Welcome}></IndexRoute>
                    <Route path='/Register' component={Register}></Route>
                    <Route path='/Login' component={Login}></Route>
                    <Route path='/BlogList' component={BlogList}></Route>
                    <Route path='/BlogWriting' component={BlogWriting}></Route>
                    <Route path='/BlogShow' component={BlogShow}></Route>
                    <Route path='/BlogOperate' component={BlogOperate}></Route>
                    <Route path='/BlogEditing' component={BlogEditing}></Route>
                </Route>
            </Router>
        </Provider>
    ),
    document.getElementById('root')

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
