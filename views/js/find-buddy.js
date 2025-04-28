const buddies = [
    {
        id: 1,
        name: "Priya Sharma",
        age: 26,
        gender: "Female",
        location: "Mumbai",
        destination: "Goa",
        travelDates: "May 15 - 22, 2025",
        interests: ["Beach", "Nightlife", "Food"],
        languages: ["English", "Hindi", "Marathi"],
        travelStyle: "Mid-range",
        compatibilityScore: 85,
        bio: "Passionate about exploring new places and meeting new people. Love beaches, good food, and music!",
        image: "/api/placeholder/280/200"
    },
    {
        id: 2,
        name: "Rahul Verma",
        age: 30,
        gender: "Male",
        location: "Delhi",
        destination: "Ladakh",
        travelDates: "June 5 - 15, 2025",
        interests: ["Adventure", "Photography", "Trekking"],
        languages: ["English", "Hindi"],
        travelStyle: "Budget",
        compatibilityScore: 78,
        bio: "Adventure enthusiast and amateur photographer. Looking for like-minded travelers for a road trip to Ladakh.",
        image: "/api/placeholder/280/200"
    },
    {
        id: 3,
        name: "Ananya Patel",
        age: 24,
        gender: "Female",
        location: "Bangalore",
        destination: "Kerala",
        travelDates: "July 10 - 18, 2025",
        interests: ["Nature", "Culture", "Ayurveda"],
        languages: ["English", "Hindi", "Kannada"],
        travelStyle: "Mid-range",
        compatibilityScore: 92,
        bio: "Nature lover and yoga enthusiast. Looking forward to exploring the backwaters and enjoying Ayurvedic treatments.",
        image: "/api/placeholder/280/200"
    },
    {
        id: 4,
        name: "Vikram Singh",
        age: 28,
        gender: "Male",
        location: "Jaipur",
        destination: "Himachal Pradesh",
        travelDates: "August 3 - 12, 2025",
        interests: ["Trekking", "Camping", "Photography"],
        languages: ["English", "Hindi"],
        travelStyle: "Budget",
        compatibilityScore: 80,
        bio: "Mountain lover and trekking enthusiast. Planning a trek to Triund and looking for company.",
        image: "/api/placeholder/280/200"
    },
    {
        id: 5,
        name: "Meera Iyer",
        age: 27,
        gender: "Female",
        location: "Chennai",
        destination: "Andaman & Nicobar",
        travelDates: "September 7 - 16, 2025",
        interests: ["Beaches", "Snorkeling", "Island hopping"],
        languages: ["English", "Tamil", "Hindi"],
        travelStyle: "Luxury",
        compatibilityScore: 75,
        bio: "Beach lover and water sports enthusiast. Excited to explore the pristine beaches and underwater world of Andaman.",
        image: "/api/placeholder/280/200"
    },
    {
        id: 6,
        name: "Kabir Khanna",
        age: 32,
        gender: "Male",
        location: "Kolkata",
        destination: "Rajasthan",
        travelDates: "October 12 - 22, 2025",
        interests: ["History", "Culture", "Food"],
        languages: ["English", "Hindi", "Bengali"],
        travelStyle: "Mid-range",
        compatibilityScore: 88,
        bio: "History buff and foodie. Looking forward to exploring the royal heritage and cuisines of Rajasthan.",
        image: "/api/placeholder/280/200"
    }
];

// Function to display buddies
function displayBuddies(buddiesArray) {
    const buddiesContainer = document.getElementById('buddies-container');
    buddiesContainer.innerHTML = '';
    
    buddiesArray.forEach(buddy => {
        const buddyCard = document.createElement('div');
        buddyCard.className = 'buddy-card';
        
        // Create interests tags HTML
        const interestsHTML = buddy.interests.map(interest => 
            `<span class="buddy-tag">${interest}</span>`
        ).join('');
        
        buddyCard.innerHTML = `
            <div class="buddy-image">
                <img src="${buddy.image}" alt="${buddy.name}">
            </div>
            <div class="buddy-info">
                <h3 class="buddy-name">${buddy.name}, ${buddy.age}</h3>
                <div class="buddy-details">
                    <div class="buddy-detail">
                        <i class='bx bx-map'></i>
                        <span>From: ${buddy.location}</span>
                    </div>
                    <div class="buddy-detail">
                        <i class='bx bx-map-pin'></i>
                        <span>Going to: ${buddy.destination}</span>
                    </div>
                    <div class="buddy-detail">
                        <i class='bx bx-calendar'></i>
                        <span>${buddy.travelDates}</span>
                    </div>
                    <div class="buddy-detail">
                        <i class='bx bx-wallet'></i>
                        <span>Travel Style: ${buddy.travelStyle}</span>
                    </div>
                </div>
                <div class="compatibility">
                    <div class="compatibility-score">${buddy.compatibilityScore}%</div>
                    <div class="compatibility-text">Compatibility Match</div>
                </div>
                <div class="buddy-tags">
                    ${interestsHTML}
                </div>
                <button class="connect-btn" onclick="connectWithBuddy(${buddy.id})">
                    <i class='bx bx-message-rounded-dots'></i> Connect
                </button>
            </div>
        `;
        
        buddiesContainer.appendChild(buddyCard);
    });
}

// Function to connect with a buddy
function connectWithBuddy(buddyId) {
    const buddy = buddies.find(b => b.id === buddyId);
    if (buddy) {
        alert(`You've requested to connect with ${buddy.name}. They'll be notified of your interest. Once they accept, you can start chatting!`);
    }
}

// Function to show testimonial
function showTestimonial(num) {
    // Hide all testimonials
    document.querySelectorAll('.testimonial').forEach(testimonial => {
        testimonial.style.display = 'none';
    });
    
    // Show the selected testimonial
    document.getElementById(`testimonial-${num}`).style.display = 'block';
    
    // Update active dot
    document.querySelectorAll('.dot').forEach(dot => {
        dot.classList.remove('active');
    });
    document.querySelectorAll('.dot')[num-1].classList.add('active');
}

// Filter sidebar functionality
const filterToggle = document.getElementById('filter-toggle');
const filterSidebar = document.getElementById('filter-sidebar');
const overlay = document.getElementById('overlay');
const closeFilter = document.getElementById('close-filter');
const applyFilter = document.getElementById('apply-filter');
const resetFilter = document.getElementById('reset-filter');
const ageRange = document.getElementById('age-range');
const ageValue = document.getElementById('age-value');

// Update age value display
ageRange.addEventListener('input', function() {
    ageValue.textContent = this.value;
});

// Open filter sidebar
filterToggle.addEventListener('click', function() {
    filterSidebar.classList.add('active');
    overlay.classList.add('active');
});

// Close filter sidebar
function closeFilterSidebar() {
    filterSidebar.classList.remove('active');
    overlay.classList.remove('active');
}

closeFilter.addEventListener('click', closeFilterSidebar);
overlay.addEventListener('click', closeFilterSidebar);

// Apply filters
applyFilter.addEventListener('click', function() {
    // For demo purposes, we'll just close the sidebar
    closeFilterSidebar();
    
    // In a real app, you would filter the buddies based on the selected filters
    // and update the display
    alert('Filters applied! This would filter the buddies in a real application.');
});

// Reset filters
resetFilter.addEventListener('click', function() {
    // Reset all filter inputs
    ageRange.value = 18;
    ageValue.textContent = 18;
    
    document.querySelectorAll('.filter-checkbox input').forEach(input => {
        input.checked = false;
    });
    
    alert('Filters reset!');
});

// Search functionality
const searchBtn = document.querySelector('.search-btn');
searchBtn.addEventListener('click', function() {
    const destination = document.getElementById('destination').value;
    const travelDate = document.getElementById('travel-date').value;
    const duration = document.getElementById('duration').value;
    
    // In a real app, you would filter buddies based on these criteria
    // For demo purposes, we'll just display all buddies
    displayBuddies(buddies);
    
    // Scroll to buddies section
    document.querySelector('.buddies-section').scrollIntoView({ behavior: 'smooth' });
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with all buddies
    displayBuddies(buddies);
    
    // Start testimonial slider
    let currentTestimonial = 1;
    setInterval(() => {
        currentTestimonial = currentTestimonial >= 3 ? 1 : currentTestimonial + 1;
        showTestimonial(currentTestimonial);
    }, 5000);
});