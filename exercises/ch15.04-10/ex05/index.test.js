/**
 * @jest-environment jsdom
 * 
 * この指定により、JestでブラウザのようなDOM環境（JSDOM）を使ってテストを実行できます。
 */

import { InlineCircle } from './index.js'; // テスト対象のクラスを読み込み
customElements.define('inline-circle', InlineCircle); // カスタム要素として登録

// InlineCircle カスタム要素のテストスイート
describe('InlineCircle custom element', () => {
  
  // --- テスト1 ---
  test('要素が生成され、SVG が描画されること', () => {
    // <inline-circle> 要素を作成して、DOMに追加
    const el = document.createElement('inline-circle');
    document.body.appendChild(el);

    // Shadow DOMが存在するか確認
    const shadow = el.shadowRoot;
    expect(shadow).not.toBeNull();

    // SVG と circle 要素が描画されているか確認
    expect(shadow.querySelector('svg')).not.toBeNull();
    expect(shadow.querySelector('circle')).not.toBeNull();
  });

  // --- テスト2 ---
  test('size と border-color 属性が正しく反映されること', () => {
    const el = document.createElement('inline-circle');
    
    // 属性を設定
    el.setAttribute('size', '100');
    el.setAttribute('border-color', 'red');
    document.body.appendChild(el);

    // <circle> の stroke（線の色）が red になっているか確認
    const circle = el.shadowRoot.querySelector('circle');
    expect(circle.getAttribute('stroke')).toBe('red');

    // <svg> の width が 100 になっているか確認
    const svg = el.shadowRoot.querySelector('svg');
    expect(svg.getAttribute('width')).toBe('100');
  });

  // --- テスト3 ---
  test('属性が変更されたときに再描画されること', () => {
    const el = document.createElement('inline-circle');
    el.setAttribute('size', '50');
    document.body.appendChild(el);

    // 属性変更
    el.setAttribute('border-color', 'green');

    // 変更後の stroke が green に更新されているか確認
    const circle = el.shadowRoot.querySelector('circle');
    expect(circle.getAttribute('stroke')).toBe('green');
  });
});
