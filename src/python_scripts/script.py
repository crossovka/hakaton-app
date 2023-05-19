import sys
import json

# Create a Python dictionary
data = {
    "name": "John Doe",
    "age": 30,
    "city": "New York"
}
# Convert the dictionary to JSON
json_data = json.dumps(data)

# Print the JSON data
# print(json_data)


def main():
    # print("Hello World")
    if len(sys.argv) > 1:
        return str(sys.argv[1])
    else:
        return "No argument provided"


if __name__ == "__main__":
    arr = []
    arr.append(json_data)
    arr.append(json_data)
    arr.append(json_data)
    # print(main())
    print(arr)
