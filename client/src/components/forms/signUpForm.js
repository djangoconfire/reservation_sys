import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import TextFieldGroup from '../common/TextFieldGroup'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import axios from 'axios';
import { SERVER_URL } from '../../constants';
import { Router, browserHistory } from 'react-router';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            errors: {},
            isLoading: false
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ errors: {}, isLoading: true })
        let header = new Headers({
            'Access-Control-Allow-Origin':'*',
            'Content-Type': 'application/json'
        });
        axios.post(SERVER_URL+"/api/user/signup/",this.state,
            {headers : header})
        .then((res) => {
            console.log("Response received",res)
            browserHistory.push('/login');
            },
            (err) => this.setState({ errors: err.response.data, isLoading: false })
        );
    }

    render() {
        const { errors } = this.state;

        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Register"/>
                        <TextFieldGroup
                          error={errors.username}
                          label="Username"
                          onChange={this.onChange}
                          value={this.state.username}
                          field="username"
                        />

                        <TextFieldGroup
                          error={errors.password}
                          label="Password"
                          onChange={this.onChange}
                          value={this.state.password}
                          field="password"
                          type="password"
                        />
              
                        <div className="form-group">
                            <button disabled={this.state.isLoading || this.state.invalid} className="btn btn-primary btn-lg">
                            Sign up
                            </button>
                        </div>
                    </div>
                </MuiThemeProvider>
            </form>
        );
    }
}

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
}

SignupForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default SignupForm;