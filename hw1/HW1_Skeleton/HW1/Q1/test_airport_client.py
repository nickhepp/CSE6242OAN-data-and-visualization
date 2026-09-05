import pytest

from airport_client import AirportClient


@pytest.fixture
def client():
    return AirportClient()


def test_constructor():
    client = AirportClient()
    assert isinstance(client, AirportClient)


#################### airports

def test__get_airports__all_requested__all_returned(client):

    # ACT
    airports = client.get_airports()

    # ASSERT
    assert len(airports) > 100


def test__get_airports__one_requested__one_returned(client):

    # ACT
    airports = client.get_airports('STL')

    # ASSERT
    assert len(airports) == 1


#################### flights

def test__get_flights__all_requested__all_returned(client):

    # ACT
    flights = client.get_flights()

    # ASSERT
    assert len(flights) > 100


def test__get_flights__one_requested__one_returned(client):

    STL_AIRPORT = 'STL'

    # ACT
    flights = client.get_flights(STL_AIRPORT)

    # ASSERT
    assert len(flights) < 100
    assert all((STL_AIRPORT in [flight.airport_a, flight.airport_b]) for flight in flights)


#################### iwt_flights

def test__get_iwt_flights__all_requested__all_returned(client):

    # ACT
    iwt_flights = client.get_iwt_flights()

    # ASSERT
    assert len(iwt_flights) > 100


def test__get_flights__one_requested__one_returned(client):

    STL_AIRPORT = 'STL'

    # ACT
    iwt_flights = client.get_iwt_flights(STL_AIRPORT)

    # ASSERT
    assert len(iwt_flights) < 100
    assert all((STL_AIRPORT in [iwt_flight.airport_a, iwt_flight.airport_b, iwt_flight.airport_c, iwt_flight.airport_d, iwt_flight.airport_e]) for iwt_flight in iwt_flights)