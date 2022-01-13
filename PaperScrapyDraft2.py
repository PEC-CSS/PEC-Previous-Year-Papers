from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
import os
import wget
import time
from urllib.request import urlopen
from bs4 import BeautifulSoup
import re
import requests
# pip install if any module is missing

chrome_options = webdriver.ChromeOptions()
prefs = {"profile.default_content_setting_values.notifications": 2}
chrome_options.add_experimental_option("prefs", prefs)
# setting up the webdriver
# select a webdriver according to your browser

# specify the path to chromedriver.exe (download and save on your computer)
driver = webdriver.Chrome(
    'C:/Users/aulee/chromedriver.exe', chrome_options=chrome_options)

# open the webpage
driver.get("https://www.facebook.com")


# target username and password columns
username = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='email']")))
password = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='pass']")))

# enter username and password
email = ""
# enter your email 
yourpass = ""
# enter your pass
username.clear()
username.send_keys(email)
password.clear()
password.send_keys(yourpass)

# target the login button and click it
button = WebDriverWait(driver, 2).until(EC.element_to_be_clickable(
    (By.CSS_SELECTOR, "button[type='submit']"))).click()

# We are logged in!


nextpage = [
    "https://mbasic.facebook.com/groups/210092355990810?view=photos&refid=18"]
# an array to keep track of the next links to visit
done = []
# array to record the visited ones

count=0;
#keeping track of repetetive folders

while (len(nextpage) != 0):

    driver.execute_script("window.open('');")
    driver.switch_to.window(driver.window_handles[1])
    driver.get(nextpage[0])
    print("Going To:", nextpage[0])
    # going to the next page
    done.append(nextpage[0])
    # saving it as visited

    nextpage = []
    elems = driver.find_elements_by_tag_name('a')
    linksarr = []

    for elem in elems:
        href = elem.get_attribute('href')
        linksarr.append(href)
    # grabbing all the anchor tags on the webpage

    albumsBasic = []
    # stores the mbasic link of the albums
    albumsFB = []
    # stores the actual link of the albums

    for i in linksarr:
        if "https://mbasic.facebook.com/media/set/?set=oa." in i:
            albumsBasic.append(i)
            albumsFB.append(i.replace("mbasic", "www"))
        if "https://mbasic.facebook.com/groups/210092355990810?view=photos&p" in i and i not in done:
            nextpage.append(i)

    print("Current Albums: ")
    for j in albumsFB:
        print(j)
    for j in albumsBasic:
        print(j)
    # debugging lines only. comment out if you feel so
    print("Next Link:", end=" ")
    print(nextpage, end="\n")
    print("DONE")
    # debugging lines again

    for i in range(0, len(albumsFB)):
        driver.switch_to.window(driver.window_handles[0])
        driver.get(albumsBasic[i])
        name = driver.title
        # getting the name of the folder from the title of the mbasic page

        link = albumsFB[i]

        print("\nGoing to", name)
        driver.get(link)
        # going to the actual album

        elems2 = driver.find_elements_by_tag_name('a')
        linksarr2 = []

        for elem in elems2:
            href = elem.get_attribute('href')
            linksarr2.append(href)
        images = driver.find_elements_by_tag_name('img')
        images = [image.get_attribute('src') for image in images]
        images = images[:-2]
        # code to grab all the img tags on the webpage
        print('Number of scraped images: ', len(images))

        papers = []
        for i in images:
            if "https://scontent." in i:
                papers.append(i)
        print("Papers", len(papers))
        # separating out the papers from other img tags

        path = os.getcwd()
        path = os.path.join(path, name + "-FOLDER")
        print(path)
        # making a path for saving on our pc

        try:
            os.mkdir(path)
            counter = 0
            for image in papers:
                save_as = os.path.join(
                    path, name + " - " + str(counter) + '.jpg')
                wget.download(image, save_as)
                counter += 1
        except:
            count+=1;
            print("Path Already Exists. Creating New Path")
            path = os.getcwd()
            path = os.path.join(path, name + "-FOLDER "+str(count))
            print(path)
            os.mkdir(path)
            counter2 = 0
            for image in papers:
                save_as = os.path.join(
                    path, name + " - " + str(counter2) + '.jpg')
                wget.download(image, save_as)
                counter2 += 1






