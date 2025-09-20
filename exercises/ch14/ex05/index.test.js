import { typeNameTag } from ".";

describe("typeNameTagテンプレートタグ関数", () => {
    test("文字列補間の型名を返す", () => {
        expect(typeNameTag`${"A"}`).toBe("string");
        expect(typeNameTag`${42}`).toBe("number");
        expect(typeNameTag`${true}`).toBe("boolean");
        expect(typeNameTag`${null}`).toBe("object"); // typeof nullは"object"
        expect(typeNameTag`${undefined}`).toBe("undefined");
        expect(typeNameTag`${{ x: 1 }}`).toBe("object");
        expect(typeNameTag`${[1, 2, 3]}`).toBe("object"); // 配列もtypeofは"object"
        expect(typeNameTag`${function() {}}`).toBe("function");
    });

    test("複数補間値がある場合も型名で展開される", () => {
        const a = "hi";
        const b = 10;
        const c = { x: 1 };
        const arr = [1, 2];
        expect(typeNameTag`values: ${a}, ${b}, ${c}, ${arr}`).toBe(
            "values: string, number, object, object"
        );
    });

    test("文字列部分はそのまま残る", () => {
        const name = "Alice";
        const age = 20;
        expect(typeNameTag`Name: ${name}, Age: ${age}`).toBe(
            "Name: string, Age: number"
        );
    });
});