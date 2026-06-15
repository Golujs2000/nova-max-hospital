import os
import shutil

assets_dir = r"E:\CGP360_PROJECTS\SARVADA HOSPITO CARE\assets"

rename_map = {
    "ChatGPT Image Jun 13, 2026, 06_39_04 AM.png": "chatbot-medical-assistance.png",
    "SARVADA HOSPITO CARE.png": "sarvada-hospito-care-logo-text.png",
    "SARVADA HOSPITO CARE01.png": "sarvada-hospito-care-logo-icon.png",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.16 PM (1).jpeg": "medical-store-counter.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.16 PM.jpeg": "icu-nicu-waiting-area.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.17 PM (1).jpeg": "hospital-exterior-wide-angle.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.17 PM.jpeg": "hospital-exterior-wide-angle-2.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.18 PM (1).jpeg": "hospital-entrance-door.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.18 PM (2).jpeg": "hospital-entrance-door-angled.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.18 PM.jpeg": "reception-desk-1.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.19 PM (1).jpeg": "reception-desk-2.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.19 PM.jpeg": "pharmacy-counter.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.20 PM (1).jpeg": "reception-desk-wide.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.20 PM.jpeg": "pharmacy-room-shelves.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.21 PM (1).jpeg": "pharmacy-exterior-window.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.21 PM.jpeg": "pharmacy-counter-front.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.22 PM (1).jpeg": "waiting-area-chairs.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.22 PM.jpeg": "pharmacy-room-shelves-alt.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.23 PM (1).jpeg": "icu-nicu-entrance.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.23 PM (2).jpeg": "patient-ward-room.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.23 PM.jpeg": "icu-nicu-entrance-open.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.24 PM (1).jpeg": "hospital-corridor.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.24 PM.jpeg": "patient-ward-room-alt.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.25 PM (1).jpeg": "operation-theater-1.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.25 PM.jpeg": "hospital-corridor-alt.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.26 PM (1).jpeg": "operation-theater-2.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.02.23 PM\WhatsApp Image 2026-06-09 at 5.52.26 PM.jpeg": "operation-theater-3.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.06.47 PM\WhatsApp Image 2026-06-09 at 5.57.27 PM (1).jpeg": "patient-bed-urine-bag.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.06.47 PM\WhatsApp Image 2026-06-09 at 5.57.27 PM (2).jpeg": "patient-standing-urine-bag.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.06.47 PM\WhatsApp Image 2026-06-09 at 5.57.27 PM.jpeg": "patient-bed-oxygen.jpeg",
    r"WhatsApp Unknown 2026-06-10 at 12.06.47 PM\WhatsApp Video 2026-06-09 at 5.57.27 PM.mp4": "patient-bed-ventilator.mp4",
    "hero backgound pic.png": "hero-banner-sarvada-hospito-care.png",
    "hero background image.png": "hospital-building-left-aligned.png",
    "hero bakgound pic01.png": "hospital-building-right-aligned.png",
    "neemkroli baba.png": "hospital-building-center.png",
    "neemkroli baba01.png": "neem-karoli-baba-statue.png",
    "screencapture-preview-themeforest-net-item-valeo-health-center-clinic-hospital-wordpress-theme-full-screen-preview-17966071-2026-06-11-00_22_43.png": "website-theme-inspiration.png"
}

for old_name, new_name in rename_map.items():
    old_path = os.path.join(assets_dir, old_name)
    new_path = os.path.join(assets_dir, new_name)
    
    if os.path.exists(old_path):
        os.rename(old_path, new_path)
        print(f"Renamed: '{old_name}' to '{new_name}'")
    else:
        print(f"File not found: '{old_name}'")

# Clean up empty folders if any
for root, dirs, files in os.walk(assets_dir, topdown=False):
    for dir_name in dirs:
        dir_path = os.path.join(root, dir_name)
        if not os.listdir(dir_path):  # if empty
            os.rmdir(dir_path)
            print(f"Removed empty directory: {dir_path}")
