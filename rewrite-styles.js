const fs = require('fs');
const css = `:root {
    --bg: #f7f4ef;
    --surface: #ffffff;
    --border: #dad3c8;
    --text-primary: #1f2428;
    --text-secondary: #4f5564;
    --text-muted: #7a8695;
    --accent: #b56a2f;
    --accent-soft: rgba(181, 106, 47, 0.14);
    --radius: 18px;
    --shadow: 0 24px 56px rgba(31, 36, 40, 0.06);
    --shadow-soft: 0 16px 40px rgba(31, 36, 40, 0.08);
    --transition: 0.24s ease;
    --spacing-xs: 8px;
    --spacing-sm: 12px;
    --spacing-md: 18px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-xxl: 56px;
}

*, *::before, *::after {
    box-sizing: border-box;
}

html {
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 16px;
    scroll-behavior: smooth;
}

body {
    margin: 0;
    min-height: 100vh;
    background: var(--bg);
    color: var(--text-primary);
    line-height: 1.7;
    text-rendering: optimizeLegibility;
}

img, picture, video {
    max-width: 100%;
    display: block;
}

a {
    color: inherit;
    text-decoration: none;
}

button, input {
    font: inherit;
}

button {
    border: 0;
    background: none;
    cursor: pointer;
}

button:focus-visible,
a:focus-visible,
input:focus-visible {
    outline: 3px solid rgba(181, 106, 47, 0.36);
    outline-offset: 4px;
}

.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
}

main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

section {
    padding: 80px 0;
}

h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-family: 'Lexend', sans-serif;
    color: var(--text-primary);
    line-height: 1.1;
}

h1 {
    font-size: clamp(2.75rem, 5vw, 4.5rem);
    letter-spacing: -0.035em;
}

h2 {
    font-size: clamp(2rem, 3.5vw, 3rem);
    letter-spacing: -0.03em;
}

h3 {
    font-size: 1.25rem;
}

p {
    margin: 0 0 24px;
    color: var(--text-secondary);
    max-width: 70ch;
}

.eyebrow {
    display: inline-flex;
    margin-bottom: 14px;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    font-size: 11px;
    color: var(--accent);
    font-weight: 700;
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 46px;
    padding: 14px 26px;
    border-radius: 14px;
    font-weight: 700;
    transition: transform var(--transition), background var(--transition), box-shadow var(--transition);
}

.btn-primary {
    background: var(--accent);
    color: var(--surface);
    box-shadow: 0 16px 34px rgba(181, 106, 47, 0.18);
}

.btn-primary:hover,
.btn-primary:focus-visible {
    transform: translateY(-1px);
    background: #9c5826;
}

.btn-secondary {
    border: 1px solid var(--accent);
    background: rgba(181, 106, 47, 0.12);
    color: var(--accent);
}

.btn-secondary:hover,
.btn-secondary:focus-visible {
    background: rgba(181, 106, 47, 0.18);
}

.header {
    position: sticky;
    top: 0;
    z-index: 60;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(18px);
    border-bottom: 1px solid rgba(218, 211, 200, 0.6);
}

.navbar {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

.nav-container {
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
}

.logo {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--text-primary);
}

.logo-icon {
    font-size: 1.5rem;
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 24px;
}

.nav-menu {
    display: flex;
    align-items: center;
    gap: 28px;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-menu a {
    color: var(--text-secondary);
    font-weight: 600;
    letter-spacing: 0.01em;
    position: relative;
    padding: 8px 0;
}

.nav-menu a::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -4px;
    width: 0;
    height: 2px;
    background: var(--accent);
    transition: width var(--transition);
}

.nav-menu a:hover::after,
.nav-menu a:focus-visible::after {
    width: 100%;
}

.menu-toggle {
    display: none;
    width: 48px;
    height: 48px;
    align-items: center;
    justify-content: center;
    border-radius: 14px;
    background: rgba(31, 36, 40, 0.04);
}

.hamburger,
.hamburger::before,
.hamburger::after {
    content: '';
    display: block;
    width: 22px;
    height: 2px;
    background: var(--text-primary);
    border-radius: 999px;
    transition: all var(--transition);
}

.hamburger {
    position: relative;
}

.hamburger::before {
    position: absolute;
    top: -7px;
}

.hamburger::after {
    position: absolute;
    bottom: -7px;
}

.menu-toggle.active .hamburger {
    background: transparent;
}

.menu-toggle.active .hamburger::before {
    transform: rotate(45deg) translate(1px, 1px);
}

.menu-toggle.active .hamburger::after {
    transform: rotate(-45deg) translate(1px, -1px);
}

.cart-toggle {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 10px 16px;
    border-radius: 14px;
    background: rgba(181, 106, 47, 0.12);
    color: var(--text-primary);
    font-weight: 700;
}

.cart-count {
    min-width: 24px;
    height: 24px;
    border-radius: 999px;
    background: var(--accent);
    color: var(--surface);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 700;
}

.hero {
    padding: clamp(96px, 12vw, 160px) 0 88px;
    background: radial-gradient(circle at top left, rgba(181, 106, 47, 0.16), transparent 36%),
        linear-gradient(180deg, #fffbf6 0%, #f7f4ef 100%);
}

.hero-content {
    max-width: 720px;
    margin: 0 auto;
    text-align: center;
}

.hero-title {
    font-size: clamp(2.75rem, 6vw, 4rem);
    line-height: 1.05;
    margin-bottom: 24px;
}

.hero-subtitle {
    font-size: 1.25rem;
    margin-bottom: 32px;
    color: var(--text-secondary);
}

.hero-cta {
    display: inline-flex;
}

.featured-section {
    background: #fcf8f1;
}

.featured-container {
    max-width: 1100px;
    margin: 0 auto;
}

.featured-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 18px;
    border-radius: 999px;
    background: rgba(181, 106, 47, 0.13);
    color: var(--accent);
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 32px;
}

.featured-product-card {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 32px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: var(--shadow-soft);
    transition: transform var(--transition), box-shadow var(--transition);
    padding: 32px;
}

.featured-product-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow);
}

.featured-image-wrapper {
    position: relative;
    min-height: 420px;
    border-radius: 20px;
    overflow: hidden;
    background: var(--bg);
}

.featured-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.featured-tag {
    position: absolute;
    top: 24px;
    right: 24px;
    background: var(--accent);
    color: var(--surface);
    padding: 10px 16px;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 700;
}

.featured-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.featured-content h3 {
    font-size: 2rem;
    margin-bottom: 18px;
}

.featured-description {
    margin-bottom: 32px;
    line-height: 1.75;
    color: var(--text-secondary);
}

.featured-rating {
    color: var(--accent);
    margin-bottom: 32px;
    font-size: 1.2rem;
    letter-spacing: 0.12em;
}

.featured-price-section {
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
    align-items: center;
}

.featured-price {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-primary);
}

.featured-add-btn {
    width: fit-content;
}

.products-section {
    background: var(--bg);
}

.products-container {
    max-width: 1200px;
    margin: 0 auto;
}

.filter-buttons {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 18px;
    margin-bottom: 48px;
}

.filter-btn {
    padding: 12px 22px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--text-secondary);
    font-weight: 600;
    transition: all var(--transition);
}

.filter-btn:hover,
.filter-btn:focus-visible,
.filter-btn.active {
    border-color: var(--accent);
    color: var(--accent);
}

.filter-btn.active {
    background: rgba(181, 106, 47, 0.12);
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 32px;
}

.product-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 24px;
    border: 1px solid var(--border);
    background: var(--surface);
    overflow: hidden;
    box-shadow: var(--shadow-soft);
    transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
}

.product-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow);
    border-color: rgba(181, 106, 47, 0.18);
}

.product-image-wrapper {
    min-height: 280px;
    position: relative;
    overflow: hidden;
    background: var(--bg);
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--transition);
}

.product-card:hover .product-image {
    transform: scale(1.05);
}

.product-badge {
    position: absolute;
    top: 18px;
    right: 18px;
    background: var(--accent);
    color: var(--surface);
    padding: 8px 12px;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
}

.product-body {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 24px;
}

.product-category {
    font-size: 0.8rem;
    color: var(--accent);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.18em;
    margin-bottom: 12px;
}

.product-name {
    font-size: 1.15rem;
    margin-bottom: 12px;
    line-height: 1.35;
    color: var(--text-primary);
}

.product-description {
    color: var(--text-secondary);
    line-height: 1.75;
    flex: 1;
    margin-bottom: 20px;
}

.product-rating {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
    color: var(--text-muted);
}

.product-stars {
    color: var(--accent);
}

.product-reviews {
    font-size: 0.9rem;
}

.product-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 24px;
    border-top: 1px solid var(--border);
}

.product-price {
    font-weight: 700;
    color: var(--text-primary);
    font-size: 1.15rem;
}

.product-old-price {
    font-size: 0.9rem;
    color: var(--text-muted);
    text-decoration: line-through;
}

.add-to-cart-btn {
    width: 100%;
    max-width: 180px;
}

.testimonials-section {
    background: #fcf8f1;
}

.testimonials-container {
    max-width: 1100px;
    margin: 0 auto;
}

.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 32px;
    margin-top: 32px;
}

.testimonial-card {
    padding: 32px;
    border-radius: 24px;
    background: var(--surface);
    border: 1px solid var(--border);
    box-shadow: var(--shadow-soft);
    transition: transform var(--transition), box-shadow var(--transition);
}

.testimonial-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow);
}

.testimonial-stars {
    margin-bottom: 24px;
    color: var(--accent);
    font-size: 1.2rem;
}

.testimonial-text {
    margin-bottom: 24px;
    color: var(--text-secondary);
    line-height: 1.8;
}

.testimonial-author {
    color: var(--text-primary);
    font-weight: 700;
}

.newsletter-section {
    background: linear-gradient(180deg, rgba(181, 106, 47, 0.14), rgba(247, 244, 239, 0.95));
}

.newsletter-container {
    max-width: 760px;
    margin: 0 auto;
    text-align: center;
}

.newsletter-section h2 {
    margin-bottom: 16px;
}

.newsletter-form {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 18px;
    margin-top: 24px;
}

.newsletter-form input {
    width: 100%;
    min-height: 48px;
    border-radius: 14px;
    border: 1px solid var(--border);
    padding: 0 18px;
    color: var(--text-primary);
    background: var(--surface);
}

.newsletter-form input::placeholder {
    color: var(--text-muted);
}

.newsletter-note {
    margin-top: 18px;
    color: var(--text-muted);
    font-size: 0.95rem;
}

.about-section,
.contact-section {
    background: var(--surface);
}

.section-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 32px;
    align-items: start;
}

.about-grid,
.contact-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px;
}

.feature-card,
.contact-copy,
.contact-card {
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 24px;
    padding: 32px;
    transition: transform var(--transition), box-shadow var(--transition);
}

.feature-card:hover,
.contact-copy:hover,
.contact-card:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-soft);
}

.contact-card h3 {
    margin-bottom: 18px;
}

.footer {
    background: #1f2227;
    color: #c8cbd0;
    padding: 56px 0;
}

.footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 32px;
    margin-bottom: 32px;
}

.footer-section h4 {
    color: #ffffff;
    margin-bottom: 18px;
    font-size: 1rem;
}

.footer-section p,
.footer-section a,
.footer-section li {
    color: #b0b4bd;
    font-size: 0.95rem;
}

.footer-section a:hover {
    color: var(--accent);
}

.footer-bottom {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    text-align: center;
    color: #8f94a0;
}

.cart-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    width: min(420px, 100%);
    height: 100vh;
    background: var(--surface);
    box-shadow: -26px 0 80px rgba(31, 36, 40, 0.12);
    transform: translateX(100%);
    transition: transform var(--transition);
    z-index: 70;
    display: flex;
    flex-direction: column;
}

.cart-sidebar.open {
    transform: translateX(0);
}

.cart-header,
.cart-footer {
    padding: 28px;
}

.cart-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border-bottom: 1px solid var(--border);
}

.cart-header h2 {
    font-size: 1.35rem;
}

.close-cart {
    width: 44px;
    height: 44px;
    border-radius: 14px;
    background: rgba(31, 36, 40, 0.06);
    color: var(--text-primary);
}

.close-cart:hover {
    background: rgba(31, 36, 40, 0.12);
}

.cart-items {
    flex: 1;
    overflow-y: auto;
    padding: 28px;
}

.cart-item {
    display: flex;
    gap: 18px;
    padding: 18px;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 18px;
    margin-bottom: 18px;
}

.cart-item-image {
    width: 88px;
    height: 88px;
    border-radius: 16px;
    object-fit: cover;
}

.cart-item-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.cart-item-name {
    font-weight: 700;
    color: var(--text-primary);
}

.cart-item-price {
    color: var(--accent);
    font-weight: 700;
}

.cart-item-quantity {
    display: flex;
    align-items: center;
    gap: 10px;
}

.quantity-btn {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text-primary);
}

.quantity-btn:hover,
.quantity-btn:focus-visible {
    background: rgba(181, 106, 47, 0.12);
}

.remove-from-cart {
    background: none;
    color: #d54848;
    font-size: 0.95rem;
    padding: 0;
}

.cart-footer {
    border-top: 1px solid var(--border);
}

.cart-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
}

.checkout-btn,
.clear-cart-btn {
    width: 100%;
}

.checkout-btn {
    border-radius: 14px;
    background: var(--accent);
    color: var(--surface);
    padding: 16px;
}

.clear-cart-btn {
    border-radius: 14px;
    background: #f3f1ec;
    color: var(--text-primary);
    padding: 14px;
}

.cart-overlay {
    position: fixed;
    inset: 0;
    background: rgba(31, 36, 40, 0.45);
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--transition);
    z-index: 65;
}

.cart-overlay.open {
    opacity: 1;
    pointer-events: auto;
}

.notification-toast {
    position: fixed;
    left: 50%;
    bottom: 24px;
    transform: translateX(-50%) translateY(100%);
    background: var(--accent);
    color: var(--surface);
    padding: 14px 20px;
    border-radius: 14px;
    box-shadow: var(--shadow);
    z-index: 90;
    transition: transform var(--transition), opacity var(--transition);
    opacity: 0;
}

.notification-toast.show {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
}

.animate-on-scroll {
    opacity: 0;
    transform: translateY(22px);
    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
}

@media (max-width: 1024px) {
    .products-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .featured-product-card {
        grid-template-columns: 1fr;
    }

    .section-inner,
    .contact-grid {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    section {
        padding: 64px 0;
    }

    .nav-menu {
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(255, 255, 255, 0.97);
        backdrop-filter: blur(18px);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 32px;
        padding: 88px 24px;
        text-align: center;
        z-index: 80;
    }

    .nav-menu.active {
        display: flex;
    }

    .nav-actions {
        display: none;
    }

    .menu-toggle {
        display: inline-flex;
    }

    .mobile-nav-close-wrapper {
        position: absolute;
        top: 24px;
        right: 24px;
    }

    .mobile-nav-close {
        padding: 12px 18px;
        border-radius: 14px;
        background: rgba(31, 36, 40, 0.06);
        color: var(--text-primary);
    }

    .hero {
        padding: 56px 0 48px;
    }

    .hero-title {
        font-size: clamp(2rem, 8vw, 3rem);
    }

    .products-grid,
    .testimonials-grid,
    .about-grid {
        grid-template-columns: 1fr;
    }

    .newsletter-form {
        grid-template-columns: 1fr;
    }

    .product-footer {
        flex-direction: column;
        align-items: flex-start;
    }

    .cart-sidebar {
        width: 100%;
    }
}

@media (max-width: 480px) {
    main {
        padding: 0 16px;
    }

    .nav-container {
        padding: 0 16px;
    }

    .hero-title {
        font-size: 2.25rem;
    }

    .filter-buttons {
        gap: 16px;
    }

    .filter-btn {
        padding: 10px 16px;
    }
}

@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
`;
fs.writeFileSync('styles.css', css, 'utf8');
