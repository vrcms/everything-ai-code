#!/usr/bin/env bash
# Verify Before Done / 完成前验证
# Stop hook — nudges the AI to run tests before declaring a task complete
# Usage: Add to .claude/settings.json as a Stop hook

echo ""
echo "===== VERIFICATION REMINDER / 验证提醒 ====="
echo "Before marking this task complete, verify:"
echo "在标记任务完成之前，请验证："
echo ""
echo "  1. Tests pass / 测试通过"
echo "  2. No console errors / 无控制台错误"
echo "  3. No TODO/FIXME left behind / 没有遗留的 TODO/FIXME"
echo "  4. Code is formatted / 代码已格式化"
echo "  5. No secrets committed / 没有提交密钥"
echo ""
echo "Run tests now if you haven't already."
echo "如果还没运行测试，现在运行。"
echo "=============================================="
echo ""
