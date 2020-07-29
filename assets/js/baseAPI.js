// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url
  // 统一请求头
  if (options.url.indexOf('/my') !== -1) {
    options.complete = function (xhr) {
      // 判断,如果获取用户信息失败,说明该用户没有登录, 那么跳转到login.html
      // console.log(xhr)
      if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === "身份认证失败！") {
        location.href = "/login.html"
      }
    }
    // headers配置请求头
    options.headers = {
      Authorization: localStorage.getItem('token')
    }
  }

})