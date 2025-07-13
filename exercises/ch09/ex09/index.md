# SOLID原則の概要

1. 単一責任の原則(SRP: Single Responsibility Principle)

クラスはたった一つの責任を持つべきであち、その責任に対する変更理由は一つだけであるべき

2. 解放閉鎖の原則(OCP: Open/closed Principle)

ソフトウェアの構成要素は、拡張に対して開かれており、修正に対して閉じられていなければならない。
変更のために既存コードを触らずに機能追加できるようにする。

3. リスコフの置換原則(LSP; Liskov Substitution Principle)

サブクラスは親クラスと置き換えても正しく動作しなければならない。
継承は「is-a」関係を保証する必要がある。

4. インターフェース分離の原則(ISP: Interface Segregation Principle)

クライアントは使用しないインタフェースへの依存を強制されるべきではない。
大きなインターフェースよりも、小さく分離された特価インターフェースを使う。

5. 依存性逆転の原則(DIP: Dependency Inversion Principle)

高水準モジュールは低水準モジュールに依存するべきでなく、中小に依存すべき。
