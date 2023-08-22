import requests
from bs4 import BeautifulSoup
import time
import json
import sys


def scrape_data(search_query):
    print(search_query)

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    url = f"https://www.dentmark.com/search?searchterm={search_query}"
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, "html.parser")

    product_items = soup.find_all('div', class_='card-body')

    data5 = {"list5": []}  # Store the scraped data

    count = 0
    scraping_time = 0

    # Scraping process
    for item in product_items:
        product_photo_elem = item.find('img', class_='img-fluid')
        product_photo = product_photo_elem['src'] if product_photo_elem else None

        product_name_elem = item.find('p', class_='prod-name')
        product_name = product_name_elem.get_text(
            strip=True) if product_name_elem else None

        product_url_elem = item.find('a', class_='prod-img-style')
        product_url = product_url_elem['href'] if product_url_elem else None

        rating_elem = item.find('span', class_='prod-off')
        rating = rating_elem.get_text(strip=True) if rating_elem else None

        price_elem = item.find('span', class_='prod-price')
        price = price_elem.get_text(strip=True) if price_elem else None

        sold_elem = item.find('p', class_='sold-prod')
        sold = sold_elem.get_text(strip=True) if sold_elem else None

        data5["list5"].append({
            'image': product_photo,
            'name': product_name,
            'link': product_url,
            'rating': rating,
            'price': price,
            'sold': sold
        })
    return json.dumps(data5)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python try.py <search_query>")
        sys.exit(1)

    search_query = sys.argv[1]
    scraped_data = scrape_data(search_query)
    print(scraped_data)
