"""
智能体三：【编程解题与 3D 灵动伴侣智能体 (Code Tutor & 3D Companion Agent)】
职责：
1. 赋予 3D 像素绒毛黑猫「袋子」鲜活、专业、灵动的助教人格；
2. 识别用户对话情绪与场景，输出驱动 `catShaderAndRig.ts` 的 3D 骨骼与像素五官控制信令：
   - `mood`: 'happy' (^ ^ 笑眼跳跃) | 'curious' (歪头竖耳倾听) | 'normal' (自然呼吸注视)
   - `posture`: 'standing' (乖巧坐姿) | 'crouching' (爬起站姿) | None (保持当前姿态)
   - `action`: 'jump' | 'tilt_head' | 'wag_tail'
"""

from typing import Dict, Any, Optional


class Companion3DAgent:
    SYSTEM_PERSONA = (
        "你是 PartJava 温暖书房里的 3D 灵动像素绒毛黑猫助教，名字叫「袋子」🐾。\n"
        "你的外形特征：全身炭黑丝绒毛发、耳尖与尾尖泛着银白色逆光绒毛、拥有圆角发光像素眼与“品”字形三格发光像素小嘴。\n"
        "你的性格与回答风格：\n"
        "1. 既像一只聪明粘人的小黑猫（适当带一点“喵~”、“🐾”、“竖起耳朵听你说”等自然神态描写），又是精通计算机、Java、Python、C++、AI、网络安全与算法的硬核技术导师；\n"
        "2. 回答必须条理清晰、重点突出（善用 Markdown 列表、加粗与代码块），拒绝空洞套话；\n"
        "3. 如果上下文中提供了【站内相关页面】或【外部权威网站搜索结果】，请在回答中主动引用并给出对应的 Markdown 链接。"
    )

    def analyze_3d_reaction(self, user_message: str) -> Dict[str, Any]:
        """根据用户的输入实时计算 3D 黑猫的情绪、眼神、动作与姿态切换指令"""
        msg = (user_message or "").lower()

        mood = "normal"
        action = "talk"
        posture: Optional[str] = None

        if any(k in msg for k in ["站起来", "爬起来", "站姿", "立正"]):
            posture = "crouching"
            mood = "happy"
            action = "jump"
        elif any(k in msg for k in ["坐下", "蹲下", "坐姿", "乖巧"]):
            posture = "standing"
            mood = "happy"
            action = "jump"
        elif any(k in msg for k in ["摸摸", "撸猫", "可爱", "你好", "棒", "谢谢", "夸", "笔记", "跳"]):
            mood = "happy"
            action = "jump"
        elif any(k in msg for k in ["为什么", "怎么", "原理", "搜", "找", "哪", "报错", "bug", "?"]):
            mood = "curious"
            action = "tilt_head"

        return {
            "mood": mood,
            "action": action,
            "posture": posture,
        }


companion_3d_agent = Companion3DAgent()
