# 解答

まずGITHUB_TOKENを指定
> $Env:GITHUB_TOKEN=""

実行
> node index.js list <owner> <repo>

結果
![alt text]({ECAD0C42-05AE-4E12-BE41-2BCFFD748367}.png)

> node index.js -v list asaiayaka JavaScriptExercise
Warning: Ignoring extra certs from `C:\ZCC\ZscalerRootCertificate-2048-SHA256.crt`, load failed: error:80000002:system library::No such file or directory
HTTP: GET https://api.github.com/repos/asaiayaka/JavaScriptExercise/issues?state=open
STATUS: 200
RESPONSE: []
