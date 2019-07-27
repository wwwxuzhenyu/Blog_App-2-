import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Comment extends Component {
  static propTypes={
    comment: PropTypes.object.isRequired,                               //必须传入参数且必须是一个对象
    onDeleteComment:PropTypes.func,
    index:PropTypes.number
  }

  constructor(){
    super()
    this.state={timeString:''}
  }

  componentWillMount(){
    this._updateTimeString()
    this._timer=setInterval(
      this._updateTimeString.bind(this),                            //为什么要bind（this）？
      5000
    )
  }

  componentWillUnmount(){
    clearInterval(this._timer)
  }

  _updateTimeString(){
    const comment=this.props.comment
    const duration=(+Date.now() - comment.createdTime)/1000
    this.setState({
      timeString:this._showTimeString(duration)
      /*
      timeString: duration > 60
      ? `${Math.round(duration/60)}分钟前`                           //Math.round进行四舍五入
      : `${Math.round(Math.max(duration, 1))}秒前`                   //Math.max取最大值
      */
    })
  }

  _showTimeString(time){                                              //显示评论发布的时间
    var timeString
    if( time>2592000)
    {
      timeString=`${Math.round(time/2592000)}个月前`
    }
    else if(time>604800){
      timeString=`${Math.round(time/604800)}周前`
    }
    else if(time>86400){
      timeString=`${Math.round(time/86400)}天前`
    }
    else if(time>3600){
      timeString=`${Math.round(time/3600)}小时前`
    }
    else if(time>60){
      timeString=`${Math.round(time/60)}分钟前`
    }
    else{
      timeString=`${Math.round(Math.max(time, 1))}秒前`
    }
    return(timeString)
  }
  
  handleDeleteComment(){
    console.log(this.props.index)
     
    if(this.props.onDeleteComment){
      this.props.onDeleteComment(this.props.index)
    }
    
  }

  render () {
    return (
      <div className='comment'>
        
        <div className='comment-user'>
          <span>{this.props.comment.username} </span>：
        </div>

        <p>{this.props.comment.content}</p>
        
        <span className="comment-createdtime">
          {this.state.timeString}
        </span>
        <span className="comment-delete"
              onClick={this.handleDeleteComment.bind(this)}>
          删除
        </span>


      </div>
    )
  }
}

export default Comment