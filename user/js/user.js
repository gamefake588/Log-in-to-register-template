

// 按钮
const FORM_LIST = document.querySelector('.form-list').getElementsByTagName('li')

// row
const FORM_ROW = document.getElementsByName('row')

// div切换
for (let i in FORM_LIST) {
    FORM_LIST[i].onclick = () => {
        for (let j = 0; j < FORM_ROW.length; j++) {
            // FORM_ROW[j].classList.remove('user-active')
            FORM_ROW[j].style.display = 'none'
            FORM_ROW[j].style.backgroundColor = '#f5f5f5'
            FORM_LIST[j].style.backgroundColor = '#f5f5f5'
        }
        FORM_LIST[i].style.backgroundColor = '#e1e3ea'
        FORM_LIST[i].style.display = 'flex'
        FORM_ROW[i].style.display = 'flex'
        FORM_ROW[i].style.backgroundColor = '#e1e3ea'
    }
}



// 登录
const LOGIN = document.querySelector('.login-submit')
LOGIN.onclick = () => { Get_login() }

// login - ajxa
function Get_login() {

    let url = `../server/login.php`
    let data = {
        type: "login",
        email: $('#user_email').val(),
        password: $('#user_password').val(),
    }

    $.ajax({
        type: "POST",
        url: url,
        data: data,
        dataType: 'json',
        // 成功回调
        success: function (data) {
            console.log(data)
            alert(data.return_str)
            if (data.return_code === '500') return
            // 登录成功 创建session值
            sessionStorage.setItem('id', data.return_obj.id);
            sessionStorage.setItem('img', data.return_obj.img)
            sessionStorage.setItem('name', data.return_obj.name)
            window.history.go(-1)

        },
        // 错误回调
        error: function (err) {
            console.log(err)
        }
    });


}

// 注册 - 邮箱验证码
const CODE = document.querySelector('.code-submit')
CODE.onclick = () => {
    alert("暂停使用")
}

function Get_code() {

    let url = `../server/login.php`
    let data = {
        type: "code",
        email: $('#user_rg_email').val(),
    }

    $.ajax({
        type: "POST",
        url: url,
        data: data,
        dataType: 'json',
        // 成功回调
        success: function (data) {
            console.log(data)
            alert(data.return_str)
            if (data.return_code === '500') return
            // 发送成功

        },
        // 错误回调
        error: function (err) {
            console.log(err)
        }
    });

}

// 注册
const REGISTER = document.querySelector('.register-submit')
REGISTER.onclick = () => {
    let up_user = document.querySelector('.form-up-user')
    let up_img = document.querySelector('.form-up-img')
    up_user.style.opacity = '0'
    up_img.style.right = '7.5rem'
}

function Get_register() {

    let url = `../server/login.php`
    let data = {
        type: "register",
        name: $('#user_name').val(),
        password: $('#user_rg_pass').val(),
        email: $('#user_rg_email').val(),
        code: $('#user_code').val(),
    }

    $.ajax({
        type: "POST",
        url: url,
        data: data,
        dataType: 'json',
        // 成功回调
        success: function (data) {
            console.log(data)
            alert(data.return_str)
            if (data.return_code === '500') return
            // 注册成功
            sessionStorage.setItem('id', data.return_id);
            let up_user = document.querySelector('.form-up-user')
            let up_img = document.querySelector('.form-up-img')
            up_user.style.opacity = '0'
            up_img.style.right = '7.5rem'

        },
        // 错误回调
        error: function (err) {
            console.log(err)
        }
    });

}

// 注册头像上传
const IMG = document.querySelector('.img-submit')
IMG.onclick = () => { Get_img() }

function Get_img() {

    let url = `../server/login.php`
    var form_data = new FormData();
    if ($("#avatar_file_ImgModel2")[0].files[0] == undefined) {
        alert("请先上传您的图像:)");
        return false
    }
    form_data.append("type", "img_up");
    form_data.append("id", sessionStorage.getItem('id'));
    form_data.append("img", $("#avatar_file_ImgModel2")[0].files[0]);

    $.ajax({
        type: "POST",
        url: url,
        data: form_data,
        dataType: 'json',
        async: false,
        cache: false,
        processData: false,
        contentType: false,
        // 成功回调
        success: function (data) {
            console.log(data)
            alert(data.return_str)
            if (data.return_code === '500') return
            // 上传成功
            window.location.reload()

        },
        // 错误回调
        error: function (err) {
            console.log(err)
        }
    });

}


// 头像预览
$("#avatar_file_ImgModel2").change(function () {
    // 获取上传文件对象
    var file = $(this)[0].files[0];
    // 读取文件URL
    var reader = new FileReader();
    reader.readAsDataURL(file);
    // 阅读文件完成后触发的事件
    reader.onload = function () {
        // 读取的URL结果：this.result
        $("#user_ImgModel2").attr("src", this.result);
    }
});