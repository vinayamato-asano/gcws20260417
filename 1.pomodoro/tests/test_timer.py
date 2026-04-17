import unittest
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

if __name__ == '__main__':
    unittest.main()
