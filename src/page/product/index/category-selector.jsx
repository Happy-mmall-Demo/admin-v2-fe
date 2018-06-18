/*
* @Author: Reshift0023
* @Date:   2018-05-30 10:50:48
* @Last Modified by:   Reshift0023
* @Last Modified time: 2018-05-30 16:22:24
*/

// console.log("Hello webpack");

import React from 'react';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import PageTitle from 'component/page-title/index.jsx';

const _mm = new MUtil();
const _product = new Product();

import './category-selector.scss';

class CategorySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryList: [],
            firstCategoryId: 0,
            secondCategoryList: [],
            secondCategoryId: 0
        }
    }

    componentDidMount() {
        this.loadFirstCategory();
    }


    loadFirstCategory() {
        _product.getCategoryList().then(res => {
            this.setState({
                firstCategoryList: res
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });

    }

    loadSecondCategory() {
        _product.getCategoryList(this.state.firstCategoryId).then(res => {
            this.setState({
                secondCategoryList: res
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }

    onFirstCategoryChange(e) {
        let newValue = e.target.value || 0;
        console.log(newValue);
        this.setState({
            firstCategoryId: newValue,
            secondCategoryId: 0,
            secondCategoryList: []
        }, () => {
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        })
    }

    onSecondCategoryChange(e) {
        let newValue = e.target.value || 0;
        console.log(newValue);
        this.setState({
            secondCategoryId: newValue
        }, () => {
            this.onPropsCategoryChange();
        })
    }

    onPropsCategoryChange() {

        let categoryChangable = typeof this.props.onCategoryChange === 'function';
        if (this.state.secondCategoryId) {
            categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId);
        } else {
            categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, 0);
        }
    }


    render() {
        return (
            <div className="col-md-10">
                <select name="" id="" className="form-control cate-select"
                        onChange={(e) => this.onFirstCategoryChange(e)}>
                    <option value="">First category</option>
                    {
                        this.state.firstCategoryList.map
                        (
                            (category, index) =>
                                <option value={category.id} key={index}>{category.name}</option>
                        )
                    }
                </select>

                {this.state.secondCategoryList.length ?

                    (<select name="" id="" className="form-control cate-select"
                             onChange={(e) => this.onSecondCategoryChange(e)}>
                        <option value="">Second category</option>
                        {
                            this.state.secondCategoryList.map
                            (
                                (category, index) =>
                                    <option value={category.id} key={index}>{category.name}</option>
                            )
                        }
                    </select>) : null
                }
            </div>
        );
    }
}

export default CategorySelector;

