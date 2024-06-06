from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time
import csv
from datetime import datetime

chromedriver_path= 'C:/Users/1209k/NEXT/HW/NEXT_HW_/NEXT_HW_6/chromedriver-win64/chromedriver.exe'
user_data_dir= 'C:/Users/1209k/NEXT/HW/NEXT_HW_/NEXT_HW_6'

chrome_options = Options()
chrome_options.add_argument(f"user-data-dir={user_data_dir}")
service = Service(executable_path=chromedriver_path)

driver = webdriver.Chrome(service=service, options=chrome_options)

driver.get('https://www.youtube.com/')

searchbtn = driver.find_element(By.XPATH, "//input[@id='search']")
searchbtn.click()
time.sleep(3)

search_input = driver.find_element(By.XPATH, "//input[@id='search']")
search_input.send_keys("tabber")
time.sleep(3)
search_input.send_keys(Keys.RETURN)
time.sleep(3)

chikabtn = driver.find_element(By.XPATH, '//*[@id="video-title"]/yt-formatted-string')
chikabtn.click()
time.sleep(3)

likebtn = driver.find_element(By.XPATH, '//*[@id="top-level-buttons-computed"]/segmented-like-dislike-button-view-model/yt-smartimation/div/div/like-button-view-model/toggle-button-view-model/button-view-model/button/yt-touch-feedback-shape/div/div[2]')
likebtn.click()
time.sleep(3)

title_element = driver.find_element(By.XPATH, '//*[@id="title"]/h1/yt-formatted-string')   
title = title_element.text

today = datetime.now().strftime('%Y%m%d')

file = open(f'{today}youtube.csv', mode="w",newline='')
writer = csv.writer(file)
writer.writerow(["Title"])
writer.writerow([title])



