const itemk = document.querySelector(".item").querySelectorAll("span");
const track = document.querySelector(".track");
const comments = document.querySelector(".comments");
const subscribers = document.querySelector(".subscribers");
const arr = [track, comments, subscribers];
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
});
// 点击打开播放列表，并且点击歌单里面的+可以添加歌曲到播放列表
let vlog = true
document.querySelector(".musics").addEventListener("click", () => {
    if (vlog) {
        document.querySelector(".studio").style.display = 'block';
        vlog = false;
    } else {
        document.querySelector(".studio").style.display = 'none';
        vlog = true;
    }
});
document.querySelector(".bofang").addEventListener("click", () => {

});
// 轮播图
const banner = await res("/banner");
const ban = await banner.json().then(value => { return value })
console.log(ban);
for (let i = 0; i < ban.banners.length; i++) {
    document.querySelector(".focus").querySelector("ul").querySelectorAll("li")[i].querySelector("a").querySelector("img").src = ban.banners[i].imageUrl + "?param=720y280";
    document.querySelector(".focus").querySelector("ul").querySelectorAll("li")[i].querySelector("span").innerHTML = ban.banners[i].typeTitle;
}
// 克隆第一张图片，放到ul最后面
const first = document.querySelector(".focus").querySelector("ul").children[0].cloneNode(true);
document.querySelector(".focus").querySelector("ul").appendChild(first);
// 推荐歌单
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
// 播放器
const res5 = await muss("1472599278");
const res6 = await mus("1472599278");
console.log(res5);
const play = document.querySelector(".ooo");
const audio = document.querySelector("#audio");
console.log(audio);
var flag = true;
audio.src = res5.data[0].url;
document.querySelector(".item1").querySelectorAll("span")[0].querySelector("img").src = res6.songs[0].al.picUrl;
// 播放暂停
var timer1 = setTimeout(() => {
    console.log(audio.duration);
    document.querySelector(".end").innerHTML = getMuc(audio.duration);
}, 1000);
var timer2;
play.addEventListener("click", () => {
    if (flag) {
        flag = false
        play.querySelector("img").src = "upload/播放.png"
        timer2 = setInterval(() => {
            console.log(audio.currentTime);
            document.querySelector(".start").innerHTML = getMuc(audio.currentTime);
        }, 1000);
        audio.play();
    } else {
        audio.pause();
        flag = true;
        play.querySelector("img").src = "upload/暂停1.png"
        clearInterval(timer2);
    }

})

// 点击歌单获取歌单详细内容(未登录)
const recom = document.querySelector(".recom");
const introduce = document.querySelector(".introduce");
const icon2 = document.querySelector(".icon2");
for (let i = 0; i < recommend.children.length; i++) {
    recommend.children[i].addEventListener("click", async() => {
        document.querySelector(".find").style.display = 'none'
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
        comments.querySelectorAll("h5")[1].innerHTML = "最新评论(" + limit + ")";
        console.log(limit);
        itemk[1].innerHTML = "评论(" + limit + ")";
        const ra = await res("/comment/playlist?&limit=" + limit + "&id=" + music.result[i].id);
        const ra1 = await ra.json().then(value => { return value });
        console.log(ra1);
        // 评论内容
        const say1 = document.querySelector(".say1");
        const say2 = document.querySelector(".say2");
        // (1).精彩评论
        if (ra1.hotComments.length === 0) {
            document.querySelectorAll("h5")[0].style.display = 'none';
        }
        for (let i = 0; i < ra1.hotComments.length; i++) {
            let li = document.createElement("li");
            for (let i = 0; i < 7; i++) {
                let span = document.createElement("span");
                li.appendChild(span);
            }
            say1.appendChild(li);
            let img = document.createElement("img");
            say1.querySelectorAll("li")[i].querySelectorAll("span")[0].appendChild(img);
            say1.querySelectorAll("li")[i].querySelectorAll("span")[0].querySelector("img").src = ra1.hotComments[i].user.avatarUrl + "?param=36y36";
            say1.querySelectorAll("li")[i].querySelectorAll("span")[1].innerHTML = ra1.hotComments[i].user.nickname + ":";
            say1.querySelectorAll("li")[i].querySelectorAll("span")[2].innerHTML = ra1.hotComments[i].content;
            say1.querySelectorAll("li")[i].querySelectorAll("span")[3].innerHTML = getT(ra1.hotComments[i].time);
            say1.querySelectorAll("li")[i].querySelectorAll("span")[4].innerHTML = "举报";
            say1.querySelectorAll("li")[i].addEventListener("mouseover", () => {
                say1.querySelectorAll("li")[i].querySelectorAll("span")[4].style.display = 'block'
            })
            say1.querySelectorAll("li")[i].addEventListener("mouseout", () => {
                say1.querySelectorAll("li")[i].querySelectorAll("span")[4].style.display = 'none'
            })
        }
        // (2).最新评论
        if (ra1.comments.length === 0) {
            document.querySelectorAll("h5")[1].style.display = 'none';
        }
        for (let i = 0; i < ra1.comments.length; i++) {
            let li = document.createElement("li");
            for (let i = 0; i < 7; i++) {
                let span = document.createElement("span");
                li.appendChild(span);
            }
            say2.appendChild(li);
            let img = document.createElement("img");
            say2.querySelectorAll("li")[i].querySelectorAll("span")[0].appendChild(img);
            say2.querySelectorAll("li")[i].querySelectorAll("span")[0].querySelector("img").src = ra1.comments[i].user.avatarUrl + "?param=36y36";
            say2.querySelectorAll("li")[i].querySelectorAll("span")[1].innerHTML = ra1.comments[i].user.nickname + ":";
            say2.querySelectorAll("li")[i].querySelectorAll("span")[2].innerHTML = ra1.comments[i].content;
            say2.querySelectorAll("li")[i].querySelectorAll("span")[3].innerHTML = getT(ra1.comments[i].time);
            say2.querySelectorAll("li")[i].querySelectorAll("span")[4].innerHTML = "举报";
            say2.querySelectorAll("li")[i].addEventListener("mouseover", () => {
                say2.querySelectorAll("li")[i].querySelectorAll("span")[4].style.display = 'block'
            })
            say2.querySelectorAll("li")[i].addEventListener("mouseout", () => {
                say2.querySelectorAll("li")[i].querySelectorAll("span")[4].style.display = 'none'
            })
        }
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
            console.log(musc);
            let mmm = document.querySelector("tbody").querySelectorAll("tr")[i].querySelector("td").querySelectorAll("span");
            if ((i + 1) < 10) {
                mmm[0].innerHTML = "0" + (i + 1);
            } else {
                mmm[0].innerHTML = (i + 1);
            }
            mmm[1].innerHTML = "ღ";
            mmm[2].innerHTML = "↓";
            mmm[3].innerHTML = musc.songs[0].name;
            // 多个歌手判断
            function nn() {
                let sum;
                for (let i = 1; i < musc.songs[0].ar.length; i++) {
                    sum += " / " + musc.songs[0].ar[i].name
                }
                if (musc.songs[0].ar.length === 1) {
                    return musc.songs[0].ar[0].name;
                } else {
                    return musc.songs[0].ar[0].name + sum;
                }
            }
            mmm[4].innerHTML = nn();
            mmm[5].innerHTML = musc.songs[0].al.name;
            const time = await muss(re1.playlist.trackIds[i].id);
            console.log(time);
            document.querySelector(".audio").src = time.data[0].url;
            setTimeout(() => {
                mmm[6].innerHTML = getMuc(document.querySelector(".audio").duration);
            }, 1000);
        }
        for (let i = 0; i < re1.playlist.trackIds.length; i++) {

        }
        // 点击歌单歌曲更换播放器内容并播放
        for (let i = 0; i < re1.playlist.trackIds.length; i++) {
            tbody.querySelectorAll("tr")[i].addEventListener("click", async() => {
                const musc = await mus(re1.playlist.trackIds[i].id);
                console.log(musc.songs[0].al.picUrl);
                document.querySelector(".item1").querySelectorAll("span")[0].querySelector("img").src = musc.songs[0].al.picUrl;
                document.querySelectorAll(".im")[0].innerHTML = musc.songs[0].name;
                document.querySelector(".act").innerHTML = musc.songs[0].ar[0].name;
                const jjj = await muss(re1.playlist.trackIds[i].id);
                console.log(jjj);
                audio.src = jjj.data[0].url;
                clearInterval(timer2);
                flag = true;
                play.click();

                await setTimeout(() => {
                    audio.play();
                }, 2000)
                setTimeout(() => {
                    console.log(audio.duration);
                    document.querySelector(".end").innerHTML = getMuc(audio.duration);
                }, 1000);
            })
        }
    })
}
// 歌单评论
const text = document.querySelector(".text");
comments.querySelectorAll("span")[0].addEventListener("click", () => {
    text.value = "@"
});
comments.querySelectorAll("span")[1].addEventListener("click", () => {
    text.value = "#输入想说的话题#";
});

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
});

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
// 获取音乐url
async function muss(id) {
    const a = await fetch("http://redrock.udday.cn:2022/song/url?id=" + id);
    return a.json().then(value => { return value });
}
// 获得音乐时间
// (1).获得总时长
function duration() {
    setTimeout(() => {
        return audio.duration;
    }, 1000);
}
// (2).获得当前播放的时长
function currentTime() {
    setTimeout(() => {
        setInterval(() => {
            return audio.currentTime;
        }, 2000);
    }, 2000);
}
// 通过歌曲id获得歌曲的详细信息(用的上的)并做成数值或者对象优化以下冗杂的代码,寄！！！！！明天记得写
// ===========================  Test ============
// 接口:http://redrock.udday.cn:2022