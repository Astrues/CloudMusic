window.addEventListener("load", () => {
    const login = document.querySelector(".login");
    const join = login.querySelector("#join");
    const logo = document.querySelector(".logo");
    const wx = logo.querySelectorAll('img')[0];
    const qq = logo.querySelectorAll('img')[1];
    const toilet = logo.querySelectorAll('img')[2];
    const wy = logo.querySelectorAll('img')[3];
    const top = login.querySelector(".top");
    const going = document.querySelector("#login");
    const out = login.querySelector(".out");
    const tx = document.querySelector(".touxiang");
    var num = 0;
    tx.addEventListener("click", () => {
        login.style.display = "block";
    })
    going.addEventListener("click", () => {
        login.style.display = "block";
    })
    out.addEventListener("click", () => {
        login.style.display = "none";
    })
    join.addEventListener("click", () => {
        num++;
        if (num % 2 == 0) {
            join.src = '../upload/自动登录.png';
        } else {
            join.src = '../upload/不自动登录.png';
        }
        console.log(num);
    })
    wx.addEventListener("mouseenter", () => {
        wx.src = "./upload/微信2.png"
    })
    wx.addEventListener("mouseleave", () => {
        wx.src = "./upload/微信1.png"
    })
    qq.addEventListener("mouseenter", () => {
        qq.src = "./upload/qq2.png"
    })
    qq.addEventListener("mouseleave", () => {
        qq.src = "./upload/qq1.png"
    })
    toilet.addEventListener("mouseenter", () => {
        toilet.src = "./upload/厕所2.png"
    })
    toilet.addEventListener("mouseleave", () => {
        toilet.src = "./upload/厕所1.png"
    })
    wy.addEventListener("mouseenter", () => {
        wy.src = "./upload/网易2.png"
    })
    wy.addEventListener("mouseleave", () => {
        wy.src = "./upload/网易1.png"
    })
    top.addEventListener("mousedown", (e) => {
        var x = e.pageX - login.offsetLeft;
        var y = e.pageY - login.offsetTop;
        // (2) 鼠标移动的时候，把鼠标在页面中的坐标，减去 鼠标在盒子内的坐标就是模态框的left和top值
        document.addEventListener('mousemove', move)

        function move(e) {
            login.style.left = e.pageX - x + 'px';
            login.style.top = e.pageY - y + 'px';
        }
        // (3) 鼠标弹起，就让鼠标移动事件移除
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', move);
        })
    })
})