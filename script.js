// State Management
let currentLang = 'ar';
let cart = [];
let currentCategory = '';
let currentAction = '';

// Translations
const translations = {
    en: {
        site_name: "𝐉𝐚𝐧𝐧𝐚𝐡 𝐇𝐮𝐛",
        nav_home: "Home",
        nav_coding: "Coding",
        nav_design: "Design",
        nav_games: "Games",
        nav_support: "Support",
        hero_title: "Welcome to <span class='gradient-text'>𝐉𝐚𝐧𝐧𝐚𝐡 𝐇𝐮𝐛</span>",
        hero_subtitle: "The ultimate marketplace for Coding, Design, Gaming Cards & Support.",
        hero_cta: "Explore Now",
        section_categories: "Our Services",
        cat_coding: "Coding Orders",
        cat_coding_desc: "Bots, Websites, Game Scripts, Discord Dev.",
        cat_design: "Design Orders",
        cat_design_desc: "Thumbnails, Video Montage, Graphics.",
        cat_games: "Games Orders",
        cat_games_desc: "Steam Cards, PlayStation, Accounts.",
        cat_support: "Technical Support",
        cat_support_desc: "General inquiries and help.",
        back: "Back",
        opt_buy: "Buy Available",
        opt_request: "Request Special",
        opt_sell: "Sell Your Item",
        cart_title: "Your Shopping Cart",
        cart_empty: "Your cart is empty.",
        total: "Total:",
        checkout: "Checkout",
        ticket_title: "Open a Ticket",
        ticket_desc: "To complete your request, please open a ticket with our administration team.",
        step_1: "Select Type",
        step_2: "Contact Admin",
        ticket_type: "Ticket Type:",
        ticket_details: "Details:",
        open_ticket_btn: "Open Ticket on Discord",
        // Admin Translations
        admin_panel: "Admin Panel",
        admin_products: "Products",
        admin_orders: "Orders",
        admin_settings: "Settings",
        admin_logout: "Logout",
        admin_back: "Return to Store",
        admin_prod_mgmt: "Product Management",
        admin_prod_desc: "Manage your store items effectively",
        admin_add_prod: "Add Product",
        admin_total_items: "Total Items",
        admin_order_req: "Order Requests",
        admin_order_desc: "Track customer purchases and tickets",
        admin_clear_all: "Clear All",
        admin_site_config: "Website Configuration",
        admin_config_desc: "Customize your site content and appearance",
        admin_save: "Save Changes",
        admin_general: "General Content",
        admin_links: "External Links",
        admin_features: "Features",
        admin_visuals: "Visuals",
        admin_maint: "Maintenance Mode",
        admin_hero_title: "Hero Title",
        admin_hero_sub: "Hero Subtitle",
        admin_cta: "CTA Button Text",
        admin_discord: "Discord Invite URL",
        admin_email: "Contact Email",
        admin_banner: "Banner Image URL",
        admin_show_games: "Show 'Games' Category"
    },
    ar: {
        site_name: "جناح هاب",
        nav_home: "الرئيسية",
        nav_coding: "برمجة",
        nav_design: "تصميم",
        nav_games: "ألعاب",
        nav_support: "دعم فني",
        hero_title: "مرحباً بكم في <span class='gradient-text'>جناح هاب</span>",
        hero_subtitle: "المتجر الأمثل للبرمجة، التصميم، بطاقات الألعاب والدعم الفني.",
        hero_cta: "تصفح الآن",
        section_categories: "خدماتنا",
        cat_coding: "طلبات البرمجة",
        cat_coding_desc: "بوتات، مواقع، سكربتات، وتطوير ديسكورد.",
        cat_design: "طلبات التصميم",
        cat_design_desc: "صور مصغرة، مونتاج فيديو، وجرافيك.",
        cat_games: "طلبات الألعاب",
        cat_games_desc: "بطاقات ستيم، بلايستيشن، وحسابات.",
        cat_support: "الدعم الفني",
        cat_support_desc: "استفسارات عامة ومساعدة.",
        back: "رجوع",
        opt_buy: "شراء جاهز",
        opt_request: "طلب خاص",
        opt_sell: "بيع منتجك",
        cart_title: "سلة المشتريات",
        cart_empty: "السلة فارغة.",
        total: "المجموع:",
        checkout: "إتمام الشراء",
        ticket_title: "فتح تذكرة",
        ticket_desc: "لإكمال طلبك، يرجى فتح تذكرة مع فريق الإدارة.",
        step_1: "نوع الطلب",
        step_2: "تواصل مع الإدارة",
        ticket_type: "نوع التذكرة:",
        ticket_details: "التفاصيل:",
        open_ticket_btn: "فتح تذكرة في ديسكورد",
        // Admin Translations
        admin_panel: "لوحة التحكم",
        admin_products: "المنتجات",
        admin_orders: "الطلبات",
        admin_settings: "الإعدادات",
        admin_logout: "تسجيل الخروج",
        admin_back: "العودة للمتجر",
        admin_prod_mgmt: "إدارة المنتجات",
        admin_prod_desc: "تحكم في منتجات متجرك بفعالية",
        admin_add_prod: "إضافة منتج",
        admin_total_items: "إجمالي العناصر",
        admin_order_req: "طلبات الشراء",
        admin_order_desc: "تتبع مشتريات العملاء والتذاكر",
        admin_clear_all: "مسح الكل",
        admin_site_config: "إعدادات الموقع",
        admin_config_desc: "تخصيص محتوى ومظهر الموقع",
        admin_save: "حفظ التغييرات",
        admin_general: "المحتوى العام",
        admin_links: "روابط خارجية",
        admin_features: "المميزات",
        admin_visuals: "المظهر",
        admin_maint: "وضع الصيانة",
        admin_hero_title: "عنوان الهيرو",
        admin_hero_sub: "وصف الهيرو",
        admin_cta: "نص الزر",
        admin_discord: "رابط الديسكورد",
        admin_email: "البريد الإلكتروني",
        admin_banner: "رابط صورة البانر",
        admin_show_games: "إظهار قسم الألعاب"
    }
};

// Data Management (localStorage)
let products = JSON.parse(localStorage.getItem('jannah_products')) || {
    coding: [
        { id: 'c1', name: 'Premium Discord Bot', price: 20, image: '<i class="fa-solid fa-robot"></i>' },
        { id: 'c2', name: 'Full Website Creation', price: 100, image: '<i class="fa-solid fa-code"></i>' },
        { id: 'c3', name: 'FiveM Script (Custom)', price: 40, image: '<i class="fa-solid fa-server"></i>' },
        { id: 'c4', name: 'Discord Server Setup', price: 15, image: '<i class="fa-brands fa-discord"></i>' }
    ],
    design: [
        { id: 'd1', name: 'YouTube Thumbnail', price: 10, image: '<i class="fa-solid fa-image"></i>' },
        { id: 'd2', name: 'Video Montage (1 min)', price: 30, image: '<i class="fa-solid fa-film"></i>' },
        { id: 'd3', name: 'Logo Design', price: 25, image: '<i class="fa-solid fa-paintbrush"></i>' }
    ],
    games: [
        { id: 'g1', name: '$20 Steam Card', price: 20, image: '<i class="fa-brands fa-steam"></i>' },
        { id: 'g2', name: '$50 Steam Card', price: 50, image: '<i class="fa-brands fa-steam"></i>' },
        { id: 'g3', name: '$20 PlayStation Card', price: 20, image: '<i class="fa-brands fa-playstation"></i>' },
        { id: 'g4', name: '$50 PlayStation Card', price: 50, image: '<i class="fa-brands fa-playstation"></i>' }
    ],
    support: []
};

function saveSystem() {
    localStorage.setItem('jannah_products', JSON.stringify(products));
}

// --- Expanded Admin Logic REMOVED (Moved to dashboard.js) ---

// --- Orders Management (Creation Only) ---
let orders = JSON.parse(localStorage.getItem('jannah_orders')) || [];

function saveOrders() {
    localStorage.setItem('jannah_orders', JSON.stringify(orders));
}

function createOrder(type, details) {
    const newOrder = {
        id: 'ord-' + Date.now(),
        date: new Date().toLocaleDateString(),
        type: type,
        details: details,
        status: 'Pending'
    };
    orders.unshift(newOrder); // Add to top
    saveOrders();
}

// --- Site Settings Management (Read Only for Main Site) ---
let siteConfig = JSON.parse(localStorage.getItem('jannah_config')) || {
    heroTitle: "Welcome to <span class='gradient-text'>𝐉𝐚𝐧𝐧𝐚𝐡 𝐇𝐮𝐛</span>",
    heroSubtitle: "The ultimate marketplace for Discord interactions, Gaming Scripts, and Premium Bots.",
    ctaText: "Explore Now",
    discordLink: "",
    contactEmail: "",
    showGames: true,
    maintenanceMode: false
};

function applySiteConfig() {
    // Apply texts
    const h1 = document.querySelector('.hero-text h1');
    if (h1) h1.innerHTML = siteConfig.heroTitle;

    const p = document.querySelector('.hero-text p');
    if (p) p.textContent = siteConfig.heroSubtitle;

    const btn = document.querySelector('.hero-text .cta-btn');
    if (btn) btn.textContent = siteConfig.ctaText;

    // Apply Banner
    const img = document.querySelector('.hero-visual img');
    if (img) {
        if (siteConfig.bannerImage && siteConfig.bannerImage.trim() !== "") {
            img.src = siteConfig.bannerImage;
        } else {
            img.src = 'logo.png'; // Default
        }
    }

    // Apply Toggles
    const gamesCard = document.querySelector('.category-card.games-card');
    if (gamesCard) {
        gamesCard.style.display = siteConfig.showGames ? 'block' : 'none';
        // Also hide from products if needed, but start with category card
    }

    if (siteConfig.maintenanceMode) {
        document.getElementById('maintenance-overlay').classList.remove('hidden');
    } else {
        document.getElementById('maintenance-overlay').classList.add('hidden');
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    updateContent();
    applySiteConfig(); // Apply saved settings
});

// Navigation Functions
function scrollToCategories() {
    document.getElementById('categories').scrollIntoView({ behavior: 'smooth' });
}

function showSection(sectionId) {
    if (sectionId === 'hero') {
        // Reset ALL Views
        document.getElementById('hero').classList.remove('hidden');
        document.getElementById('categories').classList.remove('hidden');

        // Hide sub-views
        document.getElementById('service-options').classList.add('hidden');
        document.getElementById('products-view').classList.add('hidden');

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
}

function selectCategory(category) {
    if (category === 'support') {
        const link = siteConfig.discordLink || "https://discord.gg/yourserver"; // Fallback
        window.open(link, '_blank');
        return;
    }
    currentCategory = category;
    openServiceOptions(category);
}

// Service Options Logic
function openServiceOptions(category) {
    currentCategory = category;
    const modal = document.getElementById('service-options');
    const title = document.getElementById('selected-service-title');

    const titleMap = {
        'coding': currentLang === 'en' ? 'Coding Orders' : 'طلبات البرمجة',
        'design': currentLang === 'en' ? 'Design Orders' : 'طلبات التصميم',
        'games': currentLang === 'en' ? 'Games Orders' : 'طلبات الألعاب',
        'support': currentLang === 'en' ? 'Support' : 'الدعم الفني'
    };

    title.textContent = titleMap[category] || category;
    modal.classList.remove('hidden');
    modal.scrollIntoView({ behavior: 'smooth' });
}

function hideServiceOptions() {
    document.getElementById('service-options').classList.add('hidden');
    showSection('hero');
}

function handleServiceAction(action) {
    currentAction = action;
    const viewId = 'products-view';
    const productsSection = document.getElementById(viewId);

    if (action === 'buy') {
        if (currentCategory === 'support') {
            openTicketModal(currentCategory, action);
        } else {
            showProducts(currentCategory);
        }
    } else if (action === 'request') {
        openTicketModal(currentCategory, action);
    } else if (action === 'sell') {
        openTicketModal(currentCategory, action);
    }
}

function showProducts(category) {
    currentCategory = category;
    const modal = document.getElementById('products-view');
    const title = document.getElementById('products-title');

    const titleMap = {
        'coding': currentLang === 'en' ? 'Coding Products' : 'منتجات البرمجة',
        'design': currentLang === 'en' ? 'Design Products' : 'منتجات التصميم',
        'games': currentLang === 'en' ? 'Games Products' : 'منتجات الألعاب'
    };

    title.textContent = titleMap[category] || category;
    renderProducts(category);
    modal.classList.remove('hidden');
    modal.scrollIntoView({ behavior: 'smooth' });
}

function backToOptions() {
    document.getElementById('products-view').classList.add('hidden');
    openServiceOptions(currentCategory);
}

// Products Logic
function renderProducts(category) {
    const container = document.getElementById('products-container');
    container.innerHTML = '';

    // Safety check if category exists
    if (!products[category]) return;

    const items = products[category];
    const btnText = currentLang === 'en' ? 'Add into Cart' : 'أضف للسلة';

    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';

        let visualContent;
        // Check if image is an HTML tag (like FontAwesome) or a valid Image Source (URL/Base64)
        if (item.image && item.image.trim().startsWith('<')) {
            visualContent = item.image;
        } else {
            // It's an image URL or Data URI
            visualContent = `<img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">`;
        }

        card.innerHTML = `
            <div class="product-image">${visualContent}</div>
            <div class="product-info">
                <h4>${item.name}</h4>
                <span class="price">$${item.price}</span>
            </div>
            <button class="add-cart-btn" onclick="addToCart('${item.id}')">${btnText}</button>
        `;
        container.appendChild(card);
    });
}

// Cart Logic
function addToCart(productId) {
    // Find product in all categories
    let product;
    for (const cat in products) {
        const found = products[cat].find(p => p.id === productId);
        if (found) {
            product = found;
            break;
        }
    }

    if (product) {
        cart.push(product);
        updateCartUI();
        alert(currentLang === 'en' ? 'Added to cart!' : 'تمت الإضافة للسلة!');
    }
}

function updateCartUI() {
    document.getElementById('cart-count').textContent = cart.length;
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) {
        renderCartItems();
    }
}

function renderCartItems() {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = `<p class="empty-msg" data-i18n="cart_empty">${translations[currentLang].cart_empty}</p>`;
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <span>$${item.price}</span>
                </div>
                <i class="fa-solid fa-trash remove-item" onclick="removeFromCart(${index})"></i>
            `;
            container.appendChild(div);
        });
    }

    document.getElementById('cart-total').textContent = '$' + total.toFixed(2);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    renderCartItems();
}

function initiateCheckout() {
    if (cart.length === 0) return;
    toggleCart(); // Close cart modal
    openTicketModal('Checkout', 'purchase');
}

// Ticket System Logic
function openTicketModal(category, action) {
    const modal = document.getElementById('ticket-modal');
    const typeInput = document.getElementById('ticket-type-input');
    const detailsInput = document.getElementById('ticket-details');

    modal.classList.add('active');

    let typeText = `${category} - ${action}`;
    let detailsText = '';

    if (action === 'purchase') {
        typeText = "Checkout / Purchase";
        // List items
        detailsText = "Items:\n" + cart.map(i => `- ${i.name} ($${i.price})`).join('\n') + `\n\nTotal: $${document.getElementById('cart-total').textContent}`;
    } else if (action === 'request') {
        typeText = `Request Special: ${category}`;
        detailsText = "Please describe what specific service or bot you need...";
    } else if (action === 'sell') {
        typeText = `Sell Item: ${category}`;
        detailsText = "Please describe the item/script you want to sell...";
    }

    typeInput.value = typeText;
    detailsInput.value = detailsText;
}

function closeTicketModal() {
    document.getElementById('ticket-modal').classList.remove('active');
}

const WEBHOOK_URL = "https://discord.com/api/webhooks/1464374398906663025/7aYd47VUfaDfdJ3saDqoTBRfJ3Qj9P06gvi4G1VizVQ9yYr6Tj_oBgg5Yd_2NyMlZWnf";

async function redirectToDiscord() {
    const type = document.getElementById('ticket-type-input').value;
    const details = document.getElementById('ticket-details').value;

    // Basic validation
    if (!type || !details) {
        alert("Please ensure all details are correct.");
        return;
    }

    const embed = {
        title: "New Order / Request",
        color: 0x9d4edd, // Purple
        fields: [
            { name: "Ticket Type", value: type, inline: true },
            { name: "Details", value: details }
        ],
        footer: { text: "𝐉𝐚𝐧𝐧𝐚𝐡 𝐇𝐮𝐛 System" },
        timestamp: new Date().toISOString()
    };

    const payload = {
        username: "𝐉𝐚𝐧𝐧𝐚𝐡 𝐇𝐮𝐛 Bot",
        avatar_url: "https://i.imgur.com/4M34hi2.png", // Valid placeholder or use site logo if hosted
        embeds: [embed]
    };

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            // Local Log
            createOrder(type, details.substring(0, 100)); // Log to Admin Panel

            alert("Request sent successfully to our administration team! We will contact you soon.");
            cart = []; // Clear cart
            updateCartUI();
            closeTicketModal();
        } else {
            alert("Failed to send request. Please try again or contact us manually.");
        }
    } catch (error) {
        console.error("Error sending webhook:", error);
        alert("Error connecting to server. Please check your internet connection.");
    }
}

// Language & UI Functions
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    document.getElementById('lang-toggle').textContent = currentLang === 'en' ? 'AR' : 'EN';
    document.body.classList.toggle('rtl');
    updateContent();
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

function updateContent() {
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            const translation = translations[currentLang][key];
            // Check if translation contains HTML
            if (translation.includes('<')) {
                element.innerHTML = translation;
            } else {
                element.textContent = translation;
            }
        }
    });

    // Update brand name in navbar
    const navBrand = document.querySelector('.logo span');
    if (navBrand) {
        navBrand.textContent = currentLang === 'en' ? '𝐉𝐚𝐧𝐧𝐚𝐡 𝐇𝐮𝐛' : 'جناح هاب';
    }
}