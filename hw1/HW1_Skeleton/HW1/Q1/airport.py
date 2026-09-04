
from dataclasses import dataclass

@dataclass
class Airport:
    iata: str
    id: int
    name: str
    city: str
    country: str
    latitude: float
    longitude: float
    iwt_incidents_observed_count: int
