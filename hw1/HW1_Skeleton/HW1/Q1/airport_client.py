import requests

from airport import Airport
from flight import Flight
from iwt_flight import IwtFlight

class AirportClient:

    def __init__(self, host: str = 'localhost', port: int = 3000):
        self.BASE_URL = f"http://{host}:{port}/"


    def get_airports(self, iata = None) -> list[Airport]:
        records = self._inner_get_json_items(lambda data: Airport(**data), "airports", iata)
        return records 


    def get_flights(self, iata = None) -> list[Flight]:
        records = self._inner_get_json_items(lambda data: Flight(**data), "flights", iata)
        return records 


    def get_iwt_flights(self, iata = None) -> list[IwtFlight]:
        records = self._inner_get_json_items(lambda data: IwtFlight(**data), "iwt_flights", iata)
        return records 


    def _inner_get_json_items(self, class_cstor, relative_url: str, iata = None) -> list:
        params = {}
        if (iata):
            params["iata"] = iata

        response = requests.get(self._client_url(relative_url), params=params)

        if response.status_code != 200:
            response.raise_for_status()
            
        json_list = response.json()
        records = [class_cstor(item) for item in json_list]
        return records

    def _client_url(self, relative_path: str) -> str:
        return f"{self.BASE_URL}{relative_path}"





