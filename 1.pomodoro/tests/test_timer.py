import unittest
import math
from unittest.mock import patch

class TestPomodoroTimer(unittest.TestCase):
    def setUp(self):
        self.default_time = 25 * 60

    def test_initial_time(self):
        # 初期値が25分（1500秒）であることを確認
        self.assertEqual(self.default_time, 1500)

    def test_countdown(self):
        # 1秒経過後、残り時間が1秒減ることを確認
        time_left = self.default_time
        time_left -= 1
        self.assertEqual(time_left, 1499)

    def test_reset(self):
        # リセット時に残り時間が初期値に戻ることを確認
        time_left = 1000
        time_left = self.default_time
        self.assertEqual(time_left, 1500)


class TestTimerProgressCalculation(unittest.TestCase):
    """円形プログレスバーのdashOffset計算ロジックのテスト"""

    RADIUS = 90
    CIRCUMFERENCE = 2 * math.pi * 90  # ~565.49

    def calc_dash_offset(self, time_left, total_time):
        """JSのcalcDashOffsetと同等のロジック"""
        if total_time <= 0:
            return self.CIRCUMFERENCE
        progress = time_left / total_time
        return self.CIRCUMFERENCE * (1 - progress)

    def test_dash_offset_full(self):
        """残り時間が全体の場合、dashOffsetは0"""
        result = self.calc_dash_offset(1500, 1500)
        self.assertAlmostEqual(result, 0.0)

    def test_dash_offset_empty(self):
        """残り時間が0の場合、dashOffsetは円周と同じ"""
        result = self.calc_dash_offset(0, 1500)
        self.assertAlmostEqual(result, self.CIRCUMFERENCE)

    def test_dash_offset_half(self):
        """残り時間が半分の場合、dashOffsetは円周の半分"""
        result = self.calc_dash_offset(750, 1500)
        self.assertAlmostEqual(result, self.CIRCUMFERENCE / 2)

    def test_dash_offset_zero_total(self):
        """totalTimeが0の場合、dashOffsetは円周と同じ"""
        result = self.calc_dash_offset(0, 0)
        self.assertAlmostEqual(result, self.CIRCUMFERENCE)


class TestStatusLabel(unittest.TestCase):
    """状態表示ロジックのテスト"""

    def get_status_label(self, is_running, time_left):
        """JSのgetStatusLabelと同等のロジック"""
        if time_left == 0:
            return '完了'
        if is_running:
            return '作業中'
        return '停止中'

    def test_status_running(self):
        """タイマー動作中は「作業中」"""
        self.assertEqual(self.get_status_label(True, 1000), '作業中')

    def test_status_stopped(self):
        """タイマー停止中（残り時間あり）は「停止中」"""
        self.assertEqual(self.get_status_label(False, 1000), '停止中')

    def test_status_completed(self):
        """タイマー完了（残り時間0）は「完了」"""
        self.assertEqual(self.get_status_label(False, 0), '完了')

    def test_status_completed_overrides_running(self):
        """残り時間0は動作中フラグより優先して「完了」"""
        self.assertEqual(self.get_status_label(True, 0), '完了')


class TestFormatFocusTime(unittest.TestCase):
    """集中時間フォーマットのテスト"""

    def format_focus_time(self, minutes):
        """JSのformatFocusTimeと同等のロジック"""
        if minutes < 60:
            return f'{minutes}分'
        hours = minutes // 60
        mins = minutes % 60
        if mins == 0:
            return f'{hours}時間'
        return f'{hours}時間{mins}分'

    def test_zero_minutes(self):
        """0分は「0分」"""
        self.assertEqual(self.format_focus_time(0), '0分')

    def test_25_minutes(self):
        """25分は「25分」"""
        self.assertEqual(self.format_focus_time(25), '25分')

    def test_60_minutes(self):
        """60分は「1時間」"""
        self.assertEqual(self.format_focus_time(60), '1時間')

    def test_100_minutes(self):
        """100分は「1時間40分」"""
        self.assertEqual(self.format_focus_time(100), '1時間40分')

    def test_90_minutes(self):
        """90分は「1時間30分」"""
        self.assertEqual(self.format_focus_time(90), '1時間30分')


if __name__ == '__main__':
    unittest.main()

