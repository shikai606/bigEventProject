
getUserInfo();
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        data: {
            Authorization: localStorage.getItem('token')
        },
        success: res => {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data);
        }
    })
}
function renderAvatar(data) {
    let name = data.nickname || data.username;
    document.querySelector('#welcome').innerHTML = name;
    if (data.user_pic) {
        $('.layui-nav-img').attr('src', data.user_pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        let code = name[0].toUpperCase();
        $('.text-avatar').html(code).show();
    }
}
document.querySelector('#btnLogout').addEventListener('click', e => {
    layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
        localStorage.removeItem('token');
        location.href = '/index.html';
    });
})
// })();