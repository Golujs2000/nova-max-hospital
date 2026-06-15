import os
import re

assets_dir = r"E:\CGP360_PROJECTS\PATNA LAPRO AND STONE HEALTHCARE\ASSETS"
gallery_path = r"E:\CGP360_PROJECTS\PATNA LAPRO AND STONE HEALTHCARE\PATNA-LAPRO-STONE-HEALTHCARE\scratch\gallery.html"

# Define the folder renames
folder_mapping = {
    "WhatsApp Unknown 2026-06-08 at 9.29.26 AM": "surgery_cases_batch_1",
    "WhatsApp Unknown 2026-06-08 at 9.30.06 AM": "surgery_cases_batch_2",
    "WhatsApp Unknown 2026-06-08 at 9.30.48 AM": "nurses_day_2026"
}

# Define the file mapping (relative to the ASSETS folder, using backslashes for match/rename)
file_mapping = {
    # --- Root ASSETS Files ---
    "WhatsApp Image 2026-06-07 at 7.27.04 PM.jpeg": "hospital_staff_group_photo.jpeg",
    "WhatsApp Image 2026-06-07 at 7.27.04 PM (1).jpeg": "employee_of_the_month_presentation.jpeg",
    "WhatsApp Image 2026-06-07 at 7.27.04 PM (2).jpeg": "patient_discharge_bouquet.jpeg",
    "WhatsApp Video 2026-06-07 at 7.23.33 PM.mp4": "clinic_event_video_01.mp4",
    "WhatsApp Video 2026-06-07 at 7.25.30 PM.mp4": "clinic_event_video_02.mp4",
    "WhatsApp Unknown 2026-06-08 at 9.29.26 AM.zip": "backup_surgery_cases_batch_1.zip",
    "WhatsApp Unknown 2026-06-08 at 9.30.06 AM.zip": "backup_surgery_cases_batch_2.zip",
    "WhatsApp Unknown 2026-06-08 at 9.30.48 AM.zip": "backup_nurses_day_2026.zip",

    # --- WhatsApp Unknown 2026-06-08 at 9.29.26 AM ---
    r"WhatsApp Unknown 2026-06-08 at 9.29.26 AM\WhatsApp Image 2026-06-07 at 7.27.04 PM.jpeg": r"surgery_cases_batch_1\employee_of_the_month_award.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.29.26 AM\WhatsApp Image 2026-06-07 at 7.27.57 PM.jpeg": r"surgery_cases_batch_1\laparoscopic_surgery_in_progress_01.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.29.26 AM\WhatsApp Image 2026-06-07 at 7.27.57 PM (1).jpeg": r"surgery_cases_batch_1\laparoscopic_surgery_in_progress_02.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.29.26 AM\WhatsApp Video 2026-06-07 at 7.27.14 PM.mp4": r"surgery_cases_batch_1\surgery_procedure_video_01.mp4",
    r"WhatsApp Unknown 2026-06-08 at 9.29.26 AM\WhatsApp Video 2026-06-07 at 7.27.14 PM (1).mp4": r"surgery_cases_batch_1\surgery_procedure_video_02.mp4",
    r"WhatsApp Unknown 2026-06-08 at 9.29.26 AM\WhatsApp Video 2026-06-07 at 7.27.14 PM (2).mp4": r"surgery_cases_batch_1\surgery_procedure_video_03.mp4",

    # --- WhatsApp Unknown 2026-06-08 at 9.30.48 AM ---
    r"WhatsApp Unknown 2026-06-08 at 9.30.48 AM\WhatsApp Image 2026-06-05 at 1.30.10 PM.jpeg": r"nurses_day_2026\nurses_day_celebration_01.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.48 AM\WhatsApp Image 2026-06-05 at 1.30.11 PM.jpeg": r"nurses_day_2026\nurses_day_celebration_02.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.48 AM\WhatsApp Image 2026-06-05 at 1.30.11 PM (1).jpeg": r"nurses_day_2026\nurses_day_celebration_03.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.48 AM\WhatsApp Image 2026-06-05 at 1.30.11 PM (2).jpeg": r"nurses_day_2026\nurses_day_celebration_04.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.48 AM\WhatsApp Image 2026-06-05 at 1.30.11 PM (3).jpeg": r"nurses_day_2026\nurses_day_celebration_05.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.48 AM\WhatsApp Image 2026-06-05 at 1.30.11 PM (4).jpeg": r"nurses_day_2026\nurses_day_celebration_06.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.48 AM\WhatsApp Image 2026-06-05 at 1.30.11 PM (5).jpeg": r"nurses_day_2026\nurses_day_celebration_07.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.48 AM\WhatsApp Video 2026-06-05 at 1.30.20 PM.mp4": r"nurses_day_2026\nurses_day_celebration_video.mp4",

    # --- WhatsApp Unknown 2026-06-08 at 9.30.06 AM ---
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.33.13 PM.jpeg": r"surgery_cases_batch_2\pediatric_patient_family_staff_01.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.33.13 PM (1).jpeg": r"surgery_cases_batch_2\laparoscopic_surgery_in_progress_03.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.33.18 PM.jpeg": r"surgery_cases_batch_2\orthopedic_patient_boy_family_01.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.33.18 PM (1).jpeg": r"surgery_cases_batch_2\orthopedic_patient_boy_family_02.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.33.18 PM (2).jpeg": r"surgery_cases_batch_2\orthopedic_patient_boy_family_03.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.33.18 PM (3).jpeg": r"surgery_cases_batch_2\orthopedic_patient_boy_family_04.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.33.18 PM (4).jpeg": r"surgery_cases_batch_2\orthopedic_patient_boy_family_05.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.35.04 PM.jpeg": r"surgery_cases_batch_2\pediatric_patient_family_staff_02.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.37.14 PM.jpeg": r"surgery_cases_batch_2\newspaper_clipping_gist_cancer_01.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.37.15 PM.jpeg": r"surgery_cases_batch_2\newspaper_clipping_gist_cancer_02.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.37.15 PM (1).jpeg": r"surgery_cases_batch_2\newspaper_clipping_gist_cancer_03.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.37.16 PM.jpeg": r"surgery_cases_batch_2\newspaper_clipping_small_intestine_surgery_01.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.37.16 PM (1).jpeg": r"surgery_cases_batch_2\newspaper_clipping_small_intestine_surgery_02.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.37.16 PM (2).jpeg": r"surgery_cases_batch_2\newspaper_clipping_small_intestine_surgery_03.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.37.16 PM (3).jpeg": r"surgery_cases_batch_2\newspaper_clipping_successful_surgery.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.37.16 PM (4).jpeg": r"surgery_cases_batch_2\newspaper_clipping_small_intestine_surgery_04.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.37.16 PM (5).jpeg": r"surgery_cases_batch_2\surgical_team_post_surgery_specimen_01.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.37.16 PM (6).jpeg": r"surgery_cases_batch_2\surgical_team_post_surgery_specimen_02.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.37.16 PM (7).jpeg": r"surgery_cases_batch_2\patient_surgical_gown_family_staff_01.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.37.16 PM (8).jpeg": r"surgery_cases_batch_2\patient_recovery_victory_bed_01.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.37.16 PM (9).jpeg": r"surgery_cases_batch_2\patient_recovery_victory_bed_02.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.37.16 PM (10).jpeg": r"surgery_cases_batch_2\patient_surgical_gown_family_staff_02.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.37.16 PM (11).jpeg": r"surgery_cases_batch_2\doctor_sanjeev_kumar_with_visitors.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.37.16 PM (12).jpeg": r"surgery_cases_batch_2\doctor_consultation_infant_patient.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.37.16 PM (13).jpeg": r"surgery_cases_batch_2\surgeons_operating_room_instruments.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.37.16 PM (14).jpeg": r"surgery_cases_batch_2\laparoscopic_surgery_in_progress_04.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.37.16 PM (15).jpeg": r"surgery_cases_batch_2\laparoscopic_surgery_in_progress_05.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.37.16 PM (16).jpeg": r"surgery_cases_batch_2\patient_recovery_victory_staff_group.jpeg",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Image 2026-06-07 at 7.37.16 PM (17).jpeg": r"surgery_cases_batch_2\laparoscopic_surgery_in_progress_06.jpeg",
    
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Video 2026-06-07 at 7.34.23 PM.mp4": r"surgery_cases_batch_2\patient_testimonial_video_01.mp4",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Video 2026-06-07 at 7.34.23 PM (1).mp4": r"surgery_cases_batch_2\patient_testimonial_video_02.mp4",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Video 2026-06-07 at 7.34.23 PM (2).mp4": r"surgery_cases_batch_2\patient_testimonial_video_03.mp4",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Video 2026-06-07 at 7.34.23 PM (3).mp4": r"surgery_cases_batch_2\patient_testimonial_video_04.mp4",
    r"WhatsApp Unknown 2026-06-08 at 9.30.06 AM\WhatsApp Video 2026-06-07 at 7.34.52 PM.mp4": r"surgery_cases_batch_2\patient_testimonial_video_05.mp4"
}

# Step 1: Create target folders if they do not exist
target_subfolders = set(os.path.dirname(val) for val in file_mapping.values() if os.path.dirname(val))
for subf in target_subfolders:
    os.makedirs(os.path.join(assets_dir, subf), exist_ok=True)

# Step 2: Rename all files
renamed_count = 0
for src_rel, dest_rel in file_mapping.items():
    src_full = os.path.join(assets_dir, src_rel)
    dest_full = os.path.join(assets_dir, dest_rel)
    if os.path.exists(src_full):
        try:
            os.rename(src_full, dest_full)
            print(f"Renamed: {src_rel} -> {dest_rel}")
            renamed_count += 1
        except Exception as e:
            print(f"Error renaming {src_rel} -> {dest_rel}: {e}")
    else:
        # Check if already renamed (maybe script ran before)
        if os.path.exists(dest_full):
            print(f"Already renamed: {dest_rel}")
        else:
            print(f"Source not found: {src_rel}")

print(f"Successfully renamed {renamed_count} files.")

# Step 3: Delete old directories if they are empty
for old_dir in folder_mapping.keys():
    old_full = os.path.join(assets_dir, old_dir)
    if os.path.exists(old_full):
        try:
            # check if directory has files remaining
            remaining_files = os.listdir(old_full)
            if not remaining_files:
                os.rmdir(old_full)
                print(f"Removed empty directory: {old_dir}")
            else:
                print(f"Directory not empty: {old_dir} contains {remaining_files}")
        except Exception as e:
            print(f"Error removing directory {old_dir}: {e}")

# Step 4: Update gallery.html references
if os.path.exists(gallery_path):
    with open(gallery_path, "r", encoding="utf-8") as f:
        html_content = f.read()

    original_length = len(html_content)
    
    # We need to replace references inside gallery.html.
    # The file contains relative links like "../../ASSETS/WhatsApp Image..." or "../../ASSETS/WhatsApp Unknown..."
    # Let's perform case-insensitive replacement of paths
    for src_rel, dest_rel in file_mapping.items():
        # Replace backslashes in mapping to forward slashes for HTML links
        html_src_rel = src_rel.replace("\\", "/")
        html_dest_rel = dest_rel.replace("\\", "/")
        
        # We need to handle both URL-encoded spaces and regular spaces in HTML src tags
        # e.g., "WhatsApp%20Unknown%202026-06-08%20at%209.29.26%20AM"
        encoded_src_rel = html_src_rel.replace(" ", "%20")
        
        # We replace the full path parts in HTML
        # Match with forward slashes (e.g. in src="..." attribute)
        html_content = re.sub(re.escape(html_src_rel), lambda m: html_dest_rel, html_content, flags=re.IGNORECASE)
        html_content = re.sub(re.escape(encoded_src_rel), lambda m: html_dest_rel, html_content, flags=re.IGNORECASE)
        
        # Match with backslashes (e.g. in absolute path text block)
        html_src_back = src_rel.replace("/", "\\")
        html_dest_back = dest_rel.replace("/", "\\")
        html_content = re.sub(re.escape(html_src_back), lambda m: html_dest_back, html_content, flags=re.IGNORECASE)
        html_content = re.sub(re.escape(html_src_back.replace(" ", "%20")), lambda m: html_dest_back, html_content, flags=re.IGNORECASE)

    # Let's replace title and headers as well
    html_content = re.sub(r"<title>WhatsApp Images Gallery</title>", "<title>Clinic Images & Video Gallery</title>", html_content)
    html_content = re.sub(r"<h1>WhatsApp Images Gallery \(42 images\)</h1>", "<h1>Clinic Images & Video Gallery (42 images)</h1>", html_content)

    with open(gallery_path, "w", encoding="utf-8") as f:
        f.write(html_content)
        
    print(f"Updated gallery.html. Bytes change: {original_length} -> {len(html_content)}")
else:
    print("gallery.html not found.")
