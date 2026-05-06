// ========================================
// SAMPLE DATA - PACKAGES
// ========================================

const packagesData = [
    // MINUTES PACKAGES
    {
        id: 1,
        price: 5,
        currency: "KES",
        name: "5 Minutes Unlimited",
        validity: "5 minutes",
        type: "minutes",
        description: "Quick access pass"
    },
    {
        id: 2,
        price: 10,
        currency: "KES",
        name: "15 Minutes Unlimited",
        validity: "15 minutes",
        type: "minutes",
        description: "Extended quick access"
    },
    {
        id: 3,
        price: 15,
        currency: "KES",
        name: "30 Minutes Unlimited",
        validity: "30 minutes",
        type: "minutes",
        description: "Half-hour access"
    },

    // HOURS PACKAGES
    {
        id: 4,
        price: 20,
        currency: "KES",
        name: "1-Hour Internet Pass",
        validity: "1 hour",
        type: "hours",
        description: "One hour of browsing"
    },
    {
        id: 5,
        price: 35,
        currency: "KES",
        name: "5-Hour Internet Pass",
        validity: "5 hours",
        type: "hours",
        description: "Five hours of access"
    },
    {
        id: 6,
        price: 50,
        currency: "KES",
        name: "24-Hour Internet Pass",
        validity: "24 hours",
        type: "hours",
        description: "Full day access"
    },

    // DAYS PACKAGES
    {
        id: 7,
        price: 50,
        currency: "KES",
        name: "1-Day Pass",
        validity: "1 day",
        type: "days",
        description: "Single day access"
    },
    {
        id: 8,
        price: 120,
        currency: "KES",
        name: "3-Day Pass",
        validity: "3 days",
        type: "days",
        description: "Three days of access"
    },
    {
        id: 9,
        price: 200,
        currency: "KES",
        name: "7-Day Pass",
        validity: "7 days",
        type: "days",
        description: "One week of access"
    },

    // MONTHS PACKAGES
    {
        id: 10,
        price: 500,
        currency: "KES",
        name: "1-Month Plan",
        validity: "1 month",
        type: "months",
        description: "Monthly unlimited access"
    },
    {
        id: 11,
        price: 900,
        currency: "KES",
        name: "3-Month Plan",
        validity: "3 months",
        type: "months",
        description: "Three months access"
    },
    {
        id: 12,
        price: 1500,
        currency: "KES",
        name: "6-Month Plan",
        validity: "6 months",
        type: "months",
        description: "Half-year subscription"
    },

    // YEARS PACKAGES
    {
        id: 13,
        price: 2500,
        currency: "KES",
        name: "1-Year Plan",
        validity: "1 year",
        type: "years",
        description: "Annual subscription"
    },
    {
        id: 14,
        price: 4500,
        currency: "KES",
        name: "2-Year Plan",
        validity: "2 years",
        type: "years",
        description: "Two years of access"
    }
];

// ========================================
// PROMOTIONS DATA
// ========================================

const promotionsData = [
    {
        id: 1,
        title: "12h 2 Device: KES 45",
        description: "Save on multi-device",
        icon: "🎁"
    },
    {
        id: 2,
        title: "24h 2 Device: KES 70",
        description: "Flexible daily access",
        icon: "⭐"
    },
    {
        id: 3,
        title: "1 Week 1-Device: KES 250",
        description: "Best weekly value",
        icon: "💰"
    },
    {
        id: 4,
        title: "Ready to buy? Pick any plan above to get started",
        description: "Select a package to continue",
        icon: "🚀"
    }
];

// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    renderPackages();
    renderPromotions();
    setupTabListeners();
    setupConnectButton();
}

// ========================================
// RENDER PACKAGES BY TYPE
// ========================================

function renderPackages() {
    const types = ['minutes', 'hours', 'days', 'months', 'years'];
    
    types.forEach(type => {
        const packages = packagesData.filter(pkg => pkg.type === type);
        const containerId = `${type}Packages`;
        const container = document.getElementById(containerId);
        
        if (container) {
            container.innerHTML = packages.map(pkg => createPackageCard(pkg)).join('');
            // Add click listeners to buy buttons
            container.querySelectorAll('.btn-buy').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    handlePackagePurchase(pkg);
                });
            });
        }
    });
}

function createPackageCard(pkg) {
    return `
        <div class="package-card" data-id="${pkg.id}">
            <div class="package-price">
                ${pkg.currency}
                <span class="package-price-suffix">${pkg.currency}</span>
            </div>
            <div class="package-name">${pkg.price} ${pkg.name}</div>
            <button class="btn-buy" data-id="${pkg.id}">Buy Now →</button>
        </div>
    `;
}

// ========================================
// RENDER PROMOTIONS
// ========================================

function renderPromotions() {
    const container = document.getElementById('promotionsList');
    
    if (container) {
        container.innerHTML = promotionsData.map(promo => `
            <div class="promotion-item">
                <div class="promotion-icon">${promo.icon}</div>
                <div class="promotion-text">
                    <div class="promotion-title">${promo.title}</div>
                    <div class="promotion-desc">${promo.description}</div>
                </div>
                <div class="promotion-cta">Select →</div>
            </div>
        `).join('');

        // Add click listeners
        container.querySelectorAll('.promotion-item').forEach(item => {
            item.addEventListener('click', () => {
                const title = item.querySelector('.promotion-title').textContent;
                console.log(`Selected promotion: ${title}`);
            });
        });
    }
}

// ========================================
// TAB NAVIGATION
// ========================================

function setupTabListeners() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabButtons.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tc => tc.classList.remove('active'));
            
            // Add active to clicked
            btn.classList.add('active');
            const tabName = btn.getAttribute('data-tab');
            document.getElementById(tabName).classList.add('active');
        });
    });
}

// ========================================
// VOUCHER / CONNECT FUNCTIONALITY
// ========================================

function setupConnectButton() {
    const connectBtn = document.getElementById('connectBtn');
    const voucherInput = document.getElementById('voucherCode');
    
    if (connectBtn) {
        connectBtn.addEventListener('click', () => {
            const code = voucherInput.value.trim();
            handleVoucherValidation(code);
        });
        
        voucherInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                connectBtn.click();
            }
        });
    }
}

function handleVoucherValidation(code) {
    const errorContainer = document.getElementById('errorContainer');
    const callContainer = document.getElementById('callContainer');
    
    errorContainer.innerHTML = '';
    callContainer.innerHTML = '';
    
    if (!code) {
        errorContainer.innerHTML = `<div class="error-message">Please enter a voucher code</div>`;
        return;
    }
    
    // Example validation logic
    if (code.length < 5) {
        errorContainer.innerHTML = `<div class="error-message">${code} $(error) $(mac)</div>`;
        callContainer.innerHTML = `<strong>📞 Call 0723583289</strong>`;
        return;
    }
    
    // Simulate successful validation
    errorContainer.innerHTML = '';
    callContainer.innerHTML = `<strong>✓ Voucher validated successfully!</strong>`;
    
    console.log(`Voucher code: ${code}`);
}

function handlePackagePurchase(pkg) {
    const voucherInput = document.getElementById('voucherCode');
    const code = voucherInput.value.trim();
    
    if (!code) {
        alert(`Please enter a voucher code first, then select: ${pkg.name}`);
        voucherInput.focus();
        return;
    }
    
    console.log(`Purchasing: ${pkg.name} for ${pkg.price} ${pkg.currency}`);
    alert(`Purchasing ${pkg.name} (${pkg.price} ${pkg.currency}) with voucher: ${code}`);
}

// ========================================
// VOUCHERS TAB
// ========================================

function loadUserVouchers() {
    const container = document.getElementById('vouchersContainer');
    
    // Placeholder for actual voucher data
    const userVouchers = [
        { code: 'PROMO2024001', expires: '2026-06-30' },
        { code: 'BONUS500KES', expires: '2026-08-15' }
    ];
    
    if (userVouchers.length === 0) {
        container.innerHTML = '<p>No vouchers found. Purchase a package to get started!</p>';
        return;
    }
    
    container.innerHTML = userVouchers.map(v => `
        <div class="voucher-item">
            <div class="voucher-code">${v.code}</div>
            <div class="voucher-expires">Expires: ${v.expires}</div>
        </div>
    `).join('');
}

// ========================================
// BACK TO PROMOTIONS LINK
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const backLink = document.querySelector('.back-link a');
    if (backLink) {
        backLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('packages').scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// ========================================
// DEBUG MODE (OPTIONAL)
// ========================================

function toggleDebugMode() {
    const debugInfo = document.getElementById('debugInfo');
    debugInfo.style.display = debugInfo.style.display === 'none' ? 'block' : 'none';
    
    if (debugInfo.style.display === 'block') {
        debugInfo.innerHTML = `
            <strong>Debug Info:</strong><br>
            Packages loaded: ${packagesData.length}<br>
            Promotions loaded: ${promotionsData.length}
        `;
    }
}

// Uncomment to activate debug mode in console:
// window.toggleDebugMode = toggleDebugMode;
