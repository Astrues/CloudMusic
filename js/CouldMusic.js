const itemk = document.querySelector(".item").querySelectorAll("span");
const track = document.querySelector(".track");
const comments = document.querySelector(".comments");
const subscribers = document.querySelector(".subscribers");
const arr = [track, comments, subscribers];
var page = document.querySelector(".page");
const tbody = document.querySelector("tbody");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
var l, r;
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
document.querySelector(".lg").addEventListener("click", () => {
    // alert(1)
    document.querySelector(".big-r").style.display = 'block';
    document.querySelector(".find").style.display = 'block';
    document.querySelector(".r").style.display = 'none';
    document.querySelector(".decial").style.display = 'none';
    // document.querySelector(".serde").style.display = 'none';
    document.querySelector(".park").style.display = 'none';
    // document.querySelector(".lect").style.display = 'none';
    // document.querySelector(".scc").style.display = 'none';
    // document.querySelector(".recom").style.display = 'none';
    recom.style.display = 'none';
    document.querySelector(".recommend").style.display = 'block';
    document.querySelector(".recommend").style.display = 'flex';
})
const rec = await fetch("http://redrock.udday.cn:2022/personalized?limit=8", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
});
// 登录模块
var jack = false;
var acound;
var cookie;
var like = false;
const login = document.querySelector(".log").querySelector("button");
login.addEventListener("click", async() => {
    jack = true;
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
    cookie = date.cookie;
    let token = date.token;
    const res0 = await res("/login/refresh?cookie=" + cookie);
    if (date.code !== 200) {
        alert("密码错误或该手机号未注册");
    } else {
        const res2 = await res("/user/detail?uid=" + date.account.id + "&cookie=" + cookie);
        let person = await res2.json().then(value => { return value; })
        const avatar = document.querySelector(".touxiang").querySelector("img");
        const name = document.querySelector("#login").querySelectorAll("span")[0];
        avatar.src = person.profile.avatarUrl + "?param=28y28";
        name.innerHTML = person.profile.nickname;
        const login = document.querySelector(".login");
        login.style.display = "none";
        // alert("欢迎使用网易云音乐青春版\(@^0^@)/");
        // 每日歌曲推荐
        const res3 = await res("/recommend/songs" + "?cookie=" + cookie);
        // 每日推荐歌单
        const res4 = await res("/recommend/resource?cookie=" + cookie);
        const music1 = await res4.json(value => { return value });
        const acoun = await res("/user/playlist?uid=1857911469");
        acound = await acoun.json();
        for (let i = 1; i < acound.playlist.length; i++) {
            let li = document.createElement("li");
            lect.appendChild(li);
            lect.querySelectorAll("li")[i].innerHTML = acound.playlist[i].name;
        }
        for (let i = 0; i < acound.playlist.length; i++) {
            lect.querySelectorAll("li")[i].addEventListener("click", async() => {
                for (let i = 0; i < lect.querySelectorAll("li").length; i++) {
                    lect.querySelectorAll("li")[i].style.backgroundColor = "#ffffff";
                }
                lect.querySelectorAll("li")[i].style.backgroundColor = "#f5f5f6";
                document.querySelector(".recommend").style.display = 'none';
                if (like) {
                    for (let i = 0; i < tbody.querySelectorAll("tr").length; i++) {
                        tbody.querySelectorAll("tr")[i].parentNode.removeChild(tbody.querySelectorAll("tr")[i]);
                        like = false;
                    }
                }
                like = true;
                recom.style.display = 'block';
                const re5 = await res("/playlist/detail?s=30&id=" + acound.playlist[i].id + "&cookie=" + cookie);
                const rea5 = await re5.json();
                introduce.querySelectorAll("div")[0].querySelector("img").src = rea5.playlist.coverImgUrl + "?param=184y184";
                icon2.querySelectorAll("li")[0].querySelectorAll("span")[1].innerHTML = rea5.playlist.name;
                icon2.querySelectorAll("li")[1].querySelectorAll("a")[0].querySelector("img").src = rea5.playlist.creator.avatarUrl + "?param=24y24";
                icon2.querySelectorAll("li")[1].querySelectorAll("a")[1].innerHTML = rea5.playlist.creator.nickname;
                icon2.querySelectorAll("li")[1].querySelector("span").innerHTML = getTime(rea5.playlist.createTime);
                icon2.querySelectorAll("li")[2].querySelectorAll("span")[1].querySelector("div").innerHTML = "+收藏(" + rea5.playlist.subscribedCount + ")";
                icon2.querySelectorAll("li")[2].querySelectorAll("span")[2].querySelector("div").innerHTML = "📣分享(" + rea5.playlist.shareCount + ")";
                for (let i = 0; i < rea5.playlist.tags.length; i++) {
                    icon2.querySelectorAll("li")[3].querySelectorAll("a")[i].innerHTML = rea5.playlist.tags[i];
                }
                icon2.querySelectorAll("li")[4].querySelectorAll("span")[0].innerHTML = rea5.playlist.trackCount;
                icon2.querySelectorAll("li")[4].querySelectorAll("span")[1].innerHTML = rea5.playlist.playCount;
                icon2.querySelectorAll("li")[5].querySelector("span").innerHTML = rea5.playlist.description;
                for (let i = 0; i < rea5.playlist.tags.length; i++) {
                    icon2.querySelectorAll("li")[3].querySelectorAll("a")[i].innerHTML = rea5.playlist.tags[i];
                }
                icon2.querySelectorAll("li")[4].querySelectorAll("span")[0].innerHTML = rea5.playlist.trackCount;
                icon2.querySelectorAll("li")[4].querySelectorAll("span")[1].innerHTML = parseInt(rea5.playlist.playCount / 10000) + "万";
                icon2.querySelectorAll("li")[5].querySelector("span").innerHTML = rea5.playlist.description;
                // document.querySelector(".subscribers").querySelector("img").src = re1.playlist.subscribers[0].avatarUrl + "?param=90y90"
                const limit = rea5.playlist.commentCount;
                comments.querySelectorAll("h5")[1].innerHTML = "最新评论(" + limit + ")";
                itemk[1].innerHTML = "评论(" + limit + ")";
                const ra = await res("/comment/playlist?&limit=" + limit + "&id=" + acound.playlist[i].id + "&cookie=" + cookie);
                const ra1 = await ra.json().then(value => { return value });
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
                for (let i = 0; i < rea5.playlist.trackIds.length; i++) {
                    let tr = document.createElement("tr");
                    let td = document.createElement("td");
                    for (let i = 0; i < 7; i++) {
                        let span = document.createElement("span");
                        td.appendChild(span);
                    }
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                }
                for (let i = 0; i < rea5.playlist.trackIds.length; i++) {
                    const musc = await musSay(rea5.playlist.trackIds[i].id);
                    const mmm = document.querySelector("tbody").querySelectorAll("tr")[i].querySelector("td").querySelectorAll("span");
                    if ((i + 1) < 10) {
                        mmm[0].innerHTML = "0" + (i + 1);
                    } else {
                        mmm[0].innerHTML = (i + 1);
                    }
                    document.querySelector(".audio").src = musc.url;
                    document.querySelector(".audio").addEventListener("canplaythrough", () => {
                        mmm[6].innerHTML = getMuc(document.querySelector(".audio").duration);
                    })
                    mmm[1].innerHTML = "ღ";
                    mmm[2].innerHTML = "↓";
                    mmm[3].innerHTML = musc.name;
                    mmm[4].innerHTML = musc.acname;
                    mmm[5].innerHTML = musc.nikname;
                    // mmm[6].innerHTML = musc.time;
                }
                // 点击歌单歌曲更换播放器内容并播放
                let x;
                for (let i = 0; i < rea5.playlist.trackIds.length; i++) {
                    tbody.querySelectorAll("tr")[i].addEventListener("click", async() => {
                        x = i;
                        const musc = await mus(rea5.playlist.trackIds[i].id);
                        document.querySelector(".item1").querySelectorAll("span")[0].querySelector("img").src = musc.songs[0].al.picUrl;
                        document.querySelectorAll(".im")[0].innerHTML = musc.songs[0].name;
                        document.querySelector(".act").innerHTML = musc.songs[0].ar[0].name;
                        const jjj = await muss(rea5.playlist.trackIds[i].id);
                        audio.src = jjj.data[0].url;
                        audio.addEventListener("canplaythrough", async() => {
                            clearInterval(timer2);
                            flag = true;
                            play.click();
                            audio.play();
                            document.querySelector(".end").innerHTML = getMuc(audio.duration);
                        })
                    })
                }
                // (1).上一首
                let trs = tbody.querySelectorAll("tr");
                left.addEventListener("click", async() => {
                    if (x == 0) {
                        trs[trs.length - 1].click();
                    } else {
                        trs[x - 1].click();
                    }
                });
                // (2).下一首
                right.addEventListener("click", () => {
                    if (x == trs.length - 1) {
                        trs[0].click();
                    } else {
                        trs[x + 1].click();
                    }
                });
                //自动播放下一首 不行
                // if (parseInt(audio.duration) == parseInt(audio.currentTime)) {
                //     alert(1)
                //     right.click();
                // }
            })
        }
    }
});
// 我的歌单
const lec = document.querySelector(".lec");
const lect = document.querySelector(".lect");
var lo = true;
lec.addEventListener("click", () => {
    if (lo) {
        lect.style.display = "block";
        lec.innerHTML = "创建的歌单 ∨"
        lo = false
    } else {
        lect.style.display = "none";
        lec.innerHTML = "创建的歌单 >"
        lo = true;
    }
});
lect.querySelectorAll("li")[0].addEventListener("click", async() => {
    if (jack == false) {
        alert("请先登录");
    }
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
    const trs = document.querySelector(".trackIds").querySelector("tbody").querySelectorAll("tr");
    document.querySelector("tbody").querySelectorAll("tr")[0].click();
    document.querySelector(".studio").querySelectorAll("span")[0].innerHTML = "共" + trs.length + "首";
    for (let i = 0; i < trs.length; i++) {
        let p = document.createElement("p");
        for (let i = 0; i < 5; i++) {
            let span = document.createElement("span");
            p.appendChild(span);
        }
        page.appendChild(p);
        page.querySelectorAll("p")[i].querySelectorAll("span")[0].innerHTML = trs[i].querySelector("td").querySelectorAll("span")[3].innerText;
        page.querySelectorAll("p")[i].querySelectorAll("span")[1].innerHTML = " SQ";
        page.querySelectorAll("p")[i].querySelectorAll("span")[2].innerHTML = trs[i].querySelector("td").querySelectorAll("span")[4].innerText;
        page.querySelectorAll("p")[i].querySelectorAll("span")[3].innerHTML = "🔗";
        page.querySelectorAll("p")[i].querySelectorAll("span")[4].innerHTML = trs[i].querySelector("td").querySelectorAll("span")[6].innerText;
    };
    for (let i = 0; i < trs.length; i++) {
        document.querySelector(".page").querySelectorAll("p")[i].addEventListener("click", () => {
            document.querySelector("tbody").querySelectorAll("tr")[i].click();
        })
    }
    page.querySelectorAll("div")[0].innerHTML = '';
    page.querySelectorAll("div")[1].innerHTML = '';
    page.querySelectorAll("div")[2].innerHTML = '';
});
document.querySelector(".page").innerHTML = '';
for (let i = 0; i < 3; i++) {
    let div = document.createElement("div");
    page.appendChild(div);
}
page.querySelectorAll("div")[0].innerHTML = "你还没有添加任何歌曲!";
page.querySelectorAll("div")[1].innerHTML = "去首页";
page.querySelectorAll("div")[2].innerHTML = "发现音乐";
// 点击清除播放列表
document.querySelector(".clear").addEventListener("click", () => {
    document.querySelector(".page").innerHTML = '';
    for (let i = 0; i < 3; i++) {
        let div = document.createElement("div");
        page.appendChild(div);
    }
    page.querySelectorAll("div")[0].innerHTML = "你还没有添加任何歌曲!";
    page.querySelectorAll("div")[1].innerHTML = "去首页";
    page.querySelectorAll("div")[2].innerHTML = "发现音乐";
});
// 轮播图
const banner = await res("/banner");
const ban = await banner.json().then(value => { return value })
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
const play = document.querySelector(".ooo");
const audio = document.querySelector("#audio");
var flag = true;
audio.src = res5.data[0].url;
document.querySelector(".item1").querySelectorAll("span")[0].querySelector("img").src = res6.songs[0].al.picUrl;
var timer2;
document.querySelector(".end").innerHTML = "03:45";
play.addEventListener("click", () => {
    if (flag) {
        flag = false
        play.querySelector("img").src = "upload/播放.png"
        timer2 = setInterval(() => {
            document.querySelector(".start").innerHTML = getMuc(audio.currentTime);
        }, 1000);
        audio.play();
        lyric.querySelectorAll("div")[0].querySelector("img").style.animationPlayState = 'running';
    } else {
        audio.pause();
        flag = true;
        play.querySelector("img").src = "upload/暂停1.png"
        clearInterval(timer2);
        lyric.querySelectorAll("div")[0].querySelector("img").style.animationPlayState = 'paused';
    }
});
// 上一首下一首

// 点击歌单获取歌单详细内容(未登录)
const recom = document.querySelector(".recom");
const introduce = document.querySelector(".introduce");
const icon2 = document.querySelector(".icon2");
for (let i = 0; i < recommend.children.length; i++) {
    recommend.children[i].addEventListener("click", async() => {
        document.querySelector(".recommend").style.display = 'none';
        const tbody = document.querySelector("tbody");
        if (like) {
            for (let i = 0; i < tbody.querySelectorAll("tr").length; i++) {
                tbody.removeChild(tbody.querySelectorAll("tr")[i]);
                like = false;
            }
        }
        like = true;
        var j = i;
        document.querySelector(".find").style.display = 'none'
            // recommend.style.display = 'none';
        recom.style.display = 'block';
        var re1;
        if (jack) {
            const res4 = await res("/recommend/resource?cookie=" + cookie);
            const music1 = await res4.json(value => { return value });
            var re3 = await res("/playlist/detail?s=30&id=" + music1.recommend[i].id);
            re1 = await re3.json().then(value => { return value });
        } else {
            var re = await res("/playlist/detail?s=30&id=" + music.result[i].id);
            var re2 = await re.json().then(value => { return value });
            re1 = re2;
        }
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
        itemk[1].innerHTML = "评论(" + limit + ")";
        const ra = await res("/comment/playlist?&limit=" + limit + "&id=" + music.result[i].id);
        const ra1 = await ra.json().then(value => { return value });
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
            const musc = await musSay(re1.playlist.trackIds[i].id);
            const mmm = document.querySelector("tbody").querySelectorAll("tr")[i].querySelector("td").querySelectorAll("span");
            if ((i + 1) < 10) {
                mmm[0].innerHTML = "0" + (i + 1);
            } else {
                mmm[0].innerHTML = (i + 1);
            }
            document.querySelector(".audio").src = musc.url;
            document.querySelector(".audio").addEventListener("canplaythrough", () => {
                mmm[6].innerHTML = getMuc(document.querySelector(".audio").duration);
            })
            mmm[1].innerHTML = "ღ";
            mmm[2].innerHTML = "↓";
            mmm[3].innerHTML = musc.name;
            mmm[4].innerHTML = musc.acname;
            mmm[5].innerHTML = musc.nikname;
            // mmm[6].innerHTML = musc.time;
        }
        // 点击歌单歌曲更换播放器内容并播放
        let x;
        for (let i = 0; i < re1.playlist.trackIds.length; i++) {
            tbody.querySelectorAll("tr")[i].addEventListener("click", async() => {
                x = i;
                const musc = await mus(re1.playlist.trackIds[i].id);
                document.querySelector(".item1").querySelectorAll("span")[0].querySelector("img").src = musc.songs[0].al.picUrl;
                document.querySelectorAll(".im")[0].innerHTML = musc.songs[0].name;
                document.querySelector(".act").innerHTML = musc.songs[0].ar[0].name;
                const jjj = await muss(re1.playlist.trackIds[i].id);
                audio.src = jjj.data[0].url;
                audio.addEventListener("canplaythrough", async() => {
                    clearInterval(timer2);
                    flag = true;
                    play.click();
                    audio.play();
                    document.querySelector(".end").innerHTML = getMuc(audio.duration);
                })
            })
        }
        // (1).上一首
        let trs = tbody.querySelectorAll("tr");
        left.addEventListener("click", async() => {
            if (x == 0) {
                trs[trs.length - 1].click();
            } else {
                trs[x - 1].click();
            }
        });
        // (2).下一首
        right.addEventListener("click", () => {
            if (x == trs.length - 1) {
                trs[0].click();
            } else {
                trs[x + 1].click();
            }
        });
        //自动播放下一首不行
        if (parseInt(audio.duration) == parseInt(audio.currentTime)) {
            alert(1);
            right.click();
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
document.addEventListener("keyup", async function(e) {
    if (e.keyCode === 13) {
        const sear = await res("/cloudsearch?keywords=" + search.value);
        const data = await sear.json();
        document.querySelector(".recom").style.display = 'none';
        document.querySelector(".find").style.display = 'none';
        document.querySelector(".look").style.display = 'none';
        document.querySelector(".scc").style.display = 'block';
        document.querySelector(".big-r").style.display = 'none'
        document.querySelector(".scc").querySelectorAll("div")[0].innerHTML = "搜索 " + document.querySelector(".search").value;
        for (let i = 0; i < data.result.songs.length; i++) {
            let li = document.createElement("li");
            document.querySelector(".decia").appendChild(li);
            for (let i = 0; i < 8; i++) {
                let span = document.createElement("span");
                li.appendChild(span);
            }
            const hotse = await musSay(data.result.songs[i].id);
            let nnn = document.querySelector(".decia").querySelectorAll("li")[i].querySelectorAll("span");
            if ((i + 1) < 10) {
                nnn[0].innerHTML = "0" + (i + 1);
            } else {
                nnn[0].innerHTML = (i + 1);
            }
            nnn[1].innerHTML = "ღ";
            nnn[2].innerHTML = "↓";
            nnn[3].innerHTML = hotse.name;
            nnn[4].innerHTML = hotse.acname
            nnn[5].innerHTML = hotse.nikname
            nnn[6].innerHTML = await hotse.time;
            nnn[7].innerHTML = "======"
        }
        // 点击列表音乐播放
        let x;
        let lis = document.querySelector(".decia").querySelectorAll("li")
        for (let i = 0; i < lis.length; i++) {
            document.querySelector(".decia").querySelectorAll("li")[i].addEventListener("click", async() => {
                x = i;
                const hotser = await musSay(data.result.songs[i].id);
                document.querySelector(".item1").querySelectorAll("span")[0].querySelector("img").src = hotser.Picurl;
                document.querySelectorAll(".im")[0].innerHTML = hotser.name;
                document.querySelector(".act").innerHTML = hotser.acname;
                audio.src = hotser.url;
                audio.addEventListener("canplaythrough", async() => {
                    clearInterval(timer2);
                    flag = true;
                    play.click();
                    audio.play();
                    document.querySelector(".end").innerHTML = getMuc(audio.duration);
                    while (parseInt(audio.duration) === parseInt(audio.currentTime)) {
                        right.click();
                    }
                })
            })
        }
        // (1).上一首
        left.addEventListener("click", async() => {
            if (x == 0) {
                lis[lis.length - 1].click();
            } else {
                lis[x - 1].click();
            }
        });
        // (2).下一首
        right.addEventListener("click", () => {
            if (x == lis.length - 1) {
                lis[0].click();
            } else {
                lis[x + 1].click();
            }
        })

    }
});
// 搜索建议
const mult = document.querySelector(".mult")
let b;
var mt = false
search.addEventListener("focus", () => {
    document.addEventListener("keyup", async() => {
        document.querySelector(".serde").style.display = 'none';
        document.querySelector(".look").style.display = 'none';
        mult.style.display = 'block'
        const sea = await res("/search/suggest?keywords=" + search.value);
        const data = await sea.json().then(value => { return value });
        b = data;
        for (let i = 0; i < data.result.songs.length; i++) {
            if (mt) {
                mult.querySelector(".songs").querySelectorAll("li")[i].parentNode.removeChild(mult.querySelector(".songs").querySelectorAll("li")[i]);
            }
            let ac = mn(data.result.songs[i].artists);
            let li = document.createElement("li");
            mult.querySelector(".songs").appendChild(li);
            mult.querySelector(".songs").querySelectorAll("li")[i].innerHTML = data.result.songs[i].name + "-" + ac;
        }
        for (let i = 0; i < data.result.artists.length; i++) {
            if (mt) {
                mult.querySelector(".artists").querySelectorAll("li")[i].parentNode.removeChild(mult.querySelector(".artists").querySelectorAll("li")[i]);
            }
            let li = document.createElement("li");
            mult.querySelector(".artists").appendChild(li);
            mult.querySelector(".artists").querySelectorAll("li")[i].innerHTML = data.result.artists[i].name;
        }
        for (let i = 0; i < data.result.albums.length; i++) {
            if (mt) {
                mult.querySelector(".albums").querySelectorAll("li")[i].parentNode.removeChild(mult.querySelector(".albums").querySelectorAll("li")[i]);
            }
            let li = document.createElement("li");
            mult.querySelector(".albums").appendChild(li);
            mult.querySelector(".albums").querySelectorAll("li")[i].innerHTML = data.result.albums[i].name + "-" + data.result.albums[i].artist.name;
        }
        for (let i = 0; i < data.result.playlists.length; i++) {
            if (mt) {
                mult.querySelector(".playlists").querySelectorAll("li")[i].parentNode.removeChild(mult.querySelector(".playlists").querySelectorAll("li")[i]);
            }
            let li = document.createElement("li");
            mult.querySelector(".playlists").appendChild(li);
            mult.querySelector(".playlists").querySelectorAll("li")[i].innerHTML = data.result.playlists[i].name;
        }
        mt = true;
        const sg = document.querySelector(".songs").querySelectorAll("li");
        for (let i = 0; i < sg.length; i++) {
            sg[i].addEventListener("click", async() => {
                let aj = await musSay(data.result.songs[i].id)
                document.querySelector(".item1").querySelectorAll("span")[0].querySelector("img").src = aj.Picurl;
                document.querySelectorAll(".im")[0].innerHTML = aj.name;
                document.querySelector(".act").innerHTML = aj.acname;
                audio.src = aj.url;
                audio.addEventListener("canplaythrough", async() => {
                    clearInterval(timer2);
                    flag = true;
                    play.click();
                    audio.play();
                    document.querySelector(".end").innerHTML = getMuc(audio.duration);
                })
            })
        }
    })

});
// 热搜榜
const rse = await res("/search/hot/detail");
const rses = await rse.json().then(value => { return value });
const serde = document.querySelector(".serde");
const decial = document.querySelector(".decial");
const hot = document.querySelector(".hot");
for (let i = 0; i < rses.data.length; i++) {
    let li = document.createElement("li");
    for (let i = 0; i < 5; i++) {
        let span = document.createElement("span");
        li.appendChild(span);
    }
    hot.appendChild(li);
    hot.querySelectorAll("li")[i].querySelectorAll("span")[0].innerHTML = (i + 1);
    hot.querySelectorAll("li")[i].querySelectorAll("span")[1].innerHTML = rses.data[i].searchWord;
    hot.querySelectorAll("li")[i].querySelectorAll("span")[2].innerHTML = rses.data[i].score;
    hot.querySelectorAll("li")[i].querySelectorAll("span")[3].innerHTML = rses.data[i].content;
    let img = document.createElement("img");
    if (rses.data[i].iconUrl !== null) {
        hot.querySelectorAll("li")[i].querySelectorAll("span")[4].appendChild(img);
        hot.querySelectorAll("li")[i].querySelectorAll("span")[4].querySelector("img").src = rses.data[i].iconUrl + "?param=50y50";
    }
    hot.querySelectorAll("li")[i].addEventListener("click", async function() {
        document.querySelector(".recom").style.display = 'none';
        document.querySelector(".find").style.display = 'none';
        const sea = await res("/cloudsearch?keywords=" + rses.data[i].searchWord);
        let data = await sea.json().then(value => { return value });
        document.querySelector(".big-r").style.display = 'none';
        document.querySelector(".serde").style.display = 'block';
        serde.querySelectorAll("div")[0].innerHTML = "搜索 " + this.querySelectorAll("span")[1].innerText;
        for (let i = 0; i < data.result.songs.length; i++) {
            let li = document.createElement("li");
            decial.appendChild(li);
            for (let i = 0; i < 8; i++) {
                let span = document.createElement("span");
                li.appendChild(span);
            }
            const hotser = await musSay(data.result.songs[i].id);
            let nnn = decial.querySelectorAll("li")[i].querySelectorAll("span");
            if ((i + 1) < 10) {
                nnn[0].innerHTML = "0" + (i + 1);
            } else {
                nnn[0].innerHTML = (i + 1);
            }
            nnn[1].innerHTML = "ღ";
            nnn[2].innerHTML = "↓";
            nnn[3].innerHTML = hotser.name;
            nnn[4].innerHTML = hotser.acname
            nnn[5].innerHTML = hotser.nikname
            nnn[6].innerHTML = await hotser.time;
            nnn[7].innerHTML = "======"
        }
        // 点击列表音乐播放
        let x;
        let lis = decial.querySelectorAll("li")
        for (let i = 0; i < lis.length; i++) {
            document.querySelector(".decial").querySelectorAll("li")[i].addEventListener("click", async() => {
                x = i;
                const hotser = await musSay(data.result.songs[i].id);
                document.querySelector(".item1").querySelectorAll("span")[0].querySelector("img").src = hotser.Picurl;
                document.querySelectorAll(".im")[0].innerHTML = hotser.name;
                document.querySelector(".act").innerHTML = hotser.acname;
                audio.src = hotser.url;
                audio.addEventListener("canplaythrough", async() => {
                    clearInterval(timer2);
                    flag = true;
                    play.click();
                    audio.play();
                    document.querySelector(".end").innerHTML = getMuc(audio.duration);
                    while (parseInt(audio.duration) === parseInt(audio.currentTime)) {
                        right.click();
                    }
                })
            })
        }
        // (1).上一首
        left.addEventListener("click", async() => {
            if (x == 0) {
                lis[lis.length - 1].click();
            } else {
                lis[x - 1].click();
            }
        });
        // (2).下一首
        right.addEventListener("click", () => {
            if (x == lis.length - 1) {
                lis[0].click();
            } else {
                lis[x + 1].click();
            }
        })
    })
}
search.addEventListener("focus", () => {
    if (search.value == '') {
        document.querySelector(".look").style.display = "block";
    } else {
        document.querySelector(".mult").style.display = "block";
    }
});
search.addEventListener("blur", () => {
    setTimeout(() => {
        document.querySelector(".look").style.display = "none";
        mult.style.display = 'none';
    }, 500);
});
document.querySelector(".home").addEventListener("click", () => {
    document.querySelector(".serde").style.display = 'none';
});
// 歌曲详细界面
const lyric = document.querySelector(".lyric");
const nike = await res("/lyric?id=1472599278");
const mike = await nike.json();
let cb = true;
lyric.querySelectorAll("div")[0].querySelector("img").style.animationPlayState = 'paused';
document.querySelector(".musicPic").addEventListener("click", () => {
    if (cb) {
        lyric.style.display = 'block';
        document.querySelector(".lyr").innerHTML = mike.lrc.lyric;
        cb = false;
    } else {
        lyric.style.display = 'none';
        cb = true;
    }
    lyric.querySelectorAll("div")[0].querySelector("img").src = document.querySelector(".musicPic").src + "?param=300y300";
});
// 歌单广场
var find = document.querySelector(".find");
var park = document.querySelector(".park");
const ja = await res("/top/playlist/highquality");
const ja1 = await ja.json().then(value => { return value });
for (let i = 0; i < find.querySelectorAll("li").length; i++) {
    find.querySelectorAll("li")[i].addEventListener("click", () => {
        for (let i = 0; i < find.querySelectorAll("li").length; i++) {
            find.querySelectorAll("li")[i].querySelector("a").className = '';
        }
        find.querySelectorAll("li")[i].querySelector("a").className = 'itemkk';
    })
}
find.querySelectorAll("li")[2].querySelector("a").addEventListener("click", () => {
    park.style.display = 'block';
    document.querySelector(".big-r").style.display = 'none';
    document.querySelector(".rank").style.display = 'none';
});
find.querySelectorAll("li")[0].querySelector("a").addEventListener("click", () => {
    park.style.display = 'none';
    document.querySelector(".big-r").style.display = 'block';
    document.querySelector(".hp").style.display = 'none';
    document.querySelector(".rank").style.display = 'none';
});
find.querySelectorAll("li")[3].querySelector("a").addEventListener("click", () => {
    park.style.display = 'none';
    document.querySelector(".big-r").style.display = 'none';
    document.querySelector(".hp").style.display = 'none';
    document.querySelector(".rank").style.display = 'block';
});
for (let i = 0; i < ja1.playlists.length; i++) {
    let div = document.createElement("div")
    let img = document.createElement("img");
    let small = document.createElement("small");
    for (let i = 0; i < 2; i++) {
        let span = document.createElement("span");
        div.appendChild(span);
    }
    div.appendChild(img);
    div.appendChild(small);
    park.appendChild(div)
    park.querySelectorAll("div")[i].querySelectorAll("span")[0].innerHTML = "▷" + parseInt(ja1.playlists[i].playCount / 10000) + "万";
    park.querySelectorAll("div")[i].querySelectorAll("span")[1].innerHTML = "▶";
    park.querySelectorAll("div")[i].querySelector("img").src = ja1.playlists[i].coverImgUrl + "?param=206y206";
    park.querySelectorAll("div")[i].querySelector("small").innerHTML = ja1.playlists[i].name;
    park.querySelectorAll("div")[i].addEventListener("click", async() => {
        const tbody = document.querySelector("tbody");
        if (like) {
            for (let i = 0; i < tbody.querySelectorAll("tr").length; i++) {
                tbody.removeChild(tbody.querySelectorAll("tr")[i]);
                like = false;
            }
        }
        like = true;
        var j = i;
        document.querySelector(".find").style.display = 'none'
            // recommend.style.display = 'none';
        recom.style.display = 'block';
        var re1;
        var re = await res("/playlist/detail?s=30&id=" + ja1.playlists[i].id);
        var re2 = await re.json().then(value => { return value });
        re1 = re2;
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
        itemk[1].innerHTML = "评论(" + limit + ")";
        const ra = await res("/comment/playlist?&limit=" + limit + "&id=" + music.result[i].id);
        const ra1 = await ra.json().then(value => { return value });
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
            const musc = await musSay(re1.playlist.trackIds[i].id);
            const mmm = document.querySelector("tbody").querySelectorAll("tr")[i].querySelector("td").querySelectorAll("span");
            if ((i + 1) < 10) {
                mmm[0].innerHTML = "0" + (i + 1);
            } else {
                mmm[0].innerHTML = (i + 1);
            }
            document.querySelector(".audio").src = musc.url;
            document.querySelector(".audio").addEventListener("canplaythrough", () => {
                mmm[6].innerHTML = getMuc(document.querySelector(".audio").duration);
            })
            mmm[1].innerHTML = "ღ";
            mmm[2].innerHTML = "↓";
            mmm[3].innerHTML = musc.name;
            mmm[4].innerHTML = musc.acname;
            mmm[5].innerHTML = musc.nikname;
            // mmm[6].innerHTML = musc.time;
        }
        // 点击歌单歌曲更换播放器内容并播放
        let x;
        for (let i = 0; i < re1.playlist.trackIds.length; i++) {
            tbody.querySelectorAll("tr")[i].addEventListener("click", async() => {
                x = i;
                const musc = await mus(re1.playlist.trackIds[i].id);
                document.querySelector(".item1").querySelectorAll("span")[0].querySelector("img").src = musc.songs[0].al.picUrl;
                document.querySelectorAll(".im")[0].innerHTML = musc.songs[0].name;
                document.querySelector(".act").innerHTML = musc.songs[0].ar[0].name;
                const jjj = await muss(re1.playlist.trackIds[i].id);
                audio.src = jjj.data[0].url;
                audio.addEventListener("canplaythrough", async() => {
                    clearInterval(timer2);
                    flag = true;
                    play.click();
                    audio.play();
                    document.querySelector(".end").innerHTML = getMuc(audio.duration);
                })
            })
        }
        // (1).上一首
        let trs = tbody.querySelectorAll("tr");
        left.addEventListener("click", async() => {
            if (x == 0) {
                trs[trs.length - 1].click();
            } else {
                trs[x - 1].click();
            }
        });
        // (2).下一首
        right.addEventListener("click", () => {
            if (x == trs.length - 1) {
                trs[0].click();
            } else {
                trs[x + 1].click();
            }
        });
        //自动播放下一首不行
        if (parseInt(audio.duration) == parseInt(audio.currentTime)) {
            alert(1);
            right.click();
        }
    })

}

// 歌单分类
var allpark = await res("/playlist/catlist");
var hp = await allpark.json();
var hottag = await res("/playlist/hot");
var ht = await hottag.json();
for (let i = 0; i < ht.tags.length; i++) {
    document.querySelector(".hottag").querySelectorAll("span")[i].innerHTML = ht.tags[i].name;
}
var fi = true;
park.querySelector("button").addEventListener("click", () => {
    if (fi) {
        document.querySelector(".hp").style.display = 'block';
        fi = false;
    } else {
        document.querySelector(".hp").style.display = 'none';
        fi = true;
    }
});
for (let i = 0; i < hp.sub.length; i++) {
    if (hp.sub[i].category === 0) {
        if (hp.sub[i].hot == true) {
            document.querySelector(".hp").querySelectorAll("div")[7].innerHTML += "<span>" + hp.sub[i].name + "<i>HOT</i>" + "</span>";
        } else {
            document.querySelector(".hp").querySelectorAll("div")[7].innerHTML += "<span>" + hp.sub[i].name + "</span>";
        }
    }
    if (hp.sub[i].category === 1) {
        if (hp.sub[i].hot == true) {
            document.querySelector(".hp").querySelectorAll("div")[8].innerHTML += "<span>" + hp.sub[i].name + "<i>HOT</i>" + "</span>";
        } else {
            document.querySelector(".hp").querySelectorAll("div")[8].innerHTML += "<span>" + hp.sub[i].name + "</span>";
        }
    }
    if (hp.sub[i].category === 2) {
        if (hp.sub[i].hot == true) {
            document.querySelector(".hp").querySelectorAll("div")[9].innerHTML += "<span>" + hp.sub[i].name + "<i>HOT</i>" + "</span>";
        } else {
            document.querySelector(".hp").querySelectorAll("div")[9].innerHTML += "<span>" + hp.sub[i].name + "</span>";
        }
    }
    if (hp.sub[i].category === 3) {
        if (hp.sub[i].hot == true) {
            document.querySelector(".hp").querySelectorAll("div")[10].innerHTML += "<span>" + hp.sub[i].name + "<i>HOT</i>" + "</span>";
        } else {
            document.querySelector(".hp").querySelectorAll("div")[10].innerHTML += "<span>" + hp.sub[i].name + "</span>";
        }
    }
    if (hp.sub[i].category === 4) {
        if (hp.sub[i].hot == true) {
            document.querySelector(".hp").querySelectorAll("div")[11].innerHTML += "<span>" + hp.sub[i].name + "<i>HOT</i>" + "</span>";
        } else {
            document.querySelector(".hp").querySelectorAll("div")[11].innerHTML += "<span>" + hp.sub[i].name + "</span>";
        }

    }
}
const tags = document.querySelector(".tags");
for (let i = 0; i < tags.querySelectorAll("span").length; i++) {
    tags.querySelectorAll("span")[i].addEventListener("click", async() => {
        document.querySelector(".hp").style.display = "none";
        for (let i = 0; i < park.querySelectorAll("div").length; i++) {
            park.querySelectorAll("div")[i].parentNode.removeChild(park.querySelectorAll("div")[i])
        }
        let r = tags.querySelectorAll("span")[i].innerText.replace("HOT", '');
        park.querySelector("button").innerHTML = r + " >";
        console.log(r);
        for (let i = 0; i < hp.sub.length; i++) {
            if (r === hp.sub[i].name) {
                let jaz = await res("/top/playlist?cat=" + r);
                let ja2 = await jaz.json();
                console.log(ja2);
                for (let i = 0; i < ja2.playlists.length; i++) {
                    let div = document.createElement("div")
                    let img = document.createElement("img");
                    let small = document.createElement("small");
                    for (let i = 0; i < 2; i++) {
                        let span = document.createElement("span");
                        div.appendChild(span);
                    }
                    div.appendChild(img);
                    div.appendChild(small);
                    park.appendChild(div)
                    park.querySelectorAll("div")[i].querySelectorAll("span")[0].innerHTML = "▷" + parseInt(ja2.playlists[i].playCount / 10000) + "万";
                    park.querySelectorAll("div")[i].querySelectorAll("span")[1].innerHTML = "▶";
                    park.querySelectorAll("div")[i].querySelector("img").src = ja2.playlists[i].coverImgUrl + "?param=206y206";
                    park.querySelectorAll("div")[i].querySelector("small").innerHTML = ja2.playlists[i].name;
                    park.querySelectorAll("div")[i].addEventListener("mouseover", () => {
                        park.querySelectorAll("div")[i].querySelectorAll("span")[1].style.display = "block";
                    })
                    park.querySelectorAll("div")[i].addEventListener("mouseout", () => {
                        park.querySelectorAll("div")[i].querySelectorAll("span")[1].style.display = 'none';
                    })
                }
            }
        }
    })
}
for (let j = 0; j < document.querySelector(".hottag").querySelectorAll("span").length; j++) {
    document.querySelector(".hottag").querySelectorAll("span")[j].addEventListener("click", async() => {
        for (let i = 0; i < park.querySelectorAll("div").length; i++) {
            park.querySelectorAll("div")[i].parentNode.removeChild(park.querySelectorAll("div")[i])
        }
        let l = document.querySelector(".hottag").querySelectorAll("span")[j].innerText;
        park.querySelector("button").innerHTML = l + " >";
        let l1 = await res("/top/playlist/highquality?cat=" + l);
        let l2 = await l1.json();
        for (let i = 0; i < l2.playlists.length; i++) {
            let div = document.createElement("div")
            let img = document.createElement("img");
            let small = document.createElement("small");
            for (let i = 0; i < 2; i++) {
                let span = document.createElement("span");
                div.appendChild(span);
            }
            div.appendChild(img);
            div.appendChild(small);
            park.appendChild(div)
            park.querySelectorAll("div")[i].querySelectorAll("span")[0].innerHTML = "▷" + parseInt(l2.playlists[i].playCount / 10000) + "万";
            park.querySelectorAll("div")[i].querySelectorAll("span")[1].innerHTML = "▶";
            park.querySelectorAll("div")[i].querySelector("img").src = l2.playlists[i].coverImgUrl + "?param=206y206";
            park.querySelectorAll("div")[i].querySelector("small").innerHTML = l2.playlists[i].name;
        }
    })
}
// 进度条
var scroll = document.getElementById('scroll');
var bar = document.getElementById('bar');
var mask = document.getElementById('mask');
var barleft = 0;
// 拖拽进度条
bar.onmousedown = function(event) {
    var event = event || window.event;
    var leftVal = event.clientX - this.offsetLeft;
    var that = this;
    // 拖动一定写到 down 里面才可以
    document.onmousemove = function(event) {
        var event = event || window.event;
        barleft = event.clientX - leftVal;
        if (barleft < 0)
            barleft = 0;
        else if (barleft > scroll.offsetWidth - bar.offsetWidth)
            barleft = scroll.offsetWidth - bar.offsetWidth;
        mask.style.width = barleft + 'px';
        that.style.left = barleft + "px";
        // 歌词百分比 parseInt(barleft / (scroll.offsetWidth - bar.offsetWidth) * 100) + "%";
        audio.currentTime = audio.duration * barleft / (scroll.offsetWidth - bar.offsetWidth);
        document.querySelector(".start").innerHTML = getMuc(audio.currentTime);
        //防止选择内容--当拖动鼠标过快时候，弹起鼠标，bar也会移动，修复bug
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    }
};
document.onmouseup = function() {
    document.onmousemove = null; //弹起鼠标不做任何操作
};
// 进度条随歌曲播放移动
setInterval(() => {
    mask.style.width = parseInt(audio.currentTime / audio.duration * 370) + "px";
    bar.style.left = parseInt(audio.currentTime / audio.duration * 370) + "px"
}, 1000);
// 音量调整
var an = document.querySelector(".an");
var ying = document.querySelector(".ying");
var zong = document.querySelector(".zong");
var antop = 0;
let bc = true;
document.querySelector(".hear").addEventListener("click", () => {
    if (bc) {
        document.querySelector(".hears").style.display = 'block';
        bc = false;
    } else {
        document.querySelector(".hears").style.display = 'none';
        bc = true;
    }
    an.addEventListener("mousedown", () => {
        document.onmousemove = function(e) {
            antop = 875 - e.pageY;
            if (antop <= 70 && antop >= 0) {
                an.style.top = 70 - antop + 'px';
                zong.style.height = 80 - antop + 'px';
                audio.volume = 1 - parseFloat(an.style.top) / 70;
            }
        }
    })
    document.onmouseup = function() {
        document.onmousemove = null; //弹起鼠标不做任何操作
    }
});
// });
// 排行榜
const rk = await res("/toplist/detail");
const rank = await rk.json();
console.log(rank);
const off = document.querySelector(".off");
const world = document.querySelector(".world");
for (let i = 0; i < 4; i++) {
    let div = document.createElement("div");
    let div1 = document.createElement("div");
    let img = document.createElement("img");
    div1.appendChild(img);
    let div2 = document.createElement("div");
    for (let i = 0; i < 3; i++) {
        let li = document.createElement("li");
        for (let i = 0; i < 3; i++) {
            let span = document.createElement("span")
            li.appendChild(span);
        }
        div2.appendChild(li);
    }
    div.className = "jj";
    div2.className = "kk";
    div.appendChild(div1);
    div.appendChild(div2);
    off.appendChild(div);
    off.querySelectorAll("img")[i].src = rank.list[i].coverImgUrl + "?param=172y172";
    for (let j = 0; j < 3; j++) {
        document.querySelectorAll(".kk")[i].querySelectorAll("li")[j].querySelectorAll("span")[0].innerHTML = j + 1;
        document.querySelectorAll(".kk")[i].querySelectorAll("li")[j].querySelectorAll("span")[1].innerHTML = rank.list[i].tracks[j].first;
        document.querySelectorAll(".kk")[i].querySelectorAll("li")[j].querySelectorAll("span")[2].innerHTML = rank.list[i].tracks[j].second;
    }
}
for (let i = 4; i < rank.list.length; i++) {
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.src = rank.list[i].coverImgUrl + "?param=172y172";
    let span = document.createElement("li");
    span.innerHTML = rank.list[i].name;
    div.appendChild(img);
    div.appendChild(span);
    div.className = "aa"
    world.append(div);
}
for (let i = 4; i < rank.list.length; i++) {
    // world.querySelectorAll("img")[i].src = rank.list[i].coverImgUrl + "?param=172y172";
    // world.querySelectorAll("li")[i].innerHTML = rank.list[i].name;
}
for (let i = 0; i < rank.list.length; i++) {
    document.querySelector(".rank").querySelectorAll("img")[i].addEventListener("click", async() => {
        document.querySelector(".rank").style.display = 'none';
        const tbody = document.querySelector("tbody");
        if (like) {
            for (let i = 0; i < tbody.querySelectorAll("tr").length; i++) {
                tbody.removeChild(tbody.querySelectorAll("tr")[i]);
                like = false;
            }
        }
        like = true;
        var j = i;
        document.querySelector(".find").style.display = 'none'
            // recommend.style.display = 'none';
        recom.style.display = 'block';
        var re1;
        if (jack) {
            const res4 = await res("/recommend/resource?cookie=" + cookie);
            const music1 = await res4.json(value => { return value });
            var re3 = await res("/playlist/detail?s=30&id=" + music1.recommend[i].id);
            re1 = await re3.json().then(value => { return value });
        } else {
            var re = await res("/playlist/detail?s=30&id=" + rank.list[i].id);
            var re2 = await re.json().then(value => { return value });
            re1 = re2;
        }
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
        itemk[1].innerHTML = "评论(" + limit + ")";
        const ra = await res("/comment/playlist?&limit=" + limit + "&id=" + re1.playlist.id);
        const ra1 = await ra.json().then(value => { return value });
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
            const musc = await musSay(re1.playlist.trackIds[i].id);
            const mmm = document.querySelector("tbody").querySelectorAll("tr")[i].querySelector("td").querySelectorAll("span");
            if ((i + 1) < 10) {
                mmm[0].innerHTML = "0" + (i + 1);
            } else {
                mmm[0].innerHTML = (i + 1);
            }
            document.querySelector(".audio").src = musc.url;
            document.querySelector(".audio").addEventListener("canplaythrough", () => {
                mmm[6].innerHTML = getMuc(document.querySelector(".audio").duration);
            })
            mmm[1].innerHTML = "ღ";
            mmm[2].innerHTML = "↓";
            mmm[3].innerHTML = musc.name;
            mmm[4].innerHTML = musc.acname;
            mmm[5].innerHTML = musc.nikname;
            // mmm[6].innerHTML = musc.time;
        }
        // 点击歌单歌曲更换播放器内容并播放
        let x;
        for (let i = 0; i < re1.playlist.trackIds.length; i++) {
            tbody.querySelectorAll("tr")[i].addEventListener("click", async() => {
                x = i;
                const musc = await mus(re1.playlist.trackIds[i].id);
                document.querySelector(".item1").querySelectorAll("span")[0].querySelector("img").src = musc.songs[0].al.picUrl;
                document.querySelectorAll(".im")[0].innerHTML = musc.songs[0].name;
                document.querySelector(".act").innerHTML = musc.songs[0].ar[0].name;
                const jjj = await muss(re1.playlist.trackIds[i].id);
                audio.src = jjj.data[0].url;
                audio.addEventListener("canplaythrough", async() => {
                    clearInterval(timer2);
                    flag = true;
                    play.click();
                    audio.play();
                    document.querySelector(".end").innerHTML = getMuc(audio.duration);
                })
            })
        }
        // (1).上一首
        let trs = tbody.querySelectorAll("tr");
        left.addEventListener("click", async() => {
            if (x == 0) {
                trs[trs.length - 1].click();
            } else {
                trs[x - 1].click();
            }
        });
        // (2).下一首
        right.addEventListener("click", () => {
            if (x == trs.length - 1) {
                trs[0].click();
            } else {
                trs[x + 1].click();
            }
        });
        //自动播放下一首不行
        if (parseInt(audio.duration) == parseInt(audio.currentTime)) {
            alert(1);
            right.click();
        }
    })
}

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
async function musSay(id) {
    const a = await fetch("http://redrock.udday.cn:2022/song/detail?ids=" + id);
    const a1 = await a.json();
    const b = await fetch("http://redrock.udday.cn:2022/song/url?id=" + id);
    const b1 = await b.json();
    document.querySelector(".audio").src = b1.data[0].url;

    function nn() {
        let sum;
        for (let i = 1; i < a1.songs[0].ar.length; i++) {
            sum += " / " + a1.songs[0].ar[i].name
        }
        if (a1.songs[0].ar.length === 1) {
            return a1.songs[0].ar[0].name;
        } else {
            return a1.songs[0].ar[0].name + sum;
        }
    };
    let obj = {};
    obj.name = a1.songs[0].name; //歌曲名字
    obj.acname = nn(); //歌手名字
    obj.nikname = a1.songs[0].al.name; //专辑名字
    obj.Picurl = a1.songs[0].al.picUrl; //音乐图片
    obj.url = b1.data[0].url; //音乐url
    document.querySelector(".audio").addEventListener("canplaythrough", function() {
        obj.time = getMuc(document.querySelector(".audio").duration);
    });
    // obj.time = getMuc(document.querySelector(".audio").duration);
    // let newobj = Object.assign({}, obj);
    return obj;
}
// 歌手名字
function mn(obj) {
    let sum;
    for (let i = 1; i < obj.length; i++) {
        sum += " / " + obj[i].name
    }
    if (obj.length === 1) {
        return obj[0].name;
    } else {
        return obj[0].name + sum;
    }
};
const n = await musSay("33894312");
// 音频加载完毕后执行后续代码
// myVideo.addEventListener("canplaythrough", function() {
//     //要执行的函数内容
//     alert("视频加载完毕");
// });
// ===========================  Test ============
// 接口:http://redrock.udday.cn:2022