import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class Product {

    getProductList(listParam) {
        console.log(listParam);
        let url = '',
            data = {};

        if (listParam.listType === 'list') {
            url = '/manage/product/list.do';
            data.pageNum = listParam.pageNum;
        } else if (listParam.listType === 'search') {
            url = '/manage/product/search.do';
            data.pageNum = listParam.pageNum;
            data[listParam.searchType] = listParam.keyword;
        }

        return _mm.request({
            type: 'post',
            url: url,
            data: data
        })
    }

    setProductStatus(productInfo) {
        return _mm.request({
            type: 'post',
            url: '/manage/product/set_sale_status.do',
            data: productInfo
        });
    }

    getCategoryList(parentCategoryId) {
        return _mm.request({
            type: 'post',
            url: '/manage/category/get_category.do',
            data: {
                categoryId: parentCategoryId || 0
            }
        });
    }

    checkProduct(product) {
        let result = {
            status : true,
            msg: 'Validate Across'
        };

        console.log(product);

        if(typeof product.name !== 'string' || product.name.length === 0) {
            return {
                status: false,
                msg: 'product name is empty'
            }
        }

        if(typeof product.subtitle !== 'string' || product.subtitle.length === 0) {
            return {
                status: false,
                msg: 'subtitle name is empty'
            }
        }

        if(typeof product.categoryId !== 'number' || product.categoryId <= 0) {
            return {
                status: false,
                msg: 'Please select the product category'
            }
        }

        if(typeof product.parentCategoryId !== 'number' || product.parentCategoryId <= 0) {
            return {
                status: false,
                msg: 'Please select the product parentCategoryId'
            }
        }

        //TODO Price need to test NaN is number or not use the chrome console to test the result and to implement here
        // console.log(typeof product.price !== 'number');

        if(typeof product.price !== 'number' || product.price < 0 || isNaN(product.price)) {
            return {
                status: false,
                msg: 'product price is invalidate!'
            }
        }

        if(typeof product.stock !== 'number' || product.stock < 0 || isNaN(product.stock)) {
            return {
                status: false,
                msg : 'product stock is invalidate!'
            }
        }



        return result;
    }


    saveProduct(product) {
        return _mm.request({
           type : 'post',
           url : '/manage/product/save.do',
            data: product
        });
    }

    getProduct(productId){
        return _mm.request({
            type: 'post',
            url: '/manage/product/detail.do',
            data : {
                productId: productId || 0
            }
        })
    }

}

export default Product;