// Analytics and calculations module with new card-based filtering
class BankAnalytics {
    constructor(data) {
        this.data = data;
        this.filters = {
            viewMode: 'big4', // 'big4', 'ANZ', 'Commbank', 'NAB', 'Westpac'
            quarter: null,
            service: null // New service filter
        };
    }
    
    // Set filters
    setFilters(newFilters) {
        this.filters = { ...this.filters, ...newFilters };
    }
    
    // Set view mode filter (was industry/nab, now individual banks or big4)
    setViewMode(mode) {
        // mode can be 'big4', 'ANZ', 'Commbank', 'NAB', 'Westpac'
        this.filters.viewMode = mode;
    }
    
    // Set quarter filter
    setQuarter(quarter) {
        this.filters.quarter = quarter;
    }
    
    // Set service filter
    setService(service) {
        this.filters.service = service;
    }
    
    // Clear all filters
    clearAllFilters() {
        this.filters = {
            viewMode: 'big4',
            quarter: null,
            service: null
        };
    }
    
    // Get current filter status
    getFilterStatus() {
        const activeFilters = [];
        if (this.filters.viewMode !== 'big4') activeFilters.push(`Bank: ${this.filters.viewMode}`);
        if (this.filters.quarter) activeFilters.push(`Quarter: ${this.filters.quarter}`);
        if (this.filters.service) activeFilters.push(`Service: ${this.filters.service}`);
        
        return {
            hasFilters: activeFilters.length > 0 || this.filters.viewMode !== 'big4',
            filterText: activeFilters.length > 0 ? activeFilters.join(', ') : 
                       (this.filters.viewMode === 'big4' ? 'Big 4 Average View' : 'No filters applied'),
            filters: this.filters,
            viewMode: this.filters.viewMode
        };
    }
    
    // Get filtered data based on current filters
    getFilteredData() {
        let filteredData = { ...this.data };

        // Apply view mode filter (bank selection)
        if (this.filters.viewMode !== 'big4') {
            // Filter to single bank
            const banks = [this.filters.viewMode];
            filteredData.banks = banks;

            const newBankTotals = {};
            const newQuarterlyOutages = {};
            const newOutageMatrix = {};
            const newServiceOutages = {};

            newBankTotals[this.filters.viewMode] = filteredData.bankTotals[this.filters.viewMode];
            newQuarterlyOutages[this.filters.viewMode] = filteredData.quarterlyOutages[this.filters.viewMode];
            newOutageMatrix[this.filters.viewMode] = filteredData.outageMatrix[this.filters.viewMode];

            filteredData.services.forEach(service => {
                newServiceOutages[service] = {};
                newServiceOutages[service][this.filters.viewMode] = filteredData.serviceOutages[service][this.filters.viewMode];
            });

            filteredData.bankTotals = newBankTotals;
            filteredData.quarterlyOutages = newQuarterlyOutages;
            filteredData.serviceOutages = newServiceOutages;
            filteredData.outageMatrix = newOutageMatrix;
        }

        // Apply quarter filter
        if (this.filters.quarter) {
            const quarters = [this.filters.quarter];
            filteredData.quarters = quarters;

            const newQuarterlyOutages = {};
            filteredData.banks.forEach(bank => {
                newQuarterlyOutages[bank] = {};
                quarters.forEach(quarter => {
                    newQuarterlyOutages[bank][quarter] = filteredData.quarterlyOutages[bank][quarter] || 0;
                });
            });
            filteredData.quarterlyOutages = newQuarterlyOutages;

            // Also need to recalculate service outages for the specific quarter
            const newServiceOutages = {};
            filteredData.services.forEach(service => {
                newServiceOutages[service] = {};
                filteredData.banks.forEach(bank => {
                    const quarterOutages = filteredData.outageMatrix[bank][service][this.filters.quarter] ? 1 : 0;
                    newServiceOutages[service][bank] = quarterOutages;
                });
            });
            filteredData.serviceOutages = newServiceOutages;
        }

        // Apply service filter (NEW)
        if (this.filters.service) {
            const services = [this.filters.service];
            filteredData.services = services;

            // Recalculate everything for the specific service only
            const newServiceOutages = {};
            if (filteredData.serviceOutages[this.filters.service]) {
                newServiceOutages[this.filters.service] = filteredData.serviceOutages[this.filters.service];
            } else {
                // Service doesn't exist in data
                newServiceOutages[this.filters.service] = {};
                filteredData.banks.forEach(bank => {
                    newServiceOutages[this.filters.service][bank] = 0;
                });
            }
            filteredData.serviceOutages = newServiceOutages;

            // Recalculate quarterly outages for the specific service
            const newQuarterlyOutages = {};
            filteredData.banks.forEach(bank => {
                newQuarterlyOutages[bank] = {};
                filteredData.quarters.forEach(quarter => {
                    // Check if bank has data for this service
                    const hasOutage = filteredData.outageMatrix[bank] && 
                                     filteredData.outageMatrix[bank][this.filters.service] && 
                                     filteredData.outageMatrix[bank][this.filters.service][quarter];
                    newQuarterlyOutages[bank][quarter] = hasOutage ? 1 : 0;
                });
            });
            filteredData.quarterlyOutages = newQuarterlyOutages;

            // Recalculate bank totals for the specific service
            const newBankTotals = {};
            filteredData.banks.forEach(bank => {
                let totalOutages = 0;
                filteredData.quarters.forEach(quarter => {
                    // Check if bank has data for this service before accessing
                    if (filteredData.outageMatrix[bank] && 
                        filteredData.outageMatrix[bank][this.filters.service] && 
                        filteredData.outageMatrix[bank][this.filters.service][quarter]) {
                        totalOutages++;
                    }
                });
                
                // Check if bank offers this service
                const offersService = this.data.bankServices && 
                                     this.data.bankServices[bank] && 
                                     this.data.bankServices[bank].has(this.filters.service);
                
                newBankTotals[bank] = {
                    ...filteredData.bankTotals[bank],
                    totalOutages: totalOutages,
                    totalServices: offersService ? 1 : 0, // 0 if bank doesn't offer service
                    totalPossibleOutages: offersService ? filteredData.quarters.length : 0 // 0 if bank doesn't offer service
                };
            });
            filteredData.bankTotals = newBankTotals;
        }

        return filteredData;
    }
    
    // Get card metrics for all banks and big4 average
    getCardMetrics() {
        const allData = { ...this.data }; // Always use all data for individual bank cards
        const filteredData = this.getFilteredData(); // Use filtered data for calculations
        
        const metrics = {};
        
        // Individual bank metrics (affected by service and quarter filters)
        ['ANZ', 'Commbank', 'NAB', 'Westpac'].forEach(bank => {
            let totalOutages, totalPossible, availableServicesCount;
            
            if (this.filters.service || this.filters.quarter) {
                // Use filtered data when service or quarter filter is active
                if (filteredData.bankTotals[bank]) {
                    totalOutages = filteredData.bankTotals[bank].totalOutages;
                    totalPossible = filteredData.bankTotals[bank].totalPossibleOutages;
                    availableServicesCount = filteredData.services.length;
                } else {
                    // Bank doesn't offer the filtered service
                    totalOutages = 0;
                    totalPossible = 0;
                    availableServicesCount = 0;
                }
            } else {
                // Use full data when no filters
                totalOutages = allData.bankTotals[bank].totalOutages;
                totalPossible = allData.bankTotals[bank].totalPossibleOutages;
                availableServicesCount = allData.bankTotals[bank].availableServicesCount;
            }
            
            const rate = totalPossible > 0 ? ((totalOutages / totalPossible) * 100).toFixed(1) : '0.0';
            
            metrics[bank.toLowerCase()] = {
                currentOutages: totalOutages,
                rate: rate + '%',
                totalServices: availableServicesCount,
                totalQuarters: filteredData.quarters.length,
                availableServices: this.filters.service ? [this.filters.service] : allData.bankTotals[bank].availableServices
            };
        });
        
        // Big 4 average (uses filtered data and weighted calculation)
        let weightedOutageRate = 0;
        let totalPossibleCombinations = 0;
        
        filteredData.banks.forEach(bank => {
            if (filteredData.bankTotals[bank]) {
                const bankOutages = filteredData.bankTotals[bank].totalOutages;
                const bankPossible = filteredData.bankTotals[bank].totalPossibleOutages;
                
                weightedOutageRate += (bankOutages / bankPossible) * bankPossible;
                totalPossibleCombinations += bankPossible;
            }
        });
        
        const big4Rate = totalPossibleCombinations > 0 ? 
            ((weightedOutageRate / totalPossibleCombinations) * 100).toFixed(1) : '0.0';
        
        const big4TotalOutages = Object.values(filteredData.bankTotals).reduce((sum, bank) => sum + bank.totalOutages, 0);
        
        metrics.big4 = {
            currentOutages: big4TotalOutages,
            rate: big4Rate + '%',
            totalServices: filteredData.services.length,
            totalQuarters: filteredData.quarters.length
        };
        
        return metrics;
    }

    // Get outage distribution data for pie chart
    getOutageDistribution() {
        const data = this.getFilteredData();
        
        const labels = data.banks;
        const outageData = data.banks.map(bank => data.bankTotals[bank].totalOutages);
        
        // Use bank-specific colors
        const backgroundColors = data.banks.map(bank => {
            const colors = {
                'ANZ': '#1f77b4',
                'Commbank': '#FFD700', 
                'NAB': '#d62728',
                'Westpac': '#2ca02c'
            };
            return colors[bank] || '#106ebe';
        });
        
        return {
            labels: labels,
            datasets: [{
                label: 'Total Outages',
                data: outageData,
                backgroundColor: backgroundColors,
                borderColor: backgroundColors.map(color => color.replace('0.6', '1')),
                borderWidth: 1
            }]
        };
    }
    
    // Get quarterly comparison data
    getQuarterlyComparison() {
        // When service filter is active, show data for that specific service only
        const data = this.getFilteredData();
        
        const quarterlyData = {
            labels: this.data.quarters, // Always show all quarters for context
            datasets: []
        };
        
        // Calculate Big 4 average for each quarter
        const big4AverageData = this.data.quarters.map(quarter => {
            let totalOutages = 0;
            let bankCount = 0;
            
            ['ANZ', 'Commbank', 'NAB', 'Westpac'].forEach(bank => {
                if (this.filters.service) {
                    // For service filter, count 1 if bank had outage for that service in that quarter, 0 otherwise
                    // Add safety checks for missing data
                    const hasOutage = this.data.outageMatrix[bank] && 
                                     this.data.outageMatrix[bank][this.filters.service] && 
                                     this.data.outageMatrix[bank][this.filters.service][quarter];
                    totalOutages += hasOutage ? 1 : 0;
                } else {
                    // For no service filter, use regular quarterly outages
                    totalOutages += this.data.quarterlyOutages[bank][quarter] || 0;
                }
                bankCount++;
            });
            
            return bankCount > 0 ? totalOutages / bankCount : 0;
        });
        
        if (this.filters.viewMode === 'big4') {
            // Show only Big 4 average line
            quarterlyData.datasets.push({
                label: this.filters.service ? `Big 4 Average - ${this.filters.service}` : 'Big 4 Average',
                data: big4AverageData,
                borderColor: '#106ebe',
                backgroundColor: '#106ebe20',
                tension: 0.4,
                fill: false,
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 3
            });
        } else {
            // Show specific bank + Big 4 average for comparison
            const selectedBank = this.filters.viewMode;
            
            const bankColors = {
                ANZ: '#1f77b4',
                Commbank: '#FFD700', 
                NAB: '#d62728',
                Westpac: '#2ca02c'
            };
            
            // Calculate bank-specific data with safety checks
            const bankData = this.data.quarters.map(quarter => {
                if (this.filters.service) {
                    const hasOutage = this.data.outageMatrix[selectedBank] && 
                                     this.data.outageMatrix[selectedBank][this.filters.service] && 
                                     this.data.outageMatrix[selectedBank][this.filters.service][quarter];
                    return hasOutage ? 1 : 0;
                } else {
                    return this.data.quarterlyOutages[selectedBank][quarter] || 0;
                }
            });
            
            // Add selected bank line
            quarterlyData.datasets.push({
                label: this.filters.service ? `${selectedBank} - ${this.filters.service}` : selectedBank,
                data: bankData,
                borderColor: bankColors[selectedBank],
                backgroundColor: bankColors[selectedBank] + '20',
                tension: 0.4,
                fill: false,
                pointRadius: 4,
                pointHoverRadius: 6,
                borderWidth: 3
            });
            
            // Add Big 4 average line for comparison (dashed style)
            quarterlyData.datasets.push({
                label: this.filters.service ? `Big 4 Average - ${this.filters.service}` : 'Big 4 Average',
                data: big4AverageData,
                borderColor: '#666666',
                backgroundColor: '#66666620',
                tension: 0.4,
                fill: false,
                pointRadius: 3,
                pointHoverRadius: 5,
                borderWidth: 2,
                borderDash: [5, 5] // Dashed line to distinguish from main bank line
            });
        }
        
        return quarterlyData;
    }
    
    // Get services bar chart data
    getServicesData() {
        const data = this.getFilteredData();
        const serviceData = {
            labels: data.services,
            datasets: [{
                label: 'Total Outages',
                data: data.services.map(service => {
                    return Object.values(data.serviceOutages[service]).reduce((sum, count) => sum + count, 0);
                }),
                backgroundColor: this.filters.viewMode === 'nab' ? '#d62728' : '#106ebe',
                borderColor: this.filters.viewMode === 'nab' ? '#b71c1c' : '#005a9e',
                borderWidth: 1
            }]
        };
        
        return serviceData;
    }
    
    // Generate insights based on current view
    generateInsights() {
        const data = this.getFilteredData();
        const cardMetrics = this.getCardMetrics();
        const insights = [];
        
        // Add service filter context if active
        const serviceContext = this.filters.service ? ` for ${this.filters.service}` : '';
        const quarterContext = this.filters.quarter ? ` in ${this.filters.quarter}` : '';
        
        if (this.filters.viewMode === 'big4') {
            // Big 4 view insights
            insights.push({
                type: 'neutral',
                icon: 'fas fa-chart-bar',
                title: 'Big 4 Overview',
                content: `Analyzing the Big 4 banks with ${cardMetrics.big4.currentOutages} total outages${serviceContext}${quarterContext}. ${this.filters.service ? 'Click on services to compare specific payment channels.' : 'Note: ANZ doesn\'t offer card payment acceptance services.'}`
            });
            
            // Service-specific insights
            if (this.filters.service) {
                const serviceData = data.serviceOutages[this.filters.service];
                const bankOutages = {};
                Object.keys(serviceData).forEach(bank => {
                    bankOutages[bank] = serviceData[bank];
                });
                
                const sortedBanks = Object.keys(bankOutages).sort((a, b) => bankOutages[a] - bankOutages[b]);
                const bestBank = sortedBanks[0];
                const worstBank = sortedBanks[sortedBanks.length - 1];
                
                insights.push({
                    type: 'positive',
                    icon: 'fas fa-star',
                    title: `Best ${this.filters.service} Performance`,
                    content: `${bestBank} has the lowest outage count for ${this.filters.service} with ${bankOutages[bestBank]} incidents${quarterContext}.`
                });
                
                if (bankOutages[worstBank] !== bankOutages[bestBank]) {
                    insights.push({
                        type: 'negative',
                        icon: 'fas fa-exclamation-triangle',
                        title: `${this.filters.service} Concerns`,
                        content: `${worstBank} has the highest outage count for ${this.filters.service} with ${bankOutages[worstBank]} incidents${quarterContext}.`
                    });
                }
            } else {
                // Overall insights when no service filter
                const bankRates = {};
                ['ANZ', 'Commbank', 'NAB', 'Westpac'].forEach(bank => {
                    bankRates[bank] = parseFloat(cardMetrics[bank.toLowerCase()].rate);
                });
                
                const sortedBanks = Object.keys(bankRates).sort((a, b) => bankRates[a] - bankRates[b]);
                const bestBank = sortedBanks[0];
                const worstBank = sortedBanks[sortedBanks.length - 1];
                
                insights.push({
                    type: 'positive',
                    icon: 'fas fa-star',
                    title: 'Best Performer',
                    content: `${bestBank} has the lowest outage rate at ${bankRates[bestBank]}%${quarterContext}, calculated based on their available services.`
                });
                
                if (sortedBanks.length > 1) {
                    insights.push({
                        type: 'negative',
                        icon: 'fas fa-exclamation-triangle',
                        title: 'Needs Attention',
                        content: `${worstBank} has the highest outage rate at ${bankRates[worstBank]}%${quarterContext}.`
                    });
                }
            }
            
        } else {
            // Individual bank view insights
            const bankName = this.filters.viewMode;
            const bankMetrics = cardMetrics[bankName.toLowerCase()];
            
            insights.push({
                type: 'neutral',
                icon: 'fas fa-bank',
                title: `${bankName} Analysis`,
                content: `${bankName} has ${bankMetrics.currentOutages} total outages with a ${bankMetrics.rate} outage rate${serviceContext}${quarterContext}. ${this.filters.service ? `Focus on ${this.filters.service} performance compared to competitors.` : 'The quarterly trend chart shows performance compared to the Big 4 average.'}`
            });
            
            // Special note for ANZ (only show if not filtering by Accept card payments)
            if (bankName === 'ANZ' && (!this.filters.service || this.filters.service !== 'Accept card payments (businesses)')) {
                insights.push({
                    type: 'neutral',
                    icon: 'fas fa-info-circle',
                    title: 'Service Availability',
                    content: 'ANZ does not offer "Accept card payments (businesses)" service, so this is excluded from their outage rate calculation for fair comparison.'
                });
            }
            
            // Compare to Big 4 average (only if not service-filtered or if bank offers the service)
            if (bankMetrics.totalServices > 0) {
                const big4Rate = parseFloat(cardMetrics.big4.rate);
                const bankRate = parseFloat(bankMetrics.rate);
                
                if (bankRate < big4Rate) {
                    insights.push({
                        type: 'positive',
                        icon: 'fas fa-thumbs-up',
                        title: 'Above Average Performance',
                        content: `${bankName}'s ${bankRate}% outage rate is ${(big4Rate - bankRate).toFixed(1)}% below the Big 4 average of ${big4Rate}%${serviceContext}. ${this.filters.service ? 'Strong performance in this service area.' : 'The trend chart reveals how this performance has evolved over time.'}`
                    });
                } else if (bankRate > big4Rate) {
                    insights.push({
                        type: 'negative',
                        icon: 'fas fa-trending-up',
                        title: 'Below Average Performance',
                        content: `${bankName}'s ${bankRate}% outage rate is ${(bankRate - big4Rate).toFixed(1)}% above the Big 4 average of ${big4Rate}%${serviceContext}. ${this.filters.service ? 'Improvement needed in this service area.' : 'Check the quarterly trends to identify improvement opportunities.'}`
                    });
                } else {
                    insights.push({
                        type: 'neutral',
                        icon: 'fas fa-equals',
                        title: 'Average Performance',
                        content: `${bankName}'s ${bankRate}% outage rate matches the Big 4 average${serviceContext}.`
                    });
                }
            } else if (this.filters.service) {
                insights.push({
                    type: 'neutral',
                    icon: 'fas fa-ban',
                    title: 'Service Not Offered',
                    content: `${bankName} does not offer ${this.filters.service}, so no outage data is available for comparison.`
                });
            }
        }
        
        // Service analysis (only if not already filtering by service)
        if (!this.filters.service && Object.keys(data.serviceOutages).length > 0) {
            const serviceStats = {};
            data.services.forEach(service => {
                serviceStats[service] = Object.values(data.serviceOutages[service]).reduce((sum, count) => sum + count, 0);
            });
            
            const worstService = Object.keys(serviceStats).reduce((a, b) => serviceStats[a] > serviceStats[b] ? a : b);
            const bestService = Object.keys(serviceStats).reduce((a, b) => serviceStats[a] < serviceStats[b] ? a : b);
            
            insights.push({
                type: 'neutral',
                icon: 'fas fa-cogs',
                title: 'Service Analysis',
                content: `${worstService} had the most outages (${serviceStats[worstService]}) while ${bestService} had the fewest (${serviceStats[bestService]})${quarterContext}. Click on services to dive deeper.`
            });
        }
        
        return insights;
    }
    
    // NEW ANALYTICS METHODS FOR ADDITIONAL CHARTS
    getOutageMinutes(dataType) {
        const filteredContext = this.getFilteredData(); // provides filtered banks, quarters, services
        const originalData = this.data.processedData;
        const labels = filteredContext.banks;
    
        const outageMinutes = labels.map(bank => {
            let totalMinutes = 0;
            if (!originalData[bank]) return 0;
    
            filteredContext.quarters.forEach(quarter => {
                if (!originalData[bank][quarter]) return;
    
                filteredContext.services.forEach(service => {
                    if (originalData[bank][quarter] && originalData[bank][quarter][service]) {
                        totalMinutes += originalData[bank][quarter][service][dataType] || 0;
                    }
                });
            });
            return totalMinutes;
        });

        const backgroundColors = labels.map(bank => {
            const colors = {
                'ANZ': '#1f77b4',
                'Commbank': '#FFD700',
                'NAB': '#d62728',
                'Westpac': '#2ca02c'
            };
            return colors[bank] || '#106ebe';
        });

        const datasetLabel = dataType === 'outageBank' ? 'Outage Minutes (Bank Fault)' : 'Outage Minutes (Infrastructure)';

        return {
            labels: labels,
            datasets: [{
                label: datasetLabel,
                data: outageMinutes,
                backgroundColor: backgroundColors
            }]
        };
    }

    getBankOutageMinutes() {
        return this.getOutageMinutes('outageBank');
    }

    getInfraOutageMinutes() {
        return this.getOutageMinutes('outageInfra');
    }
}

// Initialize analytics
window.analytics = new BankAnalytics(window.bankData); 