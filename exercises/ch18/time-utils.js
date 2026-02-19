// 惑星時計用の時刻換算ヘルパー（簡易モデル）。

const SECONDS_PER_HOUR = 3600;

function toEpochSeconds(date) {
  return Math.floor(date.getTime() / 1000);
}

function planetDaySeconds(rotationHours) {
  return rotationHours * SECONDS_PER_HOUR;
}

// 地球のDate -> 惑星の1日内の経過秒に変換。
function earthDateToPlanetDaySeconds(date, rotationHours) {
  // 地球のDateをエポック秒に変換。
  const earthSeconds = toEpochSeconds(date);
  // 惑星の「1日」が何秒かを算出。
  const daySeconds = planetDaySeconds(rotationHours);
  // 1日内の経過秒を求め、負数でも0以上に正規化。
  return ((earthSeconds % daySeconds) + daySeconds) % daySeconds;
}

// 惑星時刻（HH:MM） -> 地球のエポック秒（概算）に変換。
// 入力した惑星時刻の「次の発生時刻」を返す前提。
function planetTimeToEarthSeconds(referenceDate, rotationHours, hh, mm) {
  // 惑星の「1日」が何秒かを算出。
  const daySeconds = planetDaySeconds(rotationHours);
  // 入力されたHH:MMを1日内の経過秒に変換。
  const targetSeconds = (hh * 60 + mm) * 60;
  // 基準となる地球時刻をエポック秒に変換。
  const refSeconds = toEpochSeconds(referenceDate);
  // 基準時刻が惑星の1日内で何秒目か。
  const refWithin = ((refSeconds % daySeconds) + daySeconds) % daySeconds;
  // 次にその惑星時刻になるまでの差分秒を求める。
  const delta = targetSeconds >= refWithin
    ? targetSeconds - refWithin
    : daySeconds - (refWithin - targetSeconds);
  // 基準時刻に差分を足して、次の発生時刻を返す。
  return refSeconds + delta;
}

// 1日内の経過秒をHH:MM（24時間表記）に整形。
function formatPlanetTime(daySeconds) {
  const totalMinutes = Math.floor(daySeconds / 60);
  const hh = Math.floor(totalMinutes / 60) % 24;
  const mm = totalMinutes % 60;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

export {
  earthDateToPlanetDaySeconds,
  planetTimeToEarthSeconds,
  formatPlanetTime,
  planetDaySeconds
};
