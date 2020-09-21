import psycopg2

def create_table():
  conn = psycopg2.connect("dbname='pythonmega' user='pythonmega' password='pythonmega' host='localhost' port='5432'")
  cur = conn.cursor()
  cur.execute('CREATE TABLE IF NOT EXISTS store (item TEXT, quantity INTEGER, price REAL)')
  conn.commit()
  conn.close()

def insert(item, quantity, price):
  conn = psycopg2.connect("dbname='pythonmega' user='pythonmega' password='pythonmega' host='localhost' port='5432'")
  cur = conn.cursor()
  cur.execute("INSERT INTO store VALUES (%s, %s, %s)", (item, quantity, price))
  conn.commit()
  conn.close()

def view():
  conn = psycopg2.connect("dbname='pythonmega' user='pythonmega' password='pythonmega' host='localhost' port='5432'")
  cur = conn.cursor()
  cur.execute('SELECT * from store')
  rows = cur.fetchall()
  conn.close()
  return rows

def delete(item):
  conn = psycopg2.connect("dbname='pythonmega' user='pythonmega' password='pythonmega' host='localhost' port='5432'")
  cur = conn.cursor()
  cur.execute('DELETE FROM store WHERE item=%s', (item,))
  conn.commit()
  conn.close()

def update(item, quantity, price):
  conn = psycopg2.connect("dbname='pythonmega' user='pythonmega' password='pythonmega' host='localhost' port='5432'")
  cur = conn.cursor()
  cur.execute('UPDATE store SET quantity=%s, price=%s WHERE item=%s', (quantity, price, item))
  conn.commit()
  conn.close()

create_table()
print(view())
delete('Water')
print(view())
update('Granola', 44, 29)
print(view())
