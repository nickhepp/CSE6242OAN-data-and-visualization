from pathlib import Path
from Q1 import clean_trafficking_paths
from Q1 import write_centrality_file

#################### clean_trafficking_paths


def test__clean_trafficking_paths():

    # ARRANGE
    list_of_lists: list[list[str]] = [
        ['JNB', 'DOH', 'KUL', None, None],
        ['KUL', 'DOH', 'JNB', None, None],
        ['HKG', 'CAN', None, '', None],
        ['CAN', 'HKG' , None, None, None], 
        ['CAN', 'HKG' , None, None, ''], 
    ]

    # ACT
    retvals = clean_trafficking_paths(list_of_lists)

    # ASSERT
    assert len(retvals) == 6
    assert retvals[0] == ('CAN', 'HKG')
    assert retvals[1] == ('DOH', 'JNB')
    assert retvals[2] == ('DOH', 'KUL')
    assert retvals[3] == ('HKG', 'CAN')
    assert retvals[4] == ('JNB', 'DOH')
    assert retvals[5] == ('KUL', 'DOH')


#################### write_centrality_file


def test__write_centrality_file__example_data() -> None:

    # ARRANGE
    test_dict = {
        'BKK': 0.016046,
        'HKG': 0.022774,
        'ABC': 0.022774,
    }
    file_path = 'full_centrality.csv'

    # ACT
    write_centrality_file(test_dict, file_path)

    # ASSERT
    content = Path(file_path).read_text(encoding="utf-8")
    lines = [line for line in content.split("\n", ) if line != '']
    assert len(lines) == 4
    assert 'iata,degree_centrality' == lines[0]
    assert 'ABC,0.022774' == lines[1]
    assert 'HKG,0.022774' == lines [2]
    assert 'BKK,0.016046' == lines[3]

