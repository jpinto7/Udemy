import json
from difflib import get_close_matches

data = json.load(open('data.json'))

def print_definition(w):
  if type(w) == list:
    for item in w:
      print(item)
  else:
    print(w)  

def get_definition(w):
  w = w.lower()
  if w in data:
    print_definition(data[w])
  else:
    matches = get_close_matches(w, data.keys())
    if len(matches) > 0:
      first_match = matches[0]
      yn = input("Did you mean %s instead? Enter Y if yes, or N if no: " % first_match).upper()
      if yn == 'Y':
        print_definition(data[first_match])
      elif yn == 'N':
        print("The word doesn't exist. Please double check it.")
      else:
        print("We didn't understand your entry.")
    else:
      print("The word doesn't exist. Please double check it.")

def get_definition_from_dictionary():
  yn = 'Y'
  while yn.upper() == 'Y':
    word = input('Enter word: ')
    if word != '':
      get_definition(word)
      yn = input('Would you like to search for a new word? Enter Y if yes, or N if no: ')

get_definition_from_dictionary()
