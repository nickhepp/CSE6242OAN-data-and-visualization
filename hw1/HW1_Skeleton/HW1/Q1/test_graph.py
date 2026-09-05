import pytest

from Q1 import Graph


@pytest.fixture
def graph():
    return Graph()


IATA_A = 'aaa'
NAME_A = 'aaa_airport'

IATA_B = 'bbb'
NAME_B = 'bbb_airport'

IATA_C = 'ccc'
NAME_C = 'ccc_airport'

IATA_D = 'ddd'
NAME_D = 'ddd_airport'

IATA_EDGE0 = 'ED0'

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
    graph.add_node(IATA_A, NAME_A)

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
    graph.add_node(IATA_A, NAME_A)

    # ACT
    graph.add_node(IATA_A, NAME_A)

    # ASSERT
    assert len(graph.nodes) == 1
    assert graph.nodes[0][0] == IATA_A
    assert graph.nodes[0][1] == NAME_A


#################### add_edge


def test__add_edge__first_value__single_edge_added(graph):

    # ARRANGE

    # ACT
    graph.add_edge(IATA_A, IATA_B)

    # ASSERT
    assert len(graph.edges) == 1
    assert IATA_A in graph.edges[0]
    assert IATA_B in graph.edges[0]


def test__add_edge__second_value__two_edge_added(graph):

    # ARRANGE
    graph.add_edge(IATA_A, IATA_B)

    # ACT
    graph.add_edge(IATA_B, IATA_C)

    # ASSERT
    assert len(graph.edges) == 2
    assert IATA_A in graph.edges[0]
    assert IATA_B in graph.edges[0]
    assert IATA_B in graph.edges[1]
    assert IATA_C in graph.edges[1]


def test__add_edge__second_duplicate_value__only_one_edge(graph):

    # ARRANGE
    graph.add_edge(IATA_A, IATA_B)

    # ACT
    graph.add_edge(IATA_B, IATA_A)

    # ASSERT
    assert len(graph.edges) == 1
    assert IATA_A in graph.edges[0]
    assert IATA_B in graph.edges[0]

# Test Failed: Element counts were not equal:
# First has 1, Second has 0:  ('HND', 'DXB')
# First has 1, Second has 0:  ('PVG', 'ATL')
# First has 1, Second has 0:  ('DFW', 'ATL')
# First has 1, Second has 0:  ('PVG', 'DXB')
# First has 0, Second has 1:  ('DXB', 'HND')
# First has 0, Second has 1:  ('ATL', 'PVG')
# First has 0, Second has 1:  ('ATL', 'DFW')
# First has 0, Second has 1:  ('DXB', 'PVG') :  Edges not added correctly.





#################### degree_centrality


def test__degree_centrality__first_value__single_edge_added(graph):

    # ARRANGE
    graph.add_node(IATA_A, NAME_A)
    graph.add_node(IATA_B, NAME_B)
    graph.add_node(IATA_C, NAME_C)
    graph.add_node(IATA_D, NAME_D)
    # IATA_EDGE0 intentionally not included

                                       # used=IATA_A  IATA_B  IATA_C  IATA_D  IATA_EDGE0
    graph.add_edge(IATA_A, IATA_D)     #           1       0       0       1           0
    graph.add_edge(IATA_A, IATA_C)     #           2       0       1       1           0
    graph.add_edge(IATA_D, IATA_EDGE0) #           2       0       1       2           1

    n_sub1 = 4 - 1
    ROUND_DIGITS = 6
    expected_degree_centrality = {
        IATA_A: round(2/n_sub1, ROUND_DIGITS),
        IATA_B: round(0, ROUND_DIGITS),
        IATA_C: round(1/n_sub1, ROUND_DIGITS),
        IATA_D: round(2/n_sub1, ROUND_DIGITS),
        IATA_EDGE0: round(1/n_sub1, ROUND_DIGITS),
    }

    # ACT
    degree_centrality: dict[str, float] = graph.degree_centrality()

    # ASSERT
    assert degree_centrality == expected_degree_centrality