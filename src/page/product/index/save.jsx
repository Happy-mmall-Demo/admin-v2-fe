import React from 'react';

import PageTitle from 'component/page-title/index.jsx';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import CategorySelector from './category-selector.jsx';

import FileUploader from 'util/file-uploader/index.jsx';


const _mm = new MUtil();
const _product = new Product();

class ProductSave extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryId: 0,
            parentCategoryId: 0
        };
    }

    onCategoryChange(categoryId, parentCategoryId){
        console.log(categoryId, parentCategoryId);
    }


    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="Add Product"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="请输入商品名称"
                                   name="name"
                                   // value={this.state.name}
                                   onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-5">
                            <input type="text" className="form-control"
                                   placeholder="请输入商品描述"
                                   name="subtitle"
                                   // value={this.state.subtitle}
                                   onChange={(e) => this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>

                        <CategorySelector
                            onCategoryChange={(categoryId, parentCategoryId) => this.onCategoryChange(categoryId, parentCategoryId)}/>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                       placeholder="价格"
                                       name="price"
                                       // value={this.state.price}
                                       onChange={(e) => this.onValueChange(e)}/>
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control"
                                       placeholder="库存"
                                       name="stock"
                                       value={this.state.stock}
                                       onChange={(e) => this.onValueChange(e)}/>
                                <span className="input-group-addon">件</span>
                            </div>

                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            <FileUploader />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                            {/*TODO*/}
                            {/*<RichEditor*/}
                                {/*detail={this.state.detail}*/}
                                {/*defaultDetail={this.state.defaultDetail}*/}
                                {/*onValueChange={(value) => this.onDetailValueChange(value)}/>*/}
                        </div>
                    </div>


                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary"
                                    onClick={(e) => {
                                        this.onSubmit(e)
                                    }}>提交
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProductSave;
