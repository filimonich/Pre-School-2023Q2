(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const style = "";
for (let i = 1; i < 6; i++) {
  setTimeout(() => {
    console.log("Hello");
  }, i * 2e3);
}
async function getData(url) {
  const res = await fetch(url);
  const data = await res.json();
  return data.results;
}
const insertImage = (image, gallery) => {
  const imgDiv = document.createElement("div");
  imgDiv.className = "galery__image";
  const img = document.createElement("img");
  img.src = image.urls.small;
  imgDiv.appendChild(img);
  gallery.appendChild(imgDiv);
};
const main = async () => {
  const url = (
    // 'https://api.unsplash.com/search/photos?query=spring&per_page=30&orientation=landscape&client_id=l-zkI308Tcihpn1AgexKwD_jFJ9SfU8I_008J48EBgg';
    "https://api.unsplash.com/search/photos?query=spring&per_page=30&orientation=portrait&client_id=l-zkI308Tcihpn1AgexKwD_jFJ9SfU8I_008J48EBgg"
  );
  console.log(url);
  const images = await getData(url);
  const gallery = document.querySelector(".galery__contents");
  images.forEach((image, index) => {
    setTimeout(() => {
      insertImage(image, gallery);
    }, index * 100);
  });
};
main();
document.body.onload = () => {
  let delayTime = 1e6;
  setTimeout(() => {
    const preloder = document.querySelector(".preloder");
    preloder.classList.add("done");
  }, delayTime);
};
document.addEventListener("DOMContentLoaded", () => {
  let preload = document.querySelector(".preload");
  const removePreloadClass = () => {
    preload.classList.remove("preload");
  };
  setTimeout(() => {
    removePreloadClass();
  }, 100);
});
const addDynamicShadow = () => {
  const blocks = document.getElementsByClassName("dynamic-shadow");
  document.addEventListener("mousemove", (e) => {
    if (window.innerWidth <= 780) {
      return;
    }
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].style.boxShadow = (x - 0.5) * 40 + "px " + (y - 0.5) * 40 + "px 20px rgba(0, 104, 111,0.65)";
    }
  });
};
addDynamicShadow();
