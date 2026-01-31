// State Management
let currentLang = 'ar'; // Admin is always AR by default as per request
// Data Management (localStorage) - Shared with Site
let products = JSON.parse(localStorage.getItem('jannah_products')) || {
    coding: [],
    design: [],
    games: [],
    support: []
};
let orders = JSON.parse(localStorage.getItem('jannah_orders')) || [];
let siteConfig = JSON.parse(localStorage.getItem('jannah_config')) || {
    heroTitle: "Welcome to <span class='gradient-text'>𝐉𝐚𝐧𝐧𝐚𝐡 𝐇𝐮𝐛</span>",
    heroSubtitle: "The ultimate marketplace for Discord interactions, Gaming Scripts, and Premium Bots.",
    ctaText: "Explore Now",
    discordLink: "",
    contactEmail: "",
    showGames: true,
    maintenanceMode: false
};

const translations = {
    en: {
        site_name: "𝐉𝐚𝐧𝐧𝐚𝐡 𝐇𝐮𝐛",
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
        prod_name: "Product Name",
        prod_cat: "Category",
        prod_price: "Price",
        prod_actions: "Actions",
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
        admin_show_games: "Show 'Games' Category",
        cat_coding: "Coding",
        cat_design: "Design",
        cat_games: "Games",
        cat_support: "Support"
    },
    ar: {
        site_name: "جناح هاب",
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
        prod_name: "اسم المنتج",
        prod_cat: "القسم",
        prod_price: "السعر",
        prod_actions: "إجراءات",
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
        admin_show_games: "إظهار قسم الألعاب",
        cat_coding: "برمجة",
        cat_design: "تصميم",
        cat_games: "ألعاب",
        cat_support: "دعم فني"
    }
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    // Apply translations instantly
    updateContent();
});

function updateContent() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang][key]) {
            el.textContent = translations[currentLang][key];
        }
    });
}

// --- Auth & Navigation ---
function checkAdminPassword() {
    const input = document.getElementById('admin-password').value;
    if (input === '1962684120112026') { // Hardcoded per user request
        document.getElementById('admin-login-modal').style.display = 'none';
        document.getElementById('admin-dashboard').classList.add('active');

        switchAdminTab('products'); // Default load
        renderAdminItems();
    } else {
        alert('كلمة المرور غير صحيحة!');
    }
}

function logoutAdmin() {
    // Just reload the page to reset login state
    location.reload();
    // Or redirect to index: location.href = 'index.html';
}

function switchAdminTab(tabName) {
    document.querySelectorAll('.admin-view').forEach(view => view.classList.add('hidden'));
    document.querySelectorAll('.sidebar-nav li').forEach(li => li.classList.remove('active'));

    document.getElementById(`view-${tabName}`).classList.remove('hidden');
    document.getElementById(`tab-${tabName}`).classList.add('active');

    if (tabName === 'orders') renderOrders();
    if (tabName === 'settings') loadSettingsInputs();
}

// --- Persistence ---
function saveSystem() {
    localStorage.setItem('jannah_products', JSON.stringify(products));
}

function saveOrders() {
    localStorage.setItem('jannah_orders', JSON.stringify(orders));
}

function saveConfig() {
    localStorage.setItem('jannah_config', JSON.stringify(siteConfig));
}

// --- Products Logic ---
function renderAdminItems() {
    const container = document.getElementById('admin-products-table-body');
    if (!container) return;
    container.innerHTML = '';

    let allProducts = [];
    for (const cat in products) {
        if (Array.isArray(products[cat])) {
            products[cat].forEach(item => {
                allProducts.push({...item, category: cat });
            });
        }
    }

    allProducts.forEach(item => {
        const tr = document.createElement('tr');
        let imgDisplay;
        if (item.image && item.image.trim().startsWith('<')) {
            imgDisplay = item.image;
        } else {
            imgDisplay = `<img src="${item.image}" alt="img">`;
        }

        tr.innerHTML = `
            <td><div class="table-icon-preview">${imgDisplay}</div></td>
            <td><strong>${item.name}</strong></td>
            <td><span style="text-transform:capitalize; color: var(--text-gray); font-size: 0.9rem;">${item.category}</span></td>
            <td><span style="color: var(--accent); font-weight: 700;">$${item.price}</span></td>
            <td>
                <button class="action-btn edit-action" onclick="editProduct('${item.category}', '${item.id}')" title="تعديل">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="action-btn delete-action" onclick="deleteProduct('${item.category}', '${item.id}')" title="حذف">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        container.appendChild(tr);
    });

    updateAdminStats();
}

function updateAdminStats() {
    let total = 0;
    for (const cat in products) {
        if (!products[cat]) continue;
        const count = products[cat].length;
        const el = document.getElementById(`count-${cat}`);
        if (el) el.textContent = count;
        total += count;
    }
    const totalEl = document.getElementById('count-total');
    if (totalEl) totalEl.textContent = total;
}

// Modal
// Image Preview
function previewImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('image-preview');
            preview.src = e.target.result;
            preview.classList.remove('hidden');
            // Store temporarily in case we need it, but reliance is on file input for save
        }
        reader.readAsDataURL(file);
    }
}

function openProductModal() {
    clearAdminForm();
    document.getElementById('modal-title').textContent = 'إضافة منتج جديد';
    document.getElementById('product-modal').classList.add('active');
}

function clearAdminForm() {
    document.getElementById('edit-product-id').value = '';
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';

    // Clear Image State
    document.getElementById('product-base64-store').value = '';
    const fileInput = document.getElementById('product-file-input');
    if (fileInput) fileInput.value = '';

    // Reset Preview
    const preview = document.getElementById('image-preview');
    preview.src = '';
    preview.classList.add('hidden');

    document.getElementById('product-category').value = 'coding';
}

function saveProduct() {
    const id = document.getElementById('edit-product-id').value;
    const category = document.getElementById('product-category').value;
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);

    // Get image from file input OR hidden store (for edits without new file)
    const fileInput = document.getElementById('product-file-input');
    const storedBase64 = document.getElementById('product-base64-store').value;

    if (!name || isNaN(price)) {
        alert("يرجى إدخال اسم وسعر صحيح");
        return;
    }

    if (fileInput && fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const finalImage = e.target.result;
            processSaveProduct(id, category, name, price, finalImage);
        };
        reader.readAsDataURL(fileInput.files[0]);
    } else if (storedBase64) {
        processSaveProduct(id, category, name, price, storedBase64);
    } else {
        alert("يرجى رفع صورة للمنتج");
        return;
    }
}

function processSaveProduct(id, category, name, price, image) {
    // Ensure category array exists
    if (!products[category]) products[category] = [];

    if (id) {
        // Edit Mode
        let oldCat = null;
        let oldIndex = -1;
        for (const c in products) {
            const idx = products[c].findIndex(p => p.id === id);
            if (idx !== -1) {
                oldCat = c;
                oldIndex = idx;
                break;
            }
        }
        if (oldCat && oldIndex !== -1) {
            products[oldCat].splice(oldIndex, 1);
        }
        products[category].push({ id, name, price, image });
    } else {
        // New Mode
        products[category].push({
            id: 'p' + Date.now(),
            name,
            price,
            image
        });
    }

    saveSystem();
    renderAdminItems();
    closeProductModal();
}

function editProduct(cat, id) {
    const item = products[cat].find(p => p.id === id);
    if (!item) return;

    document.getElementById('edit-product-id').value = item.id;
    document.getElementById('product-category').value = cat;
    document.getElementById('product-name').value = item.name;
    document.getElementById('product-price').value = item.price;

    // Handle Image
    if (item.image) {
        document.getElementById('product-base64-store').value = item.image;
        const preview = document.getElementById('image-preview');
        preview.src = item.image;
        preview.classList.remove('hidden');
    }

    document.getElementById('modal-title').textContent = 'تعديل المنتج';
    document.getElementById('product-modal').classList.add('active');
}

function deleteProduct(cat, id) {
    if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
        products[cat] = products[cat].filter(p => p.id !== id);
        saveSystem();
        renderAdminItems();
    }
}

// --- Orders Logic ---
function renderOrders() {
    const container = document.getElementById('admin-orders-table-body');
    if (!container) return;
    container.innerHTML = '';

    if (orders.length === 0) {
        container.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 2rem;">لا توجد طلبات.</td></tr>';
        return;
    }

    orders.forEach(order => {
        const cls = order.status === 'Pending' ? 'status-pending' : (order.status === 'Completed' ? 'status-completed' : 'status-cancelled');
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${order.date}</td>
            <td><strong>${order.type}</strong></td>
            <td title="${order.details}">${order.details.substring(0, 30)}...</td>
            <td><span class="status-badge ${cls}">${order.status}</span></td>
            <td>
                <button class="action-btn delete-action" onclick="deleteOrder('${order.id}')" title="حذف"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
        container.appendChild(tr);
    });
}

function deleteOrder(id) {
    if (confirm('حذف هذا الطلب؟')) {
        orders = orders.filter(o => o.id !== id);
        saveOrders();
        renderOrders();
    }
}

function clearAllOrders() {
    if (confirm('حذف كل السجل؟')) {
        orders = [];
        saveOrders();
        renderOrders();
    }
}

// --- Settings Logic ---
function loadSettingsInputs() {
    document.getElementById('setting-hero-title').value = siteConfig.heroTitle;
    document.getElementById('setting-hero-subtitle').value = siteConfig.heroSubtitle;
    document.getElementById('setting-hero-cta').value = siteConfig.ctaText;
    document.getElementById('setting-discord-link').value = siteConfig.discordLink;
    document.getElementById('setting-email').value = siteConfig.contactEmail;
    document.getElementById('setting-banner-image').value = siteConfig.bannerImage || "";
    document.getElementById('setting-show-games').checked = siteConfig.showGames;
    document.getElementById('setting-maintenance').checked = siteConfig.maintenanceMode;
}

function saveSiteSettings() {
    siteConfig.heroTitle = document.getElementById('setting-hero-title').value;
    siteConfig.heroSubtitle = document.getElementById('setting-hero-subtitle').value;
    siteConfig.ctaText = document.getElementById('setting-hero-cta').value;
    siteConfig.discordLink = document.getElementById('setting-discord-link').value;
    siteConfig.contactEmail = document.getElementById('setting-email').value;
    siteConfig.showGames = document.getElementById('setting-show-games').checked;
    siteConfig.maintenanceMode = document.getElementById('setting-maintenance').checked;
    siteConfig.bannerImage = document.getElementById('setting-banner-image').value;

    saveConfig();
    alert('تم حفظ الإعدادات بنجاح!');
}

// Close Product Modal
function closeProductModal() {
    document.getElementById('product-modal').classList.remove('active');
    clearAdminForm();
}