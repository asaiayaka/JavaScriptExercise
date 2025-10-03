# 解答

## ReactにおけるXSS対策

- デフォルトの出力は安全
  - ReactではJSXで変数をHTMLに埋め込む場合、自動的にエスケープされる

const userInput = '<script>alert("XSS")</script>';
return <div>{userInput}</div>;

  - 上記のコードでは、実際のDOMに<script>タグとして挿入されず、文字列として表示される
  - つまり、ユーザー入力や外部データが直接スクリプトとして実行されることを防いでいる
  - この仕組みによって、多くの一般的なXSS攻撃が防止される

## Reactでも残るXSSのリスク

- dangerouslySetInnerHTMLの使用
  - Reactは、意図的に生HTMLを挿入する場合にのみdangerouslySetInnerHTMLを提供する
<div dangerouslySetInnerHTML={{ __html: userInput }}></div>

  - この場合、入力が適切にサニタイズされていないとXSSが成立してしまう
- サードパーティースクリプトやライブラリ
  - 外部のスクリプトや広告タグなどを埋め込む場合、Reactがエスケープしてもスクリプト自体がDOMに書き込まれる可能性がある
  - eval()やsetTimeout(string)など危険なAPIを使うと、XSSが発生する可能性がある
- DOM外でのXSS
  - Reactが生成するDOM以外に影響するスクリプト（例えばブラウザのlocalStorageにスクリプトを保存して再実行するようなケース）では、フレームワークの自動エスケープは効かない
