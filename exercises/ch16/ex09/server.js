import app from "./index.js";

const root = process.argv[2] || "/.public";
const port = Number(process.argv[3]) || 8000;

// 環境変数でindex.jsに渡す
process.env.ROOT_DIR = root;

app.listen(port, () => {
    console.log("Listening on port", port);
    console.log("Serving directory:", root);
});