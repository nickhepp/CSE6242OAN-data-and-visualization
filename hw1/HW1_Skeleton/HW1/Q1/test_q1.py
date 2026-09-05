from Q1 import clean_trafficking_paths




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

# Test Failed: Lists differ: [('A', 'B'), ('A', 'C'), ('B', 'C'), ('B', '[23 chars]'A')] != [('', ''), ('A', ''), ('A', 'B'), ('A', 'C')[55 chars]'A')]

# First differing element 0:
# ('A', 'B')
# ('', '')

# Second list contains 3 additional elements.
# First extra element 6:
# ('C', '')

# - [('A', 'B'), ('A', 'C'), ('B', 'C'), ('B', 'D'), ('C', 'A'), ('D', 'A')]
# + [('', ''),
# +  ('A', ''),
# +  ('A', 'B'),
# +  ('A', 'C'),
# +  ('B', 'C'),
# +  ('B', 'D'),
# +  ('C', ''),
# +  ('C', 'A'),
# +  ('D', 'A')] :  Paths not sorted properly.