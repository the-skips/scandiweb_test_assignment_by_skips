import React from "react";

class NavigationButton extends React.Component {
    constructor(props){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        console.log("button pressed");
    }

    render() {
        return(
            <button onClick={this.handleClick}>{this.props.text}</button>
        );
    }
}
export default NavigationButton;