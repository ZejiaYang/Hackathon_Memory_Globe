from neo4j import GraphDatabase

class Neo4jConnection:
    def __init__(self, uri, user, password):
        self.driver = GraphDatabase.driver(uri, auth=(user, password))

    def close(self):
        self.driver.close()

    def insert_memory(self, text, timestamp, keywords, emotion_score):
        with self.driver.session() as session:
            session.run(
                "CREATE (m:Memory {text: $text, timestamp: $timestamp, keywords: $keywords, emotion_score: $emotion_score})",
                text=text, timestamp=timestamp, keywords=keywords, emotion_score=emotion_score
            )

    def create_relationship(self, memory_id, neighbor_id, weight):
        with self.driver.session() as session:
            session.run(
                """
                MATCH (m:Memory), (n:Memory)
                WHERE id(m) = $memory_id AND id(n) = $neighbor_id
                CREATE (m)-[r:RELATED {weight: $weight}]->(n)
                """,
                memory_id=memory_id, neighbor_id=neighbor_id, weight=weight
            )

    def get_graph_data(self):
        with self.driver.session() as session:
            return session.run("MATCH (m:Memory) RETURN m").data()
