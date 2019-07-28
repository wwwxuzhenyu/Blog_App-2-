import React, { Component } from 'react'
import Comment from './Comment';
import PropTypes from 'prop-types'


class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.array,
        onDeleteComment: PropTypes.func
    }

    static defaultProps = {
        comments: []
    }

    handleDeleteComment(index) {
        if (this.props.onDeleteComment) {
            console.log(index)
            this.props.onDeleteComment(index)
        }
    }

    render() {
        return (
            <div>
                {this.props.comments.length
                    ? this.props.comments.map((comment, i) => {
                        return (<Comment
                            comment={comment}
                            key={i}
                            index={i}
                            onDeleteComment={this.handleDeleteComment.bind(this)} />)
                    })
                    : <div>目前还没有评论，快来抢沙发叭~~~~</div>}
            </div>
        )
    }
}

export default CommentList
