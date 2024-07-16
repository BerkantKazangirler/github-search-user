const search = document.querySelector("#search");
const btn = document.querySelector("#btn");
const html = document.querySelector("html");
var themevalue = 0
const themebtn = document.querySelector("#theme");

const namee = document.querySelector("#name")
const bio = document.querySelector("#bio")
const url = document.querySelector("#url")
const img = document.querySelector("#img")
const joindate = document.querySelector("#joindate")
const reponum = document.querySelector("#reponum")
const followers = document.querySelector("#followers")
const following = document.querySelector("#following")
const twitter = document.querySelector("#twitter")
const city = document.querySelector("#city")
const blogsite = document.querySelector("#blogsite")
const duty = document.querySelector("#duty")

btn.addEventListener("click", (e) => {
  let userName = search.value.split(" ").join("");

  fetch("https://api.github.com/users/" + userName)
  .then(responve=>responve.json())
  .then(data => {
    if(data.company == null) {
      duty.innerHTML = "Not available"
    } else {
      duty.innerHTML = data.company
    }
    if(data.location == null) {
      city.innerHTML = "Not available"
    } else {
      city.innerHTML = data.location
    }
    if(data.twitter_username == null) {
      twitter.innerHTML = "Not available"
    } else {
      twitter.innerHTML = data.twitter_username
    }
    console.log(data)
    namee.innerHTML = data.name
    img.src = data.avatar_url
    url.innerHTML = data.login
    url.href = data.html_url
    joindate.innerHTML = data.created_at
    bio.innerHTML = data.bio
    followers.innerHTML = data.followers
    reponum.innerHTML = data.public_repos
    following.innerHTML = data.following
    blogsite.innerText = data.blog
  })
})

themebtn.addEventListener("click", (e) => {
  if(html.classList.value == "") {
    console.log("themevalue")
    html.classList.toggle("dark");
    themevalue = 1;
    setStorage()
  } else {
    html.classList.remove("dark");
    themevalue = 0;
    setStorage()
  }
})

const loadtheme = () => {
  if(themevalue == 0) {
    html.classList.remove("dark");
  } else if(themevalue == 1) {
    html.classList.toggle("dark");
  } else {
    html.classList.remove("dark");
  }
}

const setStorage = () => {
  window.localStorage.setItem("theme-value", JSON.stringify(themevalue))
}

const getStore = () => {
  const d = JSON.parse(window.localStorage.getItem("theme-value"))
  console.log("Log " + d)
  themevalue = d === null ? [] : d
  loadtheme();
}

window.addEventListener('load', () => {
  getStore();
}, false)