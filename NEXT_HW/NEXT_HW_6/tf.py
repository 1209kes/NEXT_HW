import requests
from bs4 import BeautifulSoup
from collections import Counter
import re

def crawl_document(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    elements = soup.find_all(['p', re.compile('^#text$')])
    text = ''.join([element.get_text() for element in elements])
    return text

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)    
    words = text.split()
    return words

def calculate_tf(words):
    word_counts = Counter(words)
    total_words = len(words)
    tf = {word: count/total_words for word,count in word_counts.items()}
    return tf

def main():
    urls = ['https://imnews.imbc.com/news/2024/politics/article/6582388_36431.html', 'https://news.kbs.co.kr/news/pc/view/view.do?ncd=7920066', 'https://www.joongang.co.kr/article/25236857#home']
    for url in urls:
        print("Analyzing:", url)
        document = crawl_document(url)
        words = preprocess_text(document)
        tf = calculate_tf(words)
        print(tf)
        
if __name__ == "__main__":
    main()
        
        
        
  