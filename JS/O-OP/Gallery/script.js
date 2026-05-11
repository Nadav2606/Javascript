class Gallery {
  images = [];
  currentImage = 0;
  galleryElement;
  imgElement;
  interval;
  constructor(elementId, ...imagesUrl) {
    this.images = imagesUrl;
    this.galleryElement = document.getElementById(elementId);

    this.initGallery();
    this.initEvents();
    this.nextImage();
    this.startAuto();
  }

  initGallery() {
    this.galleryElement.classList.add("gallery");

    this.createImage();
    this.createArrows();
  }

  initEvents() {
    this.galleryElement.addEventListener("mouseover", () => {
      this.stopAuto();
    });
    this.galleryElement.addEventListener("mouseout", () => {
      this.startAuto();
    });
  }

  createArrows() {
    const right = this.createArrow("right", () => this.nextImage());
    const left = this.createArrow("left", () => this.prevImage());

    this.galleryElement.append(right, left);
  }

  createArrow(direction, onClick) {
    const arrow = document.createElement("div");
    arrow.classList.add("arrow", direction);
    arrow.addEventListener("click", onClick);
    return arrow;
  }

  createImage() {
    this.imgElement = document.createElement("img");
    this.galleryElement.append(this.imgElement);

    this.imageSrc();
  }

  imageSrc() {
    this.imgElement.src = this.images[this.currentImage];
  }

  nextImage() {
    this.currentImage++;
    if (this.currentImage >= this.images.length) {
      this.currentImage = 0;
    }
    this.imageSrc();
  }

  prevImage() {
    this.currentImage--;
    if (this.currentImage < 0) {
      this.currentImage = this.images.length - 1;
    }
    this.imageSrc();
  }

  startAuto() {
    this.stopAuto();
    this.interval = setInterval(() => this.nextImage(), 2500);
  }
  stopAuto() {
    clearInterval(this.interval);
  }
}

new Gallery(
  "gallery1",
  "./images/image-1.jpg",
  "./images/image-2.jpg",
  "./images/image-3.jpg",
  "./images/image-4.jpg",
  "./images/image-5.jpg",
  "./images/image-6.jpg",
  "./images/image-7.jpg",
);

const g2 = new Gallery(
  "gallery2",

  "./images/image-8.jpg",
  "./images/image-9.jpg",
  "./images/image-10.jpg",
  "./images/image-11.jpg",
  "./images/image-12.jpg",
);

const g3 = new Gallery(
  "gallery3",
  "./images/image-13.jpg",
  "./images/image-14.jpg",
  "./images/image-15.jpg",
  "./images/image-16.jpg",
  "./images/image-17.jpg",
);
