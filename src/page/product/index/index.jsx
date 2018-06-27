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
import TableList from 'util/table-list/index.jsx';
import SearchList from './index-list-search.jsx';

import './index.scss';


const _product = new Product();
const _mm = new MUtil();


class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            listType: 'list'
        }
    }

    componentDidMount() {
        this.loadProductList();
    }

    loadProductList() {
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;

        if (this.state.listType === 'search') {
            listParam.searchType = this.state.searchType;
            listParam.keyword = this.state.searchKeyword;
        }

        _product.getProductList(listParam).then(res => {
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
            this.loadProductList();
        })
    }

    onSearch(searchType, searchKeyword) {
        // console.log(searchType, searchKeyword);
        let listType = searchKeyword === '' ? 'list' : 'search';
        this.setState({
            listType: listType,
            pageNum: 1,
            searchType: searchType,
            searchKeyword: searchKeyword
        }, () => {
            this.loadProductList();
        })

    }

    onSetProductStatus(e, productId, currentStatus) {
        let newStatus = currentStatus == 1 ? 2 : 1,
            confrimTips = currentStatus == 1
                ? '确定要下架该商品？' : '确定要上架该商品？';
        if (window.confirm(confrimTips)) {
            _product.setProductStatus({
                productId: productId,
                status: newStatus
            }).then(res => {
                _mm.successTips(res);
                this.loadProductList();
            }, errMsg => {
                _mm.errorTips(res);
            })
        }
    }

    render() {
        let tableHeads = [
            {name: 'Product ID', width: '10%'},
            {name: 'Pro Info', width: '50%'},
            {name: 'Price', width: '10%'},
            {name: 'Status', width: '15%'},
            {name: 'Operation', width: '15%'},
        ];


        return (
            <div id="page-wrapper">
                <PageTitle title="Product-List">
                    <div className="page-header-right">

                        <Link className="btn btn-primary"
                              to="/product/save">
                            <i className="fa fa-plus"></i>
                            <span>Add Pro</span>
                        </Link>
                    </div>
                </PageTitle>

                <SearchList onSearch={(searchType, searchKeyword) => {
                    this.onSearch(searchType, searchKeyword)
                }}/>
                {/*这里调用控件的onSearch方法，然后将参数回传后，回调本类的方法进行处理，让父*/}
                {/*模块处理子模块的数据请求*/}
                <TableList tableHeads={tableHeads}>
                    {
                        this.state.list.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>
                                        <p>{product.name}</p>
                                        <p>{product.subtitle}</p>
                                    </td>
                                    <td>${product.price}</td>
                                    <td>
                                        <p>{product.status == 1 ? '上架' : '下架'}</p>
                                        <button className="btn btn-warning btn-xs" onClick={(e) => {
                                            this.onSetProductStatus(e, product.id, product.status)
                                        }}>{product.status == 1 ? '下架' : '上架'}</button>
                                    </td>
                                    <td>
                                        <Link className="opear" to={`/product/detail/${product.id}`}>Detail..</Link>
                                        <Link className="opear" to={`/product/save/${product.id}`}> Edit...</Link>
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

export default ProductList;
