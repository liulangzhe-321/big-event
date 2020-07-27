// 全文加载完成
$(function () {
    // 去注册
    $('#quzhuce').on('click', function () {
        $('.login').hide()
        $('.register').show()
    })
    $('#qudenglu').on('click', function () {
        $('.login').show()
        $('.register').hide()
    })


    // 表单校验
    // 加载表单验证规则
    var form = layui.form;
    form.verify({
        // 用户的密码
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //   确认密码
        confirmpass: function (value) {
            // 获取第一次i密码
            var pwd = $('.password').val().trim()
            // 判断两次密码是否一致
            if (pwd !== value) {
                return alert('两次密码不一致')
            }
        }
    });
    // 提示模板
    var layer = layui.layer;

/* url 记得统一  用 ajaxPrefilter */

    // 提交表单事件
    // 注册表单事件
    $('#form_reg').on('submit', function (e) {
        // 阻止默认行为
        e.preventDefault()
        // 收集表单数据
        var data = $(this).serialize()
        // 请求ajax注册账户
        $.ajax({
            type: 'POST',
            url: 'api/reguser',
            data: data,
            success: function (res) {
                if (res.status === 1) {
                    // 返回失败显示原有的数据
                    // return console.log(res.message)
                    return layer.msg(res.msg)
                }
                // 成功
                // console.log('成功')
                layer.msg('注册成功')
                // 模拟鼠标点击
                $('#qudenglu').click();
            }
        })
    })
    // 登陆表单
    $('#login-from').on('submit',function(e){
        e.preventDefault()
        // 收集表单数据
        var data = $(this).serialize()
        $.ajax({
            type:'post',
            url:'/api/login',
            data:data,
            success:function(res){
                if(res.status===0){
                    return layer.msg(res.msg)
                }
                // 成功
                layer.msg('登录成功')
                // 登陆成功保存token
                localStorage.setItem('token',res.token)
                // 跳转页面
                location.href='/index.html'
            }
        })

    })
})