// action types
const INIT_BLOGS = 'INIT_BLOGS'
const ADD_BLOG = 'ADD_BLOG'
const DELETE_BLOG = 'DELETE_BLOG'
const EDIT_BLOG = 'EDIT_BLOG'
const OPERATE_ID = 'OPERATE_ID'
const OPERATE_COMMENT = 'OPERATE_COMMENT'

//reducer
export default function (state, action){
    if(!state){
        state = { blogs: [] ,
                  operateid: [0]}
    }
    switch(action.type){
        case INIT_BLOGS:
            //初始化博客列表
            return{ 
                blogs: action.blogs,
                operateid:[...state.operateid] 
            }
        case ADD_BLOG:
            //新增博客
            return{                
                blogs:[...state.blogs, action.blog],
                operateid:[...state.operateid]
            }
        case DELETE_BLOG:
            //删除博客
            var deleteid = state.blogs.findIndex((value, index, arr) => {
                return (value.id == state.operateid)
              })
            return{
                blogs:[
                    ...state.blogs.splice(deleteid, 1)
                ],
                    operateid:[...state.operateid]                
            }
        case EDIT_BLOG:
            //编辑博客
            var editindex = state.blogs.findIndex((value, index, arr) => {
                return (value.id == action.blog.id)
            })
            return{
                blogs:[
                    ...state.blogs.splice(editindex, 1, action.blog)
                ],
                operateid:[...state.operateid]
            }
        case OPERATE_ID:
            return{
                blogs:[...state.blogs],
                operateid:[action.operateid]
            }
        case OPERATE_COMMENT:{
            var editindex = state.blogs.findIndex((value, index, arr) => {
                return (value.id == action.blog.id)
            })
            return{
                blogs:[...state.blogs.splice(editindex,1,action.blog)],
                operateid:[...state.operateid]
            }
        }
        default:
            return state
    }
}

//action creators

export const initBlogs = (blogs)=>{
    return{ type: INIT_BLOGS, blogs}
}
export const addBlog = (blog)=>{
    blog.id=(new Date()).getTime()
    return{ type: ADD_BLOG, blog}
}
export const deleteBlog = (blogId)=>{
    return{ type: DELETE_BLOG, blogId}
}
export const editBlog = (blog)=>{
    return{ type: EDIT_BLOG, blog}
}
export const operateId = (operateid) => {
    return{ type: OPERATE_ID, operateid }
}
export const operateComment = (blog) => {
    return{ type: OPERATE_COMMENT, blog}
}