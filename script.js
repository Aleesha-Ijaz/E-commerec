// Product Data
const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        category: "Electronics",
        price: 299.99,
        isFeatured: true,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
    },
    {
        id: 2,
        name: "Modern Urban Sneakers",
        category: "Shoes",
        price: 120.00,
        isFeatured: true,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80"
    },
    {
        id: 3,
        name: "Minimalist Leather Watch",
        category: "Accessories",
        price: 185.50,
        isFeatured: true,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
    },
    {
        id: 4,
        name: "Ultra-Lightweight Hoodie",
        category: "Clothing",
        price: 65.00,
        isFeatured: false,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80"
    },
    {
        id: 5,
        name: "Smart Fitness Tracker",
        category: "Electronics",
        price: 89.99,
        isFeatured: true,
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80"
    },
    {
        id: 6,
        name: "Classic Denim Jacket",
        category: "Clothing",
        price: 110.00,
        isFeatured: false,
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&q=80"
    },
    {
        id: 7,
        name: "Ergonomic Gaming Mouse",
        category: "Electronics",
        price: 55.00,
        isFeatured: false,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80"
    },
    {
        id: 8,
        name: "Compact Travel Backpack",
        category: "Accessories",
        price: 75.00,
        isFeatured: false,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
    },
    {
        id: 9,
        name: "Men's Classic Suit",
        category: "Men",
        price: 450.00,
        isFeatured: true,
        image: "https://images.unsplash.com/photo-1594932224016-0460d37710f6?w=800&q=80"
    },
    {
        id: 10,
        name: "Women's Floral Dress",
        category: "Women",
        price: 85.00,
        isFeatured: true,
        image: "https://images.unsplash.com/photo-1515377666659-7a7230138241?w=800&q=80"
    },
    {
        id: 11,
        name: "Men's Leather Boots",
        category: "Men",
        price: 180.00,
        isFeatured: false,
        image: "https://images.unsplash.com/photo-1520639889410-d04196f72a49?w=800&q=80"
    },
    {
        id: 12,
        name: "Women's Evening Gown",
        category: "Women",
        price: 220.00,
        isFeatured: false,
        image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80"
    }
];

// State Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentCategory = 'all';
let currentSort = 'featured';
let searchQuery = '';

// DOM Elements
const productGrid = document.getElementById('productGrid');
const featuredGrid = document.getElementById('featuredGrid');
const cartCount = document.getElementById('cartCount');
const cartSidebar = document.getElementById('cartSidebar');
const filterSidebar = document.getElementById('filterSidebar');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartToggle = document.getElementById('cartToggle');
const menuToggle = document.getElementById('menuToggle');
const closeCart = document.getElementById('closeCart');
const closeFilters = document.getElementById('closeFilters');
const overlay = document.getElementById('overlay');
const filterBtns = document.querySelectorAll('.filter-btn');
const sortSelect = document.getElementById('sortSelect');
const searchInput = document.getElementById('searchInput');
const checkoutBtn = document.getElementById('checkoutBtn');
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckout = document.getElementById('closeCheckout');
const modalTotal = document.getElementById('modalTotal');
const paymentSelectionScreen = document.getElementById('paymentSelectionScreen');
const cardDetailsScreen = document.getElementById('cardDetailsScreen');
const onlinePaymentBtn = document.getElementById('onlinePaymentBtn');
const backToPayment = document.getElementById('backToPayment');
const cardForm = document.getElementById('cardForm');
const notification = document.getElementById('notification');

// Functions
function init() {
    renderFeaturedProducts();
    renderProducts();
    updateCartUI();
    setupEventListeners();
}

function renderFeaturedProducts() {
    const featured = products.filter(p => p.isFeatured);
    featuredGrid.innerHTML = featured.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/400x400?text=Product+Image'">
            <span class="category-tag">${product.category}</span>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price-row">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <button class="add-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderProducts() {
    let filtered = products.filter(p => {
        const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Sorting
    if (currentSort === 'low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'high') {
        filtered.sort((a, b) => b.price - a.price);
    }

    productGrid.innerHTML = filtered.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/400x400?text=Product+Image'">
            <span class="category-tag">${product.category}</span>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price-row">
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <button class="add-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCartUI();
    showNotification(`Added ${product.name} to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
}

function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
        }
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    // Badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // List
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: var(--text-muted); margin-top: 20px;">Your cart is empty</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <span class="price">$${(item.price * item.quantity).toFixed(2)}</span>
                    <div class="item-controls">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                        <i class="fas fa-trash remove-item" onclick="removeFromCart(${item.id})"></i>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}

function showNotification(msg) {
    notification.textContent = msg;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function toggleCart() {
    cartSidebar.classList.toggle('open');
    overlay.classList.toggle('visible');
}

function toggleFilterSidebar() {
    filterSidebar.classList.toggle('open');
    overlay.classList.toggle('visible');
}

function openCheckout() {
    if (cart.length === 0) {
        showNotification("Your cart is empty!");
        return;
    }
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    modalTotal.textContent = `$${total.toFixed(2)}`;
    checkoutModal.classList.add('open');
}

function closeCheckoutModal() {
    checkoutModal.classList.remove('open');
    // Reset screens when modal closes
    setTimeout(() => {
        paymentSelectionScreen.style.display = 'block';
        cardDetailsScreen.style.display = 'none';
        cardForm.reset();
    }, 300);
}

function payWithCard(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.pay-now-btn');
    const originalText = btn.textContent;

    btn.disabled = true;
    btn.textContent = "Processing Payment...";

    setTimeout(() => {
        placeOrder('Online Payment (Card)');
        btn.disabled = false;
        btn.textContent = originalText;
    }, 2000);
}

function placeOrder(method) {
    showNotification(`Order placed successfully via ${method}!`);
    cart = [];
    saveCart();
    updateCartUI();
    closeCheckoutModal();
    // Visual feedback for successful order
    setTimeout(() => {
        if (cartSidebar.classList.contains('open')) toggleCart();
    }, 1000);
}

function filterByCategory(category) {
    currentCategory = category;
    // Update active state of buttons
    filterBtns.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    renderProducts();
    // Scroll to products section
    document.getElementById('all-products').scrollIntoView({ behavior: 'smooth' });
}

function setupEventListeners() {
    cartToggle.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);

    menuToggle.addEventListener('click', toggleFilterSidebar);
    closeFilters.addEventListener('click', toggleFilterSidebar);

    checkoutBtn.addEventListener('click', openCheckout);
    closeCheckout.addEventListener('click', closeCheckoutModal);

    onlinePaymentBtn.addEventListener('click', () => {
        paymentSelectionScreen.style.display = 'none';
        cardDetailsScreen.style.display = 'block';
    });

    backToPayment.addEventListener('click', () => {
        cardDetailsScreen.style.display = 'none';
        paymentSelectionScreen.style.display = 'block';
    });

    cardForm.addEventListener('submit', payWithCard);

    overlay.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
        filterSidebar.classList.remove('open');
        checkoutModal.classList.remove('open');
        overlay.classList.remove('visible');
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterByCategory(btn.dataset.category);
        });
    });

    sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProducts();
    });

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderProducts();
    });
}

// Global scope for onclick handlers in template strings
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.filterByCategory = filterByCategory;
window.placeOrder = placeOrder;

// Initialize
init();
