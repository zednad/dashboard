// Raw data processing and transformation
const rawData = `
ANZ Bank Data              2023 Q1            Withdraw/deposit cash at an ATM   100%
ANZ Bank Data              2023 Q1            Transact over-the-counter in a branch          97.70%
ANZ Bank Data              2023 Q1            Make card payments (cardholders) 100%
ANZ Bank Data              2023 Q1            Accept card payments (businesses)             
ANZ Bank Data              2023 Q1            Access accounts using online banking (web browser or mobile device app)     99.11%
ANZ Bank Data              2023 Q1            Make/receive account transfers – fast payments   100%
ANZ Bank Data              2023 Q1            Make/receive account transfers – next business day           100%
ANZ Bank Data              2023 Q2            Withdraw/deposit cash at an ATM   100.00%
ANZ Bank Data              2023 Q2            Transact over-the-counter in a branch          97.73%
ANZ Bank Data              2023 Q2            Make card payments (cardholders) 100.00%
ANZ Bank Data              2023 Q2            Accept card payments (businesses)             
ANZ Bank Data              2023 Q2            Access accounts using online banking (web browser or mobile device app)     99.87%
ANZ Bank Data              2023 Q2            Make/receive account transfers – fast payments   100.00%
ANZ Bank Data              2023 Q2            Make/receive account transfers – next business day           100.00%
ANZ Bank Data              2023 Q3            Withdraw/deposit cash at an ATM   99.90%
ANZ Bank Data              2023 Q3            Transact over-the-counter in a branch          99.31%
ANZ Bank Data              2023 Q3            Make card payments (cardholders) 100%
ANZ Bank Data              2023 Q3            Accept card payments (businesses)             
ANZ Bank Data              2023 Q3            Access accounts using online banking (web browser or mobile device app)     99.59%
ANZ Bank Data              2023 Q3            Make/receive account transfers – fast payments   99.69%
ANZ Bank Data              2023 Q3            Make/receive account transfers – next business day           100%
ANZ Bank Data              2023 Q4            Withdraw/deposit cash at an ATM   100%
ANZ Bank Data              2023 Q4            Transact over-the-counter in a branch          98.64%
ANZ Bank Data              2023 Q4            Make card payments (cardholders) 100%
ANZ Bank Data              2023 Q4            Accept card payments (businesses)             
ANZ Bank Data              2023 Q4            Access accounts using online banking (web browser or mobile device app)     99.80%
ANZ Bank Data              2023 Q4            Make/receive account transfers – fast payments   100%
ANZ Bank Data              2023 Q4            Make/receive account transfers – next business day           100%
ANZ Bank Data              2024 Q1            Withdraw/deposit cash at an ATM   100%
ANZ Bank Data              2024 Q1            Transact over-the-counter in a branch          100%
ANZ Bank Data              2024 Q1            Make card payments (cardholders) 100%
ANZ Bank Data              2024 Q1            Accept card payments (businesses)             
ANZ Bank Data              2024 Q1            Access accounts using online banking (web browser or mobile device app)     99.81%
ANZ Bank Data              2024 Q1            Make/receive account transfers – fast payments   100%
ANZ Bank Data              2024 Q1            Make/receive account transfers – next business day           100%
ANZ Bank Data              2024 Q2            Withdraw/deposit cash at an ATM   100%
ANZ Bank Data              2024 Q2            Transact over-the-counter in a branch          98.86%
ANZ Bank Data              2024 Q2            Make card payments (cardholders) 100%
ANZ Bank Data              2024 Q2            Accept card payments (businesses)             
ANZ Bank Data              2024 Q2            Access accounts using online banking (web browser or mobile device app)     99.82%
ANZ Bank Data              2024 Q2            Make/receive account transfers – fast payments   100%
ANZ Bank Data              2024 Q2            Make/receive account transfers – next business day           100%
ANZ Bank Data              2024 Q3            Withdraw/deposit cash at an ATM   100%
ANZ Bank Data              2024 Q3            Transact over-the-counter in a branch          100%
ANZ Bank Data              2024 Q3            Make card payments (cardholders) 100%
ANZ Bank Data              2024 Q3            Accept card payments (businesses)             
ANZ Bank Data              2024 Q3            Access accounts using online banking (web browser or mobile device app)     99.97%
ANZ Bank Data              2024 Q3            Make/receive account transfers – fast payments   99.85%
ANZ Bank Data              2024 Q3            Make/receive account transfers – next business day           100%
ANZ Bank Data              2024 Q4            Withdraw/deposit cash at an ATM   100%
ANZ Bank Data              2024 Q4            Transact over-the-counter in a branch          100%
ANZ Bank Data              2024 Q4            Make card payments (cardholders) 100%
ANZ Bank Data              2024 Q4            Accept card payments (businesses)             
ANZ Bank Data              2024 Q4            Access accounts using online banking (web browser or mobile device app)     99.91%
ANZ Bank Data              2024 Q4            Make/receive account transfers – fast payments   99.50%
ANZ Bank Data              2024 Q4            Make/receive account transfers – next business day           100%
ANZ Bank Data              2025 Q1            Withdraw/deposit cash at an ATM   99.78%
ANZ Bank Data              2025 Q1            Transact over-the-counter in a branch          98.97%
ANZ Bank Data              2025 Q1            Make card payments (cardholders) 100%
ANZ Bank Data              2025 Q1            Accept card payments (businesses)             
ANZ Bank Data              2025 Q1            Access accounts using online banking (web browser or mobile device app)     99.92%
ANZ Bank Data              2025 Q1            Make/receive account transfers – fast payments   99.84%
ANZ Bank Data              2025 Q1            Make/receive account transfers – next business day           100%
Commbank Data         2023 Q1            Withdraw/deposit cash at an ATM   100
Commbank Data         2023 Q1            Transact over-the-counter in a branch          100
Commbank Data         2023 Q1            Make card payments (cardholders) 100
Commbank Data         2023 Q1            Accept card payments (businesses)              100
Commbank Data         2023 Q1            Access accounts using online banking (web browser or mobile device app)     99.36
Commbank Data         2023 Q1            Make/receive account transfers – fast payments   100
Commbank Data         2023 Q1            Make/receive account transfers – next business day           100
Commbank Data         2023 Q2            Withdraw/deposit cash at an ATM   99.68
Commbank Data         2023 Q2            Transact over-the-counter in a branch          99.68
Commbank Data         2023 Q2            Make card payments (cardholders) 100
Commbank Data         2023 Q2            Accept card payments (businesses)              100
Commbank Data         2023 Q2            Access accounts using online banking (web browser or mobile device app)     99.45
Commbank Data         2023 Q2            Make/receive account transfers – fast payments   99.77
Commbank Data         2023 Q2            Make/receive account transfers – next business day           100
Commbank Data         2023 Q3            Withdraw/deposit cash at an ATM   99.78
Commbank Data         2023 Q3            Transact over-the-counter in a branch          99.57
Commbank Data         2023 Q3            Make card payments (cardholders) 100
Commbank Data         2023 Q3            Accept card payments (businesses)              100
Commbank Data         2023 Q3            Access accounts using online banking (web browser or mobile device app)     99.89
Commbank Data         2023 Q3            Make/receive account transfers – fast payments   100
Commbank Data         2023 Q3            Make/receive account transfers – next business day           100
Commbank Data         2023 Q4            Withdraw/deposit cash at an ATM   99.92
Commbank Data         2023 Q4            Transact over-the-counter in a branch          100
Commbank Data         2023 Q4            Make card payments (cardholders) 100
Commbank Data         2023 Q4            Accept card payments (businesses)              100
Commbank Data         2023 Q4            Access accounts using online banking (web browser or mobile device app)     99.97
Commbank Data         2023 Q4            Make/receive account transfers – fast payments   100
Commbank Data         2023 Q4            Make/receive account transfers – next business day           100
Commbank Data         2024 Q1            Withdraw/deposit cash at an ATM   99.83
Commbank Data         2024 Q1            Transact over-the-counter in a branch          100
Commbank Data         2024 Q1            Make card payments (cardholders) 100
Commbank Data         2024 Q1            Accept card payments (businesses)              100
Commbank Data         2024 Q1            Access accounts using online banking (web browser or mobile device app)     99.83
Commbank Data         2024 Q1            Make/receive account transfers – fast payments   100
Commbank Data         2024 Q1            Make/receive account transfers – next business day           100
Commbank Data         2024 Q2            Withdraw/deposit cash at an ATM   98.52
Commbank Data         2024 Q2            Transact over-the-counter in a branch          100
Commbank Data         2024 Q2            Make card payments (cardholders) 100
Commbank Data         2024 Q2            Accept card payments (businesses)              100
Commbank Data         2024 Q2            Access accounts using online banking (web browser or mobile device app)     99.64
Commbank Data         2024 Q2            Make/receive account transfers – fast payments   100
Commbank Data         2024 Q2            Make/receive account transfers – next business day           100
Commbank Data         2024 Q3            Withdraw/deposit cash at an ATM   100
Commbank Data         2024 Q3            Transact over-the-counter in a branch          100
Commbank Data         2024 Q3            Make card payments (cardholders) 100
Commbank Data         2024 Q3            Accept card payments (businesses)              100
Commbank Data         2024 Q3            Access accounts using online banking (web browser or mobile device app)     100
Commbank Data         2024 Q3            Make/receive account transfers – fast payments   99.95
Commbank Data         2024 Q3            Make/receive account transfers – next business day           100
Commbank Data         2024 Q4            Withdraw/deposit cash at an ATM   100
Commbank Data         2024 Q4            Transact over-the-counter in a branch          100
Commbank Data         2024 Q4            Make card payments (cardholders) 99.91
Commbank Data         2024 Q4            Accept card payments (businesses)              100
Commbank Data         2024 Q4            Access accounts using online banking (web browser or mobile device app)     99.72
Commbank Data         2024 Q4            Make/receive account transfers – fast payments   99.95
Commbank Data         2024 Q4            Make/receive account transfers – next business day           100
Commbank Data         2025 Q1            Withdraw/deposit cash at an ATM   100
Commbank Data         2025 Q1            Transact over-the-counter in a branch          100
Commbank Data         2025 Q1            Make card payments (cardholders) 99.9
Commbank Data         2025 Q1            Accept card payments (businesses)              100
Commbank Data         2025 Q1            Access accounts using online banking (web browser or mobile device app)     99.9
Commbank Data         2025 Q1            Make/receive account transfers – fast payments   99.96
Commbank Data         2025 Q1            Make/receive account transfers – next business day           100
NAB Data          2023 Q1            Withdraw/deposit cash at an ATM   100%
NAB Data          2023 Q1            Transact over-the-counter in a branch          100%
NAB Data          2023 Q1            Make card payments (cardholders) 100%
NAB Data          2023 Q1            Accept card payments (businesses)              100%
NAB Data          2023 Q1            Access accounts using online banking (web browser or mobile device app)                100%
NAB Data          2023 Q1            Make/receive account transfers – fast payments   100%
NAB Data          2023 Q1            Make/receive account transfers – next business day           100%
NAB Data          2023 Q2            Withdraw/deposit cash at an ATM   100%
NAB Data          2023 Q2            Transact over-the-counter in a branch          100%
NAB Data          2023 Q2            Make card payments (cardholders) 100%
NAB Data          2023 Q2            Accept card payments (businesses)              100%
NAB Data          2023 Q2            Access accounts using online banking (web browser or mobile device app)                100%
NAB Data          2023 Q2            Make/receive account transfers – fast payments   99.63%
NAB Data          2023 Q2            Make/receive account transfers – next business day           100%
NAB Data          2023 Q3            Withdraw/deposit cash at an ATM   100%
NAB Data          2023 Q3            Transact over-the-counter in a branch          100%
NAB Data          2023 Q3            Make card payments (cardholders) 100%
NAB Data          2023 Q3            Accept card payments (businesses)              100%
NAB Data          2023 Q3            Access accounts using online banking (web browser or mobile device app)                100%
NAB Data          2023 Q3            Make/receive account transfers – fast payments   99.81%
NAB Data          2023 Q3            Make/receive account transfers – next business day           100%
NAB Data          2023 Q4            Withdraw/deposit cash at an ATM   100%
NAB Data          2023 Q4            Transact over-the-counter in a branch          100%
NAB Data          2023 Q4            Make card payments (cardholders) 100%
NAB Data          2023 Q4            Accept card payments (businesses)              100%
NAB Data          2023 Q4            Access accounts using online banking (web browser or mobile device app)                99.95%
NAB Data          2023 Q4            Make/receive account transfers – fast payments   99.97%
NAB Data          2023 Q4            Make/receive account transfers – next business day           100%
NAB Data          2024 Q1            Withdraw/deposit cash at an ATM   100%
NAB Data          2024 Q1            Transact over-the-counter in a branch          100%
NAB Data          2024 Q1            Make card payments (cardholders) 100%
NAB Data          2024 Q1            Accept card payments (businesses)              100%
NAB Data          2024 Q1            Access accounts using online banking (web browser or mobile device app)                100%
NAB Data          2024 Q1            Make/receive account transfers – fast payments   100%
NAB Data          2024 Q1            Make/receive account transfers – next business day           100%
NAB Data          2024 Q2            Withdraw/deposit cash at an ATM   100%
NAB Data          2024 Q2            Transact over-the-counter in a branch          100%
NAB Data          2024 Q2            Make card payments (cardholders) 100%
NAB Data          2024 Q2            Accept card payments (businesses)              100%
NAB Data          2024 Q2            Access accounts using online banking (web browser or mobile device app)                99.97%
NAB Data          2024 Q2            Make/receive account transfers – fast payments   99.80%
NAB Data          2024 Q2            Make/receive account transfers – next business day           100%
NAB Data          2024 Q3            Withdraw/deposit cash at an ATM   100%
NAB Data          2024 Q3            Transact over-the-counter in a branch          100%
NAB Data          2024 Q3            Make card payments (cardholders) 100%
NAB Data          2024 Q3            Accept card payments (businesses)              100%
NAB Data          2024 Q3            Access accounts using online banking (web browser or mobile device app)                99.27%
NAB Data          2024 Q3            Make/receive account transfers – fast payments   99.83%
NAB Data          2024 Q3            Make/receive account transfers – next business day           100%
NAB Data          2024 Q4            Withdraw/deposit cash at an ATM   100%
NAB Data          2024 Q4            Transact over-the-counter in a branch          100%
NAB Data          2024 Q4            Make card payments (cardholders) 100%
NAB Data          2024 Q4            Accept card payments (businesses)              100%
NAB Data          2024 Q4            Access accounts using online banking (web browser or mobile device app)                100%
NAB Data          2024 Q4            Make/receive account transfers – fast payments   99.93%
NAB Data          2024 Q4            Make/receive account transfers – next business day           100%
NAB Data          2025 Q1            Withdraw/deposit cash at an ATM   100%
NAB Data          2025 Q1            Transact over-the-counter in a branch          100%
NAB Data          2025 Q1            Make card payments (cardholders) 100%
NAB Data          2025 Q1            Accept card payments (businesses)              100%
NAB Data          2025 Q1            Access accounts using online banking (web browser or mobile device app)                100%
NAB Data          2025 Q1            Make/receive account transfers – fast payments   99.97%
NAB Data          2025 Q1            Make/receive account transfers – next business day           100%
Westpac Data                2023 Q1            Withdraw/deposit cash at an ATM   100%
Westpac Data                2023 Q1            Transact over-the-counter in a branch          100%
Westpac Data                2023 Q1            Make card payments (cardholders) 100.00%
Westpac Data                2023 Q1            Accept card payments (businesses)              100.00%
Westpac Data                2023 Q1            Access accounts using online banking (web browser or mobile device app)     99.92%
Westpac Data                2023 Q1            Make/receive account transfers – fast payments   99.82%
Westpac Data                2023 Q1            Make/receive account transfers – next business day           100%
Westpac Data                2023 Q2            Withdraw/deposit cash at an ATM   100%
Westpac Data                2023 Q2            Transact over-the-counter in a branch          99%
Westpac Data                2023 Q2            Make card payments (cardholders) 100.00%
Westpac Data                2023 Q2            Accept card payments (businesses)              100.00%
Westpac Data                2023 Q2            Access accounts using online banking (web browser or mobile device app)     99.82%
Westpac Data                2023 Q2            Make/receive account transfers – fast payments   99.77%
Westpac Data                2023 Q2            Make/receive account transfers – next business day           100%
Westpac Data                2023 Q3            Withdraw/deposit cash at an ATM   100%
Westpac Data                2023 Q3            Transact over-the-counter in a branch          100%
Westpac Data                2023 Q3            Make card payments (cardholders) 100.00%
Westpac Data                2023 Q3            Accept card payments (businesses)              100.00%
Westpac Data                2023 Q3            Access accounts using online banking (web browser or mobile device app)     100.00%
Westpac Data                2023 Q3            Make/receive account transfers – fast payments   99.91%
Westpac Data                2023 Q3            Make/receive account transfers – next business day           100%
Westpac Data                2023 Q4            Withdraw/deposit cash at an ATM   100%
Westpac Data                2023 Q4            Transact over-the-counter in a branch          99.73%
Westpac Data                2023 Q4            Make card payments (cardholders) 100.00%
Westpac Data                2023 Q4            Accept card payments (businesses)              100.00%
Westpac Data                2023 Q4            Access accounts using online banking (web browser or mobile device app)     99.58%
Westpac Data                2023 Q4            Make/receive account transfers – fast payments   99.41%
Westpac Data                2023 Q4            Make/receive account transfers – next business day           100%
Westpac Data                2024 Q1            Withdraw/deposit cash at an ATM   100%
Westpac Data                2024 Q1            Transact over-the-counter in a branch          98.45%
Westpac Data                2024 Q1            Make card payments (cardholders) 100.00%
Westpac Data                2024 Q1            Accept card payments (businesses)              100.00%
Westpac Data                2024 Q1            Access accounts using online banking (web browser or mobile device app)     100.00%
Westpac Data                2024 Q1            Make/receive account transfers – fast payments   99.96%
Westpac Data                2024 Q1            Make/receive account transfers – next business day           100%
Westpac Data                2024 Q2            Withdraw/deposit cash at an ATM   100%
Westpac Data                2024 Q2            Transact over-the-counter in a branch          100.00%
Westpac Data                2024 Q2            Make card payments (cardholders) 100.00%
Westpac Data                2024 Q2            Accept card payments (businesses)              100.00%
Westpac Data                2024 Q2            Access accounts using online banking (web browser or mobile device app)     99.87%
Westpac Data                2024 Q2            Make/receive account transfers – fast payments   99.95%
Westpac Data                2024 Q2            Make/receive account transfers – next business day           100%
Westpac Data                2024 Q3            Withdraw/deposit cash at an ATM   100%
Westpac Data                2024 Q3            Transact over-the-counter in a branch          100.00%
Westpac Data                2024 Q3            Make card payments (cardholders) 100.00%
Westpac Data                2024 Q3            Accept card payments (businesses)              100.00%
Westpac Data                2024 Q3            Access accounts using online banking (web browser or mobile device app)     100.00%
Westpac Data                2024 Q3            Make/receive account transfers – fast payments   99.76%
Westpac Data                2024 Q3            Make/receive account transfers – next business day           100%
Westpac Data                2024 Q4            Withdraw/deposit cash at an ATM   100%
Westpac Data                2024 Q4            Transact over-the-counter in a branch          100.00%
Westpac Data                2024 Q4            Make card payments (cardholders) 100.00%
Westpac Data                2024 Q4            Accept card payments (businesses)              100.00%
Westpac Data                2024 Q4            Access accounts using online banking (web browser or mobile device app)     99.78%
Westpac Data                2024 Q4            Make/receive account transfers – fast payments   100.00%
Westpac Data                2024 Q4            Make/receive account transfers – next business day           100%
Westpac Data                2025 Q1            Withdraw/deposit cash at an ATM   100%
Westpac Data                2025 Q1            Transact over-the-counter in a branch          100%
Westpac Data                2025 Q1            Make card payments (cardholders) 99.87%
Westpac Data                2025 Q1            Accept card payments (businesses)              99.87%
Westpac Data                2025 Q1            Access accounts using online banking (web browser or mobile device app)     99.70%
Westpac Data                2025 Q1            Make/receive account transfers – fast payments   100.00%
Westpac Data                2025 Q1            Make/receive account transfers – next business day           100%
`;

// Service definitions for consistent naming
const services = [
    'ATM',
    'Branch Counter',
    'Card Payments',
    'Card Acceptance',
    'Online Banking',
    'Fast Transfers',
    'Next Day Transfers'
];

const serviceMapping = {
    'Withdraw/deposit cash at an ATM': 'ATM',
    'Transact over-the-counter in a branch': 'Branch Counter',
    'Make card payments (cardholders)': 'Card Payments',
    'Accept card payments (businesses)': 'Card Acceptance',
    'Access accounts using online banking (web browser or mobile device app)': 'Online Banking',
    'Make/receive account transfers – fast payments': 'Fast Transfers',
    'Make/receive account transfers – next business day': 'Next Day Transfers'
};

const quarters = ['2023 Q1', '2023 Q2', '2023 Q3', '2023 Q4', '2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4', '2025 Q1'];
const banks = ['ANZ', 'Commbank', 'NAB', 'Westpac'];

// Parse raw data function
function parseRawData() {
    const lines = rawData.trim().split('\n').filter(line => line.trim());
    const processedData = {};
    
    lines.forEach(line => {
        const parts = line.trim().split(/\s+/);
        if (parts.length < 4) return;
        
        let bank, quarter, percentage;
        let service = '';
        
        // Extract bank name
        if (parts[0].includes('ANZ')) {
            bank = 'ANZ';
        } else if (parts[0].includes('Commbank')) {
            bank = 'Commbank';
        } else if (parts[0].includes('NAB')) {
            bank = 'NAB';
        } else if (parts[0].includes('Westpac')) {
            bank = 'Westpac';
        }
        
        // Extract quarter
        const quarterMatch = line.match(/(2023|2024|2025)\s+Q[1-4]/);
        if (quarterMatch) {
            quarter = quarterMatch[0];
        }
        
        // Extract percentage (last non-empty element that contains numbers)
        const percentageMatch = line.match(/(\d+\.?\d*)%?$/);
        if (percentageMatch) {
            percentage = parseFloat(percentageMatch[1]);
        }
        
        // Extract service name (between quarter and percentage)
        if (bank && quarter && percentage !== undefined) {
            const serviceStart = line.indexOf(quarter) + quarter.length;
            const serviceEnd = line.lastIndexOf(percentageMatch[0]);
            service = line.substring(serviceStart, serviceEnd).trim();
            
            // Map to standard service name
            const standardService = serviceMapping[service] || service;
            
            if (!processedData[bank]) processedData[bank] = {};
            if (!processedData[bank][quarter]) processedData[bank][quarter] = {};
            
            processedData[bank][quarter][standardService] = {
                percentage: percentage,
                hasOutage: percentage < 100
            };
        }
    });
    
    return processedData;
}

// Transform data for analysis
function transformDataForAnalysis(processedData) {
    const outageMatrix = {};
    const quarterlyOutages = {};
    const serviceOutages = {};
    const bankTotals = {};
    const bankServices = {}; // Track which services each bank offers
    
    // Initialize structures
    banks.forEach(bank => {
        outageMatrix[bank] = {};
        quarterlyOutages[bank] = {};
        bankTotals[bank] = { totalOutages: 0, totalServices: 0, availableServices: [] };
        bankServices[bank] = new Set(); // Use Set to track unique services
        
        services.forEach(service => {
            outageMatrix[bank][service] = {};
            if (!serviceOutages[service]) serviceOutages[service] = {};
            serviceOutages[service][bank] = 0;
        });
        
        quarters.forEach(quarter => {
            quarterlyOutages[bank][quarter] = 0;
            services.forEach(service => {
                outageMatrix[bank][service][quarter] = false;
            });
        });
    });
    
    // Fill the matrices with actual data and track service availability
    Object.keys(processedData).forEach(bank => {
        Object.keys(processedData[bank]).forEach(quarter => {
            Object.keys(processedData[bank][quarter]).forEach(service => {
                const data = processedData[bank][quarter][service];
                if (services.includes(service)) {
                    // Track that this bank offers this service
                    bankServices[bank].add(service);
                    
                    outageMatrix[bank][service][quarter] = data.hasOutage;
                    
                    if (data.hasOutage) {
                        quarterlyOutages[bank][quarter]++;
                        serviceOutages[service][bank]++;
                        bankTotals[bank].totalOutages++;
                    }
                    bankTotals[bank].totalServices++;
                }
            });
        });
    });
    
    // Convert Sets to arrays and calculate actual available services count
    banks.forEach(bank => {
        bankTotals[bank].availableServices = Array.from(bankServices[bank]);
        bankTotals[bank].availableServicesCount = bankServices[bank].size;
        bankTotals[bank].totalPossibleOutages = bankTotals[bank].availableServicesCount * quarters.length;
    });
    
    return {
        processedData,
        outageMatrix,
        quarterlyOutages,
        serviceOutages,
        bankTotals,
        bankServices,
        quarters,
        services,
        banks
    };
}

// Initialize data
const bankData = transformDataForAnalysis(parseRawData());

// Export for global access
window.bankData = bankData; 