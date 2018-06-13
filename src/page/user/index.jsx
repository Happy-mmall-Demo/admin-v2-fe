import React from 'react';
import {Link} from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';

import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _user = new User();
const _mm = new MUtil();


class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1
        }
    }

    componentDidMount() {
        this.loadUserList();
    }

    loadUserList() {
        _user.getUserList(this.state.pageNum).then(res => {
            this.setState(res);
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }

    onPageNumChange(pageNum) {
        this.setState ({
            pageNum : pageNum
        },()=>{
            this.loadUserList();
        })
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="UserList"/>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped table-bordered">
                            <thead>
                            <tr>
                                <td>ID</td>
                                <td>Username</td>
                                <td>E-mail</td>
                                <td>Phone</td>
                                <td>Register Time</td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                               this.state.list.map((user, index) => {
                                   return (
                                       <tr key={index}>
                                           <td>{user.id}</td>
                                           <td>{user.username}</td>
                                           <td>{user.email}</td>
                                           <td>{user.phone}</td>
                                           <td>{user.createTime}</td>
                                       </tr>
                                   );
                               })
                            }

                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination current={this.state.pageNum}
                            total={this.state.total}
                            onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
            </div>
        )
    };


}

export default UserList;