from pathlib import Path
import json

# Main My Student Hub folder
BASE_DIR = Path(__file__).parent

# Folders we want to scan
FOLDERS = {
    "assignments": BASE_DIR / "files" / "assigments",
    "important": BASE_DIR / "files" / "important",
    "python": BASE_DIR / "files" / "courses" / "python",
    "ai": BASE_DIR / "files" / "courses" / "ai",
    "data_analysis": BASE_DIR / "files" / "courses" / "Data Analysis",
    "math": BASE_DIR / "files" / "courses" / "math",
    "english": BASE_DIR / "files" / "courses" / "english",
    "web_programming": BASE_DIR / "files" / "courses" / "web-programming",
    "database_systems": BASE_DIR / "files" / "courses" / "database-systems",
    "it_fundamentals": BASE_DIR / "files" / "courses" / "it-fundamentals"
}

# Store all discovered files here
all_files = {}

for name, folder in FOLDERS.items():

    if not folder.exists():
        all_files[name] = []
        continue

    files = []

    for file in sorted(folder.iterdir(), key=lambda x: x.name.lower()):

        if file.is_file():
            files.append(file.name)

    all_files[name] = files


# Create the JavaScript data file
output_file = BASE_DIR / "files_data.js"

with open(output_file, "w", encoding="utf-8") as f:
    f.write("const MSH_FILES = ")
    json.dump(all_files, f, indent=4, ensure_ascii=False)
    f.write(";")


print("🤖 My Student Hub File Scanner")
print("--------------------------------")

for folder_name, files in all_files.items():

    print(f"\n📁 {folder_name}")

    if not files:
        print("   No files found.")
    else:
        for file in files:
            print(f"   📄 {file}")

print("\n✅ File list created!")
print(f"📄 {output_file.name}")

    