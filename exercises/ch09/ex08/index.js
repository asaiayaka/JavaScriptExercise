// 状態の定義(Symbolで不変・識別子として使える)
export const State = Object.freeze({
    NORMAL: Symbol("normal"),
    ALARM_SET: Symbol("alarmSet"),
    ALARM_SOUNDING: Symbol("alarmSounding"),
    SNOOZING: Symbol("snoozing"),
}); 

// アクションの定義
export const Action = Object.freeze({
    NONE: Symbol("none"),
    SOUND_ALARM: Symbol("soundAlarm"),
    STOP_ALARM: Symbol("stopAlarm"),
});

// イベントの定義
export const Event = Object.freeze({
    SET_ALARM: "setAlarm",
    CANCEL_ALARM: "cleanAlarm",
    REACHED_ALARM_TIME: "reachedToAlarmTime",
    SNOOZE: "snooze",
    ELAPSE_SNOOZE_TIME: "elapseSnoozeTime",
});

/**
 * 状態とイベントから、次の状態とアクションを返す純粋関数
 * @param {symbol} currentState - 現在の状態
 * @param {string} event - 実行されたイベント
 * @return {{ nextState: symbol, action: symbol}}
 */
export function transition(currentState, event) {
    switch (currentState) {
        case State.NORMAL:
            if (event === Event.SET_ALARM) {
                return { nextState: State.ALARM_SET, action: Action.NONE };
            }
            break;

        case State.ALARM_SET:
            if (event === Event.CANCEL_ALARM) {
                return {nextState: State.NORMAL, action: Action.NONE};
            }
            if (event === Event.REACHED_ALARM_TIME) {
                return {nextState: State.ALARM_SOUNDING, action: Action.SOUND_ALARM};
            }
            break;
        
        case State.ALARM_SOUNDING:
            if (event === Event.CANCEL_ALARM) {
                return {nextState: State.NORMAL, action: Action.STOP_ALARM};
            }
            if (event === Event.SNOOZE) {
                return {nextState: State.SNOOZING, action: Action.STOP_ALARM};
            }
            break;

        case State.SNOOZING:
            if (event === Event.ELAPSE_SNOOZE_TIME) {
                return {nextState: State.ALARM_SOUNDING, action: Action.SOUND_ALARM};
            }
            if (event === Event.CANCEL_ALARM) {
                return {nextState: State.NORMAL, action: Action.NONE};
            }
            break;
    }

    // その他(無効な遷移)は状態変化なし＋アクションなし
    return {nextState: currentState, action: Action.NONE};
}