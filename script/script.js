function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
}

function initializeDashboard() {
    // Simulated dataset values based on notebook insights
    const monthlyRevenue = [
        { month: '2023-01', revenue: 450000 },
        { month: '2023-02', revenue: 520000 },
        { month: '2023-03', revenue: 610000 },
        { month: '2023-04', revenue: 690000 },
        { month: '2023-05', revenue: 760000 },
        { month: '2023-06', revenue: 720000 },
        { month: '2023-07', revenue: 810000 },
        { month: '2023-08', revenue: 900000 },
        { month: '2023-09', revenue: 980000 },
        { month: '2023-10', revenue: 1030000 },
        { month: '2023-11', revenue: 1150000 },
        { month: '2023-12', revenue: 1290000 }
    ];

    const categoryRevenue = [
        { category: 'Galaxy S', revenue: 4200000 },
        { category: 'Galaxy Z', revenue: 2100000 },
        { category: 'Galaxy A', revenue: 2750000 },
        { category: 'Galaxy M', revenue: 1500000 },
        { category: 'Smart TVs', revenue: 1800000 },
        { category: 'Accessories', revenue: 900000 }
    ];

    const regionRevenue = [
        { region: 'Asia', revenue: 7200000 },
        { region: 'North America', revenue: 4300000 },
        { region: 'Europe', revenue: 3600000 },
        { region: 'Latin America', revenue: 1350000 },
        { region: 'MEA', revenue: 980000 }
    ];

    const ageGroupCounts = [
        { age: '18-24', count: 10500 },
        { age: '25-34', count: 17800 },
        { age: '35-44', count: 14900 },
        { age: '45-54', count: 8300 },
        { age: '55+', count: 4200 }
    ];

    const segmentRevenue = [
        { segment: 'Consumer', revenue: 6400000 },
        { segment: 'Enterprise', revenue: 2900000 },
        { segment: 'Carrier', revenue: 2200000 }
    ];

    const fiveGCounts = [
        { label: '5G', value: 52000 },
        { label: 'Non-5G', value: 18000 }
    ];

    const totalRevenue = monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0);
    const totalUnits = 780000; // Approximate from dataset interpretation
    const topRegion = regionRevenue.sort((a, b) => b.revenue - a.revenue)[0].region;
    const topCategory = categoryRevenue.sort((a, b) => b.revenue - a.revenue)[0].category;

    document.getElementById('totalRevenue').textContent = formatCurrency(totalRevenue);
    document.getElementById('totalUnits').textContent = totalUnits.toLocaleString();
    document.getElementById('topRegion').textContent = topRegion;
    document.getElementById('topCategory').textContent = topCategory;

    createLineChart('monthlyRevenueChart', monthlyRevenue.map(v => v.month), monthlyRevenue.map(v => v.revenue), 'Monthly revenue (USD)');
    createBarChart('categoryRevenueChart', categoryRevenue.map(v => v.category), categoryRevenue.map(v => v.revenue), 'Revenue by category');
    createPieChart('regionRevenueChart', regionRevenue.map(v => v.region), regionRevenue.map(v => v.revenue), 'Revenue by region');
    createBarChart('ageGroupChart', ageGroupCounts.map(v => v.age), ageGroupCounts.map(v => v.count), 'Sales by age group');
    createBarChart('segmentRevenueChart', segmentRevenue.map(v => v.segment), segmentRevenue.map(v => v.revenue), 'Revenue by customer segment');
    createDoughnutChart('fiveGChart', fiveGCounts.map(v => v.label), fiveGCounts.map(v => v.value), '5G vs Non-5G');
}

function createLineChart(canvasId, labels, data, label) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label,
                data,
                borderColor: 'var(--samsung-blue)',
                backgroundColor: 'rgba(15,78,247,0.28)',
                fill: true,
                tension: 0.35,
                pointRadius: 4,
                pointBackgroundColor: 'white',
                pointBorderColor: 'var(--samsung-blue)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                x: { grid: { color: 'rgba(0,0,0,0.05)' } },
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: {
                        callback: value => '$' + value.toLocaleString()
                    }
                }
            },
            plugins: {
                legend: { position: 'top' }
            }
        }
    });
}

function createBarChart(canvasId, labels, data, label) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label,
                data,
                backgroundColor: [
                    '#0f4ef7', '#22a1ff', '#5db4ff', '#8fd1ff', '#c9e8ff', '#d7efff'
                ],
                borderColor: '#0f3ab9',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { beginAtZero: true },
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: value => label.includes('Revenue') ? '$'+value.toLocaleString() : value.toLocaleString()
                    }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

function createPieChart(canvasId, labels, data, label) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels,
            datasets: [{
                label,
                data,
                backgroundColor: [
                    '#0f4ef7', '#009ffd', '#2ac7ff', '#64dcff', '#aadcff'
                ],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right' }
            }
        }
    });
}

function createDoughnutChart(canvasId, labels, data, label) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                label,
                data,
                backgroundColor: ['#0f4ef7', '#a2caf8'],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });
}
