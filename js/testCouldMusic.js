//获取时间戳
function timestamp() {
    return new Date().getTime();
}
//更换推荐歌单的图片与文字
const rec = await fetch("http://redrock.udday.cn:2022/personalized?limit=8", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
    credentials: 'include'
})
const recommend = document.querySelector(".recommend");
let music = await rec.json().then(value => { return value; });
for (let i = 0; i < recommend.children.length; i++) {
    recommend.children[i].querySelector("img").src = music.result[i].picUrl;
    recommend.children[i].querySelector("div").innerHTML = music.result[i].name;
    let num = music.result[i].playCount / 10000;
    recommend.children[i].querySelector("span").innerHTML = "▷ " + parseInt(num) + "万";
}
//登录操作
const login = document.querySelector(".log").querySelector("button");
const phone = document.querySelectorAll(".join")[0].value;
const password = hex_md5(document.querySelectorAll(".join")[1].value);
// 1.登录
const res1 = await fetch("http://redrock.udday.cn:2022/login/cellphone?phone=19946894418&md5_password=8a6f2805b4515ac12058e79e66539be9", {
    method: "POST",
})
const data = await res1.json().then(value => { return value });
console.log(data);
const cookie
const res2 = await fetch("http://redrock.udday.cn:2022/login/refresh", {
    method: "GET",
})
console.log(res2.json());
// console.log(res2.json());