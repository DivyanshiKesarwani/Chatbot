import random


def random_string():
    random_list = [
        "Please try writing something more descriptive.",
        "Oh! It appears you wrote something I don't understand yet",
        "Do you mind trying to rephrase that?",
        "I'm terribly sorry, I didn't quite catch that.",
        "I can't answer that yet, please try asking something else."
         "Can you provide more details?",
        "I'm having trouble understanding that. Could you say it differently?",
        "That question is a bit tricky for me. How about something else?",
        "I'm not quite sure what you mean. Could you elaborate?",
        "I didn't get that. Could you ask in another way?",
    ]

    #return random.choice(random_list)
    list_count = len(random_list)  # Step 1: Get the number of items in the list
    random_item = random.randrange(list_count)  # Step 2: Generate a random index
    return random_list[random_item]  # Step 3: Return the item at the random index

