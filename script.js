// Red Dog Advisory - Cash Conversion Cycle & Cash Flow Analyzer
// Business Financial Analysis Tool

/**
 * Calculate Cash Conversion Cycle
 * Formula: CCC = DIO + DSO - DPO
 * DIO: Days Inventory Outstanding
 * DSO: Days Sales Outstanding
 * DPO: Days Payable Outstanding
 */
function calculateCCC() {
    // Get input values
    const dio = parseFloat(document.getElementById('daysInventory').value) || 0;
    const dso = parseFloat(document.getElementById('daysSales').value) || 0;
    const dpo = parseFloat(document.getElementById('daysPayable').value) || 0;

    // Calculate CCC
    const ccc = dio + dso - dpo;

    // Display result
    document.getElementById('cccValue').textContent = ccc.toFixed(2);

    // Generate interpretation
    let interpretation = '';
    if (ccc < 0) {
        interpretation = `<strong style="color: #27AE60;">✓ Excellent Position:</strong> Your cash conversion cycle is <strong>${ccc.toFixed(2)} days</strong>, which is negative. This means you collect cash from customers before paying suppliers, creating a cash advantage. This is ideal for business growth and cash flow management.`;
    } else if (ccc <= 30) {
        interpretation = `<strong style="color: #27AE60;">✓ Good Position:</strong> Your cash conversion cycle is <strong>${ccc.toFixed(2)} days</strong>. This is a healthy range, indicating efficient working capital management. Your cash is tied up for a reasonable period.`;
    } else if (ccc <= 60) {
        interpretation = `<strong style="color: #F39C12;">⚠ Moderate Position:</strong> Your cash conversion cycle is <strong>${ccc.toFixed(2)} days</strong>. While acceptable, you should monitor and work to improve efficiency. Consider extending payment terms with suppliers or reducing inventory.`;
    } else {
        interpretation = `<strong style="color: #CC0000;">⚠ Needs Attention:</strong> Your cash conversion cycle is <strong>${ccc.toFixed(2)} days</strong>, which is high. This means significant cash is tied up in operations. Focus on inventory reduction, faster customer collections, or negotiating better payment terms.`;
    }

    document.getElementById('cccInterpretation').innerHTML = interpretation;
    document.getElementById('cccResult').style.display = 'block';

    // Smooth scroll to result
    document.getElementById('cccResult').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Calculate Cash Flow Analysis
 * Operating Cash Flow = Revenue - COGS - Operating Expenses
 * Net Cash Flow = Operating CF - Debt Payments - CapEx - Taxes
 */
function calculateCashFlow() {
    // Get input values
    const revenue = parseFloat(document.getElementById('monthlyRevenue').value) || 0;
    const cogs = parseFloat(document.getElementById('costOfGoodsSold').value) || 0;
    const opex = parseFloat(document.getElementById('operatingExpenses').value) || 0;
    const debtPayments = parseFloat(document.getElementById('debtPayments').value) || 0;
    const capex = parseFloat(document.getElementById('capitalExpenditure').value) || 0;
    const taxes = parseFloat(document.getElementById('taxPayments').value) || 0;

    // Calculate Cash Flow metrics
    const grossProfit = revenue - cogs;
    const operatingCF = grossProfit - opex;
    const netCF = operatingCF - debtPayments - capex - taxes;
    const profitMargin = revenue > 0 ? ((grossProfit / revenue) * 100).toFixed(2) : 0;

    // Format currency
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    // Display results
    document.getElementById('operatingCF').textContent = formatter.format(operatingCF);
    document.getElementById('netCF').textContent = formatter.format(netCF);
    document.getElementById('profitMargin').textContent = profitMargin + '%';

    // Generate cash position indicator
    let cashPositionHTML = '';
    if (netCF >= 0) {
        cashPositionHTML = `<strong style="color: #27AE60;">✓ Positive Cash Position:</strong> Your business generated <strong>${formatter.format(netCF)}</strong> in net cash flow this month. This is healthy and allows for reinvestment or reserves.`;
    } else {
        cashPositionHTML = `<strong style="color: #CC0000;">⚠ Negative Cash Position:</strong> Your business consumed <strong>${formatter.format(Math.abs(netCF))}</strong> in cash this month. Review your expenses, debt payments, or capital investments.`;
    }

    const cashPositionDiv = document.getElementById('cashPosition');
    cashPositionDiv.innerHTML = cashPositionHTML;
    cashPositionDiv.className = netCF >= 0 ? 'cash-position positive' : 'cash-position negative';

    document.getElementById('cashFlowResult').style.display = 'block';

    // Smooth scroll to result
    document.getElementById('cashFlowResult').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Generate Financial Summary Dashboard
 * Combines CCC and Cash Flow analysis for comprehensive view
 */
function generateSummary() {
    // Get all current values
    const dio = parseFloat(document.getElementById('daysInventory').value) || 0;
    const dso = parseFloat(document.getElementById('daysSales').value) || 0;
    const dpo = parseFloat(document.getElementById('daysPayable').value) || 0;
    const ccc = dio + dso - dpo;

    const revenue = parseFloat(document.getElementById('monthlyRevenue').value) || 0;
    const cogs = parseFloat(document.getElementById('costOfGoodsSold').value) || 0;
    const opex = parseFloat(document.getElementById('operatingExpenses').value) || 0;
    const debtPayments = parseFloat(document.getElementById('debtPayments').value) || 0;
    const capex = parseFloat(document.getElementById('capitalExpenditure').value) || 0;
    const taxes = parseFloat(document.getElementById('taxPayments').value) || 0;

    const grossProfit = revenue - cogs;
    const operatingCF = grossProfit - opex;
    const netCF = operatingCF - debtPayments - capex - taxes;
    const profitMargin = revenue > 0 ? ((grossProfit / revenue) * 100) : 0;

    // Working Capital Status
    let workingCapitalStatus = '';
    if (ccc < 0) {
        workingCapitalStatus = '🟢 Excellent - Negative CCC creates automatic cash generation';
    } else if (ccc <= 30) {
        workingCapitalStatus = '🟢 Good - Efficient working capital management';
    } else if (ccc <= 60) {
        workingCapitalStatus = '🟡 Fair - Monitor and optimize working capital';
    } else {
        workingCapitalStatus = '🔴 Needs Improvement - Reduce cash cycle duration';
    }

    // Cash Flow Health
    let cashFlowHealth = '';
    if (netCF >= revenue * 0.2) {
        cashFlowHealth = '🟢 Excellent - Strong positive cash generation (>20% of revenue)';
    } else if (netCF > 0) {
        cashFlowHealth = '🟢 Good - Positive cash flow but could improve margins';
    } else if (netCF >= -revenue * 0.1) {
        cashFlowHealth = '🟡 Fair - Slight negative cash flow, needs attention';
    } else {
        cashFlowHealth = '🔴 Needs Improvement - Significant cash outflow';
    }

    // Key Recommendation
    let keyRecommendation = '';
    let priority = [];

    // Analyze priority issues
    if (ccc > 45) {
        priority.push('Reduce cash conversion cycle');
    }
    if (profitMargin < 0.15) {
        priority.push('Increase profit margins');
    }
    if (netCF < 0) {
        priority.push('Improve net cash flow');
    }
    if (dso > 60) {
        priority.push('Accelerate customer collections (DSO too high)');
    }
    if (dio > 45) {
        priority.push('Reduce inventory holding period');
    }

    if (priority.length === 0) {
        keyRecommendation = '✓ Strong Financial Position - Maintain current practices and focus on growth strategies';
    } else {
        keyRecommendation = 'Priority Actions:<br/>' + priority.map((item, index) => `${index + 1}. ${item}`).join('<br/>');
    }

    // Display summary
    document.getElementById('workingCapitalStatus').innerHTML = workingCapitalStatus;
    document.getElementById('cashFlowHealth').innerHTML = cashFlowHealth;
    document.getElementById('keyRecommendation').innerHTML = keyRecommendation;

    document.getElementById('summaryDashboard').style.display = 'grid';

    // Smooth scroll to summary
    document.getElementById('summaryDashboard').scrollIntoView({ behavior: 'smooth' });
}

/**
 * Reset all fields to default values
 */
function resetAll() {
    // Reset CCC inputs
    document.getElementById('daysInventory').value = 30;
    document.getElementById('daysSales').value = 45;
    document.getElementById('daysPayable').value = 30;

    // Reset Cash Flow inputs
    document.getElementById('monthlyRevenue').value = 50000;
    document.getElementById('costOfGoodsSold').value = 20000;
    document.getElementById('operatingExpenses').value = 15000;
    document.getElementById('debtPayments').value = 5000;
    document.getElementById('capitalExpenditure').value = 2000;
    document.getElementById('taxPayments').value = 5000;

    // Hide results
    document.getElementById('cccResult').style.display = 'none';
    document.getElementById('cashFlowResult').style.display = 'none';
    document.getElementById('summaryDashboard').style.display = 'none';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Show confirmation
    showNotification('All fields have been reset to default values', 'success');
}

/**
 * Show notification message
 */
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background-color: ${type === 'success' ? '#27AE60' : '#CC0000'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * Add keyboard event listeners for Enter key
 */
document.addEventListener('DOMContentLoaded', function() {
    // Add Enter key support to input fields
    const inputFields = document.querySelectorAll('input[type="number"]');
    
    inputFields.forEach(field => {
        field.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                // Determine which calculator to run based on the field
                if (this.id === 'daysInventory' || this.id === 'daysSales' || this.id === 'daysPayable') {
                    calculateCCC();
                } else if (this.id === 'monthlyRevenue' || this.id === 'costOfGoodsSold' || 
                          this.id === 'operatingExpenses' || this.id === 'debtPayments' || 
                          this.id === 'capitalExpenditure' || this.id === 'taxPayments') {
                    calculateCashFlow();
                }
            }
        });
    });

    // Add animation styles to document
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

/**
 * Export functionality (for future enhancement)
 */
function exportAnalysis() {
    const summary = {
        ccc: parseFloat(document.getElementById('cccValue').textContent),
        operatingCF: document.getElementById('operatingCF').textContent,
        netCF: document.getElementById('netCF').textContent,
        profitMargin: document.getElementById('profitMargin').textContent,
        timestamp: new Date().toLocaleString()
    };

    console.log('Analysis Export:', summary);
    showNotification('Analysis data exported to console', 'success');
}
