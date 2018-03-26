import React from 'react';
import PropTypes from 'prop-types'
import { login } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup'
import AuthService from '../../actions/authActions';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import { Router, browserHistory } from 'react-router';

class LoginForm extends React.Component {
    constructor(props,context) {
        super(props,context);
        this.state = {
            username: '',
            password: '',
            errors: {},
            isLoading: false
        };
        this.Auth = new AuthService();
    }  

    componentWillMount(){
        if(this.Auth.loggedIn()){
            browserHistory.push('/reserve-slot');
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ errors: {}, isLoading: true });
        this.props.login(this.state).then((res) => {
            console.log("Response is",res);
            this.context.router.push('/reserve-slot')    
        });
    }

    onChange(e) {
        console.log("event",e.target.name,e.target.value)
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        const { errors, username, password, isLoading } = this.state;

        return (
            <div className="center">
                <MuiThemeProvider>
                    <div>
                        <AppBar title="Login"/>
                        <div>
                            <form onSubmit={this.handleFormSubmit.bind(this)}>
                                <TextFieldGroup
                                    error={errors.username}
                                    label="username"
                                    onChange={this.handleChange.bind(this)}
                                    value={this.state.username}
                                    field="username"
                                    type="text"
                                />

                                <TextFieldGroup
                                    error={errors.password}
                                    label="Password"
                                    onChange={this.handleChange.bind(this)}
                                    value={this.state.password}
                                    field="password"
                                    type="password"
                                />
                                <input
                                    className="form-submit"
                                    value="Submit"
                                    type="submit"
                                />
                            </form>
                        </div>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

    handleFormSubmit(e){
        e.preventDefault();
      
        this.Auth.login(this.state.username,this.state.password)
            .then(res =>{
                console.log("Response",res)
               browserHistory.push('/reserve-slot');
            })
            .catch(err =>{
                alert(err);
            })
    }

    handleChange(e){
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
}


LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default LoginForm;