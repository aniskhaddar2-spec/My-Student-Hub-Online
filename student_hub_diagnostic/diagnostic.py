from pathlib import Path
import re
from urllib.parse import unquote

hub_folder = Path("..")

print("🔍 Student Hub Diagnostic Tool")
print("------------------------------")

html_files = list(hub_folder.rglob("*.html"))

valid_links = []
broken_links = []

for html_file in html_files:

    content = html_file.read_text(encoding="utf-8")

    links = re.findall(
        r'(?:href|src)=["\']([^"\']+)["\']',
        content
    )

    print(f"🔎 {html_file.name}: {len(links)} references found")

    for link in links:

        # Ignore external websites, anchors and email links
        if link.startswith(("http://", "https://", "#", "mailto:")):
            continue

        # Ignore JavaScript template variables
        if "${" in link:
            continue

        # Remove URL fragments and query parameters
        clean_link = link.split("#")[0].split("?")[0]

        # Decode URL encoding such as %20
        clean_link = unquote(clean_link)

        # Convert the link into a local path
        linked_file = html_file.parent / clean_link

        if linked_file.exists():
            valid_links.append((html_file, link))
        else:
            broken_links.append((html_file, link))

print()
print("📊 Link Analysis")
print("------------------------------")
print(f"🌐 HTML files scanned: {len(html_files)}")
print(f"✅ Valid links: {len(valid_links)}")
print(f"❌ Broken links: {len(broken_links)}")

print()

if broken_links:
    print("❌ BROKEN LINKS")
    print("------------------------------")

    for html_file, link in broken_links:
        print()
        print(f"📄 HTML file: {html_file.relative_to(hub_folder)}")
        print(f"🔗 Link: {link}")

else:
    print("🎉 No broken links found!")
    
    print()
print("📂 PATH ANALYSIS")
print("------------------------------")

files_worth_checking = []

for item in hub_folder.rglob("*"):

    if item.is_file():

        filename = item.name
        reasons = []

        if " " in filename:
            reasons.append("contains spaces")

        if "_" in filename:
            reasons.append("contains underscores")

        if reasons:
            files_worth_checking.append((item, reasons))


print(f"⚠️ Files worth checking: {len(files_worth_checking)}")

if files_worth_checking:

    print()
    print("📄 Files worth checking")
    print("------------------------------")

    for file, reasons in files_worth_checking:

        print()
        print(f"⚠️ {file.relative_to(hub_folder)}")
        print(f"   Reason: {', '.join(reasons)}")

else:
    print("🎉 No files worth checking!")

