/*
* @Author: Reshift0023
* @Date:   2018-05-30 10:50:48
* @Last Modified by:   Reshift0023
* @Last Modified time: 2018-05-30 16:22:24
*/

// console.log("Hello webpack");

import React from 'react';
import {Link} from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _product = new Product();
const _mm = new MUtil();


class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            firstLoading: true
        }
    }

    componentDidMount() {
        this.loadUserList();
    }

    loadUserList() {
        _product.getProductList(this.state.pageNum).then(res => {
            this.setState(res, () => {
                this.setState({
                    firstLoading: false
                });
            });
        }, errMsg => {
            this.setState({
                list: []
            });
            _mm.errorTips(errMsg);
        });
    }

    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadUserList();
        })
    }

    render() {
        let listBody =

        let listError = (
            <tr>
                <td colSpan="5" className='text-center'>
                    {this.state.firstLoading ? 'Loading data...' : "Can't find the userList"}
                </td>
            </tr>
        );

        let tableBody = this.state.list.length > 0 ? listBody : listError;


        return (
            <div id="page-wrapper">
                <PageTitle title="Product-List"/>
                    <TableList>
                        {
                            //TODO Here
                            this.state.list.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{new Date(user.createTime).toLocaleString()}</td>
                                    </tr>
                                );
                            })
                        }
                    </TableList>
                <Pagination current={this.state.pageNum}
                            total={this.state.total}
                            onChange={(pageNum) => this.onPageNumChange(pageNum)}/>
            </div>
        )
    };


}

export default ProductList;
