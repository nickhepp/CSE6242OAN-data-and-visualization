import requests

from airport import Airport

class AirportClient:

    def __init__(self, host: str = 'localhost', port: int = 3000):
        self.BASE_URL = f"http://{host}:{port}/"


    def get_airports(self, iata = None) -> list[Airport]:

        params = {}
        if (iata):
            params["iata"] = iata

        response = requests.get(self._client_url("airports"), params=params)

        if response.status_code != 200:
            response.raise_for_status()
            
        json_list = response.json()
        records = [Airport(**item) for item in json_list]
        return records 
    

    def _client_url(self, relative_path: str) -> str:
        return f"{self.BASE_URL}{relative_path}"





