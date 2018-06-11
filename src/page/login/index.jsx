import React from 'react';
import MUtil from 'util/mm.jsx';
import User  from 'service/user-service.jsx';

const _mm   = new MUtil();
const _user = new User();

import './index.scss';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            redirect: _mm.getUrlParam('redirect') || '/'
        }
    }

    onInputChange(e) {
        let inputValue = e.target.value,
            inputName = e.target.name;


        // console.log(inputValue, inputName);
        this.setState({
            // [InputName]: inputValue
        });
    }

    onSubmit(e) {
        _user.login({
            username: this.state.username,
            password: this.state.password
        }).then((res) => {
            console.log(this.state.redirect);
            // this.props.history.push(this.state.redirect);
        },(errMsg) => {
            _mm.errorTips(errMsg);
        });
    }

    render() {
        return (
            <div>

                <div className="col-md-4 col-md-offset-4">
                    <div className="panel panel-default login-panel">
                        <div className="panel-heading">Welcome to login - MMAL msys</div>
                        <div className="panel-body">
                            <div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Username</label>
                                    <input
                                        name="username"
                                        type="text"
                                        className="form-control"
                                        placeholder="Please input username"
                                        onChange={e => this.onInputChange(e)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        onChange={e => this.onInputChange(e)}/>
                                </div>
                                <button
                                    className="btn btn-primary btn-block btn-lg"
                                    onClick={e => this.onSubmit(e)}>
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>

                </div>


            </div>
        );
    }
}

export default Login;