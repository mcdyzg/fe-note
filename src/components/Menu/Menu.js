import React,{Component} from 'react'
import './Menu.scss'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'

class Menu extends Component {
    constructor(props){
        super(props)
    }

    render(){
        const {category} = this.props
        return (
            <div className="menu-wrap">
                <h5 className='menu-title'>Categories</h5>
                <div className="menu-content">
                    {category.map((item,index)=>(
                        <Link key={index} to={`/category/${item}`}>
                            <div>{item}</div>
                        </Link>
                    ))}
                </div>

                <h5 className='menu-title'>About</h5>
                <div className="menu-content">
                    <Link to={`/readme`}>
                        <div>readme</div>
                    </Link>
                    <a href="https://github.com/mcdyzg/fe-note"><div>github</div></a>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
  	category: state.category,
})


const mapDispatchToProps = {
}

export default withRouter(connect(
  	mapStateToProps,
  	mapDispatchToProps
)(Menu))
