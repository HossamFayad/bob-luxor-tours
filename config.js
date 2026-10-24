/**
 * BOB LUXOR TOURS - CENTRAL CONFIGURATION & SYNC ENGINE
 * Connects the public website (index.html) with the Admin Control Dashboard (admin.html)
 */

const DEFAULT_BOB_CONFIG = {
    whatsapp: "201019831144",
    phoneDisplay: "+20 101 983 1144",
    email: "info@luxorbookingtours.com",
    address: "Luxor, Egypt",
    adminPin: "luxor2026",
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
            active: true
        },
        {
            id: "westbank",
            title: "Valley of the Kings & Hatshepsut Private Tour",
            category: "temples",
            priceUSD: 45,
            duration: "4-5 Hours",
            badge: "Must-See",
            active: true
        },
        {
            id: "eastbank",
            title: "Karnak & Luxor Temples by Night",
            category: "temples",
            priceUSD: 40,
            duration: "3-4 Hours",
            badge: "Popular",
            active: true
        },
        {
            id: "fullday",
            title: "The Ultimate Full-Day Luxor & Balloon",
            category: "temples",
            priceUSD: 120,
            duration: "Full Day (8-9h)",
            badge: "VIP Exclusive",
            active: true
        },
        {
            id: "felucca",
            title: "Sunset Nile Felucca & Banana Island",
            category: "daytrips",
            priceUSD: 30,
            duration: "2 Hours",
            badge: "Romantic",
            active: true
        },
        {
            id: "dendera",
            title: "Dendera & Abydos Sacred Temple Expedition",
            category: "daytrips",
            priceUSD: 95,
            duration: "Full Day (8h)",
            badge: "Historical",
            active: true
        }
    ],
    hotels: [
        {
            id: "resort",
            name: "5-Star Nile View Luxury Resort",
            tag: "VIP Luxury",
            desc: "Panoramic Nile views, infinity swimming pools, full breakfast buffet included. Partner resorts: Steigenberger Nile Palace & Sonesta St. George.",
            priceNote: "From $110 / night"
        },
        {
            id: "villa",
            name: "West Bank Private Heritage Villa",
            tag: "Authentic & Quiet",
            desc: "Private pool, authentic Nubian & Luxor architecture, quiet countryside village feel near the Valley of the Kings.",
            priceNote: "From $65 / night"
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

// Initial realistic demo inquiries so Bob sees how the CRM works upon first login
const SAMPLE_BOOKINGS = [
    {
        id: "BK-LUX849",
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
        name: "Sarah Jenkins",
        country: "United Kingdom",
        phone: "+44 7911 123456",
        date: "2026-11-14",
        travelers: "2 Adults",
        tour: "Sunrise Hot Air Balloon Flight",
        hotelChoice: "need_hotel",
        hotelInfo: "NEEDS HOTEL (5-Star Nile View Resort)",
        notes: "Celebrating 10th anniversary. Would love front basket spot for photography.",
        status: "New"
    },
    {
        id: "BK-LUX722",
        timestamp: new Date(Date.now() - 3600000 * 22).toISOString(),
        name: "Marco Rossi",
        country: "Italy",
        phone: "+39 340 9876543",
        date: "2026-11-18",
        travelers: "3 Adults",
        tour: "Valley of the Kings & Hatshepsut Private Tour",
        hotelChoice: "have_hotel",
        hotelInfo: "Staying at Hilton Luxor Resort & Spa",
        notes: "Interested in visiting King Tut and Seti I tombs. Italian or English speaking guide.",
        status: "Contacted"
    },
    {
        id: "BK-LUX519",
        timestamp: new Date(Date.now() - 3600000 * 48).toISOString(),
        name: "David & Elena Mueller",
        country: "Germany",
        phone: "+49 170 5551234",
        date: "2026-11-20",
        travelers: "2 Adults",
        tour: "The Ultimate Full-Day Luxor & Balloon",
        hotelChoice: "have_hotel",
        hotelInfo: "Staying at Sofitel Winter Palace Luxor",
        notes: "Airport pickup needed from Luxor airport at 11:30 AM.",
        status: "Confirmed"
    }
];

// Configuration Storage Helpers
function getBobConfig() {
    try {
        const stored = localStorage.getItem('bob_luxor_config');
        if (stored) {
            const parsed = JSON.parse(stored);
            return Object.assign({}, DEFAULT_BOB_CONFIG, parsed);
        }
    } catch (e) {
        console.warn("Could not read bob_luxor_config from localStorage, using default", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_BOB_CONFIG));
}

function saveBobConfig(newConfig) {
    try {
        localStorage.setItem('bob_luxor_config', JSON.stringify(newConfig));
        return true;
    } catch (e) {
        console.error("Error saving bob_luxor_config", e);
        return false;
    }
}

function resetBobConfig() {
    try {
        localStorage.removeItem('bob_luxor_config');
        return true;
    } catch (e) {
        return false;
    }
}

// Bookings / Leads CRM Storage Helpers
function getBobBookings() {
    try {
        const stored = localStorage.getItem('bob_luxor_bookings');
        if (stored) {
            return JSON.parse(stored);
        } else {
            // Seed sample bookings for the first time
            localStorage.setItem('bob_luxor_bookings', JSON.stringify(SAMPLE_BOOKINGS));
            return SAMPLE_BOOKINGS;
        }
    } catch (e) {
        console.warn("Could not read bob_luxor_bookings", e);
        return SAMPLE_BOOKINGS;
    }
}

function saveBobBookings(bookingsList) {
    try {
        localStorage.setItem('bob_luxor_bookings', JSON.stringify(bookingsList));
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
    const cleanWhatsApp = config.whatsapp.replace(/[^0-9]/g, '');

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
    document.querySelectorAll('.bob-phone-display').forEach(el => {
        el.textContent = config.phoneDisplay || `+${cleanWhatsApp}`;
    });

    // 3. Update display emails
    document.querySelectorAll('.bob-email-display').forEach(el => {
        el.textContent = config.email;
        if (el.tagName === 'A') el.setAttribute('href', `mailto:${config.email}`);
    });

    // 4. Update display addresses
    document.querySelectorAll('.bob-address-display').forEach(el => {
        el.textContent = config.address;
    });

    // 5. Update Tour Prices dynamically
    if (config.tours && config.tours.length > 0) {
        config.tours.forEach(t => {
            const el = document.querySelector(`[data-tour-id="${t.id}"]`);
            if (el) {
                el.setAttribute('data-usd', t.priceUSD);
                // Also trigger currency calculation if defined
                if (typeof window.changeCurrency === 'function') {
                    const selector = document.getElementById('currencySelector');
                    const curr = selector ? selector.value : 'USD';
                    window.changeCurrency(curr);
                } else {
                    el.textContent = `$${t.priceUSD}`;
                }
            }
        });
    }

    // 6. Inject / Update Promo Banner
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

    // Export clean WhatsApp to global for index.html booking submit handler
    window.ACTIVE_BOB_WHATSAPP = cleanWhatsApp;
}

// Auto-run if running on index.html
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        if (!window.location.pathname.includes('admin')) {
            applyBobConfigToFrontend();
        }
    });
}
