document.addEventListener('DOMContentLoaded', () => {
    // Navbar Hide on Scroll
    let prevScrollPos = window.pageYOffset;
    const navbar = document.querySelector("nav");
  
    window.addEventListener("scroll", () => {
      const currentScrollPos = window.pageYOffset;
      if (prevScrollPos > currentScrollPos) {
        navbar.style.top = "0";
      } else {
        navbar.style.top = "-100px";
      }
      prevScrollPos = currentScrollPos;
    });
  
    // Scroll To Top Button
    const scrollBtn = document.createElement("button");
    scrollBtn.innerHTML = "⬆️";
    scrollBtn.className =
      "fixed bottom-6 right-6 bg-[#ff6f61] text-white rounded-full p-3 text-xl shadow-lg hover:bg-[#e55a4f] transition-opacity opacity-0 pointer-events-none z-50";
    document.body.appendChild(scrollBtn);
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollBtn.classList.remove("opacity-0", "pointer-events-none");
      } else {
        scrollBtn.classList.add("opacity-0", "pointer-events-none");
      }
    });
  
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
    // Hero Background Image Slider
    const hero = document.getElementById("home");
    const heroImages = [
      "Wed1.jfif",
      "Wed3.jfif",
      "Wed4.jfif"
    ];
    let heroIndex = 0;
  
    setInterval(() => {
      hero.style.backgroundImage = `url('${heroImages[heroIndex]}')`;
      heroIndex = (heroIndex + 1) % heroImages.length;
    }, 5000);
  
    // Event Card Image Slider on Hover
    const eventCards = document.querySelectorAll(".grid .bg-gray-200");
    const eventCardImages = [
      ["Wed1.jfif", "Wed3.jfif", "Wed4.jfif"],
      ["meeting 1.jfif", "meeting 2.jfif", "meeting 3.jpg"],
      ["music 1.jfif", "music 2.jpeg", "music 3.jpeg"]
    ];
  
    eventCards.forEach((card, index) => {
      const img = card.querySelector("img");
      let imgIndex = 0;
      let interval;
  
      card.addEventListener("mouseenter", () => {
        interval = setInterval(() => {
          imgIndex = (imgIndex + 1) % eventCardImages[index].length;
          img.src = eventCardImages[index][imgIndex];
        }, 1000);
      });
  
      card.addEventListener("mouseleave", () => {
        clearInterval(interval);
        img.src = eventCardImages[index][0];
      });
    });
  
    // Smooth Scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth"
        });
      });
    });
  
    // Hover Text Change on Event Cards
    eventCards.forEach(card => {
      const paragraph = card.querySelector("p");
      const originalText = paragraph.innerText;
  
      card.addEventListener("mouseenter", () => {
        paragraph.innerText = "Click to Learn More!";
      });
  
      card.addEventListener("mouseleave", () => {
        paragraph.innerText = originalText;
      });
    });
  
    // Event Countdown Timer
    const countdownSection = document.createElement('div');
    countdownSection.className = "text-center bg-gray-300 p-6 text-2xl font-semibold";
    countdownSection.id = "countdown";
    document.getElementById('events').insertAdjacentElement('beforebegin', countdownSection);
  
    const eventDate = new Date("2025-12-31T23:59:59");
  
    function updateCountdown() {
      const now = new Date();
      const diff = eventDate - now;
  
      if (diff <= 0) {
        countdownSection.innerText = "The event has started!";
        return;
      }
  
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
  
      countdownSection.innerText = `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
  
    setInterval(updateCountdown, 1000);
    updateCountdown();
  
    // Customer Reviews Section Above Footer
    const reviewsSection = document.createElement('section');
    reviewsSection.className = "bg-white text-center px-8 py-16";
    reviewsSection.innerHTML = `
      <h2 class="text-3xl font-semibold mb-10">What Our Clients Say</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div class="bg-gray-100 p-6 rounded shadow">
          <p class="italic">"Eventify made our wedding day absolutely perfect!"</p>
          <h4 class="mt-4 font-bold">- Sarah & Mike</h4>
        </div>
        <div class="bg-gray-100 p-6 rounded shadow">
          <p class="italic">"Professional and creative team. Highly recommend for corporate events."</p>
          <h4 class="mt-4 font-bold">- TechCorp CEO</h4>
        </div>
        <div class="bg-gray-100 p-6 rounded shadow">
          <p class="italic">"Our festival was a huge success thanks to Eventify!"</p>
          <h4 class="mt-4 font-bold">- MusicFest Organizer</h4>
        </div>
      </div>
    `;
    document.getElementById('contact').insertAdjacentElement('beforebegin', reviewsSection);
  
    // Open/Closed Status Badge
    const statusBadge = document.createElement('div');
    statusBadge.className = "fixed top-24 right-6 bg-green-500 text-white px-4 py-2 rounded shadow-lg text-lg z-50";
    document.body.appendChild(statusBadge);
  
    function updateOpenClosedStatus() {
      const now = new Date();
      const hour = now.getHours();
      const isOpen = (hour >= 9 && hour < 18);
  
      if (isOpen) {
        statusBadge.innerText = "We Are Open!";
        statusBadge.classList.remove('bg-red-500');
        statusBadge.classList.add('bg-green-500');
      } else {
        statusBadge.innerText = "We Are Closed!";
        statusBadge.classList.remove('bg-green-500');
        statusBadge.classList.add('bg-red-500');
      }
    }
  
    setInterval(updateOpenClosedStatus, 60000);
    updateOpenClosedStatus();
  });
  