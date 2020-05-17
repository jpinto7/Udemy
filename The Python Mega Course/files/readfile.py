file = open('example.txt', 'r')
file.seek(0)
content = file.readlines()
content = [i.rstrip('\n') for i in content]
print(content)
file.close()
