from pathlib import Path
import json

# ============================================================
# My Student Hub - File Scanner
# ============================================================

# Main My Student Hub folder
BASE_DIR = Path(__file__).resolve().parent

# Folders to scan
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


def scan_folder(folder):
    """
    Recursively find every file inside a folder.

    Returns:
        A sorted list of file paths relative to the section folder.
    """

    files = []

    # Folder does not exist
    if not folder.exists():
        return files

    # Make sure the path is actually a directory
    if not folder.is_dir():
        print(f"⚠️ Not a folder: {folder}")
        return files

    try:
        # rglob("*") searches through all subfolders at any depth
        for item in folder.rglob("*"):

            # We only want files
            if item.is_file():

                # Keep the folder structure in the generated path
                relative_path = item.relative_to(folder).as_posix()

                files.append(relative_path)

    except OSError as error:
        print(f"⚠️ Could not fully scan: {folder}")
        print(f"   Reason: {error}")

    # Remove duplicates just in case
    files = list(dict.fromkeys(files))

    # Sort alphabetically
    files.sort(key=str.lower)

    return files


# ============================================================
# Scan every section
# ============================================================

all_files = {}

for section_name, folder in FOLDERS.items():

    print(f"\n🔎 Scanning: {section_name}")

    files = scan_folder(folder)

    all_files[section_name] = files

    print(f"   📄 Files found: {len(files)}")


# ============================================================
# Create files_data.js
# ============================================================

output_file = BASE_DIR / "files_data.js"

try:

    with open(output_file, "w", encoding="utf-8") as file:

        file.write("const MSH_FILES = ")

        json.dump(
            all_files,
            file,
            indent=4,
            ensure_ascii=False
        )

        file.write(";")

except OSError as error:

    print("\n❌ Could not create files_data.js")
    print(f"   Reason: {error}")

else:

    # ========================================================
    # Display final results
    # ========================================================

    print("\n================================")
    print("🤖 My Student Hub File Scanner")
    print("================================")

    for section_name, files in all_files.items():

        print(f"\n📁 {section_name}")

        if not files:
            print("   No files found")

        else:
            for file_path in files:
                print(f"   📄 {file_path}")

    print("\n✅ File list created successfully!")
    print(f"📄 {output_file.name}")

