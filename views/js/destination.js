document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Destination data for India
    const destinations = [
        {
            id: 1,
            name: "Taj Mahal, Agra",
            image: "/api/placeholder/400/300",
            region: "north",
            category: ["historical", "cultural"],
            location: "Uttar Pradesh",
            buddyCount: 42,
            description: "One of the seven wonders of the world, this ivory-white marble mausoleum is a testament to eternal love."
        },
        {
            id: 2,
            name: "Jaipur",
            image: "/api/placeholder/400/300",
            region: "north",
            category: ["historical", "city"],
            location: "Rajasthan",
            buddyCount: 38,
            description: "Known as the 'Pink City', Jaipur boasts magnificent palaces, colorful bazaars, and rich Rajasthani culture."
        },
        {
            id: 3,
            name: "Varanasi",
            image: "/api/placeholder/400/300",
            region: "north",
            category: ["spiritual", "historical"],
            location: "Uttar Pradesh",
            buddyCount: 29,
            description: "One of the world's oldest continuously inhabited cities and a spiritual hub on the banks of the sacred Ganges."
        },
        {
            id: 4,
            name: "Goa Beaches",
            image: "/api/placeholder/400/300",
            region: "west",
            category: ["beach"],
            location: "Goa",
            buddyCount: 56,
            description: "India's favorite beach destination with golden sands, vibrant nightlife, and Portuguese-influenced culture."
        },
        {
            id: 5,
            name: "Kerala Backwaters",
            image: "/api/placeholder/400/300",
            region: "south",
            category: ["nature"],
            location: "Kerala",
            buddyCount: 33,
            description: "Tranquil network of lagoons, canals, and lakes parallel to the Arabian Sea coast in God's Own Country."
        },
        {
            id: 6,
            name: "Ladakh",
            image: "/api/placeholder/400/300",
            region: "north",
            category: ["mountain", "adventure"],
            location: "Ladakh",
            buddyCount: 45,
            description: "High-altitude desert with dramatic landscapes, Buddhist monasteries, and some of the world's highest motorable roads."
        },
        {
            id: 7,
            name: "Mysore Palace",
            image: "/api/placeholder/400/300",
            region: "south",
            category: ["historical"],
            location: "Karnataka",
            buddyCount: 21,
            description: "Magnificent royal residence and a treasure house of exquisite carvings and works of art from around the world."
        },
        {
            id: 8,
            name: "Ranthambore National Park",
            image: "/api/placeholder/400/300",
            region: "north",
            category: ["wildlife"],
            location: "Rajasthan",
            buddyCount: 27,
            description: "One of the best places in India to see tigers in their natural habitat, along with diverse wildlife."
        },
        {
            id: 9,
            name: "Darjeeling",
            image: "/api/placeholder/400/300",
            region: "east",
            category: ["mountain"],
            location: "West Bengal",
            buddyCount: 19,
            description: "Nestled in the Himalayan foothills, famous for its tea plantations and views of Kanchenjunga."
        },
        {
            id: 10,
            name: "Hampi",
            image: "/api/placeholder/400/300",
            region: "south",
            category: ["historical"],
            location: "Karnataka",
            buddyCount: 24,
            description: "Ancient ruins of the Vijayanagara Empire with boulder-strewn landscapes and magnificent temple architecture."
        },
        {
            id: 11,
            name: "Amritsar Golden Temple",
            image: "/api/placeholder/400/300",
            region: "north",
            category: ["spiritual"],
            location: "Punjab",
            buddyCount: 31,
            description: "The holiest shrine of Sikhism, known for its stunning golden architecture and spiritual importance."
        },
        {
            id: 12,
            name: "Andaman Islands",
            image: "/api/placeholder/400/300",
            region: "east",
            category: ["beach", "adventure"],
            location: "Andaman & Nicobar",
            buddyCount: 36,
            description: "Pristine beaches, coral reefs, and fascinating colonial history in this remote archipelago."
        },
        {
            id: 13,
            name: "Khajuraho Temples",
            image: "/api/placeholder/400/300",
            region: "central",
            category: ["historical", "spiritual"],
            location: "Madhya Pradesh",
            buddyCount: 18,
            description: "UNESCO World Heritage site known for its nagara-style architectural symbolism and erotic sculptures."
        },
        {
            id: 14,
            name: "Mumbai",
            image: "/api/placeholder/400/300",
            region: "west",
            category: ["city"],
            location: "Maharashtra",
            buddyCount: 48,
            description: "India's financial capital and entertainment hub with a vibrant culture and colonial architecture."
        },
        {
            id: 15,
            name: "Kaziranga National Park",
            image: "/api/placeholder/400/300",
            region: "northeast",
            category: ["wildlife"],
            location: "Assam",
            buddyCount: 22,
            description: "Home to two-thirds of the world's great one-horned rhinoceroses and diverse wildlife."
        },
        {
            id: 16,
            name: "Rishikesh",
            image: "/api/placeholder/400/300",
            region: "north",
            category: ["spiritual", "adventure"],
            location: "Uttarakhand",
            buddyCount: 39,
            description: "The 'Yoga Capital of the World' and adventure hub nestled in the foothills of the Himalayas."
        },
        {
            id: 17,
            name: "Udaipur",
            image: "/api/placeholder/400/300",
            region: "north",
            category: ["historical", "city"],
            location: "Rajasthan",
            buddyCount: 34,
            description: "Known as the 'City of Lakes' with romantic settings, lavish palaces, and rich cultural heritage."
        },
        {
            id: 18,
            name: "Ajanta & Ellora Caves",
            image: "/api/placeholder/400/300",
            region: "west",
            category: ["historical", "spiritual"],
            location: "Maharashtra",
            buddyCount: 20,
            description: "UNESCO World Heritage sites featuring rock-cut Buddhist, Hindu and Jain monuments dating from 2nd century BCE."
        }
    ];

    let currentDestinations = [...destinations];
    let visibleCount = 9; // Initial number of destinations to show

    // Filter destinations based on region and category
    function filterDestinations() {
        const regionFilter = document.getElementById('region-filter').value;
        const categoryFilter = document.getElementById('category-filter').value;
        const searchInput = document.getElementById('search-input').value.toLowerCase();

        return destinations.filter(destination => {
            // Region filter
            const regionMatch = regionFilter === 'all' || destination.region === regionFilter;
            
            // Category filter
            const categoryMatch = categoryFilter === 'all' || 
                destination.category.includes(categoryFilter);
            
            // Search filter
            const searchMatch = destination.name.toLowerCase().includes(searchInput) || 
                               destination.description.toLowerCase().includes(searchInput) ||
                               destination.location.toLowerCase().includes(searchInput);
            
            return regionMatch && categoryMatch && searchMatch;
        });
    }

    // Render destination cards
    function renderDestinations() {
        const container = document.getElementById('destinations-container');
        container.innerHTML = ''; // Clear existing content
        
        const destinationsToShow = currentDestinations.slice(0, visibleCount);
        
        if (destinationsToShow.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <i class='bx bx-search-alt bx-lg'></i>
                    <h3>No destinations found</h3>
                    <p>Try adjusting your filters or search terms</p>
                </div>
            `;
            return;
        }
        
        destinationsToShow.forEach((destination, index) => {
            // Create category badges
            const categoryBadges = destination.category.map(cat => 
                `<span class="category-badge">${cat}</span>`
            ).join('');
            
            // Create destination card with animation delay
            const card = document.createElement('div');
            card.className = 'destination-card';
            card.style.animationDelay = `${index * 0.1}s`;
            
            card.innerHTML = `
                <div class="destination-image">
                    <img src="${destination.image}" alt="${destination.name}">
                    <div class="destination-badge">${destination.region.replace('-', ' ').toUpperCase()}</div>
                </div>
                <div class="destination-info">
                    <h3>${destination.name}</h3>
                    <div class="destination-meta">
                        <span><i class='bx bx-map'></i> ${destination.location}</span>
                        <span><i class='bx bx-category'></i> ${categoryBadges}</span>
                    </div>
                    <p class="destination-desc">${destination.description}</p>
                    <div class="destination-footer">
                        <span class="buddy-count"><i class='bx bx-group'></i> ${destination.buddyCount} travelers interested</span>
                        <a href="destination-detail.ejs?id=${destination.id}" class="btn">Details</a>
                    </div>
                </div>
            `;
            
            container.appendChild(card);
        });
        
        // Show/hide load more button
        const loadMoreBtn = document.getElementById('load-more');
        if (visibleCount >= currentDestinations.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }

    // Initial render
    renderDestinations();

    // Event listeners for filters
    document.getElementById('region-filter').addEventListener('change', applyFilters);
    document.getElementById('category-filter').addEventListener('change', applyFilters);
    document.getElementById('search-button').addEventListener('click', applyFilters);
    document.getElementById('search-input').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            applyFilters();
        }
    });

    // Load more button
    document.getElementById('load-more').addEventListener('click', function() {
        visibleCount += 6; // Show 6 more destinations
        renderDestinations();
    });

    // Apply filters function
    function applyFilters() {
        currentDestinations = filterDestinations();
        visibleCount = 9; // Reset to initial count
        renderDestinations();
        
        // Smooth scroll to results
        document.getElementById('destinations-container').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            // Simple validation
            if (emailInput.value) {
                // Display success message (in real application, would send to server)
                const successMsg = document.createElement('p');
                successMsg.textContent = 'Thank you for subscribing!';
                successMsg.style.color = '#4ecdc4';
                successMsg.style.marginTop = '10px';
                
                // Remove any existing message
                const existingMsg = this.querySelector('p');
                if (existingMsg) {
                    this.removeChild(existingMsg);
                }
                
                this.appendChild(successMsg);
                emailInput.value = '';
                
                // Remove message after 3 seconds
                setTimeout(() => {
                    if (successMsg.parentNode === this) {
                        this.removeChild(successMsg);
                    }
                }, 3000);
            }
        });
    }
});