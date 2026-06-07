// Car Inventory Data
const cars = [
    {
        id: 1,
        title: "2022 Honda Accord Sport",
        category: "sedan",
        price: 28500,
        payment: 425,
        year: 2022,
        mileage: "18,500",
        transmission: "Automatic",
        fuel: "Gasoline",
        badge: "Popular",
        badgeClass: "",
        description: "Well-maintained Honda Accord with sporty styling. Features include Apple CarPlay, heated seats, and Honda Sensing safety suite."
    },
    {
        id: 2,
        title: "2021 Toyota Camry LE",
        category: "sedan",
        price: 24500,
        payment: 365,
        year: 2021,
        mileage: "24,200",
        transmission: "Automatic",
        fuel: "Gasoline",
        badge: "Sale",
        badgeClass: "sale",
        description: "Reliable and fuel-efficient Toyota Camry. Perfect for daily commuting with excellent safety ratings and low maintenance costs."
    },
    {
        id: 3,
        title: "2023 Ford F-150 XLT",
        category: "truck",
        price: 42900,
        payment: 599,
        year: 2023,
        mileage: "8,300",
        transmission: "Automatic",
        fuel: "Gasoline",
        badge: "New",
        badgeClass: "",
        description: "Powerful Ford F-150 with 4x4 capability. Tow package, backup camera, and spacious crew cab. Ready for work or adventure."
    },
    {
        id: 4,
        title: "2022 BMW X5 xDrive40i",
        category: "luxury",
        price: 58900,
        payment: 799,
        year: 2022,
        mileage: "15,700",
        transmission: "Automatic",
        fuel: "Gasoline",
        badge: "Luxury",
        badgeClass: "",
        description: "Premium BMW X5 with all-wheel drive. Panoramic sunroof, leather interior, and advanced driver assistance features."
    },
    {
        id: 5,
        title: "2021 Jeep Grand Cherokee",
        category: "suv",
        price: 32900,
        payment: 475,
        year: 2021,
        mileage: "32,100",
        transmission: "Automatic",
        fuel: "Gasoline",
        badge: "",
        badgeClass: "",
        description: "Versatile Jeep Grand Cherokee with 4WD. Comfortable interior with Uconnect system and premium audio."
    },
    {
        id: 6,
        title: "2023 Tesla Model 3",
        category: "luxury",
        price: 38900,
        payment: 550,
        year: 2023,
        mileage: "5,200",
        transmission: "Automatic",
        fuel: "Electric",
        badge: "Eco",
        badgeClass: "",
        description: "Cutting-edge Tesla Model 3 with autopilot. Zero emissions, instant acceleration, and over-the-air updates."
    },
    {
        id: 7,
        title: "2022 Chevrolet Silverado",
        category: "truck",
        price: 36900,
        payment: 525,
        year: 2022,
        mileage: "21,800",
        transmission: "Automatic",
        fuel: "Gasoline",
        badge: "",
        badgeClass: "",
        description: "Rugged Chevrolet Silverado with V8 power. Bed liner, trailer brake controller, and comfortable interior."
    },
    {
        id: 8,
        title: "2021 Honda CR-V EX",
        category: "suv",
        price: 27900,
        payment: 395,
        year: 2021,
        mileage: "28,400",
        transmission: "Automatic",
        fuel: "Gasoline",
        badge: "Sale",
        badgeClass: "sale",
        description: "Family-friendly Honda CR-V with AWD. Spacious cargo area, Honda Sensing, and excellent fuel economy."
    },
    {
        id: 9,
        title: "2023 Mercedes-Benz C300",
        category: "luxury",
        price: 45900,
        payment: 649,
        year: 2023,
        mileage: "9,600",
        transmission: "Automatic",
        fuel: "Gasoline",
        badge: "New",
        badgeClass: "",
        description: "Elegant Mercedes-Benz C300 with premium package. Burmester sound, ambient lighting, and MBUX system."
    }
];

// DOM Elements
const carsGrid = document.getElementById('carsGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');
const modal = document.getElementById('carModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.querySelector('.modal-close');
const contactForm = document.getElementById('contactForm');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderCars('all');
    calculateLoan();
    setupScrollAnimation();
});

// Render Cars
function renderCars(filter) {
    const filteredCars = filter === 'all' ? cars : cars.filter(car => car.category === filter);

    carsGrid.innerHTML = filteredCars.map(car => `
        <div class="car-card" onclick="openCarModal(${car.id})">
            <div class="car-image">
                <i class="fas fa-car"></i>
                ${car.badge ? `<span class="car-badge ${car.badgeClass}">${car.badge}</span>` : ''}
            </div>
            <div class="car-info">
                <h3 class="car-title">${car.title}</h3>
                <div class="car-details">
                    <span><i class="fas fa-calendar"></i> ${car.year}</span>
                    <span><i class="fas fa-tachometer-alt"></i> ${car.mileage} mi</span>
                    <span><i class="fas fa-gas-pump"></i> ${car.fuel}</span>
                </div>
                <div class="car-price-row">
                    <span class="car-price">$${car.price.toLocaleString()}</span>
                    <span class="car-payment">$${car.payment}/mo</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter Buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCars(btn.dataset.filter);
    });
});

// Mobile Menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

// Loan Calculator
function calculateLoan() {
    const vehiclePrice = parseFloat(document.getElementById('vehiclePrice').value) || 0;
    const downPayment = parseFloat(document.getElementById('downPayment').value) || 0;
    const interestRate = parseFloat(document.getElementById('interestRate').value) || 0;
    const loanTerm = parseInt(document.getElementById('loanTerm').value) || 60;
    const creditScore = document.getElementById('creditScore').value;

    // Adjust rate based on credit score
    let adjustedRate = interestRate;
    switch(creditScore) {
        case 'excellent': adjustedRate = Math.max(interestRate - 2, 3.9); break;
        case 'good': adjustedRate = interestRate; break;
        case 'fair': adjustedRate = interestRate + 3; break;
        case 'poor': adjustedRate = interestRate + 6; break;
    }

    const loanAmount = vehiclePrice - downPayment;
    const monthlyRate = adjustedRate / 100 / 12;
    const numberOfPayments = loanTerm;

    let monthlyPayment;
    if (monthlyRate === 0) {
        monthlyPayment = loanAmount / numberOfPayments;
    } else {
        monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const totalCost = monthlyPayment * numberOfPayments + downPayment;
    const totalInterest = totalCost - vehiclePrice;

    document.getElementById('monthlyPayment').textContent = '$' + monthlyPayment.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('loanAmount').textContent = '$' + loanAmount.toLocaleString();
    document.getElementById('totalInterest').textContent = '$' + totalInterest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    document.getElementById('totalCost').textContent = '$' + totalCost.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Update interest rate display
    document.getElementById('interestRate').value = adjustedRate.toFixed(1);
}

// Auto-calculate on input change
document.querySelectorAll('#vehiclePrice, #downPayment, #interestRate, #loanTerm, #creditScore').forEach(input => {
    input.addEventListener('input', calculateLoan);
    input.addEventListener('change', calculateLoan);
});

// Car Modal
function openCarModal(carId) {
    const car = cars.find(c => c.id === carId);
    if (!car) return;

    modalBody.innerHTML = `
        <div class="modal-car-header">
            <div class="modal-car-image">
                <i class="fas fa-car"></i>
            </div>
            <div class="modal-car-info">
                <h2>${car.title}</h2>
                <div class="modal-car-price">$${car.price.toLocaleString()}</div>
                <p style="color: var(--gray); margin-bottom: 15px;">Estimated: $${car.payment}/month</p>
                <div style="display: flex; gap: 10px;">
                    <span style="background: var(--light-gray); padding: 5px 12px; border-radius: 20px; font-size: 0.85rem;">${car.year}</span>
                    <span style="background: var(--light-gray); padding: 5px 12px; border-radius: 20px; font-size: 0.85rem;">${car.mileage} mi</span>
                </div>
            </div>
        </div>
        <div class="modal-car-details">
            <div class="detail-item">
                <span class="detail-label">Make/Model</span>
                <span class="detail-value">${car.title.split(' ').slice(1).join(' ')}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Year</span>
                <span class="detail-value">${car.year}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Mileage</span>
                <span class="detail-value">${car.mileage} miles</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Transmission</span>
                <span class="detail-value">${car.transmission}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Fuel Type</span>
                <span class="detail-value">${car.fuel}</span>
            </div>
            <div class="detail-item">
                <span class="detail-label">Category</span>
                <span class="detail-value">${car.category.charAt(0).toUpperCase() + car.category.slice(1)}</span>
            </div>
        </div>
        <p style="margin-bottom: 25px; color: var(--gray); line-height: 1.7;">${car.description}</p>
        <div class="modal-actions">
            <a href="#contact" class="btn btn-primary" onclick="closeModal()">Apply for Financing</a>
            <a href="#contact" class="btn btn-secondary" style="border-color: var(--primary); color: var(--primary);" onclick="closeModal()">Schedule Test Drive</a>
        </div>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

modalClose.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Contact Form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        interest: document.getElementById('interest').value,
        message: document.getElementById('message').value
    };

    // Simulate form submission
    alert('Thank you, ' + formData.firstName + '! We have received your inquiry and will contact you within 24 hours.\n\nNote: This is a demo. In production, connect this to a backend service like Formspree, Netlify Forms, or EmailJS.');

    contactForm.reset();
});

// Scroll Animation
function setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card, .car-card, .financing-card, .requirement').forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
