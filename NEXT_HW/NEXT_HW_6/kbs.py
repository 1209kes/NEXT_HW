import requests

response = requests.get('https://news.kbs.co.kr/news/pc/view/view.do?ncd=7920066')
print(response.text)