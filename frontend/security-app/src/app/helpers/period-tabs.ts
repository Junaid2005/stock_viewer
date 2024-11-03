export type TabLevel = '1D' | '1W' | '1M' | '3M' | 'YTD' | '1Y' | '5Y' | 'Max';

interface Tab {
    period: string;
    interval: string;
    display: string;
    format: Intl.DateTimeFormatOptions
}

// export const tabGroup: Record<TabLevel, Tab> = {
//     '1D': { period: '1d', interval: '5m', display: 'today', format: {} },
//     '1W': { period: '5d', interval: '1h', display: 'past week' },
//     '1M': { period: '1mo', interval: '1d', display: 'past month' },
//     '3M': { period: '3mo', interval: '1d', display: 'past 3 month' },
//     'YTD': { period: 'ytd', interval: '5d', display: 'year to date' },
//     '1Y': { period: '1y', interval: '5d', display: 'past year' },
//     '5Y': { period: '5y', interval: '1mo', display: 'past 5 years' },
//     'Max': { period: 'max', interval: '1mo', display: 'all time' }
// }

export const tabGroup: Record<TabLevel, Tab> = {
    '1D': { 
        period: '1d', 
        interval: '5m', 
        display: 'today',
        format: { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
        } 
    },
    '1W': { 
        period: '5d', 
        interval: '30m', 
        display: 'past week',
        format: { 
            month: 'short', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false 
        }
    },
    '1M': { 
        period: '1mo', 
        interval: '90m', 
        display: 'past month',
        format: { 
            day: 'numeric', 
            month: 'short', 
        }
    },
    '3M': { 
        period: '3mo', 
        interval: '1d', 
        display: 'past 3 months',
        format: { 
            day: 'numeric', 
            month: 'short', 
        }
    },
    'YTD': { 
        period: 'ytd', 
        interval: '1d', 
        display: 'year to date',
        format: { 
            day: 'numeric', 
            month: 'short', 
        }
    },
    '1Y': { 
        period: '1y', 
        interval: '1d', 
        display: 'past year',
        format: { 
            month: 'short', 
            year: '2-digit' 
        }
    },
    '5Y': { 
        period: '5y', 
        interval: '1wk', 
        display: 'past 5 years',
        format: { 
            year: 'numeric' 
        }
    },
    'Max': { 
        period: 'max', 
        interval: '1wk', 
        display: 'all time',
        format: { 
            year: 'numeric' 
        }
    }
}