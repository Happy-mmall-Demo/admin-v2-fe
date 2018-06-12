import React from 'react';
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new MUtil();
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

    componentWillMount() {
        document.title = "Login HappyMMalll Admin";
    }

    onInputChange(e) {
        let inputValue = e.target.value,
            inputName = e.target.name;


        // console.log(inputValue, inputName);
        this.setState({
            [inputName]: inputValue
        });
    }

    onSubmit(e) {
        let loginInfo = {
                username: this.state.username,
                password: this.state.password
            },
            checkResult = _user.checkLoginInfo(loginInfo);
        if (checkResult.status) {
            _user.login(loginInfo).then((res) => {
                // console.log(this.state.redirect);
                this.props.history.push(this.state.redirect);
                _mm.setStorage('userInfo', res);
            }, (errMsg) => {
                _mm.errorTips(errMsg);
            });
        } else {
            _mm.errorTips(checkResult.msg);
        }
    }

    onInputKeyUp(e) {
        if (e.keyCode === 13) {
            this.onSubmit();
        }
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
                                        onChange={e => this.onInputChange(e)}
                                        onKeyUp={e => this.onInputKeyUp(e)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        onChange={e => this.onInputChange(e)}
                                        onKeyUp={e => this.onInputKeyUp(e)}/>
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