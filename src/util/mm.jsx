class MUtil {
    request(param) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: param.type || 'get',
                url: param.url || '',
                dataType: param.dataType || 'json',
                data: param.data || null,
                success(res) {
                    console.log(res);
                    if (0 === res.status) {
                        typeof resolve === 'function' && resolve(res.data, res.msg);
                    } else if (10 === res.status) {
                        this.doLogin();
                    } else {
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error(err) {
                    console.log(err);
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        });

    };

    doLogin() {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }

    getUrlParam(name) {
        let queryString = window.location.search.split('?')[1] || '';
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let result = queryString.match(reg);

        return result ? decodeURIComponent(result[2]) : null;

    }

    errorTips(errMsg){
        alert(errMsg || "Something doesn't work fine!");
    }

}

export default MUtil;
