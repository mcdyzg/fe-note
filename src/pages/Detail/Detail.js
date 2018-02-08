import React,{Component} from 'react'
import '@/pages/Detail/Detail.scss'
import '@/pages/Detail/MarkDown.scss'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import {changeState} from '@/actions/currentState'

class Detail extends Component {
    state = {
        md:${md}
    }
    constructor(props){
        super(props)
    }

    componentDidMount(){
        let md = this.state.md
        this.props.changeState({
            type:'article',
            value:{
                title:md.title,
                author:md.author,
                time:md.time,
            }
        })
    }

    render(){
        return (
            <div className='detail-wrap'>
                <div className="markdown-body">
                    ${content}
                </div>

                <div className="detail-info">
                    <div className="author">
                        {this.state.md.author}
                    </div>
                    <div className="time">
                        {this.state.md.time}
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
    changeState : (data) => changeState(data),
}

export default withRouter(connect(
  	mapStateToProps,
  	mapDispatchToProps
)(Detail))
