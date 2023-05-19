
if __name__ != '__main__':
    exit()

from Bio import SeqIO
import tensorflow as tf
import numpy as np
import sys

if len(sys.argv) != 3:
    exit("Usage: python learn.py <+/-> <path to .fas or .pdb file>")

extension = {'fas': 'fasta', 'pdb': 'pdb-seqres'}
labels = {'+': True, '-': False}

label = labels[sys.argv[1]]
file_path = sys.argv[2]
data = SeqIO.parse(file_path, extension[file_path[-3:]])
model = tf.keras.models.load_model(
    sys.argv[0].replace('learn.py', 'model.h5'))


train_data = tf.keras.preprocessing.sequence.pad_sequences([x.seq for x in data])

val_data = np.array([label for _ in data])

history = model.fit(
    train_data,
    np.array([y == labels[label] or tf.random.uniform(()) < 0.04 for y in val_data], dtype=bool),
    epochs=10,
)

# also later