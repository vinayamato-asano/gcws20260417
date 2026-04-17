const {
    calcDashOffset,
    formatTime,
    getStatusLabel,
    formatFocusTime,
    CIRCUMFERENCE,
    TOTAL_TIME
} = require('../js/timer_logic');

describe('calcDashOffset', () => {
    test('残り時間が全体と同じ場合、dashOffsetは0', () => {
        expect(calcDashOffset(TOTAL_TIME, TOTAL_TIME)).toBeCloseTo(0);
    });

    test('残り時間が0の場合、dashOffsetは円周と同じ', () => {
        expect(calcDashOffset(0, TOTAL_TIME)).toBeCloseTo(CIRCUMFERENCE);
    });

    test('残り時間が半分の場合、dashOffsetは円周の半分', () => {
        expect(calcDashOffset(TOTAL_TIME / 2, TOTAL_TIME)).toBeCloseTo(CIRCUMFERENCE / 2);
    });

    test('totalTimeが0の場合、dashOffsetは円周と同じ', () => {
        expect(calcDashOffset(0, 0)).toBeCloseTo(CIRCUMFERENCE);
    });
});

describe('formatTime', () => {
    test('1500秒は "25:00"', () => {
        expect(formatTime(1500)).toBe('25:00');
    });

    test('0秒は "00:00"', () => {
        expect(formatTime(0)).toBe('00:00');
    });

    test('61秒は "01:01"', () => {
        expect(formatTime(61)).toBe('01:01');
    });

    test('59秒は "00:59"', () => {
        expect(formatTime(59)).toBe('00:59');
    });

    test('3600秒は "60:00"', () => {
        expect(formatTime(3600)).toBe('60:00');
    });
});

describe('getStatusLabel', () => {
    test('タイマー動作中は "作業中"', () => {
        expect(getStatusLabel(true, 1000)).toBe('作業中');
    });

    test('タイマー停止中（timeLeft > 0）は "停止中"', () => {
        expect(getStatusLabel(false, 1000)).toBe('停止中');
    });

    test('タイマー完了（timeLeft === 0）は "完了"', () => {
        expect(getStatusLabel(false, 0)).toBe('完了');
    });

    test('タイマー動作中でもtimeLeft === 0の場合は "完了"', () => {
        expect(getStatusLabel(true, 0)).toBe('完了');
    });
});

describe('formatFocusTime', () => {
    test('0分は "0分"', () => {
        expect(formatFocusTime(0)).toBe('0分');
    });

    test('25分は "25分"', () => {
        expect(formatFocusTime(25)).toBe('25分');
    });

    test('60分は "1時間"', () => {
        expect(formatFocusTime(60)).toBe('1時間');
    });

    test('100分は "1時間40分"', () => {
        expect(formatFocusTime(100)).toBe('1時間40分');
    });

    test('90分は "1時間30分"', () => {
        expect(formatFocusTime(90)).toBe('1時間30分');
    });

    test('59分は "59分"', () => {
        expect(formatFocusTime(59)).toBe('59分');
    });
});
