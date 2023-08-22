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

    url = f"https://thedentalmaterialshop.com/?s={search_query}&post_type=product"
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, "html.parser")

    data3 = {"list3": []}
    div_elements = soup.find_all("div", class_="product-inner")

    for item in div_elements:
        product_photo_elem = item.find('img', class_='wp-post-image')
        product_photo = product_photo_elem['src'] if product_photo_elem else None

        product_name_elem = item.find(
            'h3', class_='woocommerce-loop-product__title')
        product_name = product_name_elem.get_text(
            strip=True) if product_name_elem else None

        product_url_elem = item.find('a', class_='product-loop-title')
        product_url = product_url_elem['href'] if product_url_elem else None

        rating_elem = item.find('div', class_='star-rating')
        rating = rating_elem.get_text(strip=True) if rating_elem else None

        price_elem = item.find('span', class_='price')
        price = price_elem.get_text(strip=True) if price_elem else None

        category_elem = item.find('span', class_='category-list')
        categories = [cat.get_text(strip=True) for cat in category_elem.find_all(
            'a', rel='tag')] if category_elem else []

        data3["list3"].append({
            'image': product_photo,
            'name': product_name,
            'link': product_url,
            'rating': rating,
            'price': price,
            'categories': categories,
        })


    return json.dumps(data3)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python try.py <search_query>")
        sys.exit(1)

    search_query = sys.argv[1]
    scraped_data = scrape_data(search_query)
    print(scraped_data)
