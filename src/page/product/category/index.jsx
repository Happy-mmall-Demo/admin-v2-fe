import React from 'react';
import {Link} from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import TableList from 'util/table-list/index.jsx';

const _product = new Product();
const _mm = new MUtil();


class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            parentCategoryId: this.props.match.params.categoryId || 0
        }
    }

    componentDidMount() {
        this.loadCategoryList();
    }

    componentDidUpdate(prevProps, prevState) {
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId = this.props.match.params.categoryId || 0;
        if(oldPath !== newPath) {
            this.setState({
                parentCategoryId: newId
            }, () => {
                this.loadCategoryList();
            })
        }
    }


    onUpdateName(categoryId, categoryName) {
        let newName = window.prompt('Please input the new category name', categoryName);
        if (newName) {
            _product.updateCategoryName({
                categoryId: categoryId,
                categoryName: newName
            }).then(res => {
                _mm.successTips(res);
                this.loadCategoryList();
            }, errMsg => {
                _mm.errorTips(errMsg);
            })
        }
    }

    loadCategoryList() {
        _product.getCategoryList(this.state.parentCategoryId).then(res => {
            this.setState({
                list: res
            });
        }, errMsg => {
            this.setState({
                list: []
            });
            _mm.errorTips(errMsg);
        });
    }

    render() {
        let listBody = this.state.list.map((category, index) => {
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                        <a className="opear"
                           onClick={(e) => this.onUpdateName(category.id, category.name)}>Modify
                        </a>
                        {
                            category.parentId === 0
                                ? <Link to={`/product-category/index/${category.id}`}>Sub-Category</Link>
                                : null
                        }
                    </td>
                </tr>
            );
        });

        return (
            <div id="page-wrapper">
                <PageTitle title="CategoryList">
                    <div className="page-header-right">
                        <Link className="btn btn-primary"
                              to="/product-category/add">
                            <i className="fa fa-plus"></i>
                            <span>Add Category</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <p>Parent-CategoryID: {this.state.parentCategoryId}</p>
                    </div>
                </div>
                <TableList tableHeads={['Category ID', 'Category Name', 'Operation']}>
                    {/*TODO*/}
                    {listBody}
                </TableList>
            </div>
        )
    };


}

export default CategoryList;