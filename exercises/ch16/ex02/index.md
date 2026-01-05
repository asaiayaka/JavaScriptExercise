# 解答

送信されるシグナル：SIGTERM（必須）、（猶予時間後）SIGKILL

流れ（Docker/K8s/ECS共通）：

1. コンテナにSIGTERM
2. terminationGracePeriodSecondsの間待機
3. 終了しなけれなSIGKILL
