import fs from "fs";

fetch("http://localhost:8000/hello.txt", {
    method: "PUT",
    body: fs.createReadStream("file.txt"),
    duplex: "half",
});