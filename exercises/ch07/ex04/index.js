const data = [
    { name: "Alice", class: "A", math: 10, chemistry: 30, geography: 20 },
    { name: "Bob", class: "A", math: 50, chemistry: 50, geography: 60 },
    { name: "Carol", class: "A", math: 70, chemistry: 55, geography: 30 },
    { name: "Dave", class: "B", math: 40, chemistry: 20, geography: 60 },
    { name: "Ellen", class: "B", math: 60, chemistry: 70, geography: 40 },
    { name: "Frank", class: "B", math: 90, chemistry: 70, geography: 80 },
    { name: "Isaac", class: "C", math: 70, chemistry: 40, geography: 50 },
    { name: "Justin", class: "C", math: 80, chemistry: 40, geography: 30 },
    { name: "Mallet", class: "C", math: 60, chemistry: 70, geography: 90 },
];

// 1.mathの全員の合計点
const totalMath = data.reduce((sum, student) => sum + student.math, 0);

// 2.クラスAのchemistryの平均点
const classA = data.filter(s => s.class === "A");
const avgChemistryA = classA.reduce((sum, s) => sum + s.chemistry, 0) / classA.length;

// 3.3科目合計点のクラスC内での平均点
const classC = data.filter(s => s.class === "C");
const avgTotalC = classC
    .map(s => s.math + s.chemistry + s.geography)
    .reduce((sum, val) => sum + val, 0) / classC.length;

// 4.3科目合計点が最も高い人のname
const personWithMaxTotal = data.reduce((maxPerson, curr) => {
    const currTotal = curr.math + curr.chemistry + curr.geography;
    const maxTotal = maxPerson.math + maxPerson.chemistry + maxPerson.geography;
    return currTotal > maxTotal ? curr : maxPerson;
});
const maxTotalName = personWithMaxTotal.name;

// 5.全体のgeographyの標準偏差
const geographyScores = data.map(s => s.geography);
const geoAvg = geographyScores.reduce((sum, val) => sum + val, 0) / geographyScores.length;
const variance = geographyScores
    .map(val => (val - geoAvg) ** 2)
    .reduce((sum, val) => sum + val, 0) / geographyScores.length;
const stdDev = Math.sqrt(variance);

console.log("1. math合計点：", totalMath);
console.log("2. クラスA chemistry平均点:", avgChemistryA);
console.log("3. クラスC 3科目合計平均点:", avgTotalC);
console.log("4. 3科目合計最高の人:", maxTotalName);
console.log("5. 全体 geography標準偏差:", stdDev.toFixed(2));