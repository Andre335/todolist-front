import React, { Component } from "react";
import '../css/RoundCheckBox.css';

class RoundCheckBox extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            status: this.props.done
        };
    }

    handleClick() {
        var done = this.state.status ? false : true;
        this.setState({ status: done });
        this.props.handleStatus(done);
    } 

    render() {
        return (
            <div className="container">
                <div className="round">
                    <input type="checkbox" id="checkbox" checked={this.state.status} onChange={this.handleClick}/>
                    <label htmlFor="checkbox"></label>
                </div>
            </div>
        )
    }
}

export default RoundCheckBox;