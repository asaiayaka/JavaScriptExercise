# 解答

1. ChromeやFirefoxでデベロッパーツールを開く
2. ネットワークタブでAPIリクエストを確認
3. レスポンスヘッダーに以下を確認
    - Access-Control-Allow-Origin: http://example.com
    - Access-Control-Allow-Credentials: true
4. これがある場合、CORSが設定されており、特定のオリジンや認証情報付きリクエストを許可していることがわかる
