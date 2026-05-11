class ImageSlide {
  images = [];
  currentImage = 0;
  constructor(...images) {
    this.images = images;
  }

  nextImage() {
    this.currentImage++;
    if (this.currentImage >= this.images.length) {
      this.currentImage = 0;
    }
    return this.current();
  }

  prevImage() {
    this.currentImage--;
    if (this.currentImage < 0) {
      this.currentImage = this.images.length - 1;
    }
    return this.current();
  }
  current() {
    return this.images[this.currentImage];
  }
}

class GalleryUi {
  galleryElement;
  imgElement;

  constructor(elementId) {
    this.galleryElement = document.getElementById(elementId);
    this.galleryElement.classList.add("gallery");
    this.imgElement = document.createElement("img");
    this.galleryElement.append(this.imgElement);
  }

  createArrow(direction, onClick) {
    const arrow = document.createElement("div");
    arrow.classList.add("arrow", direction);
    arrow.addEventListener("click", onClick);
    this.galleryElement.append(arrow);
  }
  imageSrc(src) {
    this.imgElement.src = src;
  }
}

class CombinedLogic {
  interval;
  slider;
  ui;
  constructor(elementId, ...images) {
    this.slider = new ImageSlide(...images);
    this.ui = new GalleryUi(elementId);
    this.initUi();
    this.initEvents();
    this.showUi();
    this.startAuto();

    this.images = images;
  }
  initUi() {
    this.ui.createArrow("right", () => this.nextImage());
    this.ui.createArrow("left", () => this.prevImage());
  }
  initEvents() {
    this.ui.galleryElement.addEventListener("mouseover", () => {
      this.stopAuto();
    });
    this.ui.galleryElement.addEventListener("mouseout", () => {
      this.startAuto();
    });
  }
  showUi() {
    this.ui.imageSrc(this.slider.current());
  }
  nextImage() {
    this.slider.nextImage();
    this.showUi();
  }

  prevImage() {
    this.slider.prevImage();
    this.showUi();
  }
  startAuto() {
    this.stopAuto();
    this.interval = setInterval(() => this.nextImage(), 2500);
  }
  stopAuto() {
    clearInterval(this.interval);
  }
}

const g1 = new CombinedLogic(
  "gallery1",
  "./images/image-1.jpg",
  "./images/image-2.jpg",
  "./images/image-3.jpg",
  "./images/image-4.jpg",
  "./images/image-5.jpg",
  "./images/image-6.jpg",
  "./images/image-7.jpg",
);

const g2 = new CombinedLogic(
  "gallery2",

  "./images/image-8.jpg",
  "./images/image-9.jpg",
  "./images/image-10.jpg",
  "./images/image-11.jpg",
  "./images/image-12.jpg",
);

const g3 = new CombinedLogic(
  "gallery3",
  "./images/image-13.jpg",
  "./images/image-14.jpg",
  "./images/image-15.jpg",
  "./images/image-16.jpg",
  "./images/image-17.jpg",
);
