(() => {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    initInfo();
    function initInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            data:{
                Authorization:localStorage.getItem('token')
            },
            success:res=>{
                form.val('formUserInfo', res.data)
            }
        })
    }
    document.querySelector('.layui-form').addEventListener('submit',e=>{
        e.preventDefault();
        console.log(111);
        console.log($('.layui-form').serialize());
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$('.layui-form').serialize(),
            success:res=>{
                if(res.status !== 0)return layui.layer.msg('更新个人信息失败');
                layui.layer.msg('更新信息成功');
                console.log(window.parent);
                window.parent.getUserInfo()
            }
        })
    });
    // console.log(document.querySelector('#reset'),$('#reset111'));
    document.querySelector('#reset').addEventListener('click',function(e){
        e.preventDefault();
        initInfo();
    })
})();