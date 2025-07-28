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
    }
    
    // Create horizontal outage distribution bar chart
    createOutageDistributionChart() {
        const ctx = document.getElementById('outageDistributionChart').getContext('2d');
        const data = window.analytics.getOutageDistribution();
        
        if (this.charts.outageDistribution) {
            this.charts.outageDistribution.destroy();
        }
        
        this.charts.outageDistribution = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                indexAxis: 'y', // This makes it horizontal
                ...this.defaultOptions,
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
                        window.dashboardManager.updateAllData();
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
                                return `${context.label}: ${context.parsed.x} outages`;
                            },
                            afterLabel: function() {
                                return 'Click to focus on this bank';
                            }
                        }
                    }
                },
                scales: {
                    ...this.defaultOptions.scales,
                    x: {
                        ...this.defaultOptions.scales.x,
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
                    y: {
                        ...this.defaultOptions.scales.y,
                        title: {
                            display: true,
                            text: 'Banks',
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
                        window.dashboardManager.updateAllData();
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
                'Commbank': '#ff7f0e',
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
                            window.dashboardManager.setService(null);
                        } else {
                            window.dashboardManager.setService(serviceName);
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