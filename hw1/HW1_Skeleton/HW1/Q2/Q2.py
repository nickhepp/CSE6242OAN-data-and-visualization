########################### DO NOT MODIFY THIS SECTION ##########################
#################################################################################
import sqlite3
from sqlite3 import Error, Connection
import csv
from typing import Any
#################################################################################

## Change to False to disable Sample
SHOW = False

############### SAMPLE CLASS AND SQL QUERY ###########################
######################################################################
class Sample():
    def sample(self):
        try:
            connection = sqlite3.connect("sample")
            connection.text_factory = str
        except Error as e:
            print("Error occurred: " + str(e))
        print('\033[32m' + "Sample: " + '\033[m')
        
        # Sample Drop table
        connection.execute("DROP TABLE IF EXISTS sample;")
        # Sample Create
        connection.execute("CREATE TABLE sample(id integer, name text);")
        # Sample Insert
        connection.execute("INSERT INTO sample VALUES (?,?)",("1","test_name"))
        connection.commit()
        # Sample Select
        cursor = connection.execute("SELECT * FROM sample;")
        print(cursor.fetchall())

######################################################################

############### DO NOT MODIFY THIS SECTION ###########################
######################################################################
def create_connection(path: str) -> Connection:
    connection = None
    try:
        connection = sqlite3.connect(path)
        connection.text_factory = str
    except Error as e:
        print("Error occurred: " + str(e))

    return connection


def execute_query(connection: Connection, query: str) -> str:
    cursor = connection.cursor()
    try:
        if query == "":
            return "Query Blank"
        else:
            cursor.execute(query)
            connection.commit()
            return "Query executed successfully"
    except Error as e:
        return "Error occurred: " + str(e)


def execute_query_and_get_result(connection: Connection, query: str) -> Any:
    cursor = connection.execute(query)
    return cursor.fetchall()
######################################################################
######################################################################


def GTusername() -> str:
    gt_username = ""
    return gt_username


def part_1_a_i() -> str:
    ############### EDIT SQL STATEMENT ###################################
    query = """
            CREATE TABLE IF NOT EXISTS incidents (
                report_id TEXT,
                category  TEXT,
                date  TEXT
            );
            """
    ######################################################################
    return query


def part_1_a_ii() -> str:
    ############### EDIT SQL STATEMENT ###################################
    query = """
            CREATE TABLE IF NOT EXISTS details (
                report_id TEXT,
                subject TEXT,
                transport_mode TEXT,
                detection TEXT
            );
            """
    ######################################################################
    return query


def part_1_a_iii() -> str:
    ############### EDIT SQL STATEMENT ###################################
    query = """
        CREATE TABLE IF NOT EXISTS outcomes(
            report_id TEXT,
            outcome TEXT,
            num_ppl_fined INTEGER,
            fine REAL,
            num_ppl_arrested INTEGER,
            prison_time REAL,
            prison_time_unit TEXT
        );            
        """
    ######################################################################
    return query


def validate_headers_match(file_headers: list[str], expected_headers: list[str]) -> None:
    if (file_headers != expected_headers):
        raise ValueError(f"File headers ({file_headers}) do not match expected headers ({expected_headers}).")

def insert_data_file(connection: Connection, path: str, insert_statement: str, expected_headers: list[str]):
    with open(path, mode='r', encoding='utf-8', newline='') as file:
        csv_reader = csv.reader(file)
        first_row: bool = True
        cursor = connection.cursor()
        for row in csv_reader:
            if (first_row):
                validate_headers_match(row, expected_headers)
                first_row = False
            else:
                cursor.execute(insert_statement, row)
        connection.commit()


def part_1_b_i(connection: Connection, path: str) -> None:
    ############### CREATE IMPORT CODE BELOW ############################
    PART_1_B_I_STATEMENT = """
        INSERT INTO incidents (report_id, category, date)
        VALUES (?, ?, ?);
        """
    insert_data_file(connection, path, PART_1_B_I_STATEMENT, ['report_id', 'category', 'date'])
    ######################################################################


def part_1_b_ii(connection: Connection, path: str) -> None:
    ############### CREATE IMPORT CODE BELOW ############################
    PART_1_B_II_STATEMENT = """
        INSERT INTO details (report_id, subject, transport_mode, detection)
        VALUES (?, ?, ?, ?);
        """
    insert_data_file(connection, path, PART_1_B_II_STATEMENT, ['report_id', 'subject', 'transport_mode', 'detection'])
    ######################################################################


def part_1_b_iii(connection: Connection, path: str) -> None:
    ############### CREATE IMPORT CODE BELOW ############################
    PART_1_B_III_STATEMENT = """
        INSERT INTO outcomes (report_id, outcome, num_ppl_fined, fine, num_ppl_arrested, prison_time, prison_time_unit)
        VALUES (?, ?, ?, ?, ?, ?, ?);
        """
    insert_data_file(connection, path, PART_1_B_III_STATEMENT, ['report_id', 'outcome', 'num_ppl_fined', 'fine', 'num_ppl_arrested', 'prison_time', 'prison_time_unit'])
    ######################################################################


def part_2_a() -> str:
    ############### EDIT SQL STATEMENT ###################################
    # a. incident_index for the report_id column in the incidents table
    query = "CREATE INDEX incident_index ON incidents (report_id);"
    ######################################################################
    return query


def part_2_b() -> str:
    ############### EDIT SQL STATEMENT ###################################
    # b. detail_index for the report_id column in the details table
    query = "CREATE INDEX detail_index ON details (report_id);"
    ######################################################################
    return query


def part_2_c() -> str:
    ############### EDIT SQL STATEMENT ###################################
    # c. outcome_index for the report_id column in the outcomes table
    query = "CREATE INDEX outcome_index ON outcomes (report_id);"
    ######################################################################
    return query


def part_3() -> str:
    ############### EDIT SQL STATEMENT ###################################
    query = """
        WITH the_window AS (
            SELECT COUNT(*) AS window_count 
            FROM incidents i
            WHERE '2018-01-01' <= i.date AND 
                i.date <= '2020-12-31'
        )
        SELECT ROUND(100.0 * CAST(the_window.window_count AS REAL) / COUNT(*), 2)  AS Percentage
        FROM incidents, the_window;
        """
    ######################################################################
    return query


def part_4() -> str:
    ############### EDIT SQL STATEMENT ###################################
    query = """
        SELECT transport_mode, COUNT(*) AS count
        FROM details 
        WHERE detection = 'Intelligence'
        AND details.transport_mode != ''
        AND details.transport_mode IS NOT NULL 
        GROUP BY transport_mode
        ORDER BY count DESC
        LIMIT 3
        """
    ######################################################################
    return query


def part_5() -> str:
    ############### EDIT SQL STATEMENT ###################################
    query = """
        WITH detections_filter AS (
            SELECT 
                deets.detection 
                --,COUNT(deets.detection) as detection_count
            FROM incidents inc
            INNER JOIN details deets
                ON 
                    deets.report_id = inc.report_id
                    AND deets.detection != ''
                    AND deets.detection IS NOT NULL
            INNER JOIN outcomes outs 
                ON
                    outs.report_id = deets.report_id 
                    AND outs.num_ppl_arrested >= 1 -- Only include detection methods with at least 100 incidents (with one or more arrests)
            GROUP BY deets.detection
            HAVING COUNT(deets.detection) > 100 -- Only # include detection methods with at least 100 incidents 
        )

        SELECT 
            deets.detection 
            ,COUNT(*) AS "count"
            ,ROUND(AVG(outs.num_ppl_arrested),2) AS avg_ppl_arrested

        FROM incidents inc

        INNER JOIN outcomes outs
            ON 
                outs.report_id = inc.report_id
                AND outs.num_ppl_arrested >= 1 -- Only include incidents with one or more arrests in the average calculation

        INNER JOIN details deets
            ON 
                deets.report_id = inc.report_id
                
        INNER JOIN detections_filter
            ON 
                deets.detection = detections_filter.detection
            
        GROUP BY deets.detection

        ORDER BY avg_ppl_arrested DESC

        LIMIT 3 -- Identify the three detection methods with the highest number of average arrests across incidents.		
    """


# Identify detection methods with high arrest rates.   Sort by highest average
# to lowest.
# • Output format and example row values (detection, count, avg_ppl_arrested):


    ######################################################################
    return query


def part_6() -> str:
    ############### EDIT SQL STATEMENT ###################################
    query = """
        WITH categories_filter AS (
            SELECT 
                incs.category
                ,COUNT(incs.category) as category_count
            FROM incidents incs
            GROUP BY incs.category
            HAVING COUNT(incs.category) > 50 -- Only include incident categories with more than 50 incidents.
        )
        ,
        prison_time_by_report AS (
            SELECT 
                report_id
                -- Use the prison_time_unit column to convert prison_time into days if necessary (assume
                -- 365 days in a year, 30 in a month, 7 in a week). If prison_time_unit is N/A, then set prison_time to 0 days. 
                ,CASE 
                    WHEN prison_time_unit = 'N/A' 		THEN 0
                    WHEN prison_time_unit = 'Days' 		THEN prison_time
                    WHEN prison_time_unit = 'Weeks' 	THEN prison_time * 7 
                    WHEN prison_time_unit = 'Months' 	THEN prison_time * 30
                    WHEN prison_time_unit = 'Years' 	THEN prison_time * 365 
                END prison_time
                --,prison_time
                --,prison_time_unit
            FROM outcomes
        )

        -- Output format and example row values (category, count, avg_prison_time_days)
        SELECT 
            incs.category
            ,COUNT(*) AS "count"
            ,ROUND(AVG(prison_time_by_report.prison_time), 2) AS avg_prison_time_days

        FROM incidents incs
        INNER JOIN categories_filter
            ON categories_filter.category = incs.category 
        INNER JOIN prison_time_by_report
            ON prison_time_by_report.report_id = incs.report_id 
        GROUP BY incs.category
        ORDER BY avg_prison_time_days DESC
        """
    ######################################################################
    return query


def part_7_a() -> str:
    ############### EDIT SQL STATEMENT ###################################
    query = """
        CREATE VIEW IF NOT EXISTS fines AS
        SELECT
            incs.report_id
            ,incs.date
            ,outs.num_ppl_fined
            ,CAST(outs.fine AS REAL) AS fine
            --,CAST(ROUND(outs.fine, 2) AS REAL) AS fine
        FROM incidents incs
        INNER JOIN outcomes outs
        ON outs.report_id = incs.report_id AND outs.num_ppl_fined > 0
        """
    ######################################################################
    return query


def part_7_b() -> str:
    ############### EDIT SQL STATEMENT ###################################
    query = """
		SELECT 
            SUBSTR("date", 1, 4) AS year
            ,SUM(num_ppl_fined) AS total_ppl_fined
            ,ROUND(SUM(fine), 2) AS total_fine_amount
        FROM fines
        GROUP BY year
        ORDER BY total_fine_amount DESC
        LIMIT 3
        """
    ######################################################################
    return query


def part_8_a() -> str:
    ############### EDIT SQL STATEMENT ###################################
    query = "CREATE VIRTUAL TABLE incident_overviews USING fts5(report_id, subject);"
    ######################################################################
    return query


def part_8_b() -> str:
    ############### EDIT SQL STATEMENT ############################
    query = """
            INSERT INTO incident_overviews (report_id, subject)
            SELECT report_id, subject
            FROM details
            """
    ######################################################################
    return query

    
def part_8_c():
    ############### EDIT SQL STATEMENT ###################################
    query = """
        SELECT COUNT(*) AS "count"
        FROM incident_overviews
        WHERE incident_overviews MATCH 'subject:NEAR("dead" "pangolin", 2)';
        """
    ######################################################################
    return query


if __name__ == "__main__":
    
    ########################### DO NOT MODIFY THIS SECTION ##########################
    #################################################################################
    if SHOW:
        sample = Sample()
        sample.sample()

    print('\033[32m' + "Q2 Output: " + '\033[m')
    try:
        conn = create_connection("Q2")
    except Exception as e:
        print("Database Creation Error:", e)

    try:
        conn.execute("DROP TABLE IF EXISTS incidents;")
        conn.execute("DROP TABLE IF EXISTS details;")
        conn.execute("DROP TABLE IF EXISTS outcomes;")
        conn.execute("DROP VIEW IF EXISTS fines;")
        conn.execute("DROP TABLE IF EXISTS incident_overviews;")
    except Exception as e:
        print("Error in Table Drops:", e)

    try:
        print('\033[32m' + "part 1.a.i: " + '\033[m' + execute_query(conn, part_1_a_i()))
        print('\033[32m' + "part 1.a.ii: " + '\033[m' + execute_query(conn, part_1_a_ii()))
        print('\033[32m' + "part 1.a.iii: " + '\033[m' + execute_query(conn, part_1_a_iii()))
    except Exception as e:
         print("Error in part 1.a:", e)

    try:
        part_1_b_i(conn,"data/incidents.csv")
        print('\033[32m' + "Row count for Incidents Table: " + '\033[m' + str(execute_query_and_get_result(conn, "select count(*) from incidents")[0][0]))
        part_1_b_ii(conn, "data/details.csv")
        print('\033[32m' + "Row count for Details Table: " + '\033[m' + str(execute_query_and_get_result(conn,"select count(*) from details")[0][0]))
        part_1_b_iii(conn, "data/outcomes.csv")
        print('\033[32m' + "Row count for Outcomes Table: " + '\033[m' + str(execute_query_and_get_result(conn,"select count(*) from outcomes")[0][0]))
    except Exception as e:
        print("Error in part 1.b:", e)

    try:
        print('\033[32m' + "part 2.a: " + '\033[m' + execute_query(conn, part_2_a()))
        print('\033[32m' + "part 2.b: " + '\033[m' + execute_query(conn, part_2_b()))
        print('\033[32m' + "part 2.c: " + '\033[m' + execute_query(conn, part_2_c()))
    except Exception as e:
        print("Error in part 2:", e)

    try:
        print('\033[32m' + "part 3: " + '\033[m' + str(execute_query_and_get_result(conn, part_3())[0][0]))
    except Exception as e:
        print("Error in part 3:", e)

    try:
        print('\033[32m' + "part 4: " + '\033[m')
        for line in execute_query_and_get_result(conn, part_4()):
            print(line[0],line[1])
    except Exception as e:
        print("Error in part 4:", e)

    try:
        print('\033[32m' + "part 5: " + '\033[m')
        for line in execute_query_and_get_result(conn, part_5()):
            print(line[0],line[1],line[2])
    except Exception as e:
        print("Error in part 5:", e)

    try:
        print('\033[32m' + "part 6: " + '\033[m')
        for line in execute_query_and_get_result(conn, part_6()):
            print(line[0],line[1],line[2])
    except Exception as e:
        print("Error in part 6:", e)
    
    try:
        execute_query(conn, part_7_a())
        print('\033[32m' + "part 7.a: " + '\033[m' + str(execute_query_and_get_result(conn,"select count(*) from fines")[0][0]))
        print('\033[32m' + "part 7.b: " + '\033[m')
        for line in execute_query_and_get_result(conn, part_7_b()):
            print(line[0],line[1], line[2])
    except Exception as e:
        print("Error in part 7:", e)

    try:   
        print('\033[32m' + "part 8.a: " + '\033[m'+ execute_query(conn, part_8_a()))
        execute_query(conn, part_8_b())
        print('\033[32m' + "part 8.b: " + '\033[m' + str(execute_query_and_get_result(conn, "select count(*) from incident_overviews")[0][0]))
        print('\033[32m' + "part 8.c: " + '\033[m' + str(execute_query_and_get_result(conn, part_8_c())[0][0]))
    except Exception as e:
        print("Error in part 8:", e)

    conn.close()
    #################################################################################
    #################################################################################
  