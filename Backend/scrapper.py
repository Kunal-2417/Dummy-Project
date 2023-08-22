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

    url = f"https://www.dentalmart.in/search?controller=search&orderby=position&orderway=desc&search_query={search_query}&submit_search=Search"
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, "html.parser")

    div_elements = soup.find_all("div", class_="center_block")

    data1 = {"list1": []}  # Store the scraped data

    count = 0
    scraping_time = 0

    # Scraping process
    for div_element in div_elements:
        scrape_start_time = time.time()

        img_element = div_element.find('img')
        img_src = img_element['src'] if img_element and 'src' in img_element.attrs else None

        a_element = div_element.find('a', class_='product_img_link')
        a_title = a_element['title'] if a_element else None

        h3_element = div_element.find('h3')
        h3_text = h3_element.text.strip() if h3_element else None

        div_content_price = div_element.find('div', class_='content_price')
        div_price = div_content_price.text.strip() if div_content_price else None

        span_price = div_content_price.find(
            'span', class_='price') if div_content_price else None
        span_price_text = span_price.text.strip() if span_price else None

        p_product_desc = div_element.find('p', class_='product_desc')
        product_desc = p_product_desc.text.strip() if p_product_desc else None

        data1["list1"].append({
            'image': img_src,
            'name': a_title,
            'h3_text': h3_text,
            'price': div_price,
            'span_price_text': span_price_text,
            'product_desc': product_desc
        })

        scrape_end_time = time.time()
        scrape_time = scrape_end_time - scrape_start_time
        scraping_time += scrape_time

        count += 1

    return json.dumps(data1)


if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python try.py <search_query>")
        sys.exit(1)

    search_query = sys.argv[1]
    scraped_data = scrape_data(search_query)
    print(scraped_data)
