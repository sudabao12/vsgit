import json

# 读取TXT文件内容
with open('python\初中-乱序.txt', 'r', encoding='utf-8') as file:
    lines = file.readlines()

# 解析TXT文件内容
entries = []
for line in lines:
    parts = line.split(maxsplit=3)  # 分割行，最多分为4部分
    if len(parts) == 4:
        word, type_, meaning, extra = parts
        entries.append({
            "word": word,
            "type": type_,
            "meaning": meaning,
            "extra": extra.strip()
        })
    elif len(parts) == 3:
        word, type_, meaning = parts
        entries.append({
            "word": word,
            "type": type_,
            "meaning": meaning,
            "extra": ""
        })

# 将解析后的内容写入JSON文件
output = {"words": entries}
with open('python\words.json', 'w', encoding='utf-8') as json_file:
    json.dump(output, json_file, ensure_ascii=False, indent=4)

print("TXT数据已成功转换为JSON格式。")
