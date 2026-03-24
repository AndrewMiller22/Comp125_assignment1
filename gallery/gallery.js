
const thumbnails = document.querySelectorAll(".thumb");
const largeImage = document.getElementById("largeImage");
const imageTitle = document.getElementById("imageTitle");
const addFavoriteBtn = document.getElementById("addFavoriteBtn");
const favoritesContainer = document.getElementById("favoritesContainer");
const message = document.getElementById("message");

let currentImageSrc = largeImage.src;
let currentImageAlt = largeImage.alt;

thumbnails.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    largeImage.src = thumb.src;
    largeImage.alt = thumb.alt;
    imageTitle.textContent = thumb.alt;

    currentImageSrc = thumb.src;
    currentImageAlt = thumb.alt;
    message.textContent = "";
  });
});

addFavoriteBtn.addEventListener("click", () => {
  const currentFavorites = favoritesContainer.querySelectorAll(".favorite-item");

  if (currentFavorites.length >= 5) {
    message.textContent = "You must remove at least one favorite first.";
    return;
  }

  const alreadyExists = Array.from(currentFavorites).some((item) => {
    const img = item.querySelector("img");
    return img.src === currentImageSrc;
  });

  if (alreadyExists) {
    message.textContent = "That image is already in your favorites.";
    return;
  }

  const favoriteDiv = document.createElement("div");
  favoriteDiv.className = "favorite-item";

  const favImg = document.createElement("img");
  favImg.src = currentImageSrc;
  favImg.alt = currentImageAlt;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.className = "remove-btn";

  favImg.addEventListener("click", () => {
    removeBtn.style.display = "inline-block";
  });

  removeBtn.addEventListener("click", () => {
    favoritesContainer.removeChild(favoriteDiv);
    message.textContent = "";
  });

  favoriteDiv.appendChild(favImg);
  favoriteDiv.appendChild(removeBtn);
  favoritesContainer.appendChild(favoriteDiv);

  message.textContent = "";
});