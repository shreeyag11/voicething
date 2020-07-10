# To add a new cell, type '# %%'
# To add a new markdown cell, type '# %% [markdown]'
# %%
import pandas as pd
import operator
import json
from collections import defaultdict


def do_the_thing(files):
    vocab = defaultdict(lambda: defaultdict(lambda: 0))
    probs = defaultdict(lambda: defaultdict(lambda: 0))

    for file in files:
        data = pd.read_csv(file)
        label = file.replace("scratch/", "")
        label = label.replace(".csv", "")

        data['text'] = data['text'].apply(lambda x: x.lower())

        for text in data['text']:
            for word in text.split():

                vocab[label][word] += 1

    temp = []
    [temp.extend(list(vocab[label].keys())) for label in vocab.keys()]
    all_words = set(temp)

    labels = vocab.keys()

    for word in all_words:
        sums = 0
        for label in labels:
            sums += vocab[label][word]

        for label in labels:
            if sums != 0:
                probs[word][label] = float(vocab[label][word]) / float(sums)

    return probs


# %%


def predict(probs, query):
    labels = probs['13'].keys()

    predictions = defaultdict(lambda: 1)

    for label in labels:
        all_zero = True
        for word in query.split():
            if probs[word][label] != 0:
                predictions[label] *= probs[word][label]
                all_zero = False

        if all_zero:
            predictions[label] = 0

    predictions = dict(predictions)

    max = 0
    result = ""

    for label, prob in predictions.items():
        if prob > max:
            max = prob
            result = label

    return result


# %%

files = [
    "scratch/AddToPlaylist.csv",
    "scratch/BookRestaurant.csv",
    "scratch/GetWeather.csv",
    "scratch/PlayMusic.csv",
    "scratch/RateBook.csv",
    "scratch/SearchCreativeWork.csv",
    "scratch/SearchScreeningEvent.csv"
]

probs = do_the_thing(files)
predict(probs, "rate shreeya sanjay gupta's coding skills 9/11")


# %%
with open("probs.json", 'w') as out_file:
    json.dump(probs, out_file)


# %%
with open("jsgf", 'w') as out_file:
    out_file.write(
        f"#JSGF V1.0; grammar words; public <words> = #JSGF V1.0; grammar words; public <words> = { ' | '.join(list(probs.keys()))}"f"#JSGF V1.0; grammar words; public <words> = #JSGF V1.0; grammar words; public <words> = { ' | '.join(list(probs.keys()))}")


# %%
print()
