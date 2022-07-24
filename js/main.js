/* Ordenar codigo y minificarlo */

window.addEventListener('load', (e) => {
   loadLoader();
   loadParallax();
   loadSwiperSlider();
   loadEmailJS();
   loadMixitup();
   loadAOS();
});

/* IntersectionObserver */

const observer = new IntersectionObserver((entries) => {
   entries.forEach((entry) => {
      const id = entry.target.getAttribute('id');
      const menu_link = document.querySelectorAll(`.nav a[href="#${id}"]`);

      menu_link.forEach((link) => {
         if (entry.isIntersecting) {
            link.classList.add('active');
         } else {
            link.classList.remove('active');
         }
      });

   });
}, { rootMargin: "-30% 0px -70% 0px" });

const links = document.querySelectorAll('.nav-mob a[href^="#"]');
links && links.forEach((link) => {
   link.addEventListener('click', (e) => {
      link.closest('.modal-content').querySelector('.btn-close-modal').click();
   });
});

const menu_links = document.querySelectorAll(`.nav-desktop a[href^="#"]`);
menu_links && menu_links.forEach((e) => {
   const hash = e.getAttribute("href");
   const target = document.querySelector(hash);
   if (target) {
      observer.observe(target);
   }
})

/* Close All Modals */
element = document.querySelectorAll('.btn-close-modal');
element && element.forEach((element) => {
   element.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      const modal_content = modal.querySelector('.modal-content');
      document.body.classList.remove('overflow-hidden');

      modal.classList.replace('opacity-100', 'opacity-0');
      modal.classList.replace('visible', 'invisible');

      if (modal_content.classList.contains('scale-100')) {
         modal_content.classList.replace('scale-100', 'scale-0');
         modal_content.classList.replace('opacity-100', 'opacity-0');
      }
      if (modal_content.classList.contains('right-0')) {
         modal_content.classList.replace('right-0', 'right-[-999px]');
      }
      if (modal_content.classList.contains('left-0')) {
         modal_content.classList.replace('left-0', 'left-[-999px]');
      }
   });
});

/* Got Top Button */
element = document.querySelector('.btn-gotop');
element && element.addEventListener('click', (e) => {
   window.scrollTo({
      top: 0,
      behavior: 'smooth',
   });
});

/* Contact Form */
const btn = document.getElementById('button');

document.getElementById('form').addEventListener('submit', function (event) {
   event.preventDefault();

   btn.value = 'Sending...';

   const serviceID = 'service_0jdbkzi'; // Your Service ID
   const templateID = 'template_q8kadec';

   emailjs.sendForm(serviceID, templateID, this).then(
      () => {
         btn.value = 'Send Message';
         loadIziToast();
      },
      (err) => {
         btn.value = 'Send Message';
         alert(JSON.stringify(err));
      }
   );
});

/* ----> Window Events <---- */

window.addEventListener('scroll', (e) => {
   if (window.scrollY > 500) {
      const btn_gotop = document.querySelector('.btn-gotop');
      btn_gotop.classList.replace('bottom-[-999px]', 'bottom-24');
      btn_gotop.classList.replace('opacity-0', 'opacity-100');
      btn_gotop.classList.replace('invisible', 'visible');
   } else {
      const btn_gotop = document.querySelector('.btn-gotop');
      btn_gotop.classList.replace('bottom-24', 'bottom-[-999px]');
      btn_gotop.classList.replace('opacity-100', 'opacity-0');
      btn_gotop.classList.replace('visible', 'invisible');
   }
});

window.addEventListener('click', (e) => {
   const element = e.target;

   /* ----> Open Modals <---- */
   /* Gral modals */
   if (e.target.classList.contains('btn-open-modal')) {
      const button = e.target;
      const modal = document.querySelector(button.getAttribute('data-target'));
      document.querySelector('body').classList.add('overflow-hidden');

      showModal(modal);

   }
})

/* ----> Functions <---- */

showModal = (modal) => {
   const modal_content = modal.querySelector('.modal-content');

   modal.classList.replace('opacity-0', 'opacity-100');
   modal.classList.replace('invisible', 'visible');

   if (modal_content.classList.contains('scale-0')) {
      modal_content.classList.replace('scale-0', 'scale-100');
      modal_content.classList.replace('opacity-0', 'opacity-100');
      modal_content.classList.add('opacity-transform');
   }

   if (modal_content.classList.contains('right-[-999px]')) {
      modal_content.classList.replace('right-[-999px]', 'right-0');
   } else if (modal_content.classList.contains('left-[-999px]')) {
      modal_content.classList.replace('left-[-999px]', 'left-0');
   }
}

loadLoader = () => {
   setTimeout(() => {
      const loader_content = document.querySelector('.loader-content');
      loader_content.classList.add('transition-all', 'duration-500', 'opacity-0', 'invisible');
   }, 500);

   setTimeout(() => {
      const loader = document.querySelector('.loader');
      const body = document.querySelector('body');
      loader.classList.add('transition-all', 'duration-1000', 'opacity-0', 'invisible');
      body.classList.remove('overflow-hidden');
   }, 800);
}

/* ----> Plugins <---- */

/* EmailJS */
loadEmailJS = () => {
   emailjs.init('zCCVxlGvaj7aVYqA4') // Your public KEY
}

/* AOS */
loadAOS = () => {
   AOS.init({
      once: true,
   });
};

/* iziToast */
loadIziToast = () => {
   iziToast.show({
      message: 'Message sent successfully!',
      position: 'bottomLeft',
      color: 'rgb(252, 165, 165)',
      icon: 'bi-check-circle-fill',
      iconColor: '#fff',
      titleColor: '#fff',
      messageColor: '#fff',
   });
};

/* Swiper Slider */
loadSwiperSlider = () => {
   element = document.querySelector('.swiper');

   /* Slider Banner */
   element && new Swiper('.swiper-banner', {
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      effect: 'fade',
      fadeEffect: {
         crossFade: true,
      },
      autoplay: {
         delay: 3500,
         disableOnInteraction: false,
      },
      pagination: {
         el: '.swiper-pagination',
         clickable: true,
      },
      navigation: {
         nextEl: '.button-next',
         prevEl: '.button-prev',
      },
   });
};

/* Mixit Up */
loadMixitup = () => {
   element = document.querySelector('.mix-container');
   if (!element) { return; }

   const params = {
      load: {
         filter: element.classList.contains('mix-container') ? '.mix-all' : 'all',
      }
   }

   mixitup(element, params);

   element.addEventListener('mixClick', (e) => {
      const targets = e.detail.state.targets;
      targets.forEach(e => {
         if (!e.hasAttribute('data-aos')) return;
         e.removeAttribute('data-aos');
         e.classList.remove('aos-init', 'aos-animate');
      })

      window.scroll({
         top: document.querySelector('#products').offsetTop - 80,
         behavior: 'smooth',
      });

      setTimeout(() => AOS.refresh(), 400);
   });
}

/* SimpleParallax */
loadParallax = () => {
   var images = document.querySelectorAll('.thumbnail');
   new simpleParallax(images, {
      transition: 'cubic-bezier(0,0,0,1)',
      delay: 0.5,
   });
};