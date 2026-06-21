import re, os

base = "/root/aidnz/i/app/study/computer"

files_to_check = []
for root, dirs, files in os.walk(base):
  for f in files:
    if f.endswith(".tsx"):
      files_to_check.append(os.path.join(root, f))

def fix_booklist_items(content):
    # Fix pattern: <><strong>X</strong> Y</>,
    content = re.sub(
        r'<><strong>([^<]*)</strong>\s*([^<]*)</>(,\s*\n?)',
        lambda m: f"'{m.group(1)}{m.group(2)}'{m.group(3)}",
        content
    )
    # Fix pattern: <span><strong>X</strong>Y</span>,
    content = re.sub(
        r'<span><strong>([^<]*)</strong>([^<]*)</span>(,\s*\n?)',
        lambda m: f"'{m.group(1)}{m.group(2)}'{m.group(3)}",
        content
    )
    # Fix pattern: <span>X</span>,
    content = re.sub(
        r'<span>([^<]*)</span>(,\s*\n?)',
        lambda m: f"'{m.group(1)}'{m.group(2)}",
        content
    )
    # Fix bare <strong>X</strong>,
    content = re.sub(
        r'<strong>([^<]*)</strong>(,\s*\n?)',
        lambda m: f"'{m.group(1)}'{m.group(2)}",
        content
    )
    return content

fixed = 0
for fp in files_to_check:
    with open(fp, 'r') as f:
        content = f.read()
    new_content = fix_booklist_items(content)
    if new_content != content:
        with open(fp, 'w') as f:
            f.write(new_content)
        print(f"  Fixed: {os.path.relpath(fp, base)}")
        fixed += 1

print(f"\nDone! Fixed {fixed} files.")
