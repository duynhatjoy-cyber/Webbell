import os
import re
import json
import shutil
from html.parser import HTMLParser

ROOT = r"c:\Users\nguyen duy nhat\Downloads\Demo web bellhop"

PAGES = [
    ("Trang chủ-html", "Main.dc.html", "HomePage", "/"),
    ("SP – Bellhop PMS-html", "PMS.dc.html", "PMSPage", "/san-pham/bellhop-pms"),
    ("SP – Booking Engine-html", "BookingEngine.dc.html", "BookingEnginePage", "/san-pham/bellhop-booking-engine"),
    ("SP – Bellhop CMS-html", "CMS.dc.html", "CMSPage", "/san-pham/bellhop-cms"),
    ("SP – Bellhop Website-html", "Website.dc.html", "WebsitePage", "/san-pham/bellhop-website"),
    ("SP – Bellhop Message-html", "Message.dc.html", "MessagePage", "/san-pham/bellhop-message"),
    ("SP – AI Concierge-html", "AIConcierge.dc.html", "AIConciergePage", "/san-pham/bellhop-ai-concierge"),
    ("SP – Bellhop Payment-html", "Payment.dc.html", "PaymentPage", "/san-pham/bellhop-payment"),
    ("SP – Bellhop Finance-html", "Finance.dc.html", "FinancePage", "/san-pham/bellhop-finance"),
    ("Giải pháp – Khách sạn-html", "GiaiPhapKhachSan.dc.html", "HotelSolutionPage", "/giai-phap/khach-san"),
    ("Giải pháp – Homestay & Villa-html", "GiaiPhapHomestay.dc.html", "HomestaySolutionPage", "/giai-phap/homestay-villa"),
    ("Giải pháp – Chuỗi lưu trú-html", "GiaiPhapChuoi.dc.html", "ChainSolutionPage", "/giai-phap/chuoi-luu-tru"),
]

VOID_ELEMENTS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr"
}

ATTR_MAP = {
    "class": "className",
    "for": "htmlFor",
    "novalidate": "noValidate",
    "autocomplete": "autoComplete",
    "inputmode": "inputMode",
    "tabindex": "tabIndex",
    "readonly": "readOnly",
    "maxlength": "maxLength",
    "minlength": "minLength",
    "colspan": "colSpan",
    "rowspan": "rowSpan",
    "viewbox": "viewBox",
    "preserveaspectratio": "preserveAspectRatio",
    "stroke-width": "strokeWidth",
    "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin",
    "stroke-dasharray": "strokeDasharray",
    "stroke-dashoffset": "strokeDashoffset",
    "fill-rule": "fillRule",
    "clip-rule": "clipRule",
    "stop-color": "stopColor",
    "stop-opacity": "stopOpacity",
    "text-anchor": "textAnchor",
    "font-family": "fontFamily",
    "font-size": "fontSize",
    "font-weight": "fontWeight",
    "letter-spacing": "letterSpacing",
    "onclick": "onClick",
    "onchange": "onChange",
    "oninput": "onInput",
    "onsubmit": "onSubmit",
    "onmouseenter": "onMouseEnter",
    "onmouseleave": "onMouseLeave",
    "onfocus": "onFocus",
    "onblur": "onBlur",
}

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
    ("Payment.dc.html", "/san-pham/bellhop-payment"),
    ("GiaiPhapKhachSan.dc.html", "/giai-phap/khach-san"),
    ("GiaiPhapHomestay.dc.html", "/giai-phap/homestay-villa"),
    ("GiaiPhapChuoi.dc.html", "/giai-phap/chuoi-luu-tru"),
    ("Main.dc.html", "/"),
]

def normalize_urls_and_assets(text: str) -> str:
    for old, new in URL_REPLACEMENTS:
        text = text.replace(f'href="{old}"', f'href="{new}"')
        text = text.replace(f'href="/{old}"', f'href="{new}"')
        text = text.replace(f'href="{old}#', f'href="{new}#')
        text = text.replace(f'href="/{old}#', f'href="{new}#')
        text = text.replace(f"href: '{old}'", f"href: '{new}'")
        text = text.replace(f"href: '/{old}'", f"href: '{new}'")
    text = text.replace('./assets/', '/assets/')
    return text

class Node:
    def __init__(self, tag, attrs=None, text=None):
        self.tag = tag  # None for text node
        self.attrs = attrs or []
        self.text = text
        self.children = []

class TreeBuilder(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("root")
        self.stack = [self.root]

    def handle_starttag(self, tag, attrs):
        tag_low = tag.lower()
        # Preserve case for SVG elements like linearGradient, clipPath
        if tag_low == "lineargradient":
            tag = "linearGradient"
        elif tag_low == "radialgradient":
            tag = "radialGradient"
        elif tag_low == "clippath":
            tag = "clipPath"
        node = Node(tag, attrs)
        self.stack[-1].children.append(node)
        if tag_low not in VOID_ELEMENTS:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        tag_low = tag.lower()
        if tag_low == "lineargradient":
            tag = "linearGradient"
        elif tag_low == "radialgradient":
            tag = "radialGradient"
        elif tag_low == "clippath":
            tag = "clipPath"
        node = Node(tag, attrs)
        self.stack[-1].children.append(node)

    def handle_endtag(self, tag):
        tag_low = tag.lower()
        if tag_low in VOID_ELEMENTS:
            return
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag.lower() == tag_low:
                del self.stack[i:]
                break

    def handle_data(self, data):
        if data:
            self.stack[-1].children.append(Node(None, text=data))

def css_prop_to_camel(prop: str) -> str:
    prop = prop.strip()
    if prop.startswith("--"):
        return json.dumps(prop)
    if prop.startswith("-webkit-"):
        prop = "Webkit-" + prop[8:]
    elif prop.startswith("-moz-"):
        prop = "Moz-" + prop[5:]
    elif prop.startswith("-ms-"):
        prop = "ms-" + prop[4:]
    parts = prop.split("-")
    camel = parts[0] + "".join(p.capitalize() for p in parts[1:])
    return camel

def parse_style_string(style_str: str) -> str:
    entries = []
    for part in style_str.split(";"):
        if ":" not in part:
            continue
        k, v = part.split(":", 1)
        k = k.strip()
        v = v.strip()
        if not k or not v:
            continue
        # Remove !important in React inline style objects (React ignores properties with !important)
        v = re.sub(r"\s*!important\s*$", "", v, flags=re.IGNORECASE)
        camel_k = css_prop_to_camel(k)
        entries.append(f"{camel_k}: {json.dumps(v)}")
    return "{ " + ", ".join(entries) + " }"

def resolve_expr(expr: str, loop_vars: set) -> str:
    expr = expr.strip()
    if expr in ("true", "false", "null", "undefined") or re.match(r"^-?\d+(\.\d+)?$", expr):
        return expr
    m = re.match(r"^([A-Za-z_$][A-Za-z0-9_$]*)(.*)$", expr)
    if m:
        root_id, rest = m.group(1), m.group(2)
        if root_id in loop_vars:
            return f"{root_id}{rest}"
        return f"v.{root_id}{rest}"
    return expr

def compile_attr_value(attr_name: str, val: str, loop_vars: set) -> str:
    if val is None:
        return "{true}"
    if attr_name == "open" and val == "open":
        return "{true}"
    if attr_name == "style":
        return "{" + parse_style_string(val) + "}"

    # Exact single {{ expr }}
    m = re.match(r"^\s*\{\{([\s\S]+?)\}\}\s*$", val)
    if m:
        js_expr = resolve_expr(m.group(1), loop_vars)
        if attr_name == "checked":
            return f"{{Boolean({js_expr})}}"
        if attr_name == "value":
            return f"{{{js_expr} ?? ''}}"
        return f"{{{js_expr}}}"

    # Mixed text and {{ expr }}
    if "{{" in val:
        parts = re.split(r"\{\{([\s\S]+?)\}\}", val)
        tpl_parts = []
        for idx, part in enumerate(parts):
            if idx % 2 == 0:
                escaped = part.replace("\\", "\\\\").replace("`", "\\`").replace("${", "\\${")
                tpl_parts.append(escaped)
            else:
                js_expr = resolve_expr(part, loop_vars)
                tpl_parts.append(f"${{{js_expr} ?? ''}}")
        return "{`" + "".join(tpl_parts) + "`}"

    return json.dumps(val, ensure_ascii=False)

def compile_text_node(text: str, loop_vars: set) -> str:
    if not text.strip() and " " not in text:
        return ""
    if "{{" not in text:
        # Escape JSX special chars in text
        escaped = (
            text.replace("&", "&amp;")
            .replace("<", "&lt;")
            .replace(">", "&gt;")
            .replace("{", "&#123;")
            .replace("}", "&#125;")
        )
        return escaped
    parts = re.split(r"\{\{([\s\S]+?)\}\}", text)
    out = []
    for idx, part in enumerate(parts):
        if idx % 2 == 0:
            if part:
                escaped = (
                    part.replace("&", "&amp;")
                    .replace("<", "&lt;")
                    .replace(">", "&gt;")
                    .replace("{", "&#123;")
                    .replace("}", "&#125;")
                )
                out.append(escaped)
        else:
            js_expr = resolve_expr(part, loop_vars)
            out.append(f"{{{js_expr}}}")
    return "".join(out)

def node_to_jsx(node: Node, loop_vars: set, indent: int = 2) -> str:
    pad = "  " * indent
    if node.tag is None:
        txt = compile_text_node(node.text, loop_vars)
        return txt

    tag = node.tag
    tag_low = tag.lower()
    attrs_dict = dict(node.attrs)

    if tag_low == "helmet":
        return ""

    if tag_low == "dc-import":
        comp_name = attrs_dict.get("name") or attrs_dict.get("component")
        props_str = []
        for k, v in node.attrs:
            if k in ("name", "component", "hint-size"):
                continue
            camel_k = css_prop_to_camel(k)
            val_jsx = compile_attr_value(camel_k, v, loop_vars)
            props_str.append(f"{camel_k}={val_jsx}")
        joined = (" " + " ".join(props_str)) if props_str else ""
        return f"\n{pad}<{comp_name}{joined} />"

    if tag_low == "sc-if":
        cond_raw = attrs_dict.get("value", "")
        m = re.match(r"^\s*\{\{([\s\S]+?)\}\}\s*$", cond_raw)
        cond_js = resolve_expr(m.group(1), loop_vars) if m else "false"
        inner = "".join(node_to_jsx(c, loop_vars, indent + 1) for c in node.children)
        return f"\n{pad}{{Boolean({cond_js}) && (\n{pad}  <>{inner}\n{pad}  </>\n{pad})}}"

    if tag_low == "sc-for":
        list_raw = attrs_dict.get("list", "")
        as_var = attrs_dict.get("as", "item")
        m = re.match(r"^\s*\{\{([\s\S]+?)\}\}\s*$", list_raw)
        list_js = resolve_expr(m.group(1), loop_vars) if m else "[]"
        new_loop_vars = set(loop_vars) | {as_var, "$index"}
        inner = "".join(node_to_jsx(c, new_loop_vars, indent + 2) for c in node.children)
        return (
            f"\n{pad}{{({list_js} || []).map(({as_var}, $index) => (\n"
            f"{pad}  <React.Fragment key={{$index}}>{inner}\n"
            f"{pad}  </React.Fragment>\n"
            f"{pad}))}}"
        )

    # Normal HTML / SVG element
    jsx_attrs = []
    for k, v in node.attrs:
        k_low = k.lower()
        if k_low in ("hint-size", "hint-placeholder-val", "hint-placeholder-count"):
            continue
        jsx_k = ATTR_MAP.get(k_low, k)
        val_jsx = compile_attr_value(jsx_k, v, loop_vars)
        jsx_attrs.append(f"{jsx_k}={val_jsx}")

    attr_str = (" " + " ".join(jsx_attrs)) if jsx_attrs else ""
    if tag_low in VOID_ELEMENTS:
        return f"<{tag}{attr_str} />"

    children_jsx = "".join(node_to_jsx(c, loop_vars, indent + 1) for c in node.children)
    return f"<{tag}{attr_str}>{children_jsx}</{tag}>"

def extract_dc_parts(html_text: str):
    html_text = normalize_urls_and_assets(html_text)
    m_dc = re.search(r"<x-dc>([\s\S]*?)</x-dc>", html_text)
    template_html = m_dc.group(1) if m_dc else ""
    m_script = re.search(r"<script[^>]*data-dc-script[^>]*>([\s\S]*?)</script>", html_text)
    script_js = m_script.group(1).strip() if m_script else "class Component extends DCLogic { renderVals() { return {}; } }"
    m_title = re.search(r"<title>([\s\S]*?)</title>", html_text)
    title = m_title.group(1).strip() if m_title else "Bellhop"
    return template_html, script_js, title

def convert_to_jsx_component(html_path: str, comp_name: str, is_page: bool = True) -> str:
    with open(html_path, "r", encoding="utf-8") as f:
        raw = f.read()
    template_html, script_js, title = extract_dc_parts(raw)

    tb = TreeBuilder()
    tb.feed(template_html)
    jsx_body = "".join(node_to_jsx(c, set(), indent=3) for c in tb.root.children).strip()

    # Replace class Component extends DCLogic
    script_js = re.sub(r"class\s+Component\s+extends\s+DCLogic", f"export default class {comp_name} extends DCLogic", script_js)

    imports = [
        "import React from 'react';",
        "import { DCLogic } from '../utils/DCLogic';",
    ]
    if is_page:
        imports.append("import Header from '../components/Header';")
        imports.append("import Footer from '../components/Footer';")

    # Inject componentDidMount for page title and render() method before the closing brace of the class
    last_brace = script_js.rfind("}")
    class_head = script_js[:last_brace]

    extra_methods = ""
    if is_page:
        extra_methods += f"""
  componentDidMount() {{
    document.title = {json.dumps(title, ensure_ascii=False)};
  }}
"""
    elif comp_name == "Header":
        extra_methods += """
  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active && this.state.open) {
      this.setState({ open: null });
    }
  }
"""

    render_method = f"""{extra_methods}
  render() {{
    const v = {{ ...this.props, ...(this.renderVals() || {{}}) }};
    return (
      <>
        {jsx_body}
      </>
    );
  }}
}}
"""
    return "\n".join(imports) + "\n\n" + class_head + render_method

def main():
    # Prepare directories
    src_dir = os.path.join(ROOT, "src")
    comp_dir = os.path.join(src_dir, "components")
    pages_dir = os.path.join(src_dir, "pages")
    utils_dir = os.path.join(src_dir, "utils")
    styles_dir = os.path.join(src_dir, "styles")
    public_assets = os.path.join(ROOT, "public", "assets")

    for d in (comp_dir, pages_dir, utils_dir, styles_dir, public_assets):
        os.makedirs(d, exist_ok=True)

    # Copy all merged assets to public/assets
    root_assets = os.path.join(ROOT, "assets")
    if os.path.isdir(root_assets):
        for fname in os.listdir(root_assets):
            s = os.path.join(root_assets, fname)
            if os.path.isfile(s):
                shutil.copy2(s, os.path.join(public_assets, fname))

    # Copy CSS to src/styles (updating url("./assets/...") to url("/assets/..."))
    home_dir = os.path.join(ROOT, "Trang chủ-html")
    for css_name in ("site.css", "site-t.css"):
        with open(os.path.join(home_dir, css_name), "r", encoding="utf-8") as f:
            css_txt = f.read().replace('url("./assets/', 'url("/assets/')
        with open(os.path.join(styles_dir, css_name), "w", encoding="utf-8") as f:
            f.write(css_txt)

    # Write DCLogic utility
    with open(os.path.join(utils_dir, "DCLogic.js"), "w", encoding="utf-8") as f:
        f.write("""import React from 'react';

export class DCLogic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  renderVals() {
    return {};
  }
}
""")

    # Convert Header and Footer
    header_jsx = convert_to_jsx_component(os.path.join(home_dir, "Header.dc.html"), "Header", is_page=False)
    with open(os.path.join(comp_dir, "Header.jsx"), "w", encoding="utf-8") as f:
        f.write(header_jsx)

    footer_jsx = convert_to_jsx_component(os.path.join(home_dir, "Footer.dc.html"), "Footer", is_page=False)
    with open(os.path.join(comp_dir, "Footer.jsx"), "w", encoding="utf-8") as f:
        f.write(footer_jsx)

    # Convert all 12 pages
    for folder, dc_file, comp_name, route in PAGES:
        dc_path = os.path.join(ROOT, folder, dc_file)
        page_jsx = convert_to_jsx_component(dc_path, comp_name, is_page=True)
        with open(os.path.join(pages_dir, f"{comp_name}.jsx"), "w", encoding="utf-8") as f:
            f.write(page_jsx)

    # Write src/App.jsx with React Router & SPA click interceptor for https://bellhop.vn/... links
    app_jsx = """import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PMSPage from './pages/PMSPage';
import BookingEnginePage from './pages/BookingEnginePage';
import CMSPage from './pages/CMSPage';
import WebsitePage from './pages/WebsitePage';
import MessagePage from './pages/MessagePage';
import AIConciergePage from './pages/AIConciergePage';
import PaymentPage from './pages/PaymentPage';
import FinancePage from './pages/FinancePage';
import HotelSolutionPage from './pages/HotelSolutionPage';
import HomestaySolutionPage from './pages/HomestaySolutionPage';
import ChainSolutionPage from './pages/ChainSolutionPage';

function SpaRouterHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleClick = (e) => {
      const a = e.target.closest ? e.target.closest('a[href]') : null;
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const href = a.getAttribute('href') || '';
      if (!href || href === '#' || href.startsWith('tel:') || href.startsWith('mailto:')) return;

      if (href.startsWith('#')) {
        const el = document.getElementById(href.slice(1));
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', href);
        }
        return;
      }

      if (href.startsWith('https://bellhop.vn')) {
        e.preventDefault();
        const target = href.slice('https://bellhop.vn'.length) || '/';
        navigate(target);
        return;
      }

      if (href.startsWith('/')) {
        e.preventDefault();
        navigate(href);
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [navigate]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <SpaRouterHandler />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Main.dc.html" element={<Navigate to="/" replace />} />

        {/* Sản phẩm */}
        <Route path="/san-pham/bellhop-pms" element={<PMSPage />} />
        <Route path="/PMS.dc.html" element={<Navigate to="/san-pham/bellhop-pms" replace />} />

        <Route path="/san-pham/bellhop-booking-engine" element={<BookingEnginePage />} />
        <Route path="/BookingEngine.dc.html" element={<Navigate to="/san-pham/bellhop-booking-engine" replace />} />

        <Route path="/san-pham/bellhop-cms" element={<CMSPage />} />
        <Route path="/CMS.dc.html" element={<Navigate to="/san-pham/bellhop-cms" replace />} />

        <Route path="/san-pham/bellhop-website" element={<WebsitePage />} />
        <Route path="/Website.dc.html" element={<Navigate to="/san-pham/bellhop-website" replace />} />

        <Route path="/san-pham/bellhop-message" element={<MessagePage />} />
        <Route path="/Message.dc.html" element={<Navigate to="/san-pham/bellhop-message" replace />} />

        <Route path="/san-pham/bellhop-ai-concierge" element={<AIConciergePage />} />
        <Route path="/AIConcierge.dc.html" element={<Navigate to="/san-pham/bellhop-ai-concierge" replace />} />

        <Route path="/san-pham/bellhop-finance" element={<FinancePage />} />
        <Route path="/Finance.dc.html" element={<Navigate to="/san-pham/bellhop-finance" replace />} />

        <Route path="/san-pham/bellhop-payment" element={<PaymentPage />} />
        <Route path="/Payment.dc.html" element={<Navigate to="/san-pham/bellhop-payment" replace />} />

        {/* Giải pháp */}
        <Route path="/giai-phap/khach-san" element={<HotelSolutionPage />} />
        <Route path="/GiaiPhapKhachSan.dc.html" element={<Navigate to="/giai-phap/khach-san" replace />} />

        <Route path="/giai-phap/homestay-villa" element={<HomestaySolutionPage />} />
        <Route path="/GiaiPhapHomestay.dc.html" element={<Navigate to="/giai-phap/homestay-villa" replace />} />

        <Route path="/giai-phap/chuoi-luu-tru" element={<ChainSolutionPage />} />
        <Route path="/GiaiPhapChuoi.dc.html" element={<Navigate to="/giai-phap/chuoi-luu-tru" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
"""
    with open(os.path.join(src_dir, "App.jsx"), "w", encoding="utf-8") as f:
        f.write(app_jsx)

    # Write src/main.jsx
    main_jsx = """import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/site.css';
import './styles/site-t.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
"""
    with open(os.path.join(src_dir, "main.jsx"), "w", encoding="utf-8") as f:
        f.write(main_jsx)

    # Write Vite index.html
    vite_index_html = """<!doctype html>
<html lang="vi">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bellhop – Nền tảng quản lý lưu trú thông minh</title>
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>html, body { margin: 0; padding: 0; }</style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
"""
    with open(os.path.join(ROOT, "index.html"), "w", encoding="utf-8") as f:
        f.write(vite_index_html)

    # Write package.json
    pkg_json = {
        "name": "bellhop-web",
        "private": True,
        "version": "1.0.0",
        "type": "module",
        "scripts": {
            "dev": "vite --port 3000",
            "build": "vite build",
            "preview": "vite preview --port 3000"
        },
        "dependencies": {
            "react": "^18.3.1",
            "react-dom": "^18.3.1",
            "react-router-dom": "^6.28.0"
        },
        "devDependencies": {
            "@vitejs/plugin-react": "^4.3.3",
            "vite": "^5.4.10"
        }
    }
    with open(os.path.join(ROOT, "package.json"), "w", encoding="utf-8") as f:
        json.dump(pkg_json, f, indent=2, ensure_ascii=False)

    # Write vite.config.js
    vite_cfg = """import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  }
});
"""
    with open(os.path.join(ROOT, "vite.config.js"), "w", encoding="utf-8") as f:
        f.write(vite_cfg)

    print("Successfully generated ReactJS + Vite project!")

if __name__ == "__main__":
    main()
