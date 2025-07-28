// Raw data processing and transformation
const rawData = `
ANZ Bank Data              2023 Q1            Withdraw/deposit cash at an ATM   100% 0 0
ANZ Bank Data              2023 Q1            Transact over-the-counter in a branch          97.70% 565 0
ANZ Bank Data              2023 Q1            Make card payments (cardholders) 100% 0 0
ANZ Bank Data              2023 Q1            Accept card payments (businesses)
ANZ Bank Data              2023 Q1            Access accounts using online banking (web browser or mobile device app)     99.11% 1154 0
ANZ Bank Data              2023 Q1            Make/receive account transfers – fast payments   100% 0 0
ANZ Bank Data              2023 Q1            Make/receive account transfers – next business day           100% 0 0
ANZ Bank Data              2023 Q2            Withdraw/deposit cash at an ATM   100.00% 0 0
ANZ Bank Data              2023 Q2            Transact over-the-counter in a branch          97.73% 549 0
ANZ Bank Data              2023 Q2            Make card payments (cardholders) 100.00% 0 0
ANZ Bank Data              2023 Q2            Accept card payments (businesses)
ANZ Bank Data              2023 Q2            Access accounts using online banking (web browser or mobile device app)     99.87% 174 0
ANZ Bank Data              2023 Q2            Make/receive account transfers – fast payments   100.00% 0 0
ANZ Bank Data              2023 Q2            Make/receive account transfers – next business day           100.00% 0 0
ANZ Bank Data              2023 Q3            Withdraw/deposit cash at an ATM   99.90% 126 0
ANZ Bank Data              2023 Q3            Transact over-the-counter in a branch          99.31% 173 0
ANZ Bank Data              2023 Q3            Make card payments (cardholders) 100% 0 0
ANZ Bank Data              2023 Q3            Accept card payments (businesses)
ANZ Bank Data              2023 Q3            Access accounts using online banking (web browser or mobile device app)     99.59% 541 0
ANZ Bank Data              2023 Q3            Make/receive account transfers – fast payments   99.69% 414 0
ANZ Bank Data              2023 Q3            Make/receive account transfers – next business day           100% 0 0
ANZ Bank Data              2023 Q4            Withdraw/deposit cash at an ATM   100% 0 0
ANZ Bank Data              2023 Q4            Transact over-the-counter in a branch          98.64% 330 0
ANZ Bank Data              2023 Q4            Make card payments (cardholders) 100% 0 0
ANZ Bank Data              2023 Q4            Accept card payments (businesses)
ANZ Bank Data              2023 Q4            Access accounts using online banking (web browser or mobile device app)     99.80% 267 0
ANZ Bank Data              2023 Q4            Make/receive account transfers – fast payments   100% 0 0
ANZ Bank Data              2023 Q4            Make/receive account transfers – next business day           100% 0 0
ANZ Bank Data              2024 Q1            Withdraw/deposit cash at an ATM   100% 0 0
ANZ Bank Data              2024 Q1            Transact over-the-counter in a branch          100% 0 0
ANZ Bank Data              2024 Q1            Make card payments (cardholders) 100% 0 0
ANZ Bank Data              2024 Q1            Accept card payments (businesses)
ANZ Bank Data              2024 Q1            Access accounts using online banking (web browser or mobile device app)     99.81% 246 0
ANZ Bank Data              2024 Q1            Make/receive account transfers – fast payments   100% 0 0
ANZ Bank Data              2024 Q1            Make/receive account transfers – next business day           100% 0 0
ANZ Bank Data              2024 Q2            Withdraw/deposit cash at an ATM   100% 0 0
ANZ Bank Data              2024 Q2            Transact over-the-counter in a branch          98.86% 275 0
ANZ Bank Data              2024 Q2            Make card payments (cardholders) 100% 0 0
ANZ Bank Data              2024 Q2            Accept card payments (businesses)
ANZ Bank Data              2024 Q2            Access accounts using online banking (web browser or mobile device app)     99.82% 241 0
ANZ Bank Data              2024 Q2            Make/receive account transfers – fast payments   100% 0 0
ANZ Bank Data              2024 Q2            Make/receive account transfers – next business day           100% 0 0
ANZ Bank Data              2024 Q3            Withdraw/deposit cash at an ATM   100% 0 0
ANZ Bank Data              2024 Q3            Transact over-the-counter in a branch          100% 0 0
ANZ Bank Data              2024 Q3            Make card payments (cardholders) 100% 0 0
ANZ Bank Data              2024 Q3            Accept card payments (businesses)
ANZ Bank Data              2024 Q3            Access accounts using online banking (web browser or mobile device app)     99.97% 36 0
ANZ Bank Data              2024 Q3            Make/receive account transfers – fast payments   99.85% 197 0
ANZ Bank Data              2024 Q3            Make/receive account transfers – next business day           100% 0 0
ANZ Bank Data              2024 Q4            Withdraw/deposit cash at an ATM   100% 0 0
ANZ Bank Data              2024 Q4            Transact over-the-counter in a branch          100% 0 0
ANZ Bank Data              2024 Q4            Make card payments (cardholders) 100% 0 0
ANZ Bank Data              2024 Q4            Accept card payments (businesses)
ANZ Bank Data              2024 Q4            Access accounts using online banking (web browser or mobile device app)     99.91% 120 0
ANZ Bank Data              2024 Q4            Make/receive account transfers – fast payments   99.50% 665 0
ANZ Bank Data              2024 Q4            Make/receive account transfers – next business day           100% 0 0
ANZ Bank Data              2025 Q1            Withdraw/deposit cash at an ATM   99.78% 287 0
ANZ Bank Data              2025 Q1            Transact over-the-counter in a branch          98.97% 244 0
ANZ Bank Data              2025 Q1            Make card payments (cardholders) 100% 0 0
ANZ Bank Data              2025 Q1            Accept card payments (businesses)
ANZ Bank Data              2025 Q1            Access accounts using online banking (web browser or mobile device app)     99.92% 106 0
ANZ Bank Data              2025 Q1            Make/receive account transfers – fast payments   99.84% 202 0
ANZ Bank Data              2025 Q1            Make/receive account transfers – next business day           100% 0 0
Commbank Data         2023 Q1            Withdraw/deposit cash at an ATM   100 0 0
Commbank Data         2023 Q1            Transact over-the-counter in a branch          100 0 0
Commbank Data         2023 Q1            Make card payments (cardholders) 100 0 0
Commbank Data         2023 Q1            Accept card payments (businesses)              100 0 0
Commbank Data         2023 Q1            Access accounts using online banking (web browser or mobile device app)     99.36 823 0
Commbank Data         2023 Q1            Make/receive account transfers – fast payments   100 0 0
Commbank Data         2023 Q1            Make/receive account transfers – next business day           100 0 0
Commbank Data         2023 Q2            Withdraw/deposit cash at an ATM   99.68 420 0
Commbank Data         2023 Q2            Transact over-the-counter in a branch          99.68 315 0
Commbank Data         2023 Q2            Make card payments (cardholders) 100 0 0
Commbank Data         2023 Q2            Accept card payments (businesses)              100 0 0
Commbank Data         2023 Q2            Access accounts using online banking (web browser or mobile device app)     99.45 705 0
Commbank Data         2023 Q2            Make/receive account transfers – fast payments   99.77 297 0
Commbank Data         2023 Q2            Make/receive account transfers – next business day           100 0 0
Commbank Data         2023 Q3            Withdraw/deposit cash at an ATM   99.78 295 0
Commbank Data         2023 Q3            Transact over-the-counter in a branch          99.57 109 0
Commbank Data         2023 Q3            Make card payments (cardholders) 100 0 0
Commbank Data         2023 Q3            Accept card payments (businesses)              100 0 0
Commbank Data         2023 Q3            Access accounts using online banking (web browser or mobile device app)     99.89 149 0
Commbank Data         2023 Q3            Make/receive account transfers – fast payments   100 0 0
Commbank Data         2023 Q3            Make/receive account transfers – next business day           100 0 0
Commbank Data         2023 Q4            Withdraw/deposit cash at an ATM   99.92 100 0
Commbank Data         2023 Q4            Transact over-the-counter in a branch          100 0 0
Commbank Data         2023 Q4            Make card payments (cardholders) 100 0 0
Commbank Data         2023 Q4            Accept card payments (businesses)              100 0 0
Commbank Data         2023 Q4            Access accounts using online banking (web browser or mobile device app)     99.97 33 0
Commbank Data         2023 Q4            Make/receive account transfers – fast payments   100 0 0
Commbank Data         2023 Q4            Make/receive account transfers – next business day           100 0 0
Commbank Data         2024 Q1            Withdraw/deposit cash at an ATM   99.83 225 0
Commbank Data         2024 Q1            Transact over-the-counter in a branch          100 0 0
Commbank Data         2024 Q1            Make card payments (cardholders) 100 0 0
Commbank Data         2024 Q1            Accept card payments (businesses)              100 0 0
Commbank Data         2024 Q1            Access accounts using online banking (web browser or mobile device app)     99.83 225 0
Commbank Data         2024 Q1            Make/receive account transfers – fast payments   100 0 0
Commbank Data         2024 Q1            Make/receive account transfers – next business day           100 0 0
Commbank Data         2024 Q2            Withdraw/deposit cash at an ATM   98.52 1935 0
Commbank Data         2024 Q2            Transact over-the-counter in a branch          100 0 0
Commbank Data         2024 Q2            Make card payments (cardholders) 100 0 0
Commbank Data         2024 Q2            Accept card payments (businesses)              100 0 0
Commbank Data         2024 Q2            Access accounts using online banking (web browser or mobile device app)     99.64 467 0
Commbank Data         2024 Q2            Make/receive account transfers – fast payments   100 0 0
Commbank Data         2024 Q2            Make/receive account transfers – next business day           100 0 0
Commbank Data         2024 Q3            Withdraw/deposit cash at an ATM   100 0 0
Commbank Data         2024 Q3            Transact over-the-counter in a branch          100 0 0
Commbank Data         2024 Q3            Make card payments (cardholders) 100 0 0
Commbank Data         2024 Q3            Accept card payments (businesses)              100 0 0
Commbank Data         2024 Q3            Access accounts using online banking (web browser or mobile device app)     100 0 0
Commbank Data         2024 Q3            Make/receive account transfers – fast payments   99.95 0 60
Commbank Data         2024 Q3            Make/receive account transfers – next business day           100 0 0
Commbank Data         2024 Q4            Withdraw/deposit cash at an ATM   100 0 0
Commbank Data         2024 Q4            Transact over-the-counter in a branch          100 0 0
Commbank Data         2024 Q4            Make card payments (cardholders) 99.91 119 0
Commbank Data         2024 Q4            Accept card payments (businesses)              100 0 0
Commbank Data         2024 Q4            Access accounts using online banking (web browser or mobile device app)     99.72 367 0
Commbank Data         2024 Q4            Make/receive account transfers – fast payments   99.95 66 0
Commbank Data         2024 Q4            Make/receive account transfers – next business day           100 0 0
Commbank Data         2025 Q1            Withdraw/deposit cash at an ATM   100 0 0
Commbank Data         2025 Q1            Transact over-the-counter in a branch          100 0 0
Commbank Data         2025 Q1            Make card payments (cardholders) 99.9 0 135
Commbank Data         2025 Q1            Accept card payments (businesses)              100 0 0
Commbank Data         2025 Q1            Access accounts using online banking (web browser or mobile device app)     99.9 128 0
Commbank Data         2025 Q1            Make/receive account transfers – fast payments   99.96 47 0
Commbank Data         2025 Q1            Make/receive account transfers – next business day           100 0 0
NAB Data          2023 Q1            Withdraw/deposit cash at an ATM   100% 0 0
NAB Data          2023 Q1            Transact over-the-counter in a branch          100% 0 0
NAB Data          2023 Q1            Make card payments (cardholders) 100% 0 0
NAB Data          2023 Q1            Accept card payments (businesses)              100% 0 0
NAB Data          2023 Q1            Access accounts using online banking (web browser or mobile device app)                100% 0 0
NAB Data          2023 Q1            Make/receive account transfers – fast payments   100% 0 0
NAB Data          2023 Q1            Make/receive account transfers – next business day           100% 0 0
NAB Data          2023 Q2            Withdraw/deposit cash at an ATM   100% 0 0
NAB Data          2023 Q2            Transact over-the-counter in a branch          100% 0 0
NAB Data          2023 Q2            Make card payments (cardholders) 100% 0 0
NAB Data          2023 Q2            Accept card payments (businesses)              100% 0 0
NAB Data          2023 Q2            Access accounts using online banking (web browser or mobile device app)                100% 0 0
NAB Data          2023 Q2            Make/receive account transfers – fast payments   99.63% 433 0
NAB Data          2023 Q2            Make/receive account transfers – next business day           100% 0 0
NAB Data          2023 Q3            Withdraw/deposit cash at an ATM   100% 0 0
NAB Data          2023 Q3            Transact over-the-counter in a branch          100% 0 0
NAB Data          2023 Q3            Make card payments (cardholders) 100% 0 0
NAB Data          2023 Q3            Accept card payments (businesses)              100% 0 0
NAB Data          2023 Q3            Access accounts using online banking (web browser or mobile device app)                100% 0 0
NAB Data          2023 Q3            Make/receive account transfers – fast payments   99.81% 251 0
NAB Data          2023 Q3            Make/receive account transfers – next business day           100% 0 0
NAB Data          2023 Q4            Withdraw/deposit cash at an ATM   100% 0 0
NAB Data          2023 Q4            Transact over-the-counter in a branch          100% 0 0
NAB Data          2023 Q4            Make card payments (cardholders) 100% 0 0
NAB Data          2023 Q4            Accept card payments (businesses)              100% 0 0
NAB Data          2023 Q4            Access accounts using online banking (web browser or mobile device app)                99.95% 68 0
NAB Data          2023 Q4            Make/receive account transfers – fast payments   99.97% 35 0
NAB Data          2023 Q4            Make/receive account transfers – next business day           100% 0 0
NAB Data          2024 Q1            Withdraw/deposit cash at an ATM   100% 0 0
NAB Data          2024 Q1            Transact over-the-counter in a branch          100% 0 0
NAB Data          2024 Q1            Make card payments (cardholders) 100% 0 0
NAB Data          2024 Q1            Accept card payments (businesses)              100% 0 0
NAB Data          2024 Q1            Access accounts using online banking (web browser or mobile device app)                100% 0 0
NAB Data          2024 Q1            Make/receive account transfers – fast payments   100% 0 0
NAB Data          2024 Q1            Make/receive account transfers – next business day           100% 0 0
NAB Data          2024 Q2            Withdraw/deposit cash at an ATM   100% 0 0
NAB Data          2024 Q2            Transact over-the-counter in a branch          100% 0 0
NAB Data          2024 Q2            Make card payments (cardholders) 100% 0 0
NAB Data          2024 Q2            Accept card payments (businesses)              100% 0 0
NAB Data          2024 Q2            Access accounts using online banking (web browser or mobile device app)                99.97% 44 0
NAB Data          2024 Q2            Make/receive account transfers – fast payments   99.80% 260 0
NAB Data          2024 Q2            Make/receive account transfers – next business day           100% 0 0
NAB Data          2024 Q3            Withdraw/deposit cash at an ATM   100% 0 0
NAB Data          2024 Q3            Transact over-the-counter in a branch          100% 0 0
NAB Data          2024 Q3            Make card payments (cardholders) 100% 0 0
NAB Data          2024 Q3            Accept card payments (businesses)              100% 0 0
NAB Data          2024 Q3            Access accounts using online banking (web browser or mobile device app)                99.27% 965 0
NAB Data          2024 Q3            Make/receive account transfers – fast payments   99.83% 222 0
NAB Data          2024 Q3            Make/receive account transfers – next business day           100% 0 0
NAB Data          2024 Q4            Withdraw/deposit cash at an ATM   100% 0 0
NAB Data          2024 Q4            Transact over-the-counter in a branch          100% 0 0
NAB Data          2024 Q4            Make card payments (cardholders) 100% 0 0
NAB Data          2024 Q4            Accept card payments (businesses)              100% 0 0
NAB Data          2024 Q4            Access accounts using online banking (web browser or mobile device app)                100% 0 0
NAB Data          2024 Q4            Make/receive account transfers – fast payments   99.93% 89 0
NAB Data          2024 Q4            Make/receive account transfers – next business day           100% 0 0
NAB Data          2025 Q1            Withdraw/deposit cash at an ATM   100% 0 0
NAB Data          2025 Q1            Transact over-the-counter in a branch          100% 0 0
NAB Data          2025 Q1            Make card payments (cardholders) 100% 0 0
NAB Data          2025 Q1            Accept card payments (businesses)              100% 0 0
NAB Data          2025 Q1            Access accounts using online banking (web browser or mobile device app)                100% 0 0
NAB Data          2025 Q1            Make/receive account transfers – fast payments   99.97% 35 0
NAB Data          2025 Q1            Make/receive account transfers – next business day           100% 0 0
Westpac Data                2023 Q1            Withdraw/deposit cash at an ATM   100% 0 0
Westpac Data                2023 Q1            Transact over-the-counter in a branch          100% 0 0
Westpac Data                2023 Q1            Make card payments (cardholders) 100.00% 0 0
Westpac Data                2023 Q1            Accept card payments (businesses)              100.00% 0 0
Westpac Data                2023 Q1            Access accounts using online banking (web browser or mobile device app)     99.92% 106 0
Westpac Data                2023 Q1            Make/receive account transfers – fast payments   99.82% 236 0
Westpac Data                2023 Q1            Make/receive account transfers – next business day           100% 0 0
Westpac Data                2023 Q2            Withdraw/deposit cash at an ATM   100% 0 0
Westpac Data                2023 Q2            Transact over-the-counter in a branch          99% 160 0
Westpac Data                2023 Q2            Make card payments (cardholders) 100.00% 0 0
Westpac Data                2023 Q2            Accept card payments (businesses)              100.00% 0 0
Westpac Data                2023 Q2            Access accounts using online banking (web browser or mobile device app)     99.82% 235 0
Westpac Data                2023 Q2            Make/receive account transfers – fast payments   99.77% 307 0
Westpac Data                2023 Q2            Make/receive account transfers – next business day           100% 0 0
Westpac Data                2023 Q3            Withdraw/deposit cash at an ATM   100% 0 0
Westpac Data                2023 Q3            Transact over-the-counter in a branch          100% 0 0
Westpac Data                2023 Q3            Make card payments (cardholders) 100.00% 0 0
Westpac Data                2023 Q3            Accept card payments (businesses)              100.00% 0 0
Westpac Data                2023 Q3            Access accounts using online banking (web browser or mobile device app)     100.00% 0 0
Westpac Data                2023 Q3            Make/receive account transfers – fast payments   99.91% 123 0
Westpac Data                2023 Q3            Make/receive account transfers – next business day           100% 0 0
Westpac Data                2023 Q4            Withdraw/deposit cash at an ATM   100% 0 0
Westpac Data                2023 Q4            Transact over-the-counter in a branch          99.73% 68 0
Westpac Data                2023 Q4            Make card payments (cardholders) 100.00% 0 0
Westpac Data                2023 Q4            Accept card payments (businesses)              100.00% 0 0
Westpac Data                2023 Q4            Access accounts using online banking (web browser or mobile device app)     99.58% 559 0
Westpac Data                2023 Q4            Make/receive account transfers – fast payments   99.41% 384 0
Westpac Data                2023 Q4            Make/receive account transfers – next business day           100% 0 0
Westpac Data                2024 Q1            Withdraw/deposit cash at an ATM   100% 0 0
Westpac Data                2024 Q1            Transact over-the-counter in a branch          98.45% 390 0
Westpac Data                2024 Q1            Make card payments (cardholders) 100.00% 0 0
Westpac Data                2024 Q1            Accept card payments (businesses)              100.00% 0 0
Westpac Data                2024 Q1            Access accounts using online banking (web browser or mobile device app)     100.00% 0 0
Westpac Data                2024 Q1            Make/receive account transfers – fast payments   99.96% 53 0
Westpac Data                2024 Q1            Make/receive account transfers – next business day           100% 0 0
Westpac Data                2024 Q2            Withdraw/deposit cash at an ATM   100% 0 0
Westpac Data                2024 Q2            Transact over-the-counter in a branch          100.00% 0 0
Westpac Data                2024 Q2            Make card payments (cardholders) 100.00% 0 0
Westpac Data                2024 Q2            Accept card payments (businesses)              100.00% 0 0
Westpac Data                2024 Q2            Access accounts using online banking (web browser or mobile device app)     99.87% 175 0
Westpac Data                2024 Q2            Make/receive account transfers – fast payments   99.95% 63 0
Westpac Data                2024 Q2            Make/receive account transfers – next business day           100% 0 0
Westpac Data                2024 Q3            Withdraw/deposit cash at an ATM   100% 0 0
Westpac Data                2024 Q3            Transact over-the-counter in a branch          100.00% 0 0
Westpac Data                2024 Q3            Make card payments (cardholders) 100.00% 0 0
Westpac Data                2024 Q3            Accept card payments (businesses)              100.00% 0 0
Westpac Data                2024 Q3            Access accounts using online banking (web browser or mobile device app)     100.00% 0 0
Westpac Data                2024 Q3            Make/receive account transfers – fast payments   99.76% 319 0
Westpac Data                2024 Q3            Make/receive account transfers – next business day           100% 0 0
Westpac Data                2024 Q4            Withdraw/deposit cash at an ATM   100% 0 0
Westpac Data                2024 Q4            Transact over-the-counter in a branch          100.00% 0 0
Westpac Data                2024 Q4            Make card payments (cardholders) 100.00% 0 0
Westpac Data                2024 Q4            Accept card payments (businesses)              100.00% 0 0
Westpac Data                2024 Q4            Access accounts using online banking (web browser or mobile device app)     99.78% 288 0
Westpac Data                2024 Q4            Make/receive account transfers – fast payments   100.00% 0 0
Westpac Data                2024 Q4            Make/receive account transfers – next business day           100% 0 0
Westpac Data                2025 Q1            Withdraw/deposit cash at an ATM   100% 0 0
Westpac Data                2025 Q1            Transact over-the-counter in a branch          100% 0 0
Westpac Data                2025 Q1            Make card payments (cardholders) 99.87% 0 164
Westpac Data                2025 Q1            Accept card payments (businesses)              99.87% 0 164
Westpac Data                2025 Q1            Access accounts using online banking (web browser or mobile device app)     99.70% 391 0
Westpac Data                2025 Q1            Make/receive account transfers – fast payments   100.00% 0 0
Westpac Data                2025 Q1            Make/receive account transfers – next business day           100% 0 0
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
        let bank, quarter;
        
        // Extract bank name
        if (line.includes('ANZ')) bank = 'ANZ';
        else if (line.includes('Commbank')) bank = 'Commbank';
        else if (line.includes('NAB')) bank = 'NAB';
        else if (line.includes('Westpac')) bank = 'Westpac';
        
        // Extract quarter
        const quarterMatch = line.match(/(202[3-5]\s+Q[1-4])/);
        if (quarterMatch) {
            quarter = quarterMatch[0];
        }
        
        if (bank && quarter) {
            const serviceStart = line.indexOf(quarter) + quarter.length;
            let restOfLine = line.substring(serviceStart).trim();

            let service, percentage, outageBank = 0, outageInfra = 0;
            
            // Regex to capture service, percentage, and outage minutes
            const match = restOfLine.match(/(.*?)\s*(\d+\.?\d*%?)\s*(\d+)\s*(\d+)$/);
            
            if (match) {
                service = match[1].trim();
                percentage = parseFloat(match[2].replace('%',''));
                outageBank = parseInt(match[3], 10);
                outageInfra = parseInt(match[4], 10);
            } else {
                // Handle lines without outage data or percentage
                const percMatch = restOfLine.match(/(.*?)\s*(\d+\.?\d*%?)$/);
                if (percMatch) {
                    service = percMatch[1].trim();
                    percentage = parseFloat(percMatch[2].replace('%',''));
                } else {
                    service = restOfLine.trim();
                    percentage = undefined;
                }
            }

            // Map to standard service name
            const standardService = serviceMapping[service] || service;
            
            if (percentage !== undefined && !isNaN(percentage)) {
                if (!processedData[bank]) processedData[bank] = {};
                if (!processedData[bank][quarter]) processedData[bank][quarter] = {};
                
                processedData[bank][quarter][standardService] = {
                    percentage: percentage,
                    hasOutage: percentage < 100,
                    outageBank: outageBank,
                    outageInfra: outageInfra
                };
            }
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