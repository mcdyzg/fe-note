import React,{Component} from 'react'
import './Header.scss'
import { connect } from 'react-redux'
import {Link,withRouter} from 'react-router-dom'
import moment from 'moment'

class Header extends Component {
    constructor(props){
        super(props)
    }

    getWord = () =>{
        let currentState = this.props.currentState
        switch (currentState.type) {
            case 'home':
                return <h1 className='title'>Front-End Special Blog</h1>
                break;
            case 'category':
                return <h1 className='title'>Category:{currentState.value}</h1>
                break;
            case 'article':
                let {
                    time = '',
                    title = '',
                    author = '',
                } = currentState.value
                time = moment(time).format('MMMM D,YYYY. h:m A')
                return [<h1 key='1' className='title'>{title}</h1>,<div  className='fu-title' key='2'>Published by <strong>{author}</strong> on {time}</div>]
                break;
            default:
                return <h1 className='title'>Front-End Special Blog</h1>
        }
    }

    render(){
        return (
            <header className="header-wrap">
                <a className='header-home' href="#/">
                    <svg viewBox="0 0 1024 1024" width="32" height="32"><path d="M960.128 514.666667 537.664 95.146667c-5.994667-5.952-14.421333-7.573333-22.08-5.568-7.658667-2.005333-16.085333-0.405333-22.08 5.568L71.04 514.666667c-8.981333 8.917333-8.981333 23.36 0 32.277333l10.837333 10.773333c8.981333 8.917333 23.530667 8.917333 32.490667 0l83.754667-83.178667 0 392.32c0 33.152 27.072 60.053333 60.458667 60.053333l514.005333 0c33.386667 0 60.458667-26.901333 60.458667-60.053333l0-392.32 83.754667 83.178667c8.981333 8.917333 23.530667 8.917333 32.490667 0l10.837333-10.773333C969.109333 538.026667 969.109333 523.584 960.128 514.666667zM515.584 581.610667c-50.090667 0-90.709333-40.341333-90.709333-90.069333 0-49.728 40.618667-90.069333 90.709333-90.069333s90.709333 40.341333 90.709333 90.069333C606.293333 541.290667 565.674667 581.610667 515.584 581.610667z" fill='#fff' ></path></svg>
                </a>

                {this.getWord()}

                <a  className='header-github' href="https://github.com/mcdyzg/fe-note">
                    <svg viewBox="0 0 1025 1024" width="32.03125" height="32"><path d="M0 525.195313c0 223.59375 143.300781 413.691406 343.007813 483.496094 26.894531 6.796875 22.792969-12.402344 22.792969-25.390625l0-88.691406c-155.292969 18.203125-161.503906-84.609375-171.992188-101.699219-21.09375-35.996094-70.800781-45.195313-55.996094-62.304688 35.390625-18.203125 71.40625 4.609375 113.105469 66.308594 30.195313 44.707031 89.101563 37.207031 119.003906 29.707031 6.503906-26.894531 20.507813-50.898438 39.707031-69.609375-160.800781-28.808594-227.910156-126.992188-227.910156-243.808594 0-56.601563 18.691406-108.691406 55.292969-150.703125-23.300781-69.296875 2.207031-128.496094 5.605469-137.304688 66.503906-5.996094 135.507813 47.597656 140.898438 51.796875 37.792969-10.195313 80.898438-15.605469 129.101563-15.605469 48.496094 0 91.796875 5.605469 129.804688 15.898438 12.890625-9.804688 76.992188-55.800781 138.808594-50.195313 3.300781 8.808594 28.203125 66.699219 6.308594 135 37.109375 42.109375 55.996094 94.609375 55.996094 151.40625 0 116.992188-67.5 215.292969-228.808594 243.691406 26.894531 26.601562 43.59375 63.398438 43.59375 104.199219l0 128.808594c0.898437 10.292969 0 20.507813 17.207031 20.507813 202.597656-68.300781 348.496094-259.804688 348.496094-485.410156 0-282.910156-229.296875-511.992188-511.992188-511.992188C229.101563 13.203125 0 242.304687 0 525.195313L0 525.195313z" fill="#FFF"></path></svg>
                </a>
            </header>
        )
    }
}

const mapStateToProps = (state) => ({
  	currentState: state.currentState,
})

const mapDispatchToProps = {
}

export default withRouter(connect(
  	mapStateToProps,
  	mapDispatchToProps
)(Header))
