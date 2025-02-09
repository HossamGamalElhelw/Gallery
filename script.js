const buttonControls = document.getElementById("btn_controls");
const image = document.getElementById("img");
const playButton = document.getElementById("play");
const addImgButton = document.getElementById("add_img");
const imageUrl = document.getElementById("img_url");

let arrayImages = [
  "images/img1.png",
  "images/img2.png",
  "images/img3.png",
  "images/img4.png",
];
let numImages = arrayImages.length - 1;
let positionImage = 0;
let playInterval;

function setImage() {
  image.src = arrayImages[positionImage];
}

buttonControls.addEventListener("click", (e) => {
  e.preventDefault();
  // * Handle Previous button
  if (e.target.closest(".previous") && positionImage > 0) {
    --positionImage;
    clearIntervalTime();
    setImage();
  }
  // * Handle Next button
  if (e.target.closest(".next")) {
    if (positionImage < numImages) ++positionImage;
    clearIntervalTime();
    setImage();
  }
  // * Handle Reset button
  if (e.target.closest(".reset")) {
    positionImage = 0;
    clearIntervalTime();
    setImage();
  }
  // * Handle Play button
  if (e.target.closest("#play")) {
    if (playInterval) {
      clearIntervalTime();
    } else {
      if (positionImage === numImages) {
        positionImage = 0;
      }
      playInterval = setInterval(() => {
        setImage();
        positionImage = positionImage < numImages ? positionImage + 1 : 0;
      }, 1000);
      e.target.textContent = "Stop";
    }
  }
});

function clearIntervalTime() {
  clearInterval(playInterval);
  playInterval = null;
  playButton.textContent = "Play";
}

// * Handle  Add Image button
addImgButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (imageUrl.value) {
    arrayImages.push(imageUrl.value);
    numImages++;
    imageUrl.value = "";
    positionImage = numImages;
    setImage();
  }
});
