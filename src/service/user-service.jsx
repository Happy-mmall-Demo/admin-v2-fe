import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class User {
    // 用户登录
    login(loginInfo) {
        return _mm.request({
            type: 'post',
            url: '/manage/user/login.do',
            data: loginInfo
        });
    };

    checkLoginInfo(loginInfo) {
        let username = $.trim(loginInfo.username),
            password = $.trim(loginInfo.password);
        if (typeof username !== 'string' || username.length === 0) {
            return {
                status: false,
                msg: 'username is empty!'
            }
        }
        if (typeof password !== 'string' || password.length === 0) {
            return {
                status: false,
                msg: 'password is empty!'
            }
        }
        return {
            status: true,
            msg: 'valid true'
        }

    };

    logout() {
        return _mm.request({
            type: 'post',
            url: '/user/logout.do',
        });
    }

    getUserList(pageNum) {
        return _mm.request({
            type: 'post',
            url: '/manage/user/list.do',
            data: {
                pageNum: pageNum
            }
        })
    }

}

export default User;