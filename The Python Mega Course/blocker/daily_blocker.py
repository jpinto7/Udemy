import time
from datetime import datetime as dt

hosts_temp = r'hosts'
hosts_path = r'/etc/hosts'
redirect = '127.0.0.1'
websites_list = ['www.facebook.com', 'facebook.com', 'www.hugelol.com', 'hugelol.com']

while True:
  if dt(dt.now().year, dt.now().month, dt.now().day, 8) < dt.now() < dt(dt.now().year, dt.now().month, dt.now().day, 17):
    print('Working hours')
    with open(hosts_temp, 'r+') as file:
      content = file.read()
      for website in websites_list:
        if website in content:
          pass
        else:
          file.write(f'{redirect} {website}\n')
  else:
    with open(hosts_temp, 'r+') as file:
      content = file.readlines()
      file.seek(0)
      for line in content:
        if not any(website in line for website in website_list):
          file.write(line)
      file.truncate()
    print('Fun hours')
  time.sleep(5)
