import os
import shutil

ROOT = r"c:\Users\nguyen duy nhat\Downloads\Demo web bellhop"

FOLDERS = [
    ("Trang chủ-html", "Main.dc.html", None),
    ("SP – Bellhop PMS-html", "PMS.dc.html", "san-pham/bellhop-pms"),
    ("SP – Booking Engine-html", "BookingEngine.dc.html", "san-pham/bellhop-booking-engine"),
    ("SP – Bellhop CMS-html", "CMS.dc.html", "san-pham/bellhop-cms"),
    ("SP – Bellhop Website-html", "Website.dc.html", "san-pham/bellhop-website"),
    ("SP – Bellhop Message-html", "Message.dc.html", "san-pham/bellhop-message"),
    ("SP – AI Concierge-html", "AIConcierge.dc.html", "san-pham/bellhop-ai-concierge"),
    ("SP – Bellhop Payment-html", "Payment.dc.html", "san-pham/bellhop-payment"),
    ("SP – Bellhop Finance-html", "Finance.dc.html", "san-pham/bellhop-finance"),
    ("Giải pháp – Khách sạn-html", "GiaiPhapKhachSan.dc.html", "giai-phap/khach-san"),
    ("Giải pháp – Homestay & Villa-html", "GiaiPhapHomestay.dc.html", "giai-phap/homestay-villa"),
    ("Giải pháp – Chuỗi lưu trú-html", "GiaiPhapChuoi.dc.html", "giai-phap/chuoi-luu-tru"),
]

URL_REPLACEMENTS = [
    ("PMS.dc.html#buong-phong", "https://bellhop.vn/san-pham/bellhop-pms#buong-phong"),
    ("PMS.dc.html#tai-chinh", "https://bellhop.vn/san-pham/bellhop-pms#tai-chinh"),
    ("PMS.dc.html", "https://bellhop.vn/san-pham/bellhop-pms"),
    ("BookingEngine.dc.html", "https://bellhop.vn/san-pham/bellhop-booking-engine"),
    ("CMS.dc.html", "https://bellhop.vn/san-pham/bellhop-cms"),
    ("Website.dc.html", "https://bellhop.vn/san-pham/bellhop-website"),
    ("Message.dc.html", "https://bellhop.vn/san-pham/bellhop-message"),
    ("AIConcierge.dc.html", "https://bellhop.vn/san-pham/bellhop-ai-concierge"),
    ("Finance.dc.html", "https://bellhop.vn/san-pham/bellhop-finance"),
]

def apply_url_replacements(text: str, root_relative_assets: bool = False) -> str:
    for old, new in URL_REPLACEMENTS:
        text = text.replace(f'href="{old}"', f'href="{new}"')
        text = text.replace(f"href: '{old}'", f"href: '{new}'")
    if root_relative_assets:
        text = text.replace('src="./vendor/', 'src="/vendor/')
        text = text.replace('src="./support.js"', 'src="/support.js"')
        text = text.replace('href="site.css"', 'href="/site.css"')
        text = text.replace('href="site-t.css"', 'href="/site-t.css"')
        text = text.replace('./assets/', '/assets/')
        # Make remaining .dc.html links root-relative so they work from nested /san-pham/* paths
        for page in ["Main.dc.html", "Payment.dc.html", "GiaiPhapKhachSan.dc.html", "GiaiPhapHomestay.dc.html", "GiaiPhapChuoi.dc.html", "About.dc.html"]:
            text = text.replace(f'href="{page}', f'href="/{page}')
            text = text.replace(f"href: '{page}", f"href: '/{page}")
    return text

def main():
    assets_dst = os.path.join(ROOT, "assets")
    vendor_dst = os.path.join(ROOT, "vendor")
    os.makedirs(assets_dst, exist_ok=True)
    os.makedirs(vendor_dst, exist_ok=True)

    # 1. Merge all assets and vendor files into root
    copied_assets = 0
    for folder, _, _ in FOLDERS:
        folder_path = os.path.join(ROOT, folder)
        if not os.path.isdir(folder_path):
            continue
        src_assets = os.path.join(folder_path, "assets")
        if os.path.isdir(src_assets):
            for fname in os.listdir(src_assets):
                src_file = os.path.join(src_assets, fname)
                dst_file = os.path.join(assets_dst, fname)
                if os.path.isfile(src_file) and not os.path.exists(dst_file):
                    shutil.copy2(src_file, dst_file)
                    copied_assets += 1
        src_vendor = os.path.join(folder_path, "vendor")
        if os.path.isdir(src_vendor):
            for fname in os.listdir(src_vendor):
                src_file = os.path.join(src_vendor, fname)
                dst_file = os.path.join(vendor_dst, fname)
                if os.path.isfile(src_file) and not os.path.exists(dst_file):
                    shutil.copy2(src_file, dst_file)

    # 2. Copy shared CSS and support.js to root
    home_dir = os.path.join(ROOT, "Trang chủ-html")
    shutil.copy2(os.path.join(home_dir, "site.css"), os.path.join(ROOT, "site.css"))
    shutil.copy2(os.path.join(home_dir, "site-t.css"), os.path.join(ROOT, "site-t.css"))

    with open(os.path.join(home_dir, "support.js"), "r", encoding="utf-8") as f:
        support_js = f.read()

    # Update support.js at root so <dc-import> fetches /Header.dc.html and /Footer.dc.html from root
    # and links to https://bellhop.vn/... work locally when testing on localhost/127.0.0.1
    local_router_snippet = """
;(()=>{if(typeof document<"u"){document.addEventListener("click",e=>{const a=e.target&&e.target.closest?e.target.closest("a[href]"):null;if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;const h=a.getAttribute("href")||"";if(h.startsWith("https://bellhop.vn")&&(location.hostname==="localhost"||location.hostname==="127.0.0.1")){e.preventDefault();const p=h.slice("https://bellhop.vn".length)||"/";location.href=p;}});}})();
"""
    support_js_sub = support_js
    if "bellhop.vn" not in support_js_sub:
        support_js_sub += local_router_snippet

    support_js_root = support_js_sub.replace('var ln=".";', 'var ln="";')

    with open(os.path.join(ROOT, "support.js"), "w", encoding="utf-8") as f:
        f.write(support_js_root)

    for folder, _, _ in FOLDERS:
        sub_sup = os.path.join(ROOT, folder, "support.js")
        if os.path.exists(sub_sup):
            with open(sub_sup, "w", encoding="utf-8") as f:
                f.write(support_js_sub)

    # 3. Process Header.dc.html and Footer.dc.html (both in root and in each subfolder)
    for shared_name in ["Header.dc.html", "Footer.dc.html"]:
        with open(os.path.join(home_dir, shared_name), "r", encoding="utf-8") as f:
            raw_shared = f.read()
        # Write root version (with root-relative assets and links)
        root_shared = apply_url_replacements(raw_shared, root_relative_assets=True)
        with open(os.path.join(ROOT, shared_name), "w", encoding="utf-8") as f:
            f.write(root_shared)
        # Update subfolder versions too
        sub_shared = apply_url_replacements(raw_shared, root_relative_assets=False)
        for folder, _, _ in FOLDERS:
            sub_path = os.path.join(ROOT, folder, shared_name)
            if os.path.exists(sub_path):
                with open(sub_path, "w", encoding="utf-8") as f:
                    f.write(sub_shared)

    # 4. Process all 12 page .dc.html files
    for folder, dc_file, clean_route in FOLDERS:
        src_dc_path = os.path.join(ROOT, folder, dc_file)
        with open(src_dc_path, "r", encoding="utf-8") as f:
            raw_html = f.read()

        # Update the file in its original subfolder
        updated_sub_html = apply_url_replacements(raw_html, root_relative_assets=False)
        with open(src_dc_path, "w", encoding="utf-8") as f:
            f.write(updated_sub_html)

        # Write merged file to root
        merged_html = apply_url_replacements(raw_html, root_relative_assets=True)
        with open(os.path.join(ROOT, dc_file), "w", encoding="utf-8") as f:
            f.write(merged_html)

        if dc_file == "Main.dc.html":
            with open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8") as f:
                f.write(merged_html)

        if clean_route:
            route_dir = os.path.join(ROOT, *clean_route.split("/"))
            os.makedirs(route_dir, exist_ok=True)
            with open(os.path.join(route_dir, "index.html"), "w", encoding="utf-8") as f:
                f.write(merged_html)

    print(f"Done! Merged 12 pages and {copied_assets} unique assets into root.")

if __name__ == "__main__":
    main()
