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

    url = f"https://daantwale.com/pages/rapid-search-results?q={search_query}"
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, "html.parser")

    product_items = soup.find_all('a', class_='rps-product-container')

    data6 = {"list6": []}

    for item in product_items:
        product_id = item.get('data-product-id')
        product_name_elem = item.find('p', class_='rps-product-title')
        product_name = product_name_elem.get_text(strip=True) if product_name_elem else None
        product_url = item['href']

        product_image_elem = item.find('img', class_='rps-product-image')
        product_image = product_image_elem['src'] if product_image_elem else None

        sale_price_elem = item.find('p', class_='rps-product-sale-price')
        sale_price = sale_price_elem.get_text(strip=True) if sale_price_elem else None

        final_price_elem = item.find('p', class_='rps-product-final-price')
        final_price = final_price_elem.get_text(strip=True) if final_price_elem else None

        data6["list6"].append({
            'product_id': product_id,
            'name': product_name,
            'link': product_url,
            'image': product_image,
            'sale_price': sale_price,
            'final_price': final_price,
        })

     

        count += 1

    return json.dumps(data6)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python try.py <search_query>")
        sys.exit(1)

    search_query = sys.argv[1]
    scraped_data = scrape_data(search_query)
    print(scraped_data)
