import { SecurityInfo } from "../services/security-details.service"
interface seriesData {
	name: number
	value: number
  dateLabel: Date
}

interface graphData {
	name: string
	series: seriesData[]
}

export class Security {
    public ticker: string;
    public securityInfo: SecurityInfo | null = null;
    public pricingData: graphData | undefined; 
    public percentageChange: number = 0;
    public priceChange: number = 0;
  
    constructor(ticker: string) {
      this.ticker = ticker.toUpperCase();
    }
}
  