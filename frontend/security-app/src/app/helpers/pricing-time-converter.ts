export function timeFrameConverter(period: string): string {
    const map: { [key: string]: string } = {
        "1d": "today",
        "5d": "past 5 days",
        "1mo": "past month",
        "3mo": "past 3 months",
        "ytd": "year to date",
        "1y": "past year",
        "5y": "past 5 years",
        "max": "all time"
    }
    return map[period];
}
