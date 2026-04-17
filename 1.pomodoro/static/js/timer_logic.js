var TOTAL_TIME = 25 * 60; // 1500秒
var RADIUS = 90;
var CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ~565.49

/**
 * SVGプログレスバーのstroke-dashoffsetを計算する
 * @param {number} timeLeft - 残り時間（秒）
 * @param {number} totalTime - 合計時間（秒）
 * @returns {number} dashOffset値
 */
function calcDashOffset(timeLeft, totalTime) {
    if (totalTime <= 0) return CIRCUMFERENCE;
    var progress = timeLeft / totalTime;
    return CIRCUMFERENCE * (1 - progress);
}

/**
 * 秒数を mm:ss 形式の文字列に変換する
 * @param {number} seconds - 秒数
 * @returns {string} "mm:ss" 形式の文字列
 */
function formatTime(seconds) {
    var min = String(Math.floor(seconds / 60)).padStart(2, '0');
    var sec = String(seconds % 60).padStart(2, '0');
    return min + ':' + sec;
}

/**
 * タイマーの状態ラベルを返す
 * @param {boolean} isRunning - タイマーが動作中か
 * @param {number} timeLeft - 残り時間（秒）
 * @returns {string} 状態ラベル
 */
function getStatusLabel(isRunning, timeLeft) {
    if (timeLeft === 0) return '完了';
    if (isRunning) return '作業中';
    return '停止中';
}

/**
 * 集中時間（分）を表示用文字列に変換する
 * @param {number} minutes - 集中時間（分）
 * @returns {string} 表示用文字列（例: "1時間40分"、"25分"）
 */
function formatFocusTime(minutes) {
    if (minutes < 60) {
        return minutes + '分';
    }
    var hours = Math.floor(minutes / 60);
    var mins = minutes % 60;
    if (mins === 0) return hours + '時間';
    return hours + '時間' + mins + '分';
}

// Node.js/Jest環境でのexport
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calcDashOffset: calcDashOffset,
        formatTime: formatTime,
        getStatusLabel: getStatusLabel,
        formatFocusTime: formatFocusTime,
        CIRCUMFERENCE: CIRCUMFERENCE,
        TOTAL_TIME: TOTAL_TIME,
        RADIUS: RADIUS
    };
}
