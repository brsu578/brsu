document.addEventListener("DOMContentLoaded", () => {
  // Desktop dropdown
  const dropdownContainer = document.querySelector(".dropdown-container")
  const dropdownMenu = dropdownContainer.querySelector(".dropdown-menu")
  let desktopTimeout

  dropdownContainer.addEventListener("mouseenter", () => {
    clearTimeout(desktopTimeout)
    dropdownMenu.style.display = "block"
  })

  dropdownContainer.addEventListener("mouseleave", () => {
    desktopTimeout = setTimeout(() => {
      dropdownMenu.style.display = "none"
    }, 1000) // 1 second delay to hide dropdown
  })

  // Mobile menu toggle (hamburger) - COMPLETELY REWRITTEN
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  // Set initial state
  mobileMenu.style.display = "none"

  mobileMenuButton.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()

    // Direct style manipulation instead of class toggling
    if (mobileMenu.style.display === "none") {
      // Show the menu
      mobileMenu.style.display = "block"
      console.log("Mobile menu opened")
    } else {
      // Hide the menu
      mobileMenu.style.display = "none"
      console.log("Mobile menu closed")
    }
  })

  // Mobile dropdown inside mobile menu
  const mobileDropdownToggle = document.getElementById("our-work-mobile-toggle")
  const mobileSubmenu = document.getElementById("our-work-submenu")
  const arrowIcon = document.getElementById("arrow-icon")
  let mobileTimeout

  mobileDropdownToggle.addEventListener("click", (e) => {
    e.preventDefault()
    e.stopPropagation()

    // Direct style manipulation
    if (mobileSubmenu.style.display === "none" || mobileSubmenu.style.display === "") {
      // Show submenu
      mobileSubmenu.style.display = "block"
      arrowIcon.innerHTML = "&#9652;" // Up arrow
      console.log("Submenu opened")

      // Auto-close after 1 second
      clearTimeout(mobileTimeout)
      mobileTimeout = setTimeout(() => {
        mobileSubmenu.style.display = "none"
        arrowIcon.innerHTML = "&#9662;" // Down arrow
        console.log("Submenu auto-closed")
      }, 1000)
    } else {
      // Hide submenu
      mobileSubmenu.style.display = "none"
      arrowIcon.innerHTML = "&#9662;" // Down arrow
      clearTimeout(mobileTimeout)
      console.log("Submenu closed")
    }
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (mobileMenu.style.display === "block" && !mobileMenu.contains(e.target) && e.target !== mobileMenuButton) {
      mobileMenu.style.display = "none"
      console.log("Mobile menu closed by outside click")
    }
  })

  

  // Optional: Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href")
      if (targetId && targetId !== "#") {
        e.preventDefault()
        const targetEl = document.querySelector(targetId)
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth" })
        }
      }

      // Close menu after click (on mobile)
      if (window.innerWidth < 768) {
        mobileMenu.style.display = "none"
      }
    })
  })

  // Add animation class to elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const windowHeight = window.innerHeight

      if (elementPosition < windowHeight - 100) {
        element.classList.add("fade-in")
      }
    })
  }

  // Run animation check on scroll
  window.addEventListener("scroll", animateOnScroll)

  // Run once on page load
  animateOnScroll()

  // Donation form handling
  const donationForm = document.getElementById("donationForm")
  const donationSuccess = document.getElementById("donationSuccess")

  if (donationForm) {
    donationForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // In a real application, you would process the payment here
      console.log("Donation submitted")

      // Show success message
      if (donationSuccess) {
        donationSuccess.classList.remove("hidden")
        donationForm.reset()

        // Scroll to success message
        donationSuccess.scrollIntoView({ behavior: "smooth" })

        // Hide success message after 5 seconds
        setTimeout(() => {
          donationSuccess.classList.add("hidden")
        }, 5000)
      }
    })
  }

  // Amount button functionality
  const amountButtons = document.querySelectorAll(".bg-green-100.text-green-800")
  const amountInput = document.getElementById("amount")

  if (amountButtons.length > 0 && amountInput) {
    amountButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const value = this.textContent.trim()

        if (value === "Other") {
          amountInput.value = ""
          amountInput.focus()
        } else {
          // Extract the number from the button text (e.g., "$25" -> 25)
          const amount = value.replace(/[^0-9]/g, "")
          amountInput.value = amount
        }
      })
    })
  }
})
 


  document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');

    button.addEventListener('click', function () {
      menu.classList.toggle('hidden');
    });
  });


  const bannerSlider = document.getElementById('banner-slider');
    const prevBannerBtn = document.getElementById('prev-banner');
    const nextBannerBtn = document.getElementById('next-banner');
    const bannerIndicators = document.querySelectorAll('.banner-indicator');
    let currentBannerIndex = 0;
    const totalBanners = 3;
    
    function showBanner(index)
     {
        bannerSlider.style.transform = `translateX(-${index * 100}%)`;
        
        bannerIndicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        bannerIndicators[index].classList.add('active');
        
        currentBannerIndex = index;
    }
    
    prevBannerBtn.addEventListener('click', function() {
        let newIndex = currentBannerIndex - 1;
        if (newIndex < 0) newIndex = totalBanners - 1;
        showBanner(newIndex);
    });
    
    nextBannerBtn.addEventListener('click', function() {
        let newIndex = currentBannerIndex + 1;
        if (newIndex >= totalBanners) newIndex = 0;
        showBanner(newIndex);
    });
    
    bannerIndicators.forEach(indicator => 
        {
        indicator.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            showBanner(index);
        });
    });
    
    // Auto slide er jonno
    let bannerInterval = setInterval(function()
     {
        let newIndex = currentBannerIndex + 1;
        if (newIndex >= totalBanners) newIndex = 0;
        showBanner(newIndex);
    }, 5000);
    
    // mouse dile sliding kora bondo er jonno
    bannerSlider.addEventListener('mouseenter', function() {
        clearInterval(bannerInterval);
    });
    
    bannerSlider.addEventListener('mouseleave', function() {
        bannerInterval = setInterval(function() {
            let newIndex = currentBannerIndex + 1;
            if (newIndex >= totalBanners) newIndex = 0;
            showBanner(newIndex);
        }, 5000);
    });
const marquee = document.getElementById('news-marquee');
let scrollTimer;

window.addEventListener('scroll', () => {
  marquee.classList.add('paused');

  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    marquee.classList.remove('paused');
  }, 1000); // resume after 1 second
});


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const successModal = document.getElementById('formSuccess');
    const closeBtn = document.getElementById('closeSuccess');

    if (form && successModal && closeBtn) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            successModal.classList.remove('hidden');
            form.reset();

            // Hide after 5 seconds
            setTimeout(() => {
                successModal.classList.add('hidden');
            }, 5000);
        });

        closeBtn.addEventListener('click', function () {
            successModal.classList.add('hidden');
        });

        successModal.addEventListener('click', function (e) {
            if (e.target === successModal) {
                successModal.classList.add('hidden');
            }
        });
    } else {
        console.warn("Form, modal, or button not found in DOM.");
    }
});



    function toggleContent() {
        const content = document.getElementById("moreContent");
        const button = document.getElementById("toggleBtn");

        if (content.style.maxHeight === "none") {
            content.style.maxHeight = "10rem"; // collapsed height
            button.textContent = "Read more";
        } else {
            content.style.maxHeight = "none"; // expand fully
            button.textContent = "Read less";
        }
    }

