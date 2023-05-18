import sys
import os

file_path = sys.argv[1]

# Проверка формата файла
file_extension = os.path.splitext(file_path)[1]
if file_extension not in ['.fas', '.fasta']:
    print('Недопустимый формат файла. Пожалуйста, загрузите файл в формате .fas или .fasta.')
    sys.exit(1)

# Обработка загруженного файла, например, чтение его содержимого
# и выполнение необходимых действий
# Результат можно вернуть в виде строки

with open(file_path, 'r') as file:
    file_content = file.read()

# Возвращение содержимого файла в главный процесс
print(file_content)