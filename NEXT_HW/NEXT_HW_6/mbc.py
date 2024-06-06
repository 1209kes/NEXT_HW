import requests

response = requests.get('https://imnews.imbc.com/news/2024/politics/article/6582388_36431.html')
print(response.text)