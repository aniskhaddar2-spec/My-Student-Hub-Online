from pathlib import Path
import re
from urllib.parse import unquote
from difflib import get_close_matches


hub_folder = Path("..")


def find_similar_files(broken_path, hub_folder):

    all_paths = [
        path for path in hub_folder.rglob("*")
        if path.is_file()
    ]

    target_name = Path(broken_path).name

    names = [path.name for path in all_paths]

    matches = get_close_matches(
        target_name,
        names,
        n=3,
        cutoff=0.6
    )

    similar_paths = []

    for match in matches:

        for path in all_paths:

            if path.name == match:
                similar_paths.append(path)

    return similar_paths


def find_similar_folders(folder_name, parent_folder):

    if not parent_folder.exists():
        return []

    folders = [
        item.name
        for item in parent_folder.iterdir()
        if item.is_dir()
    ]

    matches = get_close_matches(
        folder_name,
        folders,
        n=3,
        cutoff=0.6
    )

    return matches


def diagnose_filename(broken_name, actual_name):

    broken_stem = Path(broken_name).stem
    actual_stem = Path(actual_name).stem

    # Capitalization difference
    if broken_stem.lower() == actual_stem.lower():

        if broken_stem != actual_stem:
            return "capitalization difference"

    # Spaces and underscores difference
    normalized_broken = (
        broken_stem.replace("_", " ").lower()
    )

    normalized_actual = (
        actual_stem.replace("_", " ").lower()
    )

    if normalized_broken == normalized_actual:

        if broken_stem != actual_stem:
            return "spaces / underscores difference"

    # Small filename typo
    similarity = get_close_matches(
        broken_stem.lower(),
        [actual_stem.lower()],
        n=1,
        cutoff=0.75
    )

    if similarity:
        return "possible filename typo"

    return None


def diagnose_path(broken_path, actual_path):

    broken_parts = Path(broken_path).parts
    actual_parts = Path(actual_path).parts

    # Compare folders only
    broken_folders = broken_parts[:-1]
    actual_folders = actual_parts[:-1]

    if len(broken_folders) != len(actual_folders):
        return None

    for broken_folder, actual_folder in zip(
        broken_folders,
        actual_folders
    ):

        if broken_folder == actual_folder:
            continue

        # Capitalization FIRST
        if broken_folder.lower() == actual_folder.lower():

            if broken_folder != actual_folder:

                return (
                    "capitalization difference",
                    broken_folder,
                    actual_folder
                )

        # Spaces / underscores
        normalized_broken = (
            broken_folder.replace("_", " ").lower()
        )

        normalized_actual = (
            actual_folder.replace("_", " ").lower()
        )

        if normalized_broken == normalized_actual:

            if broken_folder != actual_folder:

                return (
                    "spaces / underscores difference",
                    broken_folder,
                    actual_folder
                )

        # Possible folder typo
        similarity = get_close_matches(
            broken_folder.lower(),
            [actual_folder.lower()],
            n=1,
            cutoff=0.7
        )

        if similarity:

            return (
                "possible folder typo",
                broken_folder,
                actual_folder
            )

    return None


def diagnose_missing_path(clean_link, html_file):

    requested_path = Path(clean_link)

    current_folder = html_file.parent

    parts = requested_path.parts

    for index, part in enumerate(parts):

        is_last_part = index == len(parts) - 1

        if not current_folder.exists():
            return None

        # Check exact item
        exact_item = current_folder / part

        if exact_item.exists():

            if is_last_part:
                return None

            current_folder = exact_item
            continue

        # If this is the filename, stop here.
        # Filename diagnosis will handle it later.
        if is_last_part:
            return None

        # Search for similar folders
        similar_folders = find_similar_folders(
            part,
            current_folder
        )

        if similar_folders:

            best_folder = similar_folders[0]

            # Capitalization
            if part.lower() == best_folder.lower():

                return (
                    "capitalization difference",
                    part,
                    best_folder
                )

            # Spaces / underscores
            normalized_part = (
                part.replace("_", " ").lower()
            )

            normalized_best = (
                best_folder.replace("_", " ").lower()
            )

            if normalized_part == normalized_best:

                return (
                    "spaces / underscores difference",
                    part,
                    best_folder
                )

            # Folder typo
            return (
                "possible folder typo",
                part,
                best_folder
            )

        # No matching folder found
        return None

    return None


def contains_url_encoding(link):

    # Look for URL-encoded hexadecimal sequences
    return bool(
        re.search(
            r"%[0-9A-Fa-f]{2}",
            link
        )
    )


print("🔍 Student Hub Diagnostic Tool")
print("------------------------------")


html_files = list(
    hub_folder.rglob("*.html")
)

valid_links = []
broken_links = []
encoded_links = []


for html_file in html_files:

    content = html_file.read_text(
        encoding="utf-8"
    )

    links = re.findall(
        r'(?:href|src)=["\']([^"\']+)["\']',
        content
    )

    print(
        f"🔎 {html_file.name}: "
        f"{len(links)} references found"
    )

    for link in links:

        # Ignore external websites, anchors and email links
        if link.startswith(
            ("http://", "https://", "#", "mailto:")
        ):
            continue

        # Ignore JavaScript template variables
        if "${" in link:
            continue

        # Record URL-encoded links
        if contains_url_encoding(link):

            encoded_links.append(
                (html_file, link)
            )

        # Remove fragments and query parameters
        clean_link = link.split("#")[0].split("?")[0]

        # Decode URL encoding such as %20
        clean_link = unquote(clean_link)

        # Convert link into local path
        linked_file = html_file.parent / clean_link

        if linked_file.exists():

            requested_name = Path(
                clean_link
            ).name

            # Get actual filenames from the folder
            actual_names = []

            if linked_file.parent.exists():

                for entry in linked_file.parent.iterdir():

                    if entry.is_file():
                        actual_names.append(entry.name)

            # Exact filename
            if requested_name in actual_names:

                # Windows ignores folder capitalization,
                # so check the complete path separately.
                requested_path = Path(clean_link)

                actual_path = None

                for possible_file in (
                    hub_folder.rglob(requested_name)
                ):

                    if possible_file.is_file():

                        if possible_file.name.lower() == (
                            requested_name.lower()
                        ):

                            actual_path = (
                                possible_file.relative_to(
                                    html_file.parent
                                )
                            )

                            break

                if actual_path:

                    path_diagnosis = diagnose_path(
                        requested_path,
                        actual_path
                    )

                    if path_diagnosis:

                        broken_links.append(
                            (
                                html_file,
                                link,
                                "path_difference",
                                path_diagnosis
                            )
                        )

                    else:

                        valid_links.append(
                            (html_file, link)
                        )

                else:

                    valid_links.append(
                        (html_file, link)
                    )

            else:

                # Same filename, different capitalization
                lowercase_matches = [
                    name
                    for name in actual_names
                    if name.lower() == requested_name.lower()
                ]

                if lowercase_matches:

                    broken_links.append(
                        (
                            html_file,
                            link,
                            "capitalization",
                            None
                        )
                    )

                else:

                    valid_links.append(
                        (html_file, link)
                    )

        else:

            # Check folders before checking filename
            missing_path_diagnosis = (
                diagnose_missing_path(
                    clean_link,
                    html_file
                )
            )

            if missing_path_diagnosis:

                broken_links.append(
                    (
                        html_file,
                        link,
                        "path_difference",
                        missing_path_diagnosis
                    )
                )

            else:

                broken_links.append(
                    (
                        html_file,
                        link,
                        "missing",
                        None
                    )
                )


print()
print("📊 Link Analysis")
print("------------------------------")

print(
    f"🌐 HTML files scanned: "
    f"{len(html_files)}"
)

print(
    f"✅ Valid links: "
    f"{len(valid_links)}"
)

print(
    f"❌ Broken links: "
    f"{len(broken_links)}"
)


# URL encoding information
print()

print("🔗 URL ENCODING")
print("------------------------------")

print(
    f"ℹ️ Encoded links found: "
    f"{len(encoded_links)}"
)

if encoded_links:

    for html_file, link in encoded_links:

        print()

        print(
            f"📄 HTML file: "
            f"{html_file.relative_to(hub_folder)}"
        )

        print(
            f"🔗 Link: {link}"
        )

        print(
            "   ℹ️ This link contains "
            "URL-encoded characters."
        )

        print(
            "   The diagnostic tool decodes "
            "them before checking the path."
        )

else:

    print(
        "ℹ️ No URL-encoded links found."
    )


print()


if broken_links:

    print("❌ BROKEN LINKS")
    print("------------------------------")

    for html_file, link, reason, diagnosis_info in (
        broken_links
    ):

        print()

        print(
            f"📄 HTML file: "
            f"{html_file.relative_to(hub_folder)}"
        )

        print(
            f"🔗 Link: {link}"
        )

        # Direct filename capitalization problem
        if reason == "capitalization":

            print()
            print("🧠 Diagnosis:")

            print(
                "   The file exists locally, but its"
            )

            print(
                "   capitalization does not exactly match"
            )

            print(
                "   the requested path."
            )

            print()
            print("⚠️ Recommendation:")

            print(
                "   Check the capitalization carefully."
            )

            print(
                "   This can matter on case-sensitive hosting."
            )

            continue

        # Folder/path difference
        if reason == "path_difference":

            path_type, broken_part, actual_part = (
                diagnosis_info
            )

            print()
            print("💡 POSSIBLE PATH MATCH")

            print()
            print("🧠 Diagnosis:")

            if path_type == (
                "spaces / underscores difference"
            ):

                print(
                    "   A folder name differs by "
                    "spaces / underscores."
                )

            elif path_type == (
                "capitalization difference"
            ):

                print(
                    "   A folder name has a "
                    "capitalization difference."
                )

            elif path_type == (
                "possible folder typo"
            ):

                print(
                    "   A folder name looks similar "
                    "to an existing folder."
                )

            print()
            print("👉 Recommendation:")

            print(
                f"   Compare '{broken_part}'"
            )

            print(
                f"   with '{actual_part}'."
            )

            continue

        # Normal missing-file diagnosis
        clean_link = link.split("#")[0].split("?")[0]
        clean_link = unquote(clean_link)

        similar_files = find_similar_files(
            clean_link,
            hub_folder
        )

        if similar_files:

            best_match = similar_files[0]

            print()
            print("💡 POSSIBLE MATCH")

            print(
                "   🔎 "
                f"{best_match.relative_to(hub_folder).as_posix()}"
            )

            diagnosis = diagnose_filename(
                Path(clean_link).name,
                best_match.name
            )

            print()

            if diagnosis == "possible filename typo":

                print("🧠 Diagnosis:")

                print(
                    "   The requested filename looks "
                    "very similar"
                )

                print(
                    "   to an existing file."
                )

                print()
                print("👉 Recommendation:")

                print(
                    f"   Check whether "
                    f"'{Path(clean_link).name}'"
                )

                print(
                    f"   should be "
                    f"'{best_match.name}'."
                )

            elif diagnosis == (
                "spaces / underscores difference"
            ):

                print("🧠 Diagnosis:")

                print(
                    "   The filename differs by "
                    "spaces / underscores."
                )

                print()
                print("👉 Recommendation:")

                print(
                    f"   Compare "
                    f"'{Path(clean_link).name}'"
                )

                print(
                    f"   with "
                    f"'{best_match.name}'."
                )

            elif diagnosis == (
                "capitalization difference"
            ):

                print("🧠 Diagnosis:")

                print(
                    "   The filename has a "
                    "capitalization difference."
                )

                print()
                print("👉 Recommendation:")

                print(
                    f"   Check "
                    f"'{Path(clean_link).name}'"
                )

                print(
                    f"   against "
                    f"'{best_match.name}'."
                )

            else:

                print("🧠 Diagnosis:")

                print(
                    "   A similar existing file "
                    "was found."
                )

                print()
                print("👉 Recommendation:")

                print(
                    "   Check whether this is the "
                    "file you intended to link."
                )

        else:

            print()
            print("💡 Recommendation:")

            print(
                "   Check whether the file exists "
                "in the Hub."
            )

            print(
                "   Also verify the folder name, "
                "filename,"
            )

            print(
                "   capitalization and special characters."
            )

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
            reasons.append(
                "contains spaces"
            )

        if "_" in filename:
            reasons.append(
                "contains underscores"
            )

        if reasons:

            files_worth_checking.append(
                (item, reasons)
            )


print(
    f"⚠️ Files worth checking: "
    f"{len(files_worth_checking)}"
)


if files_worth_checking:

    print()
    print("📄 Files worth checking")
    print("------------------------------")

    for file, reasons in files_worth_checking:

        print()

        print(
            f"⚠️ "
            f"{file.relative_to(hub_folder)}"
        )

        print(
            f"   Reason: "
            f"{', '.join(reasons)}"
        )

else:

    print(
        "🎉 No files worth checking!"
    )