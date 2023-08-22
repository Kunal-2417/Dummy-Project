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

    url = f"https://dentalprod.com/search?type=product&q={search_query}"
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, "html.parser")

    product_items = soup.find_all('div', class_='inner-top')

    data7 = {"list7": []}  # Store the scraped data

    count = 0
    scraping_time = 0

    # Scraping process
    for item in product_items:
        product_link_elem = item.select_one('a.product-title')
        product_link = product_link_elem['href'] if product_link_elem else None

        product_image_elem = item.select_one('img.lazyloaded')
        product_image = product_image_elem['data-srcset'].split(',')[0].split()[-2] if product_image_elem else None

        product_name_elem = item.select_one('a.product-title span')
        product_name = product_name_elem.get_text(
            strip=True) if product_name_elem else None

        short_description_elem = item.select_one('div.short-description')
        short_description = short_description_elem.get_text(
            strip=True) if short_description_elem else None

        price_elem = item.select_one('div.price-regular span.money')
        price = price_elem.get_text(strip=True) if price_elem else None

        data7["list7"].append({
            'link': product_link,
            'image': product_image,
            'name': product_name,
            'short_description': short_description,
            'price': price,
        })

       

        count += 1

    return json.dumps(data7)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python try.py <search_query>")
        sys.exit(1)

    search_query = sys.argv[1]
    scraped_data = scrape_data(search_query)
    print(scraped_data)
