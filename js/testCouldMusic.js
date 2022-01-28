const res = await fetch("https://netease-cloud-music-api-neon-kappa.vercel.app/login/cellphone?phone=19946894418&md5_password=8a6f2805b4515ac12058e79e66539be9", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },

});
// console.log(res.json());
console.log(res.text());
console.log(res);

const ress = await fetch("https://netease-cloud-music-api-neon-kappa.vercel.app/user/detail?uid=1857911469", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
});
console.log(ress.json().then(value => console.log(value.profile.avatarUrl)));