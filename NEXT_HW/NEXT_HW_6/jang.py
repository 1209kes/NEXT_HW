import requests

response = requests.get('https://www.joongang.co.kr/article/25236857#home')
print(response.text)