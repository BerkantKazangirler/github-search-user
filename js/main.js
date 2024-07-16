const search = document.querySelector("#search");
const btn = document.querySelector("#btn");
const html = document.querySelector("html");
var themevalue = 0;
let lastsearch = "";
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

search.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    btn.click();
  }
});

btn.addEventListener("click", (e) => {
  let userName = search.value.split(" ").join("");

  fetch("https://api.github.com/users/" + userName)
  .then(responve=>responve.json())
  .then(data => {
    if(data.status == "404") {
      alert(userName+" Bulunamadı")
    } else {
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
      lastsearch = data.login;
      url.innerHTML = "@"+data.login
      url.href = data.html_url
  
      let joinFullDate = data.created_at;
      let dateStr = joinFullDate.substring(0, 10);
      let dateSplit = dateStr.split("-");
      const monthNumber = dateSplit[1] - 1;
      const monthName = new Date(Date.UTC(0, monthNumber)).toLocaleString(
        "en-US",
        { month: "short" },
      );
  
      joindate.innerHTML = "Joined "+dateSplit[2]+" "+monthName+" "+dateSplit[0];
      if(data.bio == null) {
        bio.innerHTML = "This profile has no bio"
      } else {
        bio.innerHTML = data.bio
      }
      followers.innerHTML = data.followers
      reponum.innerHTML = data.public_repos
      following.innerHTML = data.following
      if(data.blog == "" || data.blog == null) {
        blogsite.innerHTML = "Not available"
      } else {
        blogsite.innerHTML = data.blog
      }
      storageLst();
    }
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

const loadlast = () => {
  if (lastsearch == "") {
    console.log("Yeni Giriş")
  } else {
    document.querySelector("#search").value = lastsearch;
    btn.click();
  }
}

const loadtheme = () => {
  if(themevalue == 0) {
    html.classList.remove("dark");
  } else if(themevalue == 1) {
    html.classList.toggle("dark");
  } else {
    html.classList.remove("dark");
  }
}

const storageLst = () => {
  window.localStorage.setItem("last-search", JSON.stringify(lastsearch))
}

const setStorage = () => {
  window.localStorage.setItem("theme-value", JSON.stringify(themevalue))
}

const getStore = () => {
  const e = JSON.parse(window.localStorage.getItem("last-search"))
  lastsearch = e === null ? [] : e

  const d = JSON.parse(window.localStorage.getItem("theme-value"))
  themevalue = d === null ? [] : d

  loadtheme();
  loadlast();
}

window.addEventListener('load', () => {
  getStore();
}, false)