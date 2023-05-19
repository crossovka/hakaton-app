from Bio import SeqIO
import tensorflow as tf
import sys
import numpy as np
import json

extension = {'fas': 'fasta', 'pdb': 'pdb-seqres'}


def main():
    if len(sys.argv) < 2:
        exit()
    file_path = sys.argv[1]
    new_data = SeqIO.parse(file_path, extension[file_path[-3:]])

    model = tf.keras.models.load_model(
        sys.argv[0].replace('test.py', 'model.h5'))

    useful_data = []
    names = []

    for record in new_data:
        useful_data.append(str(record.seq))
        names.append(str(record.name))

    padded_data = tf.keras.preprocessing.sequence.pad_sequences(
        [[ord(y) for y in x] for x in useful_data])
    # return model.predict(np.array([ord(x) for x in str(record.seq)]))
    predicted_data = model.predict(padded_data)

    print('<>')

    for i, data in enumerate(predicted_data):
        print(json.dumps({
            'name': names[i],
            'prediction': str(data[0]),
            'data': str(useful_data[i])
        }))


if __name__ == '__main__':
    main()
