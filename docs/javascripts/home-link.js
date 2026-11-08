document.addEventListener("DOMContentLoaded", function () {
  var logo = document.querySelector(".md-header__button.md-logo");
  var title = document.querySelector(".md-header__title");
  if (!logo || !title) return;
  var base = logo.href;
  if (base.slice(-1) !== "/") base += "/";
  title.style.cursor = "pointer";
  title.addEventListener("click", function () {
    window.location.href = base;
  });
  var links = [
    ["Overview", "overview/"],
    ["Architecture", "architecture/"],
    ["Backend", "backend/"],
    ["Frontend", "frontend/"],
    ["Reference", "reference/"]
  ];
  var nav = document.createElement("nav");
  nav.className = "huza-topnav";
  var root = new URL(base).pathname;
  var path = window.location.pathname;
  links.forEach(function (item) {
    var a = document.createElement("a");
    a.href = base + item[1];
    a.textContent = item[0];
    if (path.indexOf(root + item[1]) === 0) a.className = "active";
    nav.appendChild(a);
  });
  title.insertAdjacentElement("afterend", nav);
});
