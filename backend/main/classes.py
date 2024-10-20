from dataclasses import dataclass, field
from typing import List, TypedDict
import pandas as pd


@dataclass
class Response:
    code: str
    message: str
    body: str


@dataclass
class SecurityInfo:
    currentPrice: int
    currency: str
    marketCap: int
    quoteType: str
    sectorDisp: str
    symbol: str
    shortName: str

    def __post_init__(self):
        self.marketCap = format(self.marketCap, ",")
        self.quoteType = self.quoteType.title()


class SecurityPrice(TypedDict):
    Datetime: pd.Timestamp
    Open: float


@dataclass
class SecurityPricing:
    pricingList: List[SecurityPrice]
