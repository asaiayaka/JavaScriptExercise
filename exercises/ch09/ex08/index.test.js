import { transition, State, Action, Event } from ".";

describe('AlarmClock 状態遷移', () => {
    test('NORMAL → SET_ALARM', () => {
        const { nextState, action } = transition(State.NORMAL, Event.SET_ALARM);
        expect(nextState).toBe(State.ALARM_SET);
        expect(action).toBe(Action.NONE);
    });

    test('ALARM_SET → CANCEL_ALARM', () => {
        const { nextState, action } = transition(State.ALARM_SET, Event.CANCEL_ALARM);
        expect(nextState).toBe(State.NORMAL);
        expect(action).toBe(Action.NONE);
    });

    test('ALARM_SET → REACHED_ALARM_TIME', () => {
        const { nextState, action } = transition(State.ALARM_SOUNDING, Event.CANCEL_ALARM);
        expect(nextState).toBe(State.NORMAL);
        expect(action).toBe(Action.STOP_ALARM);
    });

    test('ALARM_SOUNDING → CANCEL_ALARM', () => {
        const { nextState, action } = transition(State.ALARM_SOUNDING, Event.CANCEL_ALARM);
        expect(nextState).toBe(State.NORMAL);
        expect(action).toBe(Action.STOP_ALARM);
    });

    test('ALARM_SOUNDING → SNOOZE', () => {
        const { nextState, action } = transition(State.ALARM_SOUNDING, Event.SNOOZE);
        expect(nextState).toBe(State.SNOOZING);
        expect(action).toBe(Action.STOP_ALARM);
    });

    test('SNOOZING → ELAPSE_SNOOZE_TIME', () => {
        const { nextState, action } = transition(State.SNOOZING, Event.ELAPSE_SNOOZE_TIME);
        expect(nextState).toBe(State.ALARM_SOUNDING);
        expect(action).toBe(Action.SOUND_ALARM);
    });

    test('SNOOZING → CANCEL_ALARM', () => {
        const { nextState, action } = transition(State.SNOOZING, Event.CANCEL_ALARM);
        expect(nextState).toBe(State.NORMAL);
        expect(action).toBe(Action.NONE);
    });

    test('NORMAL → CANCEL_ALARM(無効遷移)', () => {
        const { nextState, action } = transition(State.NORMAL, Event.CANCEL_ALARM);
        expect(nextState).toBe(State.NORMAL);
        expect(action).toBe(Action.NONE);
    });

    test('ALARM_SOUNDING → SET_ALARM(無効遷移)', () => {
        const { nextState, action } = transition(State.ALARM_SOUNDING, Event.SET_ALARM);
        expect(nextState).toBe(State.ALARM_SOUNDING);
        expect(action).toBe(Action.NONE);
    })
})