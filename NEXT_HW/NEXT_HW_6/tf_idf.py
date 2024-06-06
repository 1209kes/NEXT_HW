import requests
from bs4 import BeautifulSoup
from sklearn.feature_extraction.text import TfidfVectorizer
from openpyxl import Workbook
from datetime import datetime

def crawl_document(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    elements = soup.find_all(['p', 'text'])
    text = ''.join([element.get_text() for element in elements])
    return text

def calculate_tfidf(urls):
    documents = []
    for url in urls:
        document = crawl_document(url)
        documents.append(document)
        
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(documents)
    feature_names = vectorizer.get_feature_names_out()
    
    wb = Workbook()
    ws = wb.active
    ws.append(["document_number", "word", "TF-IDF_score"])

    for i, document in enumerate(documents):
        print(f"Analyzing document {i+1}")
        feature_index = tfidf_matrix[i, :].nonzero()[1]
        tfidf_scores = zip(feature_index, [tfidf_matrix[i, x] for x in feature_index])
        top_keywords = sorted(tfidf_scores, key=lambda x: x[1], reverse=True)[:10]
        for index, score in top_keywords:
            ws.append([i+1, feature_names[index], score])
    today = datetime.now().strftime('%Y%m%d')
    filename = f'news_TF-IDF_fffinal_{today}.xlsx'
    wb.save(filename)
    print(f"엑셀 파일 저장 완료: {filename}")
    
def main():
    urls = ['https://imnews.imbc.com/news/2024/politics/article/6582388_36431.html',
            'https://news.kbs.co.kr/news/pc/view/view.do?ncd=7920066',
            'https://www.joongang.co.kr/article/25236857#home']
    calculate_tfidf(urls)
        
if __name__ == "__main__":
    main()



