# 1.0 a topic test

used to test how topics are tokenized. With description of parsing principles.

---

## 1.1 PARSING PRINCIPLES

flat_no_nesting, end_line is semicolon, triple_dash and triple_tilde are examples.

---

### 1.2 flat no nesting

markdown is nested, but we do not need (or want) nesting.
because it is unnecessary. Instead we use hash to indicate start topic and 3 dashes to indicate end topic. aWORDZa. And EXISTZ. Or ACTZ.

then whatever texts are inbetween become a text token. AllHumanzLook DearHumanz

---

even completely isolated txt_tokenz are ok.

---

## 1.3 main topics and sub topics

a single hash at the top will populate all text until 3 tildes end the topic.

The main topics are numbered and subtopics numbered into _NUMZ_.

The hashes remain to distinguish type or importance, but they display flat.

and do not need nesting, because they are dynamically_linked, not_nested.

### 1.4 flat structure of _NUMZ_

Each entry is numbered by a unique system of NUMZ where a dynamic key is generated 
between runs. Counting ALL TOKENZ sorted by key and subkey, 
and using the length of each token array as sub topic counter - on push.

#### 1.5 NUMZ details

NUMZ are strings of random dot delimited numbers. A random number of sequence by type given at mint time.
The randomness is where it is fed into the system. Otherwise it is generating a unique number - when combined with the mint_stamp. 

#### 1.6 _MINT_STAMP_ details

the mint_stamp is a unique runtime key, generated on the day the program is run.
Which can be used to compare differences between run sets.

---


### 1.7 SUB TOPIC SEARCH SET

To have many sub topics , have a title with many triple dashes.

1. numbers and bullet points should be 
2. done manually.
3. for example bullet points 

- It would be cool 
- to make these
- dynamic bullet point symbols



---

### 1.8 ERROR HANDLING

if a triple_hyphen end is not found the titles are combined

all the way up until triple_tilde

~~~

This content is a subtxt

~~~

A return from triple tilde
I wonder how this content will be formated

It is formatted as a quote. what in the world?

~~~

beautiful either way - looks like triple_tilde is a comment out - into code (opposite world) lolz.

Or it seem better that triple_tilde be sub section identifier.

So hash it top of group, divided by triple_dash and triple_tilde. wow.

~~~

### 1.10 END_OF_file

do not have a sign for end_of_file, let it just close all the existing open tokens.

# single hash starts a new topic

that are then

---

delimited by multiple new topics

---

of additional detail

~~~

with occasional sub topics

to describe other points

~~~

## 1.11 With sub topic titles

### 1.12 and deeper points


# 2.0 A
# 3.0 B
# 4.0 C