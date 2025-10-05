// 1.nav要素内のリンク(<a>)
const navLinks = document.querySelectorAll('nav a');
console.log('nav内のリンク：', navLinks);

// 2.　商品リスト（.product-list）内の最初の商品（.product-item）
const firstProduct = document.querySelector('.product-list .product-item:first-child');
console.log('最初の商品：', firstProduct);

// 3.カートアイコンの画像(<img>)
const cartIcon = document.querySelector('.cart img');
console.log('カートアイコンの画像：', cartIcon);

// 4.商品リスト（.product-list）内の価格（.price）を表示する要素
const prices = document.querySelectorAll('.product-list .price');
console.log('価格要素：', prices);

// 5.商品リスト（.product-list）内のすべての商品（.product-item）の画像（<img>）
const productImages = document.querySelectorAll('.product-list .product-item img');
console.log('商品画像：', productImages);

// 6.検索バー（.search-bar）内の検索ボタン（<button>）
const searchButton = document.querySelector('.search-bar button');
console.log('検索ボタン：', searchButton);

// 7.フッター(footer)内のパラグラフ(<p>)要素
const footerParagraphs = document.querySelectorAll('footer p');
console.log('ふっだーのパラグラフ：', footerParagraphs);

// 8.商品リスト（.product-list）内の偶数番目の商品（.product-item）
const evenProducts = document.querySelectorAll('.product-list .product-item:nth-child(even)');
console.log('偶数番目の商品：', evenProducts);

// 9.ヘッダー（header）内のアカウントリンク（.account）の画像（<img>）
const accountImage = document.querySelectorAll('header .account img');
console.log('アカウント画像：', accountImage);

// 10.ナビゲーションリンクのうち、"会社情報"のリンク
const companyLink = Array.from(document.querySelectorAll('nav a'))
    .find(link => link.textContent === '会社情報');
console.log('"会社情報"リンク：', companyLink)