/* ==========================================
   PRODUCT DATA
   ========================================== */

const products = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    category: 'electronics',
    price: 299.99,
    oldPrice: 399.99,
    rating: 5,
    reviews: 128,
    description: 'Experience crystal-clear sound with active noise cancellation and 30-hour battery life.',
    image: 'images/headphones.jpg',
    badge: 'Bestseller'
  },
  {
    id: 2,
    name: 'Luxury Leather Backpack',
    category: 'fashion',
    price: 149.99,
    oldPrice: 199.99,
    rating: 5,
    reviews: 89,
    description: 'Handcrafted Italian leather backpack with weather-resistant coating and multiple compartments.',
    image: 'images/backpack.jpg',
    badge: 'New'
  },
  {
    id: 3,
    name: 'Minimalist Smart Watch',
    category: 'electronics',
    price: 249.99,
    oldPrice: 349.99,
    rating: 5,
    reviews: 156,
    description: 'Elegant smartwatch with 14-day battery, health tracking, and seamless app integration.',
    image: 'images/watch.jpg',
    badge: 'Hot'
  },
  {
    id: 4,
    name: 'Organic Cotton T-Shirt',
    category: 'fashion',
    price: 39.99,
    oldPrice: 59.99,
    rating: 5,
    reviews: 234,
    description: 'Sustainable and comfortable pure organic cotton t-shirt in premium quality.',
    image: 'images/tshirt.jpg',
    badge: null
  },
  {
    id: 5,
    name: 'Ceramic Coffee Set',
    category: 'home',
    price: 89.99,
    oldPrice: 129.99,
    rating: 5,
    reviews: 67,
    description: 'Beautiful handmade ceramic coffee set with minimalist design and thermal properties.',
    image: 'images/coffee-set.jpg',
    badge: 'Sale'
  },
  {
    id: 6,
    name: 'Premium Yoga Mat',
    category: 'home',
    price: 79.99,
    oldPrice: 119.99,
    rating: 5,
    reviews: 142,
    description: 'Non-slip eco-friendly yoga mat with carrying strap and alignment markers.',
    image: 'images/yoga-mat.jpg',
    badge: null
  },
  {
    id: 7,
    name: 'Luxury Silk Pillowcase',
    category: 'home',
    price: 69.99,
    oldPrice: 99.99,
    rating: 5,
    reviews: 198,
    description: 'Pure 100% mulberry silk pillowcase for hair and skin care benefits.',
    image: 'images/pillowcase.jpg',
    badge: 'New'
  },
  {
    id: 8,
    name: 'Designer Sunglasses',
    category: 'fashion',
    price: 199.99,
    oldPrice: 299.99,
    rating: 5,
    reviews: 112,
    description: 'UV-protected designer sunglasses with premium polarized lenses and titanium frame.',
    image: 'images/sunglasses.jpg',
    badge: 'Sale'
  },
  {
    id: 9,
    name: 'Smart Home Speaker',
    category: 'electronics',
    price: 149.99,
    oldPrice: 199.99,
    rating: 5,
    reviews: 203,
    description: '360° premium sound with smart home control and voice assistant integration.',
    image: 'images/speaker.jpg',
    badge: 'Bestseller'
  },
  {
    id: 10,
    name: 'Aromatherapy Diffuser',
    category: 'home',
    price: 59.99,
    oldPrice: 79.99,
    rating: 5,
    reviews: 89,
    description: 'Ultrasonic diffuser with 7 LED colors and essential oil compatibility.',
    image: 'images/diffuser.jpg',
    badge: null
  },
  {
    id: 11,
    name: 'Stainless Steel Water Bottle',
    category: 'home',
    price: 44.99,
    oldPrice: 59.99,
    rating: 5,
    reviews: 267,
    description: 'Insulated water bottle keeps drinks cold for 24 hours or hot for 12 hours.',
    image: 'images/bottle.jpg',
    badge: null
  },
  {
    id: 12,
    name: 'Premium Phone Case',
    category: 'electronics',
    price: 49.99,
    oldPrice: 79.99,
    rating: 5,
    reviews: 156,
    description: 'Military-grade protective case with premium materials and sleek design.',
    image: 'images/phonecase.jpg',
    badge: 'Hot'
  }
];


/* ==========================================
   CART STATE & STORAGE
   ========================================== */

class Cart {
    constructor() {
        this.items = this.loadFromStorage();
    }

    loadFromStorage() {
        const stored = localStorage.getItem('luxe-cart');
        return stored ? JSON.parse(stored) : [];
    }

    saveToStorage() {
        localStorage.setItem('luxe-cart', JSON.stringify(this.items));
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                ...product,
                quantity: 1
            });
        }
        
        this.saveToStorage();
        return true;
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
            }
            this.saveToStorage();
        }
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    clear() {
        this.items = [];
        this.saveToStorage();
    }
}

/* ==========================================
   UI MANAGER
   ========================================== */

const cart = new Cart();
let currentFilter = 'all';

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartToggle = document.getElementById('cartToggle');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.getElementById('cartCount');
const clearCartBtn = document.getElementById('clearCart');
const filterButtons = document.querySelectorAll('.filter-btn');
const notificationToast = document.getElementById('notificationToast');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const mobileNavClose = document.getElementById('mobileNavClose');

/* ==========================================
   FEATURED PRODUCT LOGIC
   ========================================== */

function setFeaturedProduct() {
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    
    document.getElementById('featuredImage').src = randomProduct.image;
    document.getElementById('featuredImage').alt = randomProduct.name;
    document.getElementById('featuredName').textContent = randomProduct.name;
    document.getElementById('featuredDesc').textContent = randomProduct.description;
    document.getElementById('featuredPrice').textContent = `$${randomProduct.price.toFixed(2)}`;
    
    const addBtn = document.querySelector('.featured-add-btn');
    addBtn.dataset.productId = randomProduct.id;
    addBtn.dataset.productName = randomProduct.name;
    addBtn.dataset.productPrice = randomProduct.price;
}

/* ==========================================
   PRODUCTS RENDERING
   ========================================== */

function renderProducts(filter = 'all') {
    const filtered = filter === 'all' 
        ? products 
        : products.filter(p => p.category === filter);
    
    productsGrid.innerHTML = filtered.map(product => `
        <article class="product-card" role="listitem">
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-body">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    <span class="product-stars" role="img" aria-label="${product.rating} out of 5 stars">★★★★★</span>
                    <span class="product-reviews">(${product.reviews})</span>
                </div>
            </div>
            <div class="product-footer">
                <div>
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    ${product.oldPrice ? `<div class="product-old-price">$${product.oldPrice.toFixed(2)}</div>` : ''}
                </div>
                <button 
                    class="add-to-cart-btn" 
                    data-product-id="${product.id}"
                    data-product-name="${product.name}"
                    data-product-price="${product.price}"
                    aria-label="Add ${product.name} to cart"
                >
                    Add to Cart
                </button>
            </div>
        </article>
    `).join('');
    
    // Attach event listeners to product cards
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', handleAddToCart);
    });
}

/* ==========================================
   CART MANAGEMENT
   ========================================== */

function handleAddToCart(e) {
    const btn = e.target;
    const productId = parseInt(btn.dataset.productId);
    const product = products.find(p => p.id === productId) || {
        id: productId,
        name: btn.dataset.productName,
        price: parseFloat(btn.dataset.productPrice)
    };
    
    cart.addItem(product);
    updateCartUI();
    showNotification(`${product.name} added to cart!`);
    
    // Animate button
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = '';
    }, 200);
}

function updateCartUI() {
    cartCount.textContent = cart.getItemCount();
    cartTotal.textContent = `$${cart.getTotal().toFixed(2)}`;
    renderCartItems();
}

function renderCartItems() {
    if (cart.items.length === 0) {
        cartItems.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--text-lighter);">Your cart is empty</div>';
        return;
    }
    
    cartItems.innerHTML = cart.items.map(item => `
        <div class="cart-item" role="listitem">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image" loading="lazy">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button 
                        class="quantity-btn" 
                        onclick="decrementQuantity(${item.id})"
                        aria-label="Decrease quantity for ${item.name}"
                    >-</button>
                    <span aria-label="Quantity: ${item.quantity}">${item.quantity}</span>
                    <button 
                        class="quantity-btn" 
                        onclick="incrementQuantity(${item.id})"
                        aria-label="Increase quantity for ${item.name}"
                    >+</button>
                </div>
                <button 
                    class="remove-from-cart"
                    onclick="removeFromCart(${item.id})"
                    aria-label="Remove ${item.name} from cart"
                >
                    Remove
                </button>
            </div>
        </div>
    `).join('');
}

function incrementQuantity(productId) {
    const item = cart.items.find(i => i.id === productId);
    if (item) {
        cart.updateQuantity(productId, item.quantity + 1);
        updateCartUI();
        showNotification('Quantity updated');
    }
}

function decrementQuantity(productId) {
    const item = cart.items.find(i => i.id === productId);
    if (item && item.quantity > 1) {
        cart.updateQuantity(productId, item.quantity - 1);
        updateCartUI();
        showNotification('Quantity updated');
    }
}

function removeFromCart(productId) {
    const product = cart.items.find(i => i.id === productId);
    cart.removeItem(productId);
    updateCartUI();
    showNotification(`${product.name} removed from cart`);
}

/* ==========================================
   NOTIFICATION TOAST
   ========================================== */

function showNotification(message) {
    notificationToast.textContent = message;
    notificationToast.classList.add('show');
    
    setTimeout(() => {
        notificationToast.classList.remove('show');
    }, 3000);
}

/* ==========================================
   CART SIDEBAR MANAGEMENT
   ========================================== */

function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCartSidebar() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
}

cartToggle.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartSidebar);
cartOverlay.addEventListener('click', closeCartSidebar);

clearCartBtn.addEventListener('click', () => {
    if (cart.items.length > 0) {
        if (confirm('Are you sure you want to clear your cart?')) {
            cart.clear();
            updateCartUI();
            showNotification('Cart cleared');
        }
    } else {
        showNotification('Cart is already empty');
    }
});

document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.items.length === 0) {
        showNotification('Add items to your cart first!');
        return;
    }
    showNotification('Thank you! Proceeding to secure checkout...');
    setTimeout(() => {
        closeCartSidebar();
    }, 1500);
});

/* ==========================================
   FILTER FUNCTIONALITY
   ========================================== */

filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderProducts(currentFilter);
    });
});

/* ==========================================
   NEWSLETTER FORM
   ========================================== */

document.querySelector('.newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    showNotification(`Thanks for subscribing! Stay tuned for updates from Daniel Adeleye's Storefront.`);
    e.target.reset();
});

/* ==========================================
   MOBILE MENU TOGGLE
   ========================================== */

function openNavMenu() {
    navMenu.classList.add('active');
    menuToggle.classList.add('active');
    menuToggle.setAttribute('aria-expanded', 'true');
}

function closeNavMenu() {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        closeNavMenu();
    } else {
        openNavMenu();
    }
});

if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeNavMenu);
}

// Close menu on link click
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        closeNavMenu();
    });
});

// Close cart when clicking on products
document.addEventListener('click', (e) => {
    if (e.target.closest('.add-to-cart-btn') && !e.target.closest('.featured-add-btn')) {
        if (cartSidebar.classList.contains('open')) {
            setTimeout(() => {
                cartItems.scrollTop = cartItems.scrollHeight;
            }, 100);
        }
    }
});

/* ==========================================
   KEYBOARD NAVIGATION
   ========================================== */

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (cartSidebar.classList.contains('open')) {
            closeCartSidebar();
        }
        if (navMenu.classList.contains('active')) {
            closeNavMenu();
        }
    }
});

function setupScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        elements.forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        });
    }, {
        threshold: 0.2
    });

    elements.forEach(el => observer.observe(el));
}

/* ==========================================
   INITIALIZATION
   ========================================== */

function init() {
    setFeaturedProduct();
    renderProducts('all');
    updateCartUI();
    
    // Refresh featured product every 30 seconds
    setInterval(setFeaturedProduct, 30000);
    
    // Add smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    setupScrollAnimations();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

/* ==========================================
   PERFORMANCE OPTIMIZATION
   ========================================== */

// Intersection Observer for lazy loading elements
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Prefetch links on hover
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.addEventListener('mouseenter', () => {
        const prefetch = document.createElement('link');
        prefetch.rel = 'prefetch';
        prefetch.href = link.href;
        document.head.appendChild(prefetch);
    });
});
