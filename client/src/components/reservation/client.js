import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: 12,
};


export default class ClientComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name : "",
            phone : "",
            email : ""
       };
    }

    onChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) =>{
        e.preventDefault();
        this.props.reserveSlot(this.state);
    }
    
    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <TextField
                        hintText="Name"
                        floatingLabelText="Name"
                        type="text"
                        onChange={(event, newValue) => this.setState({ name: newValue })}
                    />
                    <br />

                    <TextField
                        hintText="Phone"
                        floatingLabelText="Phone No"
                        type="number"
                        onChange={(event, newValue) => this.setState({ phone : newValue })}
                    />
                    <br />

                    <TextField
                        hintText="Email"
                        floatingLabelText="Email"
                        type="text"
                        onChange={(event, newValue) => this.setState({ email: newValue })}
                    />

                    <br />
                    <RaisedButton type="submit" label="Primary" primary={true} style={style} />
                </form>
            </div>
        );
    }
}