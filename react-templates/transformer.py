from transformers import T5ForConditionalGeneration, T5Tokenizer
from score import *
import warnings
warnings.filterwarnings("ignore")
import re

from fastT5 import get_onnx_model,get_onnx_runtime_sessions,OnnxT5
from transformers import AutoTokenizer
from pathlib import Path
import os

dir_path = os.path.dirname(os.path.realpath(__file__))

#trained_model_path = '/content/gdrive/My Drive/t5_paraphraser/t5_squad_v1'
# quantized_model_path = os.path.join(dir_path, 'models/quantized_models')

# pretrained_model_name = "quantized_models"

# encoder_path = os.path.join(quantized_model_path,f"{pretrained_model_name}-encoder-quantized.onnx")
# decoder_path = os.path.join(quantized_model_path,f"{pretrained_model_name}-decoder-quantized.onnx")
# init_decoder_path = os.path.join(quantized_model_path,f"{pretrained_model_name}-init-decoder-quantized.onnx")

# model_paths = encoder_path, decoder_path, init_decoder_path
# model_sessions = get_onnx_runtime_sessions(model_paths)
# quantized_model = OnnxT5(quantized_model_path, model_sessions)

# 'ramsrigouthamg/t5_squad_v1'
# quantized_tokenizer = AutoTokenizer.from_pretrained(os.path.join(dir_path,"models/quantized_tokenizer/tokenizer"))


# Add the absolute path to the downloaded folder as the attribute in below line.
# trained_model_path = '/content/gdrive/My Drive/t5_paraphraser/t5_squad_v1'
question_model = T5ForConditionalGeneration.from_pretrained(os.path.join(dir_path, 'models/T5_Squad_V1_Model'))
question_tokenizer = T5Tokenizer.from_pretrained("t5-base")


def get_question(sentence, answer):
    print("Hello-1")
    text = "context: {} answer: {} </s>".format(sentence, answer)
    max_len = 256
    encoding = question_tokenizer.encode_plus(
        text, max_length=max_len, pad_to_max_length=True, return_tensors="pt"
    )

    input_ids, attention_mask = encoding["input_ids"], encoding["attention_mask"]

    outs = question_model.generate(
        input_ids=input_ids,
        attention_mask=attention_mask,
        early_stopping=True,
        num_beams=5,
        num_return_sequences=1,
        no_repeat_ngram_size=2,
        max_length=200,
    )

    dec = [question_tokenizer.decode(ids) for ids in outs]
    for i in range(len(dec)):
        dec[i] = dec[i].replace("question:", "")
        dec[i] = dec[i].strip()

    return dec

def get_question_quantized(sentence,answer):
    print("Hello-2")
    text = "context: {} answer: {}".format(sentence,answer)
    print (text)
    max_len = 256
    encoding = quantized_tokenizer.encode_plus(text,max_length=max_len, pad_to_max_length=False,truncation=True, return_tensors="pt")

    input_ids, attention_mask = encoding["input_ids"], encoding["attention_mask"]

    outs = quantized_model.generate(input_ids=input_ids,
                                  attention_mask=attention_mask,
                                  early_stopping=True,
                                  num_beams=5,
                                  num_return_sequences=1,
                                  no_repeat_ngram_size=2,
                                  max_length=300)

    dec = [quantized_tokenizer.decode(ids,skip_special_tokens=True) for ids in outs]

    Question = dec[0].replace("question:","")
    Question= Question.strip()
    return Question



def get_T5(sent, answer, quantized = False):
    sentence_for_T5 = " ".join(sent.split())
    if quantized==False:
        ques = get_question(sentence_for_T5, answer)
    else:
        ques = get_question_quantized(sentence_for_T5, answer)
    out = []
    for q in ques:
        q = re.sub("<[^>]*>", " ", q)
        score = get_score(sent + " " + answer, q)
        out.append([q,score])
    return out