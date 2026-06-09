// ═══════════════════════════════════════════════════
//  CONFIG.JS - EDIT THIS FILE TO UPDATE YOUR WEBSITE
//  No coding knowledge needed - just change the text!
// ═══════════════════════════════════════════════════

const COMPANY = {
  name: "Apex Motors",
  tagline: "Your Trusted Multi-Brand Car Destination",
  established: "2015",

  // Contact Info
  phone: "+91 98765 43210",
  phone2: "+91 98765 43211",
  email: "info@apexmotors.com",
  address: "123 Auto Nagar, Main Highway, Mumbai - 400001",
  googleMap: "https://maps.google.com",

  // Social Links
  facebook: "https://facebook.com/apexmotors",
  instagram: "https://instagram.com/apexmotors",
  whatsapp: "https://wa.me/919876543210",

  // Business Hours
  hours: {
    mon: "9:30 AM - 8:00 PM",
    tue: "9:30 AM - 8:00 PM",
    wed: "9:30 AM - 8:00 PM",
    thu: "9:30 AM - 8:00 PM",
    fri: "9:30 AM - 8:00 PM",
    sat: "9:30 AM - 8:00 PM",
    sun: "10:00 AM - 6:00 PM"
  },

  // Logo (text or image URL)
  logoText: "APEX MOTORS",
  logoImage: "", // Leave empty to use text logo, or paste image URL

  // Brand Colors (hex codes)
  primaryColor: "#d4af37",    // Gold accent
  secondaryColor: "#1a1a2e",  // Dark navy
  accentColor: "#e94560"      // Red highlight
};

// ═══════════════════════════════════════════════════
//  INVENTORY - ADD/REMOVE/EDIT CARS HERE
// ═══════════════════════════════════════════════════
const INVENTORY = [
  {
    id: 1,
    brand: "Maruti Suzuki",
    model: "Swift Dzire",
    year: 2024,
    price: 750000,
    fuel: "Petrol",
    transmission: "Manual",
    mileage: "22.4 km/l",
    seats: 5,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop",
    featured: true,
    tags: ["Best Seller", "Low EMI"]
  },
  {
    id: 2,
    brand: "Hyundai",
    model: "Creta",
    year: 2024,
    price: 1250000,
    fuel: "Diesel",
    transmission: "Automatic",
    mileage: "18.5 km/l",
    seats: 5,
    image: "https://images.unsplash.com/photo-1552519507-da3b1421c324?w=600&h=400&fit=crop",
    featured: true,
    tags: ["SUV", "Premium"]
  },
  {
    id: 3,
    brand: "Tata",
    model: "Nexon EV",
    year: 2024,
    price: 1650000,
    fuel: "Electric",
    transmission: "Automatic",
    mileage: "465 km/charge",
    seats: 5,
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&h=400&fit=crop",
    featured: false,
    tags: ["Electric", "Subsidy Available"]
  },
  {
    id: 4,
    brand: "Mahindra",
    model: "Scorpio N",
    year: 2024,
    price: 1850000,
    fuel: "Diesel",
    transmission: "Manual",
    mileage: "15.4 km/l",
    seats: 7,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&h=400&fit=crop",
    featured: true,
    tags: ["7-Seater", "Powerful"]
  },
  {
    id: 5,
    brand: "Toyota",
    model: "Innova Crysta",
    year: 2024,
    price: 2100000,
    fuel: "Diesel",
    transmission: "Automatic",
    mileage: "14.8 km/l",
    seats: 7,
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&h=400&fit=crop",
    featured: false,
    tags: ["Family Car", "Reliable"]
  },
  {
    id: 6,
    brand: "Honda",
    model: "City",
    year: 2024,
    price: 1350000,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "17.8 km/l",
    seats: 5,
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&h=400&fit=crop",
    featured: false,
    tags: ["Sedan", "Comfort"]
  },
  {
    id: 7,
    brand: "Kia",
    model: "Seltos",
    year: 2024,
    price: 1450000,
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "17.0 km/l",
    seats: 5,
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop",
    featured: true,
    tags: ["Stylish", "Feature Loaded"]
  },
  {
    id: 8,
    brand: "Maruti Suzuki",
    model: "Ertiga",
    year: 2024,
    price: 950000,
    fuel: "CNG",
    transmission: "Manual",
    mileage: "26.1 km/kg",
    seats: 7,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&h=400&fit=crop",
    featured: false,
    tags: ["7-Seater", "CNG", "Budget Friendly"]
  }
];

// ═══════════════════════════════════════════════════
//  EMI DEFAULT SETTINGS
// ═══════════════════════════════════════════════════
const EMI_CONFIG = {
  defaultInterestRate: 9.5,      // Annual %
  defaultTenure: 60,             // Months
  minDownPaymentPercent: 10,     // Minimum %
  processingFeePercent: 2        // % of loan amount
};

// ═══════════════════════════════════════════════════
//  5 KEY FEATURES - EDIT TEXT HERE
// ═══════════════════════════════════════════════════
const KEY_FEATURES = [
  {
    icon: "fa-exchange-alt",
    title: "Old Car Exchange",
    description: "Get the best value for your old car. Instant valuation & exchange bonus up to ₹50,000. We accept all brands and conditions.",
    highlight: "Best Exchange Value"
  },
  {
    icon: "fa-hand-holding-usd",
    title: "Minimum Down Payment",
    description: "Drive home your dream car with as low as 10% down payment. Flexible payment options tailored to your budget.",
    highlight: "Starting @ 10% Only"
  },
  {
    icon: "fa-university",
    title: "Loan Facility Available",
    description: "Hassle-free loans from all major banks & NBFCs. Quick approval within 24 hours. Interest rates starting from 8.5%.",
    highlight: "24hr Approval"
  },
  {
    icon: "fa-car-side",
    title: "Multi-Brand Cars",
    description: "One-stop showroom for Maruti, Hyundai, Tata, Mahindra, Toyota, Honda, Kia & more. New & certified pre-owned cars.",
    highlight: "15+ Brands"
  },
  {
    icon: "fa-school",
    title: "Govt. Loan Schemes",
    description: "Special government subsidized loans for School Bus & Van purchases. Low interest, longer tenure, easy documentation.",
    highlight: "School Bus/Van Loans"
  }
];

// ═══════════════════════════════════════════════════
//  TESTIMONIALS
// ═══════════════════════════════════════════════════
const TESTIMONIALS = [
  {
    name: "Rajesh Sharma",
    location: "Mumbai",
    text: "Got amazing exchange value for my old WagonR. The EMI calculator helped me plan my budget perfectly. Highly recommend!",
    rating: 5
  },
  {
    name: "Priya Patel",
    location: "Thane",
    text: "Bought a school van for my transport business. The government loan scheme saved me lakhs in interest. Great service!",
    rating: 5
  },
  {
    name: "Amit Kumar",
    location: "Navi Mumbai",
    text: "Minimum down payment option made it possible for me to buy my dream Creta. Process was smooth and transparent.",
    rating: 5
  }
];
