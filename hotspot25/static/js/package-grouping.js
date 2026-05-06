/* ==================== PACKAGE GROUPING & ANIMATIONS ==================== */

// Global package grouping system
window.PackageGrouping = {
    groups: {
        minutes: [],
        hours: [],
        days: [],
        months: [],
        years: []
    },
    
    // Categorize packages by expiration type
    categorizePackages: function(packages) {
        this.groups = {
            minutes: [],
            hours: [],
            days: [],
            months: [],
            years: []
        };
        
        packages.forEach(function(pkg) {
            var expType = pkg.expiration_type ? pkg.expiration_type.toLowerCase() : '';
            
            if (expType.includes('minute')) {
                window.PackageGrouping.groups.minutes.push(pkg);
            } else if (expType.includes('hour')) {
                window.PackageGrouping.groups.hours.push(pkg);
            } else if (expType.includes('day')) {
                window.PackageGrouping.groups.days.push(pkg);
            } else if (expType.includes('month')) {
                window.PackageGrouping.groups.months.push(pkg);
            } else if (expType.includes('year')) {
                window.PackageGrouping.groups.years.push(pkg);
            }
        });
        
        console.log('📊 Packages Grouped:', this.groups);
    },
    
    // Render grouped packages
    renderGroupedPackages: function(packages) {
        var container = $("#packages");
        container.empty();
        
        this.categorizePackages(packages);
        
        var groupOrder = [
            { key: 'minutes', label: '⏱️ Minutes', emoji: '⏱️' },
            { key: 'hours', label: '🕐 Hours', emoji: '🕐' },
            { key: 'days', label: '📅 Days', emoji: '📅' },
            { key: 'months', label: '📆 Months', emoji: '📆' },
            { key: 'years', label: '📋 Years', emoji: '📋' }
        ];
        
        var html = '';
        var self = this;
        
        groupOrder.forEach(function(group) {
            var items = self.groups[group.key];
            if (items && items.length > 0) {
                html += '<div class="package-group">';
                html += '<div class="group-label">' + group.label + '</div>';
                html += '<div class="group-container">';
                
                items.forEach(function(pkg) {
                    var amount = pkg.amount.replace(/\.00$/, '');
                    html += '<div class="group-item">';
                    html += '<div class="rowp package-card">';
                    html += '<div style="display: flex; flex-direction: column; align-items: center; gap: 12px; width: 100%;">';
                    
                    // Price Circle
                    html += '<button class="btn btn-circle btn-circle-lg package-price" style="margin: 0 auto;">';
                    html += '<h5 style="font-weight:800;">' + amount + '/=</h5>';
                    html += '</button>';
                    
                    // Package Details
                    html += '<div style="flex: 1; width: 100%;">';
                    html += '<h6 class="text" style="margin: 4px 0;">' + pkg.name + '</h6>';
                    html += '<h6 class="device" style="margin: 4px 0;">📱 ' + pkg.port_limit + ' Devices</h6>';
                    html += '</div>';
                    
                    // Buy Button
                    html += '<button class="btn btn-sm btn-outline buy_button package-buy" type="button" ' +
                        'data-id="' + pkg.id + '" ' +
                        'data-amount="' + pkg.amount + '" ' +
                        'data-name="' + pkg.name + '" ' +
                        'data-code="' + pkg.plan_code + '" ' +
                        'data-duration="' + pkg.expiration + '" ' +
                        'data-type="' + pkg.expiration_type + '" ' +
                        'data-plantype="WIFI" ' +
                        'style="width: 100%; max-width: 180px; margin-top: 8px;">';
                    html += 'Click & Buy</button>';
                    
                    html += '</div>';
                    html += '</div>';
                    html += '</div>';
                });
                
                html += '</div>';
                html += '</div>';
            }
        });
        
        // Add Promotions Section
        html += this.renderPromotionsSection();
        
        container.html(html);
        
        // Attach event handlers
        this.attachEventHandlers();
    },
    
    // Render promotions & ads section
    renderPromotionsSection: function() {
        var promoHtml = `
            <div class="promotions-section" style="margin-top: 40px;">
                <div class="promotions-title">🎉 Special Offers & Promotions</div>
                <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <div class="promo-card" onclick="window.PackageGrouping.handlePromoClick('30-percent')">
                            <div class="promo-icon">💰</div>
                            <div class="promo-title">30% Extra Data</div>
                            <div class="promo-description">Get 30% more data on any monthly package</div>
                            <div class="promo-badge">Limited Time</div>
                        </div>
                    </div>
                    
                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <div class="promo-card" onclick="window.PackageGrouping.handlePromoClick('buy2get1')">
                            <div class="promo-icon">🎁</div>
                            <div class="promo-title">Buy 2 Get 1 Free</div>
                            <div class="promo-description">Purchase any 2 weekly packages, get 1 free!</div>
                            <div class="promo-badge">This Week</div>
                        </div>
                    </div>
                    
                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <div class="promo-card" onclick="window.PackageGrouping.handlePromoClick('yearly')">
                            <div class="promo-icon">🏆</div>
                            <div class="promo-title">Yearly Savings</div>
                            <div class="promo-description">Save 40% with our annual membership plan</div>
                            <div class="promo-badge">Best Value</div>
                        </div>
                    </div>
                    
                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <div class="promo-card" onclick="window.PackageGrouping.handlePromoClick('referral')">
                            <div class="promo-icon">👥</div>
                            <div class="promo-title">Refer & Earn</div>
                            <div class="promo-description">Share your code & earn credits on each signup</div>
                            <div class="promo-badge">Passive Income</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        return promoHtml;
    },
    
    // Handle promo card click
    handlePromoClick: function(promoType) {
        var message = '';
        
        switch(promoType) {
            case '30-percent':
                message = '📢 30% Extra Data Offer!\n\nGet 30% more data on any monthly package.\nOffer valid this month only!';
                break;
            case 'buy2get1':
                message = '🎁 Buy 2 Get 1 Free!\n\nPurchase any 2 weekly packages and get 1 completely free!\nOffer ends this week!';
                break;
            case 'yearly':
                message = '🏆 Yearly Savings Plan!\n\nSave 40% by subscribing annually.\nBest value for regular users!';
                break;
            case 'referral':
                message = '👥 Refer & Earn Program!\n\nShare your unique referral code and earn credits.\nUnlimited earning potential!';
                break;
        }
        
        // Show animated alert
        toastr.info(message, {
            timeOut: 4000,
            progressBar: true,
            extendedTimeOut: 0
        });
    },
    
    // Attach event handlers to package cards
    attachEventHandlers: function() {
        // Buy button click
        $("#packages").off('click', '.buy_button').on('click', '.buy_button', function() {
            var btn = $(this);
            
            // Add click animation
            btn.addClass('package-clicked');
            btn.css({
                'transform': 'scale(0.95)',
                'opacity': '0.8'
            });
            
            setTimeout(function() {
                btn.css({
                    'transform': 'scale(1)',
                    'opacity': '1'
                });
                btn.removeClass('package-clicked');
            }, 200);
            
            // Trigger buy action
            handleBuyClick(btn);
            
            // Show toast
            toastr.success('Processing your purchase...', {timeOut: 3000});
        });
        
        // Price circle hover animation
        $("#packages").off('mouseover', '.package-price').on('mouseover', '.package-price', function() {
            $(this).css({
                'transform': 'scale(1.15) rotate(5deg)',
                'box-shadow': '0 8px 20px rgba(107, 142, 35, 0.35)'
            });
        });
        
        $("#packages").off('mouseout', '.package-price').on('mouseout', '.package-price', function() {
            $(this).css({
                'transform': 'scale(1)',
                'box-shadow': '0 4px 12px rgba(107, 142, 35, 0.25)'
            });
        });
        
        // Card hover animation
        $("#packages").off('mouseover', '.package-card').on('mouseover', '.package-card', function() {
            $(this).css({
                'transform': 'translateY(-4px) scale(1.02)',
                'box-shadow': '0 8px 20px rgba(107, 142, 35, 0.2)',
                'border-color': '#6B8E23'
            });
        });
        
        $("#packages").off('mouseout', '.package-card').on('mouseout', '.package-card', function() {
            $(this).css({
                'transform': 'translateY(0)',
                'box-shadow': '0 2px 8px rgba(107, 142, 35, 0.1)',
                'border-color': '#9ACD32'
            });
        });
    }
};

// Override the original renderPackages function
function renderPackages(packages) {
    window.PackageGrouping.renderGroupedPackages(packages);
}
