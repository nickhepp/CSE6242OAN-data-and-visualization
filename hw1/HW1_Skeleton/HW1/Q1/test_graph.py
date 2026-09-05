import pytest

from Q1 import Graph


@pytest.fixture
def graph():
    return Graph()


IATA_A = 'stl'
NAME_A = 'stl_airport'

IATA_B = 'atl'
NAME_B = 'atl_airport'



#################### add_node

def test__add_node__first_value__single_node_added(graph):

    # ARRANGE

    # ACT
    graph.add_node(IATA_A, NAME_A)

    # ASSERT
    assert len(graph.nodes) == 1
    assert graph.nodes[0][0] == IATA_A
    assert graph.nodes[0][1] == NAME_A


def test__add_node__second_distinct_value__dual_nodes(graph):

    # ARRANGE

    # ACT
    graph.add_node(IATA_B, NAME_B)

    # ASSERT
    assert len(graph.nodes) == 2
    assert graph.nodes[0][0] == IATA_A
    assert graph.nodes[0][1] == NAME_A
    assert graph.nodes[1][0] == IATA_B
    assert graph.nodes[1][1] == NAME_B


def test__add_node__second_duplicate_value__only_one_node(graph):

    # ARRANGE

    # ACT
    graph.add_node(IATA_B, NAME_B)

    # ASSERT
    assert len(graph.nodes) == 1
    assert graph.nodes[0][0] == IATA_A
    assert graph.nodes[0][1] == NAME_A

