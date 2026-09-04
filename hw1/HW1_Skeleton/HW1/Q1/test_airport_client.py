import pytest

from airport_client import AirportClient

from airport import Airport


@pytest.fixture
def client():
    return AirportClient()


def test_constructor():
    client = AirportClient()
    assert isinstance(client, AirportClient)


def test__get_airports__all_requested__all_returned(client):

    # ACT
    airports = client.get_airports()

    # ASSERT
    assert len(airports) > 100


def test__get_airports__all_requested__one_returned(client):

    # ACT
    airports = client.get_airports('STL')

    # ASSERT
    assert len(airports) == 1
