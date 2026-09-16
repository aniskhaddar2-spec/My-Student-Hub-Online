from pathlib import Path
import json

# Main My Student Hub folder
BASE_DIR = Path(__file__).parent

# Folders we want to scan
FOLDERS = {
    "assignments": BASE_DIR / "files" / "assigments",
    "important": BASE_DIR / "files" / "important",
    "python": BASE_DIR / "files" / "courses" / "Python",
    "ai": BASE_DIR / "files" / "courses" / "AI",
    "data_analysis": BASE_DIR / "files" / "courses" / "Data Analysis",
    "math": BASE_DIR / "files" / "courses" / "Math",
    "english": BASE_DIR / "files" / "courses" / "English",
    "web_programming": BASE_DIR / "files" / "courses" / "web-programming",
    "database_systems": BASE_DIR / "files" / "courses" / "database-systems",
    "it_fundamentals": BASE_DIR / "files" / "courses" / "it-fundamentals"
}

all_files = {}

for name, folder in FOLDERS.items():
    if not folder.exists():
        all_files[name] = []
        continue

    files = []

    # Data Analysis gets special recursive scanning
    if name == "data_analysis":

        # Keep all existing top-level files
        for file in sorted(folder.iterdir(), key=lambda x: x.name.lower()):
            if file.is_file():
                files.append(file.name)

        # Also scan subfolders for Python files
        for file in sorted(folder.rglob("*.py"), key=lambda x: str(x).lower()):
            if file.parent != folder:
                relative_path = file.relative_to(folder).as_posix()
                files.append(relative_path)

    else:
        # Everything else works exactly as before
        for file in sorted(folder.iterdir(), key=lambda x: x.name.lower()):
            if file.is_file():
                files.append(file.name)

    all_files[name] = files

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
        print("   No files found")
    else:
        for file in files:
            print(f"   📄 {file}")

print("\n✅ File list created!")
print(f"📄 {output_file.name}")