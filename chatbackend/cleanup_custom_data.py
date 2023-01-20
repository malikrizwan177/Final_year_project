# import re

def custom_data_cleaner(chat_export_file):
    with open(chat_export_file, "r",encoding="utf8") as corpus_file:
        content = corpus_file.read()
    return tuple(content.split("\n"))

# print(custom_data_cleaner("datasets/myset.txt"))