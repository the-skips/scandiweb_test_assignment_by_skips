import React from "react";
import { withRouter } from "react-router-dom";

class NavigationButton extends React.Component {
    constructor(props){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        event.preventDefault();
        this.props.history.push(this.props.to);
    }

    render() {
        return(
            <button onClick={this.handleClick}>{this.props.text}</button>
        );
    }
}
export default withRouter(NavigationButton);