import * as fs from "node:fs";
import { promisify } from "node:util";

// fs.readdirをPromiseコンストラクタでラップしたもの
export function readdirPromise(path, options) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, options, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(files);
        });
    });
}

// fs.statをPromiseコンストラクタでラップしたもの
export function statPromise(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(stats);
        });
    });
}

// util.promisifyを使った変換版
export const readdirPromisified = promisify(fs.readdir);
export const statPromisified = promisify(fs.stat);