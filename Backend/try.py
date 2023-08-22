import requests
from bs4 import BeautifulSoup
from IPython.display import display, Image
import time


def scrape_and_display_data(search_query):
    print(f"Searching for: {search_query}\n")

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    url = f"https://thedentalmaterialshop.com/?s={search_query}&post_type=product"
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, "html.parser")

    div_elements = soup.find_all("div", class_="product-inner")

    for div_element in div_elements:
        img_element = div_element.find('img')
        img_src = img_element['src'] if img_element and 'src' in img_element.attrs else None

        a_element = div_element.find(
            'h3', class_='woocommerce-loop-product__title')
        a_title = a_element.text.strip() if a_element else None

        rating_element = div_element.find('div', class_='star-rating')
        rating = rating_element.text.strip() if rating_element else None

        div_content_price = div_element.find(
            'div', class_='woocommerce-Price-amount')
        div_price = div_content_price.text.strip() if div_content_price else None

        span_price = None
        span_price_text = None
        if div_content_price:
            span_price = div_content_price.find(
                'span', class_='woocommerce-Price-currencySymbol')
            span_price_text = span_price.text.strip() if span_price else None

        print("Product Name:", a_title)
        if img_src:
            display(Image(url=img_src))
        else:
            print("No image available.")
        print("Rating:", rating)
        if div_price:
            print("Price:", div_price, span_price_text)
        else:
            print("Price information not available.")
        print("-" * 50)
        time.sleep(1)  # Adding a delay to avoid overwhelming the server


if __name__ == "__main__":
    search_query = input("Enter the search query: ")
    scrape_and_display_data(search_query)
