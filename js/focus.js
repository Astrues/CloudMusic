window.addEventListener("load", () => {
    const arrow_l = document.querySelector(".arrow-l");
    const arrow_r = document.querySelector(".arrow-r");
    const big_r = document.querySelector(".big-r");
    const focus = big_r.querySelector(".focus");
    const ul = focus.querySelector("ul");
    const focusImg = ul.querySelector("li");
    const ol = big_r.querySelector(".circle");
    var liWidth = focusImg.offsetWidth;
    // 鼠标经过按钮显示 停止自动轮播
    focus.addEventListener("mouseenter", () => {
        arrow_l.style.display = "block";
        arrow_r.style.display = "block";
        clearInterval(timer);
        timer = null;
    });
    // 鼠标离开按钮消失 开启自动轮播
    focus.addEventListener("mouseleave", () => {
        arrow_l.style.display = "none";
        arrow_r.style.display = "none";
        timer = setInterval(() => {
            arrow_r.click();
        }, 3000);
    });
    for (let i = 0; i < ul.children.length; i++) {
        // 创建小li
        let li = document.createElement("li");
        // 记录当前校园前的索引号 
        li.setAttribute("index", i);
        // 把小li插入ol
        ol.appendChild(li);
        // 小圆圈点击变底色
        li.addEventListener('click', function() {
            // 排它思想
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            this.className = 'current';
            var index = this.getAttribute('index');
            // 将li的索引号给num
            num = index;
            // 将li的索引号给circle
            circle = index;
            // 点击小圆圈，移动图片
            animate(ul, -liWidth * index);
        })
    }
    // 把ol里面的第一个小li设置类名为 current
    ol.children[0].className = "current";
    // 点击右侧按钮，图片滚动一张
    var num = 0;
    // circle 控制小圆圈的播放
    var circle = 0;
    // flag 节流阀
    var flag = true;
    arrow_r.addEventListener("click", () => {
        if (flag) {
            flag = false; //关闭节流阀
            // 如果走到了最后一张复制的图片，此时我们ul要快速复原
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -liWidth * num, () => {
                flag = true; //打开节流阀
            })
            circle++;
            if (circle == ol.children.length) {
                circle = 0;
            }
            circleChange();
        }
    })
    arrow_l.addEventListener("click", () => {
        // 如果走到了最后一张复制的图片，此时我们ul要快速复原
        if (num == 0) {
            num = ul.children.length - 1;
            ul.style.left = -liWidth * num + 'px';
        }
        num--;
        animate(ul, -liWidth * num)
        circle--;
        // if (circle < 0) {
        //     circle = ol.children.length - 1;
        // }
        circle = circle < 0 ? ol.children.length - 1 : circle;
        circleChange();
    })

    function circleChange() {
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    // 自动轮播效果
    var timer = setInterval(() => {
        arrow_r.click();
    }, 3000);
})