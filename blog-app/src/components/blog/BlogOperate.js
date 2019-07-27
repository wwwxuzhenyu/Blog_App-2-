import React, {Component} from 'react';
import { createHashHistory } from 'history';
import { Button } from 'antd';

const history = createHashHistory();

class BlogOperate extends Component{
    ToList(){
        history.push('/BlogList')
    }
    
    render(){
        return(
            <div className="wrapped-operated">
                <br/>
                操作成功！
                <br/>
                <br/>
                <br/>
                <Button onClick={this.ToList.bind(this)} type="primary">返回</Button>
            </div>
        )
    }
}

export default BlogOperate