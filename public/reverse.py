import json

with open('./mortgage.json', 'r') as json_file:
    data = json.load(json_file)

data.reverse()

with open('mortgage.json', 'w') as json_file:
    json.dump(data, json_file, indent=2)

print("The entries in mortgage.json have been reversed and saved.")
