const rec = await fetch("http://redrock.udday.cn:2022/personalized?limit=8", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
})
const recommend = document.querySelector(".recommend");
let music = await rec.json().then(value => { return value; });
console.log(music);
for (let i = 0; i < recommend.children.length; i++) {
    recommend.children[i].querySelector("img").src = music.result[i].picUrl;
    recommend.children[i].querySelector("div").innerHTML = music.result[i].name;
    let num = music.result[i].playCount / 10000;
    recommend.children[i].querySelector("span").innerHTML = "▷ " + parseInt(num) + "万";
}
const login = document.querySelector(".log").querySelector("button");
login.addEventListener("click", async() => {
    const phone = document.querySelectorAll(".join")[0].value;
    const password = hex_md5(document.querySelectorAll(".join")[1].value);
    // const res1 = await res("/login/cellphone?phone=" + phone + "&md5_password=" + password);
    const res1 = await fetch("http://redrock.udday.cn:2022/login/cellphone?phone=" + phone + "&md5_password=" + password, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    })
    let date = await res1.json().then(date => { return date; });
    let cookie = date.cookie;
    let token = date.token;
    localStorage.setItem("tk", token);
    if (date.code !== 200) {
        alert("密码错误或该手机号未注册");
    } else {
        const res2 = await res("/user/detail?uid=" + date.account.id + "&cookie=" + cookie);
        let person = await res2.json().then(value => { return value; })
        console.log(person);
        const avatar = document.querySelector(".touxiang").querySelector("img");
        const name = document.querySelector("#login").querySelectorAll("span")[0];
        avatar.src = person.profile.avatarUrl + "?param=28y28";
        name.innerHTML = person.profile.nickname;
        const login = document.querySelector(".login");
        login.style.display = "none";
        alert("欢迎使用网易云音乐青春版\(@^0^@)/");
        const res3 = await res("/login/refresh" + "?cookie=" + cookie);
        console.log(res3.json());
        const rece = await res("/playlist/detail?id=24381616" + "&cookie=" + cookie);
        console.log(rece.json());
    }

    function res(api) {
        const a = fetch("http://redrock.udday.cn:2022/" + api, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        })
        return a;
    }
})
if (localStorage.getItem("tk")) {
    login.click();
}
// ===========================  Test ============
// const res0 = await fetch("https://netease-cloud-music-api-neon-kappa.vercel.app/login/cellphone?phone=19946894418&md5_password=8a6f2805b4515ac12058e79e66539be9", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//         "phone": "19946894418",
//         "md5_password": "8a6f2805b4515ac12058e79e66539be9",
//     })
// })
// let date = await res0.json().then(date => { return date; });
// let cookie = date.cookie;
// let token = date.token;
// const res1 = await fetch("https://netease-cloud-music-api-neon-kappa.vercel.app/user/subcount?cookie=" + cookie, {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//     },
// })
// console.log(res1.json());
// const res2 = await res("/user/detail?uid=1857911469");
// console.log(res2);
// let text = await res2.json().then(value => { return value; })
// console.log(text);
// const tx = document.querySelector(".touxiang").querySelector("img");
// tx.src = text.profile.avatarUrl + "?param=28y28";
// const zt = document.querySelector("#login").querySelectorAll("span")[0];
// zt.innerHTML = text.profile.nickname;
// const res3 = await fetch("https://netease-cloud-music-api-neon-kappa.vercel.app/login/status?cookie=" + cookie, {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//     },
// })
// console.log(res3.json());
// const jio = await res("/playlist/detail?id=7257724074?cookie=" + cookie);
// console.log(jio.json());
// /user/subcount
// 接口:https://netease-cloud-music-api-neon-kappa.vercel.app/
// 用户id：1857911469
// e4bf0812d240910b56dedf3c94e50b38263809c37f00409a3bd135acaf856829993166e004087dd3d78b6050a17a35e705925a4e6992f61d07c385928f88e8de