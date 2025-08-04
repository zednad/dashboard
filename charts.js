// Chart.js visualization functions with new interactive filtering system
class ChartManager {
    constructor() {
        this.charts = {};
        this.defaultOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 10,
                            weight: '500'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    borderWidth: 1,
                    cornerRadius: 6,
                    padding: 8,
                    titleFont: { size: 10 },
                    bodyFont: { size: 9 }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#666',
                        font: {
                            size: 9
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    ticks: {
                        color: '#666',
                        font: {
                            size: 9
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        };
    }
    
    // Update all charts
    updateAllCharts() {
        this.createOutageDistributionChart();
        this.createQuarterlyChart();
        this.createServicesChart();
        this.createBankOutageMinutesChart();
        this.createInfraOutageMinutesChart();
        this.createOutageMinutesDetailChart();
    }
    
    // Create outage distribution pie chart
    createOutageDistributionChart() {
        const ctx = document.getElementById('outageDistributionChart').getContext('2d');
        const data = window.analytics.getOutageDistribution();
        
        if (this.charts.outageDistribution) {
            this.charts.outageDistribution.destroy();
        }
        
        this.charts.outageDistribution = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const dataIndex = elements[0].index;
                        const bankName = data.labels[dataIndex];
                        
                        // Toggle between specific bank and big4 view
                        if (window.analytics.filters.viewMode === bankName) {
                            window.analytics.setViewMode('big4');
                        } else {
                            window.analytics.setViewMode(bankName);
                        }
                        // Delay dashboard update until after current event loop to avoid destroying the chart mid-handler
                        setTimeout(() => {
                            window.dashboardManager.updateAllData();
                        }, 0);
                    }
                },
                plugins: {
                    legend: {
                        position: 'right',
                         labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                size: 12,
                                weight: '500'
                            }
                        }
                    },
                    tooltip: {
                        ...this.defaultOptions.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed || 0;
                                const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                                return `${label}: ${value} outages (${percentage}%)`;
                            },
                            afterLabel: function() {
                                return 'Click to focus on this bank';
                            }
                        }
                    }
                }
            }
        });
    }

    // Quarterly comparison chart (existing but updated click handler)
    createQuarterlyChart() {
        const ctx = document.getElementById('quarterlyChart').getContext('2d');
        const data = window.analytics.getQuarterlyComparison();

        if (this.charts.quarterly) {
            this.charts.quarterly.destroy();
        }

        this.charts.quarterly = new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                ...this.defaultOptions,
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const dataIndex = elements[0].index;
                        const quarter = data.labels[dataIndex];

                        // Toggle quarter filter
                        if (window.analytics.filters.quarter === quarter) {
                            window.analytics.setQuarter(null);
                        } else {
                            window.analytics.setQuarter(quarter);
                        }
                        // Delay dashboard update to avoid destroying chart mid-handler
                        setTimeout(() => {
                            window.dashboardManager.updateAllData();
                        }, 0);
                    }
                },
                plugins: {
                    ...this.defaultOptions.plugins,
                    tooltip: {
                        ...this.defaultOptions.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y} outages`;
                            },
                            afterLabel: function() {
                                return 'Click to filter by quarter';
                            }
                        }
                    }
                },
                scales: {
                    ...this.defaultOptions.scales,
                    y: {
                        ...this.defaultOptions.scales.y,
                        title: {
                            display: true,
                            text: 'Outages',
                            color: '#666',
                            font: {
                                size: 10,
                                weight: '600'
                            }
                        }
                    },
                    x: {
                        ...this.defaultOptions.scales.x,
                        title: {
                            display: true,
                            text: 'Quarter',
                            color: '#666',
                            font: {
                                size: 10,
                                weight: '600'
                            }
                        }
                    }
                }
            }
        });

        // Highlight selected quarter if any
        if (window.analytics.filters.quarter) {
            const quarterIndex = data.labels.indexOf(window.analytics.filters.quarter);
            if (quarterIndex !== -1) {
                this.charts.quarterly.options.scales.x.ticks.callback = function(value, index) {
                    const label = this.getLabelForValue(value);
                    return index === quarterIndex ? `► ${label}` : label;
                };
                this.charts.quarterly.update();
            }
        }
    }

    // Services chart (existing)
    createServicesChart() {
        const ctx = document.getElementById('servicesChart').getContext('2d');
        const data = window.analytics.getServicesData();
        
        if (this.charts.services) {
            this.charts.services.destroy();
        }
        
        // Choose color based on current view mode
        const viewMode = window.analytics.filters.viewMode;
        let backgroundColor;
        
        if (viewMode === 'big4') {
            backgroundColor = '#106ebe';
        } else {
            const bankColors = {
                'ANZ': '#1f77b4',
                'Commbank': '#FFD700',
                'NAB': '#d62728', 
                'Westpac': '#2ca02c'
            };
            backgroundColor = bankColors[viewMode] || '#106ebe';
        }
        
        // Update dataset colors
        data.datasets[0].backgroundColor = backgroundColor;
        data.datasets[0].borderColor = backgroundColor;
        
        this.charts.services = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                ...this.defaultOptions,
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const dataIndex = elements[0].index;
                        const serviceName = data.labels[dataIndex];

                        // Toggle service filter
                        if (window.analytics.filters.service === serviceName) {
                            setTimeout(() => {
                                window.dashboardManager.setService(null);
                            }, 0);
                        } else {
                            setTimeout(() => {
                                window.dashboardManager.setService(serviceName);
                            }, 0);
                        }
                    }
                },
                plugins: {
                    ...this.defaultOptions.plugins,
                    legend: {
                        display: false
                    },
                    tooltip: {
                        ...this.defaultOptions.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed.y} outages`;
                            },
                            afterLabel: function() {
                                return 'Click to filter by service';
                            }
                        }
                    }
                },
                scales: {
                    ...this.defaultOptions.scales,
                    y: {
                        ...this.defaultOptions.scales.y,
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Total Outages',
                            color: '#666',
                            font: {
                                size: 10,
                                weight: '600'
                            }
                        }
                    },
                    x: {
                        ...this.defaultOptions.scales.x,
                        title: {
                            display: true,
                            text: 'Payment Services',
                            color: '#666',
                            font: {
                                size: 10,
                                weight: '600'
                            }
                        }
                    }
                }
            }
        });
    }
    
    createBankOutageMinutesChart() {
        const ctx = document.getElementById('bankOutageMinutesChart').getContext('2d');
        const data = window.analytics.getBankOutageMinutes();

        if (this.charts.bankOutageMinutes) {
            this.charts.bankOutageMinutes.destroy();
        }

        this.charts.bankOutageMinutes = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    legend: { display: false },
                    tooltip: {
                        ...this.defaultOptions.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed.y.toLocaleString()} minutes`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        ...this.defaultOptions.scales.y,
                        title: {
                            display: true,
                            text: 'Total Minutes',
                            color: '#666',
                            font: { size: 10, weight: '600' }
                        }
                    },
                    x: { ...this.defaultOptions.scales.x }
                }
            }
        });
    }

    createInfraOutageMinutesChart() {
        const ctx = document.getElementById('infraOutageMinutesChart').getContext('2d');
        const data = window.analytics.getInfraOutageMinutes();

        if (this.charts.infraOutageMinutes) {
            this.charts.infraOutageMinutes.destroy();
        }

        this.charts.infraOutageMinutes = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                ...this.defaultOptions,
                plugins: {
                    ...this.defaultOptions.plugins,
                    legend: { display: false },
                    tooltip: {
                        ...this.defaultOptions.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.parsed.y.toLocaleString()} minutes`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        ...this.defaultOptions.scales.y,
                        title: {
                            display: true,
                            text: 'Total Minutes',
                            color: '#666',
                            font: { size: 10, weight: '600' }
                        }
                    },
                    x: { ...this.defaultOptions.scales.x }
                }
            }
        });
    }
    
    // Detailed stacked horizontal bar chart for significant outage minutes (Bank vs Infrastructure)
    createOutageMinutesDetailChart() {
        const canvas = document.getElementById('outageMinutesDetailChart');
        if (!canvas) return; // Container may be hidden on small screens
        const ctx = canvas.getContext('2d');
        const bankFaultData = window.analytics.getBankOutageMinutes();
        const infraFaultData = window.analytics.getInfraOutageMinutes();
        const labels = bankFaultData.labels;
    
        // Combine datasets for stacked bar
        const combinedData = {
            labels: labels,
            datasets: [
                {
                    label: 'Bank Fault',
                    data: bankFaultData.datasets[0].data,
                    backgroundColor: '#d62728'
                },
                {
                    label: 'Infrastructure',
                    data: infraFaultData.datasets[0].data,
                    backgroundColor: '#1f77b4'
                }
            ]
        };
    
        if (this.charts.outageMinutesDetail) {
            this.charts.outageMinutesDetail.destroy();
        }
    
        this.charts.outageMinutesDetail = new Chart(ctx, {
            type: 'bar',
            data: combinedData,
            options: {
                ...this.defaultOptions,
                indexAxis: 'y', // horizontal bars
                plugins: {
                    ...this.defaultOptions.plugins,
                    tooltip: {
                        ...this.defaultOptions.plugins.tooltip,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.x.toLocaleString()} minutes`;
                            },
                            afterLabel: function() {
                                return 'Click to focus on this bank';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        stacked: true,
                        title: {
                            display: true,
                            text: 'Significant Outage Minutes',
                            color: '#666',
                            font: { size: 10, weight: '600' }
                        }
                    },
                    y: {
                        stacked: true
                    }
                },
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const dataIndex = elements[0].index;
                        const bankName = labels[dataIndex];
                        // Toggle between specific bank and big4 view
                        if (window.analytics.filters.viewMode === bankName) {
                            window.analytics.setViewMode('big4');
                        } else {
                            window.analytics.setViewMode(bankName);
                        }
                        setTimeout(() => {
                            window.dashboardManager.updateAllData();
                        }, 0);
                    }
                }
            }
        });
    }
    
    // Destroy all charts
    destroyAllCharts() {
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
        this.charts = {};
    }
}

// Initialize chart manager
window.chartManager = new ChartManager(); 

// Initialize chart manager
window.chartManager = new ChartManager(); 