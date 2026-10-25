/**
 * LUXOR BOOKING TOURS - CENTRAL CONFIGURATION & REALTIME SYNC ENGINE
 * Connects the public website (index.html) with the Operator Control Dashboard (admin.html)
 */

const DEFAULT_BOB_CONFIG = {
    whatsapp: "201019831144",
    phoneDisplay: "+20 101 983 1144",
    email: "info@luxorbookingtours.com",
    address: "West Bank, Luxor, Egypt",
    adminPinHash: "54ba93d8c1081e6dfb4c43021505cadc002d943c4a11d8cbe1c74b6a520b27b2", // SHA-256 encrypted
    categories: {
        balloons: true,
        temples: true,
        cruises: true,
        hotels: true,
        transfers: true,
        daytrips: true
    },
    promoBanner: {
        active: true,
        badge: "Season Special",
        text: "Complimentary Nile Sunset Felucca with all 2-Day Private Packages! Zero upfront deposit.",
        btnText: "Claim Offer",
        btnTour: "Sunrise Hot Air Balloon Flight"
    },
    tours: [
        {
            id: "balloon",
            title: "Sunrise Hot Air Balloon Flight",
            category: "balloons",
            priceUSD: 65,
            duration: "2-3 Hours",
            badge: "Bestseller",
            image: "images/balloon_sunrise.png",
            active: true
        },
        {
            id: "westbank",
            title: "Valley of the Kings & Hatshepsut Private Tour",
            category: "temples",
            priceUSD: 45,
            duration: "4-5 Hours",
            badge: "Must-See",
            image: "images/west_bank_hatshepsut.jpg",
            active: true
        },
        {
            id: "eastbank",
            title: "Karnak & Luxor Temples by Night",
            category: "temples",
            priceUSD: 40,
            duration: "3-4 Hours",
            badge: "Popular",
            image: "images/karnak_temple.jpg",
            active: true
        },
        {
            id: "fullday",
            title: "The Ultimate Full-Day Luxor & Balloon",
            category: "temples",
            priceUSD: 120,
            duration: "Full Day (8-9h)",
            badge: "VIP Exclusive",
            image: "images/hero_slider_15.jpg",
            active: true
        },
        {
            id: "felucca",
            title: "Sunset Nile Felucca & Banana Island",
            category: "daytrips",
            priceUSD: 30,
            duration: "2 Hours",
            badge: "Romantic",
            image: "images/nile_felucca.webp",
            active: true
        },
        {
            id: "quad",
            title: "Sunset Desert Quad Bike Safari",
            category: "daytrips",
            priceUSD: 35,
            duration: "2 Hours",
            badge: "Adventure",
            image: "images/desert_quad.jpg",
            active: true
        },
        {
            id: "dendera",
            title: "Dendera & Abydos Sacred Temple Expedition",
            category: "daytrips",
            priceUSD: 95,
            duration: "Full Day (8h)",
            badge: "Historical",
            image: "images/abu_simbel.webp",
            active: true
        }
    ],
    hotels: [
        {
            id: "resort",
            name: "Hilton Luxor Resort & Spa",
            tag: "VIP Luxury",
            desc: "Panoramic Nile views, infinity swimming pools, full breakfast buffet included. Direct Nile access on Karnak waterfront.",
            priceNote: "From $120 / night"
        },
        {
            id: "villa",
            name: "Steigenberger Resort Achti Luxor",
            tag: "5-Star Heritage",
            desc: "Luxury 8-acre tropical garden resort situated on the peaceful east bank of the Nile with sunset cocktail lounge.",
            priceNote: "From $95 / night"
        },
        {
            id: "dahabiya",
            name: "Private Dahabiya Sailing Cabin",
            tag: "Nile Cruise",
            desc: "Boutique historic wooden sailboat cruising from Luxor to Aswan with private chef and exclusive temple landings.",
            priceNote: "From $180 / night"
        }
    ]
};

const SAMPLE_BOOKINGS = [
    {
        id: "LBT-8921",
        date: "2026-10-24 18:30",
        name: "James & Emma Watson",
        country: "United Kingdom",
        phone: "+44 7911 123456",
        tour: "Sunrise Hot Air Balloon Flight ($65)",
        travelers: "2 People (Couple)",
        tourDate: "2026-11-04",
        hotelInfo: "Steigenberger Nile Palace (Need pickup)",
        notes: "Celebrating 10th wedding anniversary. Would love early sunrise flight slot.",
        status: "Confirmed",
        amountUSD: 130
    },
    {
        id: "LBT-8920",
        date: "2026-10-24 14:15",
        name: "Dr. Klaus Becker",
        country: "Germany",
        phone: "+49 170 9876543",
        tour: "5-Star Nile Cruise Luxor to Aswan (4 Nights)",
        travelers: "2 People",
        tourDate: "2026-11-12",
        hotelInfo: "Direct airport arrival",
        notes: "German-speaking private guide preferred for Kom Ombo and Edfu.",
        status: "In Discussion",
        amountUSD: 780
    },
    {
        id: "LBT-8919",
        date: "2026-10-23 20:05",
        name: "Sophie Martin",
        country: "France",
        phone: "+33 6 12 34 56 78",
        tour: "Valley of the Kings & Hatshepsut ($45)",
        travelers: "3 People (Family)",
        tourDate: "2026-10-30",
        hotelInfo: "Sofitel Winter Palace",
        notes: "Traveling with 12yo teenager. Interested in King Tut's tomb entry.",
        status: "Completed",
        amountUSD: 135
    }
];

function getBobConfig() {
    try {
        const stored = localStorage.getItem('bob_luxor_config');
        if (stored) {
            const parsed = JSON.parse(stored);
            return {
                ...DEFAULT_BOB_CONFIG,
                ...parsed,
                categories: { ...DEFAULT_BOB_CONFIG.categories, ...(parsed.categories || {}) }
            };
        }
    } catch (e) {
        console.warn("Could not read bob_luxor_config", e);
    }
    return DEFAULT_BOB_CONFIG;
}

function saveBobConfig(config) {
    try {
        localStorage.setItem('bob_luxor_config', JSON.stringify(config));
        applyBobConfigToFrontend();
        return true;
    } catch (e) {
        console.error("Error saving config", e);
        return false;
    }
}

function getBobBookings() {
    try {
        const stored = localStorage.getItem('bob_luxor_bookings') || localStorage.getItem('luxor_bookings');
        if (stored) {
            return JSON.parse(stored);
        } else {
            localStorage.setItem('bob_luxor_bookings', JSON.stringify(SAMPLE_BOOKINGS));
            return SAMPLE_BOOKINGS;
        }
    } catch (e) {
        console.warn("Could not read bookings", e);
        return SAMPLE_BOOKINGS;
    }
}

function saveBobBookings(bookingsList) {
    try {
        localStorage.setItem('bob_luxor_bookings', JSON.stringify(bookingsList));
        localStorage.setItem('luxor_bookings', JSON.stringify(bookingsList));
        return true;
    } catch (e) {
        console.error("Error saving bookings", e);
        return false;
    }
}

function addBobBooking(bookingData) {
    const list = getBobBookings();
    list.unshift(bookingData);
    saveBobBookings(list);
}

function updateBookingStatus(id, newStatus) {
    const list = getBobBookings();
    const item = list.find(b => b.id === id);
    if (item) {
        item.status = newStatus;
        saveBobBookings(list);
        return true;
    }
    return false;
}

function deleteBooking(id) {
    const list = getBobBookings();
    const updated = list.filter(b => b.id !== id);
    saveBobBookings(updated);
}

// Client-Side DOM Applier for index.html
function applyBobConfigToFrontend() {
    const config = getBobConfig();
    const cleanWhatsApp = (config.whatsapp || "201019831144").replace(/[^0-9]/g, '');

    // 1. Update all WhatsApp links
    const waLinks = document.querySelectorAll('a[href*="wa.me"]');
    waLinks.forEach(link => {
        const href = link.getAttribute('href');
        const match = href.match(/wa\.me\/[0-9]+(\?.*)?/);
        if (match) {
            const query = match[1] || '';
            link.setAttribute('href', `https://wa.me/${cleanWhatsApp}${query}`);
        }
    });

    // 2. Update display phone numbers
    document.querySelectorAll('.bob-phone-display, .lbt-phone-display').forEach(el => {
        el.textContent = config.phoneDisplay || `+${cleanWhatsApp}`;
    });

    // 3. Update display emails
    document.querySelectorAll('.bob-email-display, .lbt-email-display').forEach(el => {
        el.textContent = config.email;
        if (el.tagName === 'A') el.setAttribute('href', `mailto:${config.email}`);
    });

    // 4. Update display addresses
    document.querySelectorAll('.bob-address-display, .lbt-address-display').forEach(el => {
        el.textContent = config.address;
    });

    // 5. Category Visibility Toggles
    if (config.categories) {
        const cats = config.categories;
        
        // Hide/Show Filter Tabs
        Object.keys(cats).forEach(catKey => {
            const isVisible = cats[catKey] !== false;
            
            // Tab button in tours
            const tabBtn = document.querySelector(`.tab-btn[data-category="${catKey}"]`);
            if (tabBtn) {
                tabBtn.style.display = isVisible ? '' : 'none';
            }

            // Cards matching category
            document.querySelectorAll(`.tour-card[data-category="${catKey}"]`).forEach(card => {
                if (!isVisible) {
                    card.style.display = 'none';
                    card.classList.add('category-hidden');
                } else {
                    card.classList.remove('category-hidden');
                    // Check if current filter allows it
                    const activeTab = document.querySelector('.tab-btn.active');
                    const activeCat = activeTab ? activeTab.getAttribute('data-category') : 'all';
                    if (activeCat === 'all' || activeCat === catKey) {
                        card.style.display = '';
                    }
                }
            });

            // Dedicated Sections
            if (catKey === 'cruises') {
                const cruiseSec = document.getElementById('cruises');
                if (cruiseSec) cruiseSec.style.display = isVisible ? '' : 'none';
            }
            if (catKey === 'transfers') {
                const transSec = document.getElementById('transfers');
                if (transSec) transSec.style.display = isVisible ? '' : 'none';
            }
        });
    }

    // 6. Update Tour Prices & Visibility dynamically
    if (config.tours && config.tours.length > 0) {
        config.tours.forEach(t => {
            const el = document.querySelector(`[data-tour-id="${t.id}"]`);
            if (el) {
                el.setAttribute('data-usd', t.priceUSD);
                const card = el.closest('.tour-card');
                if (card) {
                    if (t.active === false) {
                        card.style.display = 'none';
                        card.classList.add('admin-disabled');
                    } else if (!card.classList.contains('category-hidden')) {
                        card.classList.remove('admin-disabled');
                    }
                }
            } else if (t.isCustom && document.getElementById('toursGrid')) {
                // Dynamically Render Custom Added Tour Card if not already rendered
                renderCustomTourToDOM(t);
            }
        });

        // Trigger currency calculation if present
        if (typeof window.changeCurrency === 'function') {
            const selector = document.getElementById('currencySelector');
            const curr = selector ? selector.value : 'USD';
            window.changeCurrency(curr);
        }
    }

    // 7. Inject / Update Promo Banner
    const existingBanner = document.getElementById('bobPromoBanner');
    if (config.promoBanner && config.promoBanner.active) {
        if (!existingBanner) {
            const banner = document.createElement('div');
            banner.id = 'bobPromoBanner';
            banner.className = 'bg-gradient-to-r from-amber-600 via-pharaoh-gold to-yellow-600 text-obsidian-base font-medium text-xs py-2 px-4 shadow-lg';
            banner.innerHTML = `
                <div class="max-w-7xl mx-auto flex items-center justify-between gap-3 text-center sm:text-left flex-wrap">
                    <div class="flex items-center gap-2 mx-auto sm:mx-0">
                        <span class="px-2 py-0.5 bg-obsidian-base text-pharaoh-lightGold text-[10px] font-cinzel font-black uppercase rounded tracking-wider">${config.promoBanner.badge || 'PROMO'}</span>
                        <span class="font-sans font-semibold text-stone-950">${config.promoBanner.text}</span>
                    </div>
                    <button onclick="openBookingModal('${config.promoBanner.btnTour || 'Sunrise Hot Air Balloon Flight'}')" class="mx-auto sm:mx-0 px-3.5 py-1 bg-obsidian-base hover:bg-stone-900 text-pharaoh-lightGold font-cinzel font-bold text-[11px] uppercase tracking-wider rounded-lg transition shadow">
                        ${config.promoBanner.btnText || 'Book Now'} &rarr;
                    </button>
                </div>
            `;
            document.body.insertBefore(banner, document.body.firstChild);
        } else {
            existingBanner.style.display = 'block';
        }
    } else if (existingBanner) {
        existingBanner.style.display = 'none';
    }

    // Export clean WhatsApp to global
    window.ACTIVE_BOB_WHATSAPP = cleanWhatsApp;
    window.ACTIVE_LUXOR_WHATSAPP = cleanWhatsApp;
}

// Function to dynamically append custom added tours from Admin to index.html #toursGrid
function renderCustomTourToDOM(tour) {
    const grid = document.getElementById('toursGrid');
    if (!grid || document.getElementById(`card-${tour.id}`)) return;

    const card = document.createElement('div');
    card.id = `card-${tour.id}`;
    card.className = `tour-card luxury-card rounded-3xl overflow-hidden flex flex-col group border border-pharaoh-gold/40`;
    card.setAttribute('data-category', tour.category || 'all');

    const imgSrc = tour.image || 'images/balloon_sunrise.png';
    card.innerHTML = `
        <div class="relative h-60 overflow-hidden">
            <img src="${imgSrc}" onerror="this.src='images/balloon_sunrise.png'" alt="${tour.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-obsidian-card via-transparent to-transparent"></div>
            <div class="absolute top-4 left-4">
                <span class="bg-gradient-to-r from-pharaoh-gold to-amber-600 text-obsidian-base font-cinzel font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full shadow-lg">
                    ${tour.badge || 'New Experience'}
                </span>
            </div>
            <div class="absolute bottom-3 right-4 bg-obsidian-base/80 backdrop-blur-md px-3 py-1 rounded-full border border-pharaoh-gold/30 text-xs font-semibold text-pharaoh-lightGold">
                ${tour.duration || 'Flexible'}
            </div>
        </div>
        <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
            <div>
                <h3 class="font-cinzel text-xl font-bold text-white group-hover:text-pharaoh-lightGold transition">
                    ${tour.title}
                </h3>
                <p class="text-xs text-stone-300 mt-2 font-light leading-relaxed">
                    ${tour.desc || 'Custom curated private expedition with dedicated Egyptologist and private air-conditioned transport.'}
                </p>
            </div>
            <div class="pt-4 border-t border-obsidian-border flex items-center justify-between">
                <div>
                    <span class="text-[10px] uppercase text-stone-400 block font-cinzel">Price per person</span>
                    <span class="font-cinzel text-2xl font-bold text-white price-val" data-tour-id="${tour.id}" data-usd="${tour.priceUSD}">$${tour.priceUSD}</span>
                </div>
                <button onclick="openBookingModal('${tour.title.replace(/'/g, "\\'")}', ${tour.priceUSD})" class="px-5 py-2.5 bg-gradient-to-r from-pharaoh-gold via-pharaoh-lightGold to-yellow-600 hover:from-pharaoh-lightGold hover:to-pharaoh-gold text-obsidian-base font-cinzel font-bold text-xs uppercase tracking-wider rounded-xl transition shadow hover:scale-105 cursor-pointer">
                    Book Tour
                </button>
            </div>
        </div>
    `;

    grid.appendChild(card);
}

// Aliases for clean modern naming
const getLuxorConfig = getBobConfig;
const saveLuxorConfig = saveBobConfig;
const getLuxorBookings = getBobBookings;
const saveLuxorBookings = saveBobBookings;
const addLuxorBooking = addBobBooking;

// Auto-run if running on index.html
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.location.pathname.includes('admin')) {
            applyBobConfigToFrontend();
        }
    });
}
