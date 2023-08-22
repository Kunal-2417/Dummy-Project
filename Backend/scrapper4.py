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

    url = f"https://dentalstall.com/?s={search_query}&post_type=product"
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, "html.parser")

    product_items = soup.find_all('div', class_='product-inner')

    data4 = {"list4": []}  # Store the scraped data

    count = 0
    scraping_time = 0

    # Scraping process
    for item in product_items:
        product_photo_elem = item.find(
             'img', class_='attachment-woocommerce_thumbnail')
        product_photo = product_photo_elem['src'] if product_photo_elem else None

        product_name_elem = item.find('h2', class_='woo-loop-product__title')
        product_name_link_elem = product_name_elem.find('a')
        product_name = product_name_link_elem.get_text(strip=True) if product_name_link_elem else None
        product_url = product_name_link_elem['href'] if product_name_link_elem else None

        price_elem = item.find('span', class_='woocommerce-Price-amount')
        price = price_elem.get_text(strip=True) if price_elem else None

        ribbons_elem = item.find('span', class_='ribbons')
        ribbons = ribbons_elem.get_text(strip=True) if ribbons_elem else None

        data4["list4"].append({
            'image': product_photo,
            'name': product_name,
            'link': product_url,
            'price': price,
            'ribbons': ribbons,
        })

    return json.dumps(data4)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python try.py <search_query>")
        sys.exit(1)

    search_query = sys.argv[1]
    scraped_data = scrape_data(search_query)
    print(scraped_data)
