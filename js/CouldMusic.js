const itemk = document.querySelector(".item").querySelectorAll("span");
const track = document.querySelector(".track");
const comments = document.querySelector(".comments");
const subscribers = document.querySelector(".subscribers");
const arr = [track, comments, subscribers];
console.log(arr[1]);
console.log(itemk.length);
for (let i = 0; i < itemk.length; i++) {
    itemk[i].addEventListener("click", () => {
        for (let i = 0; i < itemk.length; i++) {
            arr[i].style.display = 'none'
            itemk[i].className = '';
        }
        itemk[i].className = 'itemk';
        arr[i].style.display = 'block';
    })

}
const rec = await fetch("http://redrock.udday.cn:2022/personalized?limit=8", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
})
const recommend = document.querySelector(".recommend");
let music = await rec.json().then(value => { return value; });
console.log(music);
recommend.children[0].querySelector("img").src = "../upload/推荐歌曲.png";
recommend.children[0].querySelector("span").innerHTML = "每日歌曲推荐";
for (let i = 0; i < recommend.children.length; i++) {
    recommend.children[i].querySelector("img").src = music.result[i].picUrl;
    recommend.children[i].querySelector("div").innerHTML = music.result[i].name;
    let num = music.result[i].playCount / 10000;
    recommend.children[i].querySelector("span").innerHTML = "▷ " + parseInt(num) + "万";
}
// 点击歌单获取歌单详细内容(未登录)
const recom = document.querySelector(".recom");
const introduce = document.querySelector(".introduce");
const icon2 = document.querySelector(".icon2");
for (let i = 1; i < recommend.children.length; i++) {
    recommend.children[i].addEventListener("click", async() => {
        recommend.style.display = 'none';
        recom.style.display = 'block';
        const re = await res("/playlist/detail?s=30&id=" + music.result[i].id);
        const re1 = await re.json().then(value => { return value });
        console.log(re1);
        introduce.querySelectorAll("div")[0].querySelector("img").src = re1.playlist.coverImgUrl + "?param=184y184";
        icon2.querySelectorAll("li")[0].querySelectorAll("span")[1].innerHTML = re1.playlist.name;
        icon2.querySelectorAll("li")[1].querySelectorAll("a")[0].querySelector("img").src = re1.playlist.creator.avatarUrl + "?param=24y24";
        icon2.querySelectorAll("li")[1].querySelectorAll("a")[1].innerHTML = re1.playlist.creator.nickname;
        icon2.querySelectorAll("li")[1].querySelector("span").innerHTML = getTime(re1.playlist.createTime);
        icon2.querySelectorAll("li")[2].querySelectorAll("span")[1].querySelector("div").innerHTML = "+收藏(" + re1.playlist.subscribedCount + ")";
        icon2.querySelectorAll("li")[2].querySelectorAll("span")[2].querySelector("div").innerHTML = "📣分享(" + re1.playlist.shareCount + ")";
        for (let i = 0; i < re1.playlist.tags.length; i++) {
            icon2.querySelectorAll("li")[3].querySelectorAll("a")[i].innerHTML = re1.playlist.tags[i];
        }
        icon2.querySelectorAll("li")[4].querySelectorAll("span")[0].innerHTML = re1.playlist.trackCount;
        icon2.querySelectorAll("li")[4].querySelectorAll("span")[1].innerHTML = parseInt(re1.playlist.playCount / 10000) + "万";
        icon2.querySelectorAll("li")[5].querySelector("span").innerHTML = re1.playlist.description;
        // document.querySelector(".subscribers").querySelector("img").src = re1.playlist.subscribers[0].avatarUrl + "?param=90y90"
        const limit = re1.playlist.commentCount;
        console.log(limit);
        itemk[1].innerHTML = "评论(" + limit + ")";
        const ra = await res("/comment/playlist?limit=" + limit + "&id=" + music.result[i].id);
        const ra1 = await ra.json().then(value => { return value });
        console.log(ra1);
        const tbody = document.querySelector("tbody");
        for (let i = 0; i < re1.playlist.trackIds.length; i++) {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            for (let i = 0; i < 7; i++) {
                let span = document.createElement("span");
                td.appendChild(span);
            }
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
        for (let i = 0; i < re1.playlist.trackIds.length; i++) {
            const musc = await mus(re1.playlist.trackIds[i].id);
            let mmm = document.querySelector("tbody").querySelectorAll("tr")[i].querySelector("td").querySelectorAll("span");
            if (i < 10) {
                mmm[0].innerHTML = "0" + i;
            } else {
                mmm[0].innerHTML = i;
            }
            mmm[1].innerHTML = "ღ";
            mmm[2].innerHTML = "↓";
            mmm[3].innerHTML = musc.songs[0].name;
            mmm[4].innerHTML = musc.songs[0].ar[0].name;
            mmm[5].innerHTML = musc.songs[0].al.name;
            mmm[6].innerHTML = '00:00'
        }
    })
}
// 搜索模块
const search = document.querySelector(".search");

document.addEventListener("keyup", async(e) => {
        if (e.keyCode === 13) {
            const sear = await res("/cloudsearch?keywords=" + search.value);
            console.log(sear.json());
        }
    })
    // 登录模块
const login = document.querySelector(".log").querySelector("button");
login.addEventListener("click", async() => {
    const phone = document.querySelectorAll(".join")[0].value;
    const password = hex_md5(document.querySelectorAll(".join")[1].value);
    // const res1 = await res("/login/cellphone?phone=" + phone + "&md5_password=" + password);
    // const res1 = await fetch("http://redrock.udday.cn:2022/login/cellphone?phone=" + phone + "&md5_password=" + password, {
    const res1 = await fetch("http://redrock.udday.cn:2022/login/cellphone?phone=19946894418&md5_password=8a6f2805b4515ac12058e79e66539be9", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // credentials: 'include'
    })

    let date = await res1.json().then(date => { return date; });
    console.log(date);
    let cookie = date.cookie;
    let token = date.token;
    const res0 = await res("/login/refresh?cookie=" + cookie);
    console.log(res0.json());
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
        // alert("欢迎使用网易云音乐青春版\(@^0^@)/");
        // 每日歌曲推荐
        const res3 = await res("/recommend/songs" + "?cookie=" + cookie);
        console.log(res3.json());
        // 每日推荐歌单
        const res4 = await res("/recommend/resource?cookie=" + cookie);
        const music1 = await res4.json(value => { return value });
        console.log(music1);
        for (let i = 1; i < recommend.children.length; i++) {
            recommend.children[i].querySelector("img").src = music1.recommend[i - 1].picUrl;
            recommend.children[i].querySelector("div").innerHTML = music1.recommend[i - 1].name;
            recommend.children[0].querySelector('div').innerHTML = ""
            let num = music1.recommend[i - 1].playcount / 10000;
            recommend.children[i].querySelector("span").innerHTML = "▷ " + parseInt(num) + "万";
        }
    }
})


// 播放器
const res5 = await res("/song/url?id=33894312");
const ge = await res5.json(value => { return value; })
console.log(ge.data[0].url);
const play = document.querySelector(".ooo");
const audio = document.querySelector("#audio");
console.log(audio);
var flag = true;
audio.src = ge.data[0].url;
// 播放暂停
play.addEventListener("click", () => {
    if (flag) {
        audio.play();
        flag = false
        play.querySelector("img").src = "upload/播放.png"
    } else {
        audio.pause();
        flag = true;
        play.querySelector("img").src = "upload/暂停1.png"
    }

})

function res(api) {
    const a = fetch("http://redrock.udday.cn:2022" + api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // credentials: 'include'
    })
    return a;
}
// 获取歌曲详细信息
async function mus(ids) {
    const a = await fetch("http://redrock.udday.cn:2022/song/detail?ids=" + ids);
    return a.json().then(value => { return value });
}
// ===========================  Test ============
// 接口:http://redrock.udday.cn:2022