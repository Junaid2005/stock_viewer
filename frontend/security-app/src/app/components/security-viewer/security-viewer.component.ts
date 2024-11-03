import { Component, OnInit } from '@angular/core';
import { SecurityService, SecurityInfo } from '../../services/security-details.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER } from '@angular/cdk/keycodes';
import { tabGroup, TabLevel } from '../../helpers/period-tabs';
import { Security } from '../../helpers/security-class'


interface graphData {
	name: string
	series: seriesData[]
}

interface seriesData {
	name: number
	value: number
	dateLabel: Date
}

interface ChosenSecurity extends SecurityInfo {
	stats?: SecurityStats;
}

interface SecurityStats {
	priceDiff: number;
	percentDiff: number;
	priceTimeRange: string;
}

@Component({
	selector: 'app-security-viewer',
	templateUrl: './security-viewer.component.html'
})
export class SecurityComponent implements OnInit {
	homeSecurityInfo: ChosenSecurity | null = null;
	pricingData: graphData[] = []; 

	loadingSecurity: boolean = false;	
	loadingPricing: boolean = false;

	formIdentifier: string = "";
	formIdentifierTwo: string = "";
	tabLabel: TabLevel = "1D";

	confirmedIdentifier: string = "";
	currentTime: Date = new Date();
	selectedTabIndex: number = 0;

	public xAxisTickFormattingFn = this.xAxisTickFormatting.bind(this);

	readonly separatorKeysCodes = [ENTER] as const;

	mainSecurities: Security[] = []

	constructor(
		private securityService: SecurityService, 
		private snackBar: MatSnackBar,
	) {}

	openSnackBar(message: string, action: string) {
		this.snackBar.open(message, action, {
		  duration: 3000, 
		});
	}

	removeSecurity(name: string) {
		const tickerName = name.toUpperCase()
		this.mainSecurities = this.mainSecurities.filter(security => security.ticker !== tickerName);
		this.pricingData = this.pricingData.filter(security => security.name !== tickerName);
		if (this.mainSecurities.length === 0) {
			this.homeSecurityInfo = null;
		} else if (this.mainSecurities.length === 1) {
			this.fetchSecurity(this.mainSecurities[0].ticker)
		}
	}

	async addSecurity(event: MatChipInputEvent) {
		const value = (event.value).trim().toUpperCase();
		if (this.mainSecurities.some(item => item.ticker === value)) {
			this.openSnackBar(`Already viewing ${value}`, 'Close');
		} else if (value) {
			const tempSecurity = new Security(value)
			const response = await this.getPricing([tempSecurity]);
			if (response[0].pricingData) {
				this.pricingData = [...(this.pricingData || []), response[0].pricingData];
				this.mainSecurities.push(response[0])
			}
		}
		event.chipInput!.clear();
	}

	async onTabChanged(event: MatTabChangeEvent) {
		this.tabLabel = event.tab.textLabel as TabLevel;
		const response = await this.getPricing(this.mainSecurities);
			if (response && response.length > 0) {
				this.mainSecurities = response;
				const newPricingData = response
					.map(security => security.pricingData)
					.filter((data): data is graphData => data !== undefined);
				this.pricingData = newPricingData; 
				if (this.homeSecurityInfo) {
					this.homeSecurityInfo.stats = {priceDiff: response[0].priceChange, percentDiff: response[0].percentageChange, priceTimeRange: tabGroup[this.tabLabel as TabLevel].display}
				}
			}
	}

	async getPricing(queryList: Security[]) {
		const failedSecurities: string[] = [];
		const passedSecurities: Security[] = []

		for (const security of queryList) {
			const selectedTab = tabGroup[this.tabLabel as TabLevel];
			const response = await this.callPricing(security.ticker, selectedTab.period, selectedTab.interval);

			if (response.code !== 200) {
				failedSecurities.push(security.ticker);
			} else {
				const mappedData = response.body.pricingList.map((item, index) => ({
					name: index,
					value: item.Open,
					dateLabel: new Date(item.Datetime)
				}));

				security.pricingData = {
					"name": security.ticker,
					"series": mappedData
				}

				const diff = mappedData[mappedData.length - 1].value - mappedData[0].value;
				security.priceChange = diff;
				security.percentageChange = diff / mappedData[0].value * 100
				passedSecurities.push(security)
			}
		};
		// TEST THIS
		if (failedSecurities.length) {
			this.openSnackBar(`Failed to price ${failedSecurities}`, 'Close');
		}
		return passedSecurities
	}

	async fetchSecurity(identifier: string) {
		this.loadingSecurity = true;
		const infoResponse = await firstValueFrom(this.securityService.getSecurity(identifier));
		this.loadingSecurity = false;
		console.log(infoResponse)

		if (infoResponse.code === 200) {
			this.homeSecurityInfo = {...infoResponse.body};
			this.confirmedIdentifier = infoResponse.body.symbol;
			this.currentTime = new Date();
			this.selectedTabIndex = 0;

			const tempSecurity = new Security(identifier)
			const pricingResponse = await this.getPricing([tempSecurity]);
			if (pricingResponse[0].pricingData) {
				this.pricingData = [pricingResponse[0].pricingData];
				this.mainSecurities = [pricingResponse[0]]
				this.homeSecurityInfo.stats = {priceDiff: pricingResponse[0].priceChange, percentDiff: pricingResponse[0].percentageChange, priceTimeRange: tabGroup[this.tabLabel as TabLevel].display}
			}
			this.formIdentifier = ""
		}
		else {
			this.homeSecurityInfo = null
			this.openSnackBar('Failed to find security', 'Close');
		}	
	}

	async callPricing(identifier: string, period: string, interval: string) {
		this.loadingPricing = true;
		const response = await firstValueFrom(this.securityService.getPrices(identifier, period, interval));
		console.log(response)
		this.loadingPricing = false; 
		return response
	}

	xAxisTickFormatting(value: number): string {
		const series = this.pricingData[0].series; 
		const point = series[value];
	
		const dateFormatter = new Intl.DateTimeFormat('en-US', tabGroup[this.tabLabel].format);		
		const dateString = dateFormatter.format(point.dateLabel);		
		return point ? dateString : '';
	}

	ngOnInit(): void {
		console.log('Loaded app')
	}
}