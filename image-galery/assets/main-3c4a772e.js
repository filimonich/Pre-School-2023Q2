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
const randomRequests = [
  "spring",
  "summer",
  "autumn",
  "winter",
  "nature",
  "city",
  "people",
  "animals"
];
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
    const errorMessage = document.createElement("p");
    errorMessage.className = "galery__text";
    errorMessage.innerHTML = "An error occurred while receiving the data. Please try again. Произошла ошибка при получении данных. Пожалуйста, попробуйте еще раз.";
    gallery.appendChild(errorMessage);
    throw error;
  }
};
const createImageDiv = () => {
  const imgDiv = document.createElement("div");
  imgDiv.className = "galery__image";
  imgDiv.style.height = "100px";
  return imgDiv;
};
const createPreloader = () => {
  const preloader = document.createElement("div");
  preloader.className = "preloader";
  preloader.style.display = "block";
  return preloader;
};
const loadImage = (url, imgDiv, preloader) => {
  const img = document.createElement("img");
  img.onload = function() {
    preloader.style.display = "none";
    imgDiv.style.height = "auto";
    imgDiv.appendChild(img);
  };
  setTimeout(() => {
    img.src = url;
  }, 2);
};
const addImageDivToGallery = (gallery2, imgDiv) => {
  gallery2.appendChild(imgDiv);
};
const getRandomQuery = () => {
  const index = Math.floor(Math.random() * randomRequests.length);
  return randomRequests[index];
};
const clearGallery = (gallery2) => {
  gallery2.innerHTML = "";
};
const main = async (query) => {
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=portrait&client_id=l-zkI308Tcihpn1AgexKwD_jFJ9SfU8I_008J48EBgg`;
  const images = await getData(url);
  clearGallery(gallery);
  const preloader = createPreloader();
  gallery.appendChild(preloader);
  if (images.length === 0) {
    preloader.style.display = "none";
    const noImagesOnRequest = document.createElement("p");
    noImagesOnRequest.className = "galery__text";
    noImagesOnRequest.innerHTML = "Unfortunately, no images were found for your request. Try another query. К сожалению, по вашему запросу не было найдено изображений. Попробуйте другой запрос.";
    gallery.appendChild(noImagesOnRequest);
    return;
  }
  for (let index in images) {
    const image = images[index];
    const imgDiv = createImageDiv();
    loadImage(image.urls.small, imgDiv, preloader);
    addImageDivToGallery(gallery, imgDiv);
    if (index == "0") {
      await new Promise((resolve) => setTimeout(resolve, index * 2e4));
    }
  }
};
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    main(input.value);
    input.value = "";
    input.blur();
  }
});
main(getRandomQuery());
const label = document.querySelector('label[for="search-input"]');
label.addEventListener("click", () => {
  input.value = "";
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
