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
import Order from 'service/order-service.jsx';
import TableList from 'util/table-list/index.jsx';
import SearchList from './index-list-search.jsx';



const _order = new Order();
const _mm = new MUtil();


class OrderList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            listType: 'list'
        }
    }

    componentDidMount() {
        this.loadOrderList();
    }

    loadOrderList() {
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;

        if (this.state.listType === 'search') {
            listParam.orderNo = this.state.orderNumber;
        }

        _order.getOrderList(listParam).then(res => {
            this.setState(res)
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
            this.loadOrderList();
        })
    }

    onSearch(orderNumber) {

        let listType = orderNumber === '' ? 'list' : 'search';
        this.setState({
            listType: listType,
            pageNum: 1,
            orderNumber: orderNumber
        }, () => {
            this.loadOrderList();
        })

    }

    render() {
        let tableHeads = [
            "OderNumber", "Receiver", "Order Status", "Order Price", "Created Time", "Operation"
        ];

        return (
            <div id="page-wrapper">
                <PageTitle title="Product-List"/>

                <SearchList onSearch={(orderNumber) => {
                    this.onSearch(orderNumber)
                }}/>
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((order, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <Link to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link>
                                    </td>
                                    <td>{order.receiverName}</td>
                                    <td>{order.statusDesc}</td>
                                    <td>${order.payment}</td>
                                    <td>{order.createTime}</td>
                                    <td>
                                        <Link to={`/order/detail/${order.orderNo}`}>Detail</Link>
                                    </td>
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

export default OrderList;
