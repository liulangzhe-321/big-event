$(function(){
// 获取用户数据
function userInfo(){
    $.ajax({
        type:'GET',
        url:'/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        //   },
        success:function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
              }
              layui.layer.msg('获取成功')
              // 调用 renderAvatar 渲染用户的头像
            //   renderAvatar(res.data)    
            // console.log(res.message);
            console.log(res.data)
            uesrproto(res.data)
        },
    })
   }
   userInfo()
//    设置用户的图片 及名称
function uesrproto(data){
    // 获取用户的名称 
    var name =data.nickname||data.username
// 把获取的用户名称 渲染到 视图中
$('.welcome').html("欢迎您"+name)
// 更换头像 首字母渲染
if(data.user_pic!==null){
   $('.layui-nav-img').arrt('scr',data.user_pic).show()
$('.text').hide()
}else{
    $('.layui-nav-img').hide()
    // 首字母大写
    var first =name[0].toUpperCase()
    $('.text').html(first).show()
}
}

// 退出按钮的设置
var layer = layui.layer;
$('#btnLogout').on('click',function(){
    // alert(11)
    // 弹出询问框
    layer.confirm('是否退出?', {icon: 3, title:'提示'}, function(index){
        //do something
        localStorage.removeItem('token')
        location.href='/login.html'
        layer.close(index);
      });
 
})
})
