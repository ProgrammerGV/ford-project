 let carouselArr = [];

class Carousel {
    constructor(image, title, link) {
        this.image = image;
        this.title = title;
        this.link = link;
    }

    static Start(arr) {
        if (arr && arr.length > 0) {
            Carousel._sequence = 0;
            Carousel._size = arr.length;
            Carousel._arr = arr;
            
            if (Carousel._interval) {
                clearInterval(Carousel._interval);
            }
            
            Carousel._createCarousel();
            Carousel._updateCarousel();
            Carousel._interval = setInterval(Carousel._autoNext, 2000);
        } else {
            console.error("Method Start needs a non-empty Array Variable.");
        }
    }

    static _createCarousel() {
        const carouselContainer = document.getElementById('carousel');
        const titleContainer = document.getElementById('carousel-title');
        
        carouselContainer.innerHTML = '';
        titleContainer.innerHTML = '';
        
        const carouselWrapper = document.createElement('div');
        carouselWrapper.className = 'carousel-wrapper';
        
        const slidesContainer = document.createElement('div');
        slidesContainer.className = 'carousel-slides-container';
        
        const slidesWrapper = document.createElement('div');
        slidesWrapper.className = 'carousel-slides';
        
        Carousel._arr.forEach((item, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.dataset.index = index;
            
            const imgLink = document.createElement('a');
            imgLink.href = item.link;
            
            const img = document.createElement('img');
            img.src = `assets/${item.image}`;
            img.alt = item.title;
            img.className = 'carousel-image';
            
            imgLink.appendChild(img);
            slide.appendChild(imgLink);
            slidesWrapper.appendChild(slide);
        });
        
        const prevArrow = document.createElement('div');
        prevArrow.className = 'carousel-arrow carousel-prev';
        prevArrow.innerHTML = '&lt;';
        prevArrow.addEventListener('click', Carousel._prev);
        
        const nextArrow = document.createElement('div');
        nextArrow.className = 'carousel-arrow carousel-next';
        nextArrow.innerHTML = '&gt;';
        nextArrow.addEventListener('click', Carousel._next);
        
        slidesContainer.appendChild(slidesWrapper);
        slidesContainer.appendChild(prevArrow);
        slidesContainer.appendChild(nextArrow);
        
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'carousel-dots';
        
        Carousel._arr.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'carousel-dot';
            dot.dataset.index = index;
            dot.addEventListener('click', () => Carousel._goTo(index));
            dotsContainer.appendChild(dot);
        });
        
        carouselWrapper.appendChild(slidesContainer);
        carouselWrapper.appendChild(dotsContainer);
        carouselContainer.appendChild(carouselWrapper);
        
        const titleElement = document.createElement('h2');
        titleElement.className = 'carousel-slide-title';
        titleContainer.appendChild(titleElement);
    }

    static _updateCarousel() {
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');
        const titleElement = document.querySelector('.carousel-slide-title');
        
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${(index - Carousel._sequence) * 100}%)`;
            slide.style.opacity = index === Carousel._sequence ? '1' : '0';
        });
        
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === Carousel._sequence);
        });
        
        if (titleElement && Carousel._arr[Carousel._sequence]) {
            titleElement.textContent = Carousel._arr[Carousel._sequence].title;
        }
    }

    static _next() {
        Carousel._sequence = (Carousel._sequence + 1) % Carousel._size;
        Carousel._updateCarousel();
        Carousel._resetInterval();
    }

    static _prev() {
        Carousel._sequence = (Carousel._sequence - 1 + Carousel._size) % Carousel._size;
        Carousel._updateCarousel();
        Carousel._resetInterval();
    }

    static _autoNext() {
        Carousel._next();
    }

    static _goTo(index) {
        Carousel._sequence = index;
        Carousel._updateCarousel();
        Carousel._resetInterval();
    }

    static _resetInterval() {
        clearInterval(Carousel._interval);
        Carousel._interval = setInterval(Carousel._autoNext, 2000);
    }
}