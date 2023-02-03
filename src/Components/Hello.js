import React from "react";

class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: "", result: "" };
        this.submitFunction = this.submitFunction.bind(this);
    }

    submitFunction() {
        const data = {
            "sku": "test",
            "name": "Book about nothing",
            "price": 50,
            "weight": 0.3
        };
        let sent = fetch("https://scandiwebtestsitebyskips.000webhostapp.com/api/server.php", {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then((response) => { return response.text(); })
            .then((data) => this.setState({ result: data }));
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitFunction}>
                    <label htmlFor="nameInput">Name: </label>
                    <input
                        type="text"
                        id="nameInput"
                        name="name"
                        value={this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })}
                    />
                    <br />
                    <button type='submit'>Send</button>
                </form>
                <h1>Your result: {this.state.result}</h1>
            </div>
        );
    }
}
export default Hello;