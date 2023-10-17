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
const input = document.getElementById("search-input");
const gallery = document.querySelector(".galery__contents");
const label = document.querySelector('label[for="search-input"]');
const randomRequests = [
  "spring",
  "summer",
  "autumn",
  "winter",
  "nature",
  "city",
  "people",
  "animals",
  "nightcity",
  "tram",
  "smile"
];
let delayTime = 20;
const getData = async (url) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status}`);
    }
    const data = await res.json();
    return data.results;
  } catch (error) {
    console.error("An error occurred while receiving data:", error);
    gallery.innerHTML = "";
    createAndAppendP(
      "galery__text",
      "An error occurred while receiving the data. Please try again. Произошла ошибка при получении данных. Пожалуйста, попробуйте еще раз."
    );
    throw error;
  }
};
function createAndAppendP(className, innerHTML) {
  const createElementP = document.createElement("p");
  createElementP.className = className;
  createElementP.innerHTML = innerHTML;
  gallery.appendChild(createElementP);
}
const createImageDiv = () => {
  const imgDiv = document.createElement("div");
  imgDiv.className = "galery__image";
  return imgDiv;
};
const createPreloader = () => {
  const preloader = document.createElement("div");
  preloader.className = "preloader";
  preloader.style.display = "block";
  return preloader;
};
const loadImage = (url, imgDiv, preloader) => {
  const createElementImg = document.createElement("img");
  createElementImg.onload = function() {
    if (preloader) {
      preloader.style.display = "none";
    }
    imgDiv.style.height = "auto";
    imgDiv.appendChild(createElementImg);
  };
  setTimeout(() => {
    createElementImg.src = url;
  }, delayTime);
};
const addImageDivToGallery = (gallery2, imgDiv) => {
  gallery2.appendChild(imgDiv);
};
const getRandomQuery = () => {
  const index = Math.floor(Math.random() * randomRequests.length);
  console.log(randomRequests[index]);
  return randomRequests[index];
};
const clearGallery = (gallery2) => {
  gallery2.innerHTML = "";
};
const getDataAndHandleErrors = async (query) => {
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=portrait&client_id=l-zkI308Tcihpn1AgexKwD_jFJ9SfU8I_008J48EBgg`;
  const preloader = createPreloader();
  gallery.appendChild(preloader);
  const images = await getData(url);
  clearGallery(gallery);
  if (images.length === 0) {
    if (preloader) {
      preloader.style.display = "none";
    }
    createAndAppendP(
      "galery__text",
      "Unfortunately, no images were found for your request. Try another query. К сожалению, по вашему запросу не было найдено изображений. Попробуйте другой запрос."
    );
    return;
  }
  return images;
};
const createImageGallery = async (images) => {
  for (const image of images) {
    const imgDiv = createImageDiv();
    loadImage(image.urls.small, imgDiv);
    addImageDivToGallery(gallery, imgDiv);
    await new Promise((resolve) => setTimeout(resolve, delayTime));
  }
};
const main = async (query) => {
  const images = await getDataAndHandleErrors(query);
  if (images) {
    await createImageGallery(images);
  }
};
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    main(input.value);
    input.blur();
  }
});
main(getRandomQuery());
label.addEventListener("click", () => {
  input.value = "";
});
window.addEventListener("scroll", () => {
  const arrowUp = document.querySelector(".galery__arrow-up");
  if (window.pageYOffset > window.innerHeight / 2) {
    arrowUp.style.display = "block";
  } else {
    arrowUp.style.display = "none";
  }
});
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
