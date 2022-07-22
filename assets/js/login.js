(function () {
    let goRegister = document.querySelector('.register a');
    let goLogin = document.querySelector('.goLogin a');
    goRegister.addEventListener('click', function () {
        document.querySelector('.myLogin').style.display = 'none';
        document.querySelector('.myRegister').style.display = 'block';
    })
    goLogin.addEventListener('click', function () {
        document.querySelector('.myLogin').style.display = 'block';
        document.querySelector('.myRegister').style.display = 'none';
    })
    let form = layui.form;
    form.verify({
        username: [/^[\S][a-zA-Z0-9_-]{6,12}$/,'账号必须是6到12位字符'],
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function(value) {
          var pwd = $('#register [name=password]').val()
          if (pwd !== value) {
            return '两次密码不一致！'
          }
        }
      })
    // console.log(form);
    document.querySelector('#login').addEventListener('submit', e => {
        e.preventDefault();
        // 根路径 http://www.liulongbin.top:3007
        let data = {
            username: document.querySelector('#login [name="username"]').value,
            password: document.querySelector('#login [name="password"]').value
        }
        $.post('/api/login', data, res => {
            console.log(res);
            if (res.status === 1) return layer.msg(res.message);
            layer.msg('登录成功！')
            localStorage.setItem('token', res.token)
            location.href = '/index.html'
        })
    });
    document.querySelector('#register').addEventListener('submit',e=>{
        e.preventDefault();
        let data = {
            username: document.querySelector('#register [name="username"]').value,
            password: document.querySelector('#register [name="password"]').value
        };
        $.ajax({
            url: '/api/reguser',
            method:'POST',
            data,
            success:res=>{
                if(res.status!==0)return layer.msg(res.message);
                layer.msg(res.message);
                goLogin.click();
            }
        })
    })
})();