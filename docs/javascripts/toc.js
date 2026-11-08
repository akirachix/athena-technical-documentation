(function () {
  function headingText(h) {
    var text = "";
    h.childNodes.forEach(function (n) {
      if (!(n.nodeType === 1 && n.classList.contains("headerlink"))) {
        text += n.textContent;
      }
    });
    return text.trim();
  }

  function build() {
    var old = document.querySelector(".huza-toc");
    if (old) old.remove();
    if (!document.querySelector('[data-md-type="toc"]')) return;
    var root = document.querySelector(".md-content__inner");
    if (!root) return;
    var heads = [].slice.call(root.querySelectorAll("h2[id], h3[id]"));
    if (heads.length > 14) {
      heads = heads.filter(function (h) {
        return h.tagName === "H2";
      });
    }
    if (heads.length < 2) return;

    var wrap = document.createElement("nav");
    wrap.className = "huza-toc";
    wrap.setAttribute("aria-label", "On this page");

    var rail = document.createElement("div");
    rail.className = "huza-toc__rail";
    var panel = document.createElement("div");
    panel.className = "huza-toc__panel";
    var title = document.createElement("div");
    title.className = "huza-toc__title";
    title.textContent = "On this page";
    panel.appendChild(title);

    var ticks = [];
    var links = [];
    heads.forEach(function (h) {
      var sub = h.tagName === "H3";
      var tick = document.createElement("span");
      tick.className = "huza-toc__tick" + (sub ? " huza-toc__tick--sub" : "");
      rail.appendChild(tick);
      ticks.push(tick);

      var a = document.createElement("a");
      a.className = "huza-toc__link" + (sub ? " huza-toc__link--sub" : "");
      a.href = "#" + h.id;
      a.textContent = headingText(h);
      panel.appendChild(a);
      links.push(a);
    });

    wrap.appendChild(rail);
    wrap.appendChild(panel);
    document.body.appendChild(wrap);
    wrap.classList.add("is-ready");

    var pending = false;
    function update() {
      pending = false;
      var current = 0;
      for (var i = 0; i < heads.length; i++) {
        if (heads[i].getBoundingClientRect().top <= 140) current = i;
      }
      ticks.forEach(function (t, i) {
        t.classList.toggle("is-active", i === current);
      });
      links.forEach(function (l, i) {
        l.classList.toggle("is-active", i === current);
      });
    }
    function onScroll() {
      if (!pending) {
        pending = true;
        window.requestAnimationFrame(update);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
  }

  function sideCheck() {
    var links = document.querySelectorAll(
      ".md-sidebar--primary .md-nav--primary > .md-nav__list > .md-nav__item--active a.md-nav__link"
    );
    if (links.length < 2) document.body.classList.add("huza-no-side");
  }

  function movePager() {
    var nav = document.querySelector(".md-footer__inner");
    var inner = document.querySelector(".md-content__inner");
    if (nav && inner && !nav.classList.contains("huza-pager")) {
      nav.classList.add("huza-pager");
      inner.appendChild(nav);
    }
    labelPager();
  }

  function labelPager() {
    var names = {
      backend: "Backend",
      frontend: "Frontend",
      reference: "Reference",
      architecture: "Architecture",
      overview: "Home"
    };
    document.querySelectorAll(".huza-pager .md-footer__link").forEach(function (link) {
      if (link.dataset.labelled) return;
      link.dataset.labelled = "1";
      var parts = link.pathname.split("/").filter(Boolean);
      var section = "Home";
      for (var i = 0; i < parts.length; i++) {
        if (names[parts[i]]) {
          section = names[parts[i]];
          break;
        }
      }
      var dir = link.querySelector(".md-footer__direction");
      var title = link.querySelector(".md-ellipsis");
      if (dir) dir.textContent = section;
      if (title && title.textContent.trim() === "Overview") {
        title.textContent = section === "Home" ? "Overview" : section + " overview";
      }
    });
  }

  var lightboxReady = false;

  function openImage(img) {
    var box = document.createElement("div");
    box.className = "huza-lightbox";
    var big = document.createElement("img");
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    var x = document.createElement("span");
    x.className = "huza-lightbox__close";
    x.textContent = "\u00d7";
    box.appendChild(big);
    box.appendChild(x);
    function close() {
      box.remove();
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    }
    function onKey(ev) {
      if (ev.key === "Escape") close();
    }
    box.addEventListener("click", close);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    document.body.appendChild(box);
  }

  function openDiagram(host) {
    var rect = host.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    var scale = Math.min((window.innerWidth * 0.92) / rect.width, (window.innerHeight * 0.85) / rect.height);
    if (scale < 1) scale = 1;
    var holder = document.createElement("div");
    holder.style.width = rect.width + "px";
    holder.style.height = rect.height + "px";
    host.parentNode.insertBefore(holder, host);
    var shade = document.createElement("div");
    shade.className = "huza-lightbox";
    var x = document.createElement("span");
    x.className = "huza-lightbox__close";
    x.textContent = "\u00d7";
    shade.appendChild(x);
    document.body.appendChild(shade);
    document.body.appendChild(host);
    host.classList.add("huza-diagram-open");
    host.style.width = rect.width + "px";
    host.style.height = rect.height + 32 + "px";
    host.style.transform = "translate(-50%, -50%) scale(" + scale + ")";
    document.body.style.overflow = "hidden";
    function close() {
      shade.remove();
      holder.parentNode.insertBefore(host, holder);
      holder.remove();
      host.classList.remove("huza-diagram-open");
      host.style.width = "";
      host.style.height = "";
      host.style.transform = "";
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    }
    function onKey(ev) {
      if (ev.key === "Escape") close();
    }
    shade.addEventListener("click", close);
    document.addEventListener("keydown", onKey);
  }

  function lightbox() {
    if (lightboxReady) return;
    lightboxReady = true;
    document.addEventListener(
      "click",
      function (e) {
        var t = e.target;
        if (!t || !t.closest) return;
        if (t.closest(".huza-lightbox")) return;
        var host = t.closest(".md-content .mermaid");
        if (host && !host.classList.contains("huza-diagram-open")) {
          e.preventDefault();
          e.stopPropagation();
          openDiagram(host);
          return;
        }
        var img = t.closest(".md-content img");
        if (!img || img.closest(".twemoji") || img.closest(".md-logo")) return;
        e.preventDefault();
        e.stopPropagation();
        openImage(img);
      },
      true
    );
  }

  function init() {
    lightbox();
    movePager();
    sideCheck();
    build();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
