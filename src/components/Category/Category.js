import React,{PureComponent} from 'react'
import './Category.scss'
import {Link,withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import {changeState} from '@/actions/currentState'
import moment from 'moment'


class Category extends PureComponent {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        if(!this.props.match.params.name) {
            this.props.changeState({
                type:'home',
                value:''
            })
        }else{
            this.props.changeState({
                type:'category',
                value:this.props.match.params.name
            })
        }
    }

    componentWillReceiveProps(nextProps){
        if(!nextProps.match.params.name) {
            this.props.changeState({
                type:'home',
                value:''
            })
        }else{
            this.props.changeState({
                type:'category',
                value:nextProps.match.params.name
            })
        }
    }

    render(){
        const {
            name = ''
        } = this.props.match.params
        const {article = []} = this.props
        article.sort((a ,b)=>{
            let t1 = (new Date(a.time || '')).valueOf()
            let t2 = (new Date(b.time || '')).valueOf()
            return t1 < t2
        })
        return (
            <div className="category-wrap">
                {
                    article.map((item,index)=>{
                        if(!name || item.category === name) {
                            return (
                                <Link key={index} to={`/${item.category}/${item.mdName.slice(0,-3)}`}>
                                    <div className='category-item'>
                                        <div className="ci-left">
                                            <img
                                                className='image'
                                                src={item.cover || 'https://wp-themes.com/wp-content/themes/hestia/demo-preview-images/img/3.jpg'}/>
                                        </div>
                                        <div className="ci-right">
                                            <div className="category">
                                                {item.category}
                                            </div>
                                            <div className="title">
                                                {item.title}
                                            </div>
                                            <div className="desc">
                                                {item.desc}
                                            </div>
                                            <div className="author">
                                                By <span className='author-name'>{item.author}</span>, {moment(item.time || '').fromNow()}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
  	article: state.article,
})


const mapDispatchToProps = {
    changeState : (data) => changeState(data),
}

export default withRouter(connect(
  	mapStateToProps,
  	mapDispatchToProps
)(Category))
