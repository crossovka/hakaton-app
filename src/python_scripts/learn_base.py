from Bio import SeqIO
import tensorflow as tf
import numpy as np

data = []

positive_label = b'+'
negative_label = b'-'

# Скрипт считывает два набора ДНК-последовательностей в формате FASTA, 
# один для положительных примеров и один для отрицательных примеров. 
# Он преобразует последовательности во входные тензоры 
# и добавляет их в список data, вместе с соответствующей меткой.

pos_seq = SeqIO.parse(open('./set_plus.fas'), 'fasta')
pos_count = 0
for elem in pos_seq:
		input_array = [ord(c) for c in elem.seq]
		data.append((input_array, positive_label))
		pos_count += 1
print(f"positive: {pos_count}")

neg_seq = SeqIO.parse(open('./set_minus.fas'), 'fasta')
neg_count = 0
for elem in neg_seq:
		# Convert the text to a numerical input tensor
		input_array = [ord(c) for c in elem.seq]
		# Append the input tensor and label to the data list
		data.append((input_array, negative_label))
		neg_count += 1
		# =======
print(f"negative: {neg_count}")

model = tf.keras.Sequential([
    tf.keras.layers.Embedding(128, 8, input_length=None),
    tf.keras.layers.GlobalAveragePooling1D(),
    tf.keras.layers.Dense(16, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])


model.compile(loss='binary_crossentropy', optimizer='adam', metrics=['accuracy'])

# Define the training and validation datasets
train_data = tf.keras.preprocessing.sequence.pad_sequences([x for (x, _) in data])

val_data = np.array([y for (_, y) in data])

history = model.fit(
    train_data,
    np.array([y == positive_label or tf.random.uniform(()) < 0.04 for y in val_data], dtype=bool),
    epochs=3,
)

# test_data = [(x, y) for (x, y) in data if y == negative_label]
test_loss, test_accuracy = model.evaluate(
    train_data,
    np.array([y == positive_label for y in val_data], dtype=bool)
)
print("Test loss:", test_loss)
print("Test accuracy:", test_accuracy)

tf.keras.models.save_model(model, 'model.h5')

