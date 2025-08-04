// Main dashboard initialization and UI management with new card system
class DashboardManager {
    constructor() {
        this.isInitialized = false;
        this.filterElements = {};
    }
    
    // Initialize the dashboard
    init() {
        if (this.isInitialized) return;
        
        try {
            // Wait for all dependencies to load
            if (typeof window.bankData === 'undefined' || 
                typeof window.analytics === 'undefined' || 
                typeof window.chartManager === 'undefined') {
                setTimeout(() => this.init(), 100);
                return;
            }
            
            this.initializeFilterElements();
            this.setupEventListeners();
            this.updateAllData();
            this.updateTimestamp();
            this.addAnimations();
            
            this.isInitialized = true;
            console.log('Dashboard initialized successfully');
            
        } catch (error) {
            console.error('Dashboard initialization failed:', error);
            this.showError('Failed to initialize dashboard. Please refresh the page.');
        }
    }
    
    // Initialize filter UI elements
    initializeFilterElements() {
        this.filterElements = {
            filterText: document.getElementById('filterText'),
            clearButton: document.getElementById('clearFilters'),
            anzCard: document.getElementById('anzCard'),
            commbankCard: document.getElementById('commbankCard'),
            nabCard: document.getElementById('nabCard'),
            westpacCard: document.getElementById('westpacCard'),
            big4Card: document.getElementById('big4Card')
        };
    }
    
    // Set up event listeners
    setupEventListeners() {
        // Clear filters button
        if (this.filterElements.clearButton) {
            this.filterElements.clearButton.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }

        // Individual bank card click handlers - fix case mapping
        const bankNameMapping = {
            'anz': 'ANZ',
            'commbank': 'Commbank', 
            'nab': 'NAB',
            'westpac': 'Westpac'
        };

        ['anz', 'commbank', 'nab', 'westpac'].forEach(bank => {
            const cardElement = this.filterElements[`${bank}Card`];
            if (cardElement) {
                cardElement.addEventListener('click', () => {
                    this.setViewMode(bankNameMapping[bank]);
                });
            }
        });

        // Big 4 average card click handler
        if (this.filterElements.big4Card) {
            this.filterElements.big4Card.addEventListener('click', () => {
                this.setViewMode('big4');
            });
        }
    }
    
    // Set view mode and update dashboard
    setViewMode(mode) {
        window.analytics.setViewMode(mode);
        this.updateAllData();
    }
    
    // Set service filter (NEW)
    setService(service) {
        window.analytics.setService(service);
        this.updateAllData();
    }
    
    // Clear all filters
    clearAllFilters() {
        window.analytics.clearAllFilters();
        this.updateAllData();
    }
    
    // Update all dashboard data and UI
    updateAllData() {
        this.updateFilterUI();
        this.updateCardMetrics();
        this.updateCharts();
        this.updateInsights();
    }
    
    // Update filter UI indicator
    updateFilterUI() {
        const filterStatus = window.analytics.getFilterStatus();
        const filterIndicator = document.querySelector('.filter-indicator');
        const filterTags = document.getElementById('filterTags');
        
        if (filterIndicator && filterTags) {
            // Clear existing tags
            filterTags.innerHTML = '';
            
            const filters = window.analytics.filters;
            
            // Add bank filter tag
            if (filters.viewMode !== 'big4') {
                const bankTag = document.createElement('div');
                bankTag.className = 'filter-tag bank-filter';
                bankTag.innerHTML = `
                    <span>Bank: ${filters.viewMode}</span>
                    <i class="fas fa-times filter-tag-close" data-filter="bank"></i>
                `;
                filterTags.appendChild(bankTag);
            }
            
            // Add quarter filter tag
            if (filters.quarter) {
                const quarterTag = document.createElement('div');
                quarterTag.className = 'filter-tag quarter-filter';
                quarterTag.innerHTML = `
                    <span>Quarter: ${filters.quarter}</span>
                    <i class="fas fa-times filter-tag-close" data-filter="quarter"></i>
                `;
                filterTags.appendChild(quarterTag);
            }
            
            // Add service filter tag
            if (filters.service) {
                const serviceTag = document.createElement('div');
                serviceTag.className = 'filter-tag service-filter';
                serviceTag.innerHTML = `
                    <span>Service: ${filters.service.length > 20 ? filters.service.substring(0, 20) + '...' : filters.service}</span>
                    <i class="fas fa-times filter-tag-close" data-filter="service"></i>
                `;
                filterTags.appendChild(serviceTag);
            }
            
            // Show/hide filter indicator
            if (filterStatus.hasFilters) {
                filterIndicator.classList.add('active');
            } else {
                filterIndicator.classList.remove('active');
            }
            
            // Add click handlers for individual close buttons
            filterTags.querySelectorAll('.filter-tag-close').forEach(closeBtn => {
                closeBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const filterType = closeBtn.getAttribute('data-filter');
                    this.clearIndividualFilter(filterType);
                });
            });
        }
        
        // Update card selection states
        this.updateCardSelection();
    }
    
    // Clear individual filter
    clearIndividualFilter(filterType) {
        switch(filterType) {
            case 'bank':
                window.analytics.setViewMode('big4');
                break;
            case 'quarter':
                window.analytics.setQuarter(null);
                break;
            case 'service':
                window.analytics.setService(null);
                break;
        }
        this.updateAllData();
    }
    
    // Update card selection visual states
    updateCardSelection() {
        const currentViewMode = window.analytics.filters.viewMode;
        
        // Remove selected class from all cards
        ['anzCard', 'commbankCard', 'nabCard', 'westpacCard', 'big4Card'].forEach(cardKey => {
            const card = this.filterElements[cardKey];
            if (card) {
                card.classList.remove('selected');
            }
        });
        
        // Add selected class to current card
        if (currentViewMode === 'big4') {
            this.filterElements.big4Card?.classList.add('selected');
        } else {
            const cardKey = `${currentViewMode.toLowerCase()}Card`;
            this.filterElements[cardKey]?.classList.add('selected');
        }
    }
    
    // Update card metrics
    updateCardMetrics() {
        const metrics = window.analytics.getCardMetrics();
        
        // Update individual bank cards
        ['anz', 'commbank', 'nab', 'westpac'].forEach(bank => {
            const bankMetrics = metrics[bank];
            if (bankMetrics) {
                const rateElement = document.getElementById(`${bank}-outage-rate`);
                const totalElement = document.getElementById(`${bank}-total-outages`);
                
                if (rateElement) rateElement.textContent = bankMetrics.rate;
                if (totalElement) totalElement.textContent = `${bankMetrics.currentOutages} total outages`;
            }
        });
        
        // Update Big 4 average card
        const big4Metrics = metrics.big4;
        if (big4Metrics) {
            const rateElement = document.getElementById('big4-outage-rate');
            const totalElement = document.getElementById('big4-total-outages');
            
            if (rateElement) rateElement.textContent = big4Metrics.rate;
            if (totalElement) totalElement.textContent = `${big4Metrics.currentOutages} total outages`;
        }
    }
    
    // Update all charts
    updateCharts() {
        window.chartManager.updateAllCharts();
    }
    
    // Update insights section
    updateInsights() {
        const insights = window.analytics.generateInsights();
        const container = document.getElementById('insightsContainer');
        
        if (!container) return;
        
        container.innerHTML = '';
        insights.forEach((insight, index) => {
            const insightCard = document.createElement('div');
            insightCard.className = `insight-card ${insight.type}`;
            
            insightCard.innerHTML = `
                <div class="insight-header">
                    <i class="${insight.icon}"></i>
                    <h4>${insight.title}</h4>
                </div>
                <p>${insight.content}</p>
            `;
            
            container.appendChild(insightCard);
        });
    }
    
    // Add animations to elements
    addAnimations() {
        // Add fade-in animation to metric cards
        const metricCards = document.querySelectorAll('.metric-card');
        metricCards.forEach((card, index) => {
            card.classList.add('fade-in');
            card.style.animationDelay = `${index * 0.1}s`;
        });
        
        // Add fade-in animation to chart containers
        const chartContainers = document.querySelectorAll('.chart-container');
        chartContainers.forEach((container, index) => {
            container.classList.add('fade-in');
            container.style.animationDelay = `${0.5 + index * 0.1}s`;
        });
    }
    
    // Update timestamp
    updateTimestamp() {
        const timestampElement = document.getElementById('timestamp');
        if (timestampElement) {
            const now = new Date();
            timestampElement.textContent = now.toLocaleString();
        }
    }
    
    // Show error message
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 1000;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            font-size: 0.8rem;
        `;
        errorDiv.textContent = message;
        
        document.body.appendChild(errorDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
        }, 5000);
    }
    
    // Refresh dashboard data
    refresh() {
        this.isInitialized = false;
        window.chartManager.destroyAllCharts();
        window.analytics.clearAllFilters();
        this.init();
    }
    
    // Handle window resize
    handleResize() {
        if (this.isInitialized) {
            setTimeout(() => {
                window.chartManager.updateAllCharts();
            }, 250);
        }
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create dashboard manager instance
    window.dashboardManager = new DashboardManager();
    
    // Initialize dashboard
    window.dashboardManager.init();
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            window.dashboardManager.handleResize();
        }, 250);
    });
});

// Handle errors globally
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    if (window.dashboardManager) {
        window.dashboardManager.showError('An error occurred. Some features may not work correctly.');
    }
});

// Prevent console errors from crashing the dashboard
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});