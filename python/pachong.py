import requests
url = 'https://httpbin.org/headers'
fanhui = requests.get(url)
if fanhui.status_code==200:
    print(fanhui.text)