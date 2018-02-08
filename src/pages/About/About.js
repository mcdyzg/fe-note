// i am about component
import React, {Component} from 'react'
import './About.scss'
import '@/pages/Detail/MarkDown.scss'

class About extends Component {
	state = {
	}
	constructor(props) {
        super(props);
    }

	render() {
		return (
		<div className="about-wrap">
			<div className="markdown-body">
				${content}
			</div>
		</div>
		)
	}
}

export default About
