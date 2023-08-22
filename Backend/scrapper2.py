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

    url = f"https://pinkblue.in/catalogsearch/result/?q={search_query}"
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, "html.parser")

    product_items = soup.find_all('div', class_='product-item-info')

    data2 = {"list2": []}  # Store the scraped data

    count = 0
    scraping_time = 0

    # Scraping process
    for item in product_items:
        product_photo_elem = item.find('img', class_='product-image-photo')
        product_photo = product_photo_elem['src'] if product_photo_elem else None

        product_name_elem = item.find('strong', class_='product-item-name')
        product_name_link_elem = product_name_elem.find(
            'a', class_='product-item-link')
        product_name = product_name_link_elem.get_text(
            strip=True) if product_name_link_elem else None
        product_url = product_name_link_elem['href'] if product_name_link_elem else None

        regular_price_elem = item.find(
            'span', class_='price-wrapper', attrs={"data-price-type": "oldPrice"})
        regular_price = regular_price_elem.find('span', class_='price').get_text(
            strip=True) if regular_price_elem else None

        special_price_elem = item.find(
            'span', class_='price-wrapper', attrs={"data-price-type": "finalPrice"})
        special_price = special_price_elem.find('span', class_='price').get_text(
            strip=True) if special_price_elem else None

        discount_label_elem = item.find(
            'div', class_='product-label sale-label')
        discount_label = discount_label_elem.get_text(
            strip=True) if discount_label_elem else None

        data2["list2"].append({
            'image': product_photo,
            'name': product_name,
            'link': product_url,
            'regular_price': regular_price,
            'special_price': special_price,
            'discount_label': discount_label,
        })

        
    return json.dumps(data2)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python try.py <search_query>")
        sys.exit(1)

    search_query = sys.argv[1]
    scraped_data = scrape_data(search_query)
    print(scraped_data)
