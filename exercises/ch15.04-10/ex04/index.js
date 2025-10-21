let headings = document.querySelectorAll("h1, h2, h3"); // 例: ページ内の見出しを取得
let toc = document.createElement("ul");

headings.forEach((heading, index) => {
  const fragmentName = `heading-${index}`;
  
  // 見出しにアンカーを作る
  let anchor = document.createElement("a");
  anchor.name = fragmentName;
  heading.prepend(anchor);

  // TOC リンクを作る
  let link = document.createElement("a");
  link.href = `#${fragmentName}`;
  link.innerHTML = heading.innerHTML;

  // スムーズスクロールのイベント追加
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(`a[name="${fragmentName}"]`);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth" }); // ここでスムーズスクロール
  });

  let li = document.createElement("li");
  li.appendChild(link);
  toc.appendChild(li);
});

document.body.prepend(toc); // ページ先頭に TOC を追加
