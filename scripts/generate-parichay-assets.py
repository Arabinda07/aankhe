from __future__ import annotations

import math
import shutil
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
ILLUSTRATIONS = PUBLIC / "illustrations"
ICONS = PUBLIC / "icons"
GENERATED_PREVIEW_DIR = Path(
    r"C:\Users\Arabinda\.codex\generated_images\019e3009-c2b0-78f1-a699-d67edeb1e381"
)


LIGHT = {
    "bg": "#F8F1EA",
    "paper": "#FFF7ED",
    "paper2": "#F2E3D2",
    "ink": "#34231F",
    "muted": "#7C6158",
    "lac": "#A85A44",
    "lac2": "#C86757",
    "rose": "#6E2D3F",
    "plum": "#4A314F",
    "sandal": "#E5A95D",
    "ember": "#D56A3E",
    "veil": "#D8B7A2",
    "shadow": "#D9C4B4",
}

DARK = {
    "bg": "#281C1A",
    "paper": "#3A2924",
    "paper2": "#4A342D",
    "ink": "#F7E9D8",
    "muted": "#C5A694",
    "lac": "#C97862",
    "lac2": "#E09276",
    "rose": "#8E4558",
    "plum": "#8D6B92",
    "sandal": "#D7A660",
    "ember": "#E07A4F",
    "veil": "#6B4D48",
    "shadow": "#1C1312",
}


ASSETS = [
    ("blank-artifact", "mirror", 0),
    ("no-results", "search", 1),
    ("no-included-answers", "sealed-note", 2),
    ("private-only-preview", "lock", 3),
    ("omitted-sections", "veil", 4),
    ("first-answer", "pencil-note", 5),
    ("skipped-question", "ribbon", 6),
    ("broken-shared-link", "broken-link", 7),
    ("copy-link-success", "linked-seal", 8),
    ("copy-link-failure", "warning-seal", 9),
    ("export-progress", "paper-ribbon", 10),
    ("export-failure", "split-paper", 11),
    ("install-prompt", "phone-seal", 12),
    ("already-installed", "home-note", 13),
    ("offline-saved", "closed-desk", 14),
    ("fresh-version", "fresh-ribbon", 15),
    ("visibility-set", "visibility", 16),
    ("mode-emblems", "emblems", 17),
    ("answer-review-empty", "search-note", 18),
    ("no-private-answers", "open-lock", 19),
    ("no-shareable-link", "unlinked-note", 20),
    ("qr-placeholder", "qr", 21),
    ("corrupt-url", "corrupt", 22),
    ("privacy-page", "privacy-mirror", 23),
    ("how-it-works", "steps", 24),
]


def ensure_dirs() -> None:
    for path in [
        ILLUSTRATIONS / "light",
        ILLUSTRATIONS / "dark",
        ILLUSTRATIONS / "source",
        ICONS,
    ]:
        path.mkdir(parents=True, exist_ok=True)


def esc(value: str) -> str:
    return value.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def motif_svg(kind: str, c: dict[str, str], seed: int) -> str:
    dx = (seed % 5 - 2) * 2
    tilt = [-7, -3, 0, 4, 7][seed % 5]
    dots = f"url(#dots-{seed})"
    support_a = f"""
      <path d="M70 171 C108 126 122 89 170 74 C222 57 272 86 291 129 C252 124 231 147 202 171 C157 207 111 197 70 171Z" fill="{c['paper2']}" opacity=".72"/>
      <path d="M53 190 C93 187 121 208 157 226 C120 235 83 231 47 210Z" fill="{c['lac2']}" opacity=".88"/>
      <path d="M228 55 C253 71 279 76 312 72 C292 103 268 119 235 121Z" fill="{c['sandal']}" opacity=".9"/>
    """

    if kind in {"mirror", "privacy-mirror"}:
        return f"""
          {support_a}
          <g transform="translate({dx} 0) rotate({tilt} 180 130)">
            <ellipse cx="180" cy="110" rx="72" ry="84" fill="{c['lac']}" />
            <ellipse cx="180" cy="108" rx="51" ry="62" fill="{c['paper']}" opacity=".92"/>
            <path d="M148 93 C168 75 202 76 219 99 C202 91 176 93 158 111Z" fill="{c['plum']}" opacity=".9"/>
            <rect x="163" y="178" width="34" height="58" rx="15" fill="{c['lac']}" />
            <path d="M151 64 C168 51 207 49 228 71" fill="none" stroke="{c['paper']}" stroke-width="10" stroke-linecap="round" opacity=".55"/>
          </g>
          <circle cx="179" cy="116" r="8" fill="{c['plum']}"/>
          <circle cx="205" cy="118" r="8" fill="{c['plum']}"/>
          <path d="M169 144 C184 153 201 153 216 143" fill="none" stroke="{c['rose']}" stroke-width="8" stroke-linecap="round"/>
        """

    if kind in {"sealed-note", "pencil-note", "search-note", "unlinked-note", "home-note"}:
        return f"""
          {support_a}
          <g transform="rotate({tilt} 182 132)">
            <path d="M96 76 H253 L282 107 V196 H96Z" fill="{c['paper']}" stroke="{c['shadow']}" stroke-width="3"/>
            <path d="M253 76 V108 H282" fill="{c['paper2']}" stroke="{c['shadow']}" stroke-width="3"/>
            <path d="M126 123 H241 M126 151 H219 M126 178 H198" stroke="{c['muted']}" stroke-width="8" stroke-linecap="round" opacity=".58"/>
            <circle cx="247" cy="169" r="27" fill="{c['lac']}"/>
            <path d="M235 169 C244 157 253 158 261 169 C251 180 244 181 235 169Z" fill="{c['paper']}"/>
          </g>
          <path d="M80 216 C130 198 192 208 252 229" fill="none" stroke="{c['rose']}" stroke-width="10" stroke-linecap="round" opacity=".85"/>
        """

    if kind in {"lock", "open-lock"}:
        shackle = "M139 130 V101 C139 67 162 47 190 47 C218 47 241 67 241 101 V130" if kind == "lock" else "M139 130 V101 C139 68 160 48 188 48 C209 48 227 59 236 78"
        return f"""
          {support_a}
          <path d="{shackle}" fill="none" stroke="{c['plum']}" stroke-width="18" stroke-linecap="round"/>
          <rect x="111" y="123" width="158" height="104" rx="24" fill="{c['lac']}"/>
          <circle cx="190" cy="166" r="13" fill="{c['paper']}"/>
          <path d="M190 177 V200" stroke="{c['paper']}" stroke-width="10" stroke-linecap="round"/>
          <path d="M72 83 C100 70 121 67 148 71" stroke="{c['sandal']}" stroke-width="12" stroke-linecap="round"/>
          <path d="M260 218 C285 206 306 205 328 215" stroke="{c['rose']}" stroke-width="11" stroke-linecap="round"/>
        """

    if kind in {"veil", "visibility"}:
        return f"""
          {support_a}
          <path d="M63 129 C102 72 154 47 213 59 C257 68 287 100 307 132 C278 173 232 198 180 198 C125 198 85 171 63 129Z" fill="{c['paper']}" stroke="{c['shadow']}" stroke-width="3"/>
          <circle cx="184" cy="130" r="42" fill="{c['lac']}" opacity=".95"/>
          <circle cx="184" cy="130" r="19" fill="{c['plum']}"/>
          <path d="M73 206 C121 163 202 157 294 206" fill="none" stroke="{c['veil']}" stroke-width="24" stroke-linecap="round" opacity=".72"/>
          <path d="M94 77 L290 206" stroke="{c['rose']}" stroke-width="9" stroke-linecap="round" opacity=".78"/>
        """

    if kind in {"broken-link", "linked-seal", "warning-seal", "corrupt"}:
        broken = kind in {"broken-link", "warning-seal", "corrupt"}
        slash = f'<path d="M177 117 L202 143 M212 151 L238 178" stroke="{c["paper"]}" stroke-width="11" stroke-linecap="round"/>' if broken else f'<path d="M166 146 C184 165 206 166 225 146" fill="none" stroke="{c["paper"]}" stroke-width="11" stroke-linecap="round"/>'
        return f"""
          {support_a}
          <path d="M105 154 L144 115 C164 95 194 94 214 114" fill="none" stroke="{c['plum']}" stroke-width="24" stroke-linecap="round"/>
          <path d="M249 106 L215 140 C194 162 164 162 143 142" fill="none" stroke="{c['lac']}" stroke-width="24" stroke-linecap="round"/>
          <circle cx="268" cy="176" r="40" fill="{c['lac2']}"/>
          {slash}
          <path d="M70 79 C96 70 121 72 145 84" stroke="{c['sandal']}" stroke-width="12" stroke-linecap="round"/>
        """

    if kind in {"paper-ribbon", "split-paper", "fresh-ribbon", "ribbon"}:
        cut = '<path d="M191 65 L174 104 L200 138 L177 177 L199 220" fill="none" stroke="' + c["rose"] + '" stroke-width="7" stroke-linecap="round"/>' if kind == "split-paper" else ""
        return f"""
          {support_a}
          <path d="M97 65 H255 L284 96 V210 H97Z" fill="{c['paper']}" stroke="{c['shadow']}" stroke-width="3"/>
          <path d="M255 65 V98 H284" fill="{c['paper2']}"/>
          <path d="M87 122 C134 103 219 103 300 126 V162 C230 142 151 142 87 163Z" fill="{c['lac']}" opacity=".95"/>
          <path d="M101 153 C151 137 224 138 288 156" fill="none" stroke="{c['paper']}" stroke-width="7" stroke-linecap="round" opacity=".65"/>
          {cut}
          <circle cx="267" cy="197" r="19" fill="{c['sandal']}"/>
        """

    if kind == "phone-seal":
        return f"""
          {support_a}
          <rect x="134" y="42" width="112" height="184" rx="28" fill="{c['plum']}"/>
          <rect x="150" y="65" width="80" height="128" rx="12" fill="{c['paper']}"/>
          <circle cx="190" cy="209" r="8" fill="{c['paper']}"/>
          <circle cx="232" cy="73" r="37" fill="{c['lac']}"/>
          <path d="M217 72 L228 84 L249 57" fill="none" stroke="{c['paper']}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M75 196 C121 178 151 187 188 223" fill="none" stroke="{c['rose']}" stroke-width="10" stroke-linecap="round"/>
        """

    if kind == "closed-desk":
        return f"""
          {support_a}
          <path d="M79 94 H281 V193 H79Z" fill="{c['paper2']}" stroke="{c['shadow']}" stroke-width="3"/>
          <path d="M79 94 L180 154 L281 94" fill="none" stroke="{c['lac']}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="180" cy="153" r="34" fill="{c['plum']}"/>
          <path d="M160 154 H200" stroke="{c['paper']}" stroke-width="8" stroke-linecap="round"/>
          <path d="M75 218 H285" stroke="{c['rose']}" stroke-width="12" stroke-linecap="round" opacity=".76"/>
        """

    if kind == "emblems":
        return f"""
          {support_a}
          <circle cx="117" cy="125" r="48" fill="{c['lac']}"/>
          <path d="M98 126 H136 M117 107 V145" stroke="{c['paper']}" stroke-width="10" stroke-linecap="round"/>
          <circle cx="190" cy="105" r="52" fill="{c['plum']}"/>
          <path d="M169 105 C181 87 200 87 211 105 C199 124 181 124 169 105Z" fill="{c['paper']}"/>
          <circle cx="255" cy="143" r="46" fill="{c['sandal']}"/>
          <path d="M237 143 H274 M256 124 V162" stroke="{c['rose']}" stroke-width="9" stroke-linecap="round"/>
        """

    if kind == "qr":
        blocks = []
        for row in range(5):
            for col in range(5):
                if (row * 3 + col + seed) % 2 == 0 or row in {0, 4} and col in {0, 4}:
                    blocks.append(
                        f'<rect x="{132 + col * 22}" y="{82 + row * 22}" width="14" height="14" rx="2" fill="{c["plum"]}"/>'
                    )
        return f"""
          {support_a}
          <path d="M105 55 H256 L286 86 V207 H105Z" fill="{c['paper']}" stroke="{c['shadow']}" stroke-width="3"/>
          <path d="M256 55 V88 H286" fill="{c['paper2']}"/>
          {''.join(blocks)}
          <circle cx="255" cy="190" r="24" fill="{c['lac']}"/>
          <path d="M244 191 H266" stroke="{c['paper']}" stroke-width="7" stroke-linecap="round"/>
        """

    if kind == "steps":
        return f"""
          {support_a}
          <path d="M91 79 C121 58 154 57 180 80 C207 56 243 60 268 83 C246 121 216 145 180 166 C145 145 116 119 91 79Z" fill="{c['lac']}"/>
          <path d="M116 197 C148 166 213 166 246 197" fill="none" stroke="{c['plum']}" stroke-width="14" stroke-linecap="round"/>
          <circle cx="118" cy="197" r="18" fill="{c['sandal']}"/>
          <circle cx="182" cy="177" r="18" fill="{c['paper']}"/>
          <circle cx="246" cy="197" r="18" fill="{c['rose']}"/>
          <path d="M169 80 C181 99 181 140 166 157" fill="none" stroke="{c['paper']}" stroke-width="7" stroke-linecap="round" opacity=".55"/>
        """

    return f"""
      {support_a}
      <circle cx="180" cy="132" r="65" fill="{c['lac']}"/>
      <path d="M150 132 H210" stroke="{c['paper']}" stroke-width="12" stroke-linecap="round"/>
    """


def illustration_svg(name: str, kind: str, c: dict[str, str], theme: str, seed: int) -> str:
    title = name.replace("-", " ")
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 260" role="img" aria-labelledby="{name}-{theme}-title {name}-{theme}-desc">
  <title id="{name}-{theme}-title">Parichay {esc(title)} illustration</title>
  <desc id="{name}-{theme}-desc">A cut-paper stationery illustration with smoked lac, sandal, rosewood, and plum shapes.</desc>
  <defs>
    <pattern id="dots-{seed}" width="8" height="8" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.1" fill="{c['ink']}" opacity=".2"/>
    </pattern>
    <filter id="paper-shadow-{seed}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="{c['shadow']}" flood-opacity=".28"/>
    </filter>
  </defs>
  <g filter="url(#paper-shadow-{seed})">
    {motif_svg(kind, c, seed)}
  </g>
  <g opacity=".42">
    <circle cx="{50 + seed % 28}" cy="{52 + seed % 18}" r="5" fill="{c['rose']}"/>
    <circle cx="{298 - seed % 22}" cy="{219 - seed % 30}" r="4" fill="{c['sandal']}"/>
    <path d="M{58 + seed % 19} {222 - seed % 17} C{87 + seed % 11} 205 {104 + seed % 17} 205 {132 + seed % 15} 222" fill="none" stroke="{c['lac']}" stroke-width="5" stroke-linecap="round"/>
  </g>
  <rect width="360" height="260" fill="url(#dots-{seed})" opacity=".34"/>
</svg>
"""


def write_illustrations() -> None:
    for name, kind, seed in ASSETS:
        (ILLUSTRATIONS / "light" / f"{name}.svg").write_text(
            illustration_svg(name, kind, LIGHT, "light", seed),
            encoding="utf-8",
        )
        (ILLUSTRATIONS / "dark" / f"{name}.svg").write_text(
            illustration_svg(name, kind, DARK, "dark", seed),
            encoding="utf-8",
        )

    source_note = """# Parichay Asset Art Direction

Style: editorial cut-paper, halftone grain, flat symbolic objects, premium stationery mood.
Composition: no rectangular frames, no card grids, no UI mockups inside the art.
Palette: smoked lac, rosewood, sandal, plum, ember, warm ivory. Avoid botanical green.
Motifs: mirrors, folded notes, lac seals, envelopes, initials, paper ribbons, privacy veils, quiet artifacts.
Icon rule: Phosphor only for UI. Generated assets support empty states, social images, and brand surfaces.
Density rule: one expressive focal object, two to five supporting objects, generous transparent or negative space.
Variant rule: light and dark illustrations are designed separately. Dark mode is not an inverted light image.
"""
    (ILLUSTRATIONS / "source" / "asset-art-direction.md").write_text(source_note, encoding="utf-8")

    if GENERATED_PREVIEW_DIR.exists():
        latest = sorted(GENERATED_PREVIEW_DIR.glob("*.png"), key=lambda p: p.stat().st_mtime, reverse=True)
        if latest:
            oversized_preview = ILLUSTRATIONS / "source" / "imagegen-direction-preview.png"
            if oversized_preview.exists():
                oversized_preview.unlink()
            preview = Image.open(latest[0]).convert("RGB")
            preview.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
            preview.save(ILLUSTRATIONS / "source" / "imagegen-direction-preview.webp", quality=82, method=6)


def rounded_rect(draw: ImageDraw.ImageDraw, xy: tuple[int, int, int, int], radius: int, fill: str, outline: str | None = None, width: int = 1) -> None:
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def font(size: int, serif: bool = False, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = []
    if serif:
        candidates.extend(
            [
                r"C:\Windows\Fonts\georgiab.ttf" if bold else r"C:\Windows\Fonts\georgia.ttf",
                r"C:\Windows\Fonts\timesbd.ttf" if bold else r"C:\Windows\Fonts\times.ttf",
            ]
        )
    else:
        candidates.extend(
            [
                r"C:\Windows\Fonts\segoeuib.ttf" if bold else r"C:\Windows\Fonts\segoeui.ttf",
                r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
            ]
        )
    for candidate in candidates:
        path = Path(candidate)
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default()


def draw_halftone(draw: ImageDraw.ImageDraw, box: tuple[int, int, int, int], color: str, step: int, radius: int, alpha: int = 54) -> None:
    overlay = Image.new("RGBA", (box[2] - box[0], box[3] - box[1]), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    rgb = tuple(int(color[i : i + 2], 16) for i in (1, 3, 5))
    for y in range(0, overlay.height, step):
        for x in range((y // step) % 2 * (step // 2), overlay.width, step):
            od.ellipse((x, y, x + radius, y + radius), fill=(*rgb, alpha))
    return overlay


def create_master_icon(path: Path, size: int = 1024, dark: bool = False) -> Image.Image:
    c = DARK if dark else LIGHT
    img = Image.new("RGBA", (size, size), c["bg"])
    draw = ImageDraw.Draw(img)
    scale = size / 512

    def s(v: float) -> int:
        return round(v * scale)

    rounded_rect(draw, (s(42), s(42), s(470), s(470)), s(82), c["bg"])
    draw.polygon([(s(94), s(142)), (s(256), s(70)), (s(418), s(142)), (s(418), s(370)), (s(94), s(370))], fill=c["paper2"])
    rounded_rect(draw, (s(86), s(110), s(426), s(406)), s(34), c["paper"], c["shadow"], s(3))
    draw.line([(s(111), s(140)), (s(256), s(248)), (s(401), s(140))], fill=c["lac"], width=s(18), joint="curve")
    draw.line([(s(138), s(344)), (s(374), s(344))], fill=c["muted"], width=s(10))
    draw.line([(s(168), s(374)), (s(344), s(374))], fill=c["muted"], width=s(7))
    draw.ellipse((s(186), s(196), s(326), s(336)), fill=c["lac"])
    p_font = font(s(116), serif=True, bold=True)
    bbox = draw.textbbox((0, 0), "P", font=p_font)
    draw.text((s(256) - (bbox[2] - bbox[0]) / 2, s(265) - (bbox[3] - bbox[1]) / 2 - s(12)), "P", fill=c["paper"], font=p_font)
    dots = draw_halftone(draw, (0, 0, size, size), c["ink"], s(13), s(2), 42)
    img.alpha_composite(dots)
    img.save(path)
    return img


def make_icon_set() -> None:
    light = create_master_icon(PUBLIC / "app-icon-master.png", 1024, dark=False)
    dark = create_master_icon(PUBLIC / "app-icon-dark-master.png", 1024, dark=True)
    light.resize((512, 512), Image.Resampling.LANCZOS).save(PUBLIC / "app-icon.png")
    dark.resize((512, 512), Image.Resampling.LANCZOS).save(PUBLIC / "app-icon-dark.png")

    for size in [72, 96, 128, 144, 192, 384, 512]:
        light.resize((size, size), Image.Resampling.LANCZOS).save(ICONS / f"icon-{size}.png")
    for size in [192, 512]:
        light.resize((size, size), Image.Resampling.LANCZOS).save(ICONS / f"maskable-icon-{size}.png")

    for size in [16, 32, 48, 96]:
        light.resize((size, size), Image.Resampling.LANCZOS).save(PUBLIC / f"favicon-{size}x{size}.png")
    light.resize((180, 180), Image.Resampling.LANCZOS).save(PUBLIC / "apple-touch-icon.png")
    light.resize((192, 192), Image.Resampling.LANCZOS).save(PUBLIC / "android-chrome-192x192.png")
    light.resize((512, 512), Image.Resampling.LANCZOS).save(PUBLIC / "android-chrome-512x512.png")
    light.resize((32, 32), Image.Resampling.LANCZOS).save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    for name, symbol, bg in [
        ("shortcut-work-192.png", "W", LIGHT["plum"]),
        ("shortcut-me-192.png", "M", LIGHT["lac"]),
        ("shortcut-talk-192.png", "T", LIGHT["ember"]),
        ("shortcut-us-192.png", "U", LIGHT["rose"]),
    ]:
        img = Image.new("RGBA", (192, 192), LIGHT["bg"])
        d = ImageDraw.Draw(img)
        rounded_rect(d, (18, 18, 174, 174), 34, LIGHT["paper"], LIGHT["shadow"], 2)
        d.ellipse((54, 48, 138, 132), fill=bg)
        sym_font = font(60, serif=True, bold=True)
        bbox = d.textbbox((0, 0), symbol, font=sym_font)
        d.text((96 - (bbox[2] - bbox[0]) / 2, 91 - (bbox[3] - bbox[1]) / 2 - 5), symbol, fill=LIGHT["paper"], font=sym_font)
        d.line((52, 148, 140, 148), fill=LIGHT["sandal"], width=7)
        img.save(ICONS / name)


def write_logo_svgs() -> None:
    brand_svg = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" role="img" aria-labelledby="title desc">
  <title id="title">Parichay cut-paper letter mark</title>
  <desc id="desc">A folded paper manual, smoked lac seal, and rosewood P with halftone grain.</desc>
  <defs>
    <pattern id="grain" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#34231F" opacity=".18"/></pattern>
  </defs>
  <rect width="512" height="512" rx="92" fill="#F8F1EA"/>
  <path d="M94 142 256 70l162 72v228H94Z" fill="#F2E3D2"/>
  <rect x="86" y="110" width="340" height="296" rx="34" fill="#FFF7ED" stroke="#D9C4B4" stroke-width="4"/>
  <path d="M111 140 256 248 401 140" fill="none" stroke="#A85A44" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M138 344h236M168 374h176" stroke="#7C6158" stroke-width="10" stroke-linecap="round" opacity=".5"/>
  <circle cx="256" cy="266" r="70" fill="#A85A44"/>
  <text x="256" y="306" text-anchor="middle" fill="#FFF7ED" font-family="Source Serif 4, Georgia, serif" font-size="116" font-weight="700">P</text>
  <rect width="512" height="512" fill="url(#grain)" opacity=".55"/>
</svg>
"""
    dark_svg = brand_svg.replace("#F8F1EA", "#281C1A").replace("#F2E3D2", "#4A342D").replace("#FFF7ED", "#3A2924").replace("#D9C4B4", "#1C1312").replace("#A85A44", "#C97862").replace("#34231F", "#F7E9D8").replace("#7C6158", "#C5A694")
    (PUBLIC / "brand-mark.svg").write_text(brand_svg, encoding="utf-8")
    (PUBLIC / "brand-mark-dark.svg").write_text(dark_svg, encoding="utf-8")
    (PUBLIC / "app-icon.svg").write_text(brand_svg.replace("Parichay cut-paper letter mark", "Parichay app icon"), encoding="utf-8")
    (PUBLIC / "favicon.svg").write_text(brand_svg, encoding="utf-8")


def draw_social(path: Path, size: tuple[int, int], square: bool = False) -> None:
    w, h = size
    img = Image.new("RGB", size, LIGHT["bg"])
    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, w, h), fill=LIGHT["bg"])
    dots = draw_halftone(d, (0, 0, w, h), LIGHT["ink"], 15, 2, 30).convert("RGBA")
    img = img.convert("RGBA")
    img.alpha_composite(dots)
    d = ImageDraw.Draw(img)

    margin = 92 if not square else 116
    d.polygon([(w - margin - 382, margin + 92), (w - margin - 88, margin + 24), (w - margin - 46, h - margin - 98), (w - margin - 336, h - margin - 50)], fill=LIGHT["paper2"])
    d.ellipse((w - margin - 292, margin + 142, w - margin - 112, margin + 322), fill=LIGHT["lac"])
    d.ellipse((w - margin - 252, margin + 174, w - margin - 152, margin + 274), fill=LIGHT["paper"])
    d.line((w - margin - 310, h - margin - 110, w - margin - 75, h - margin - 80), fill=LIGHT["rose"], width=18)
    d.line((w - margin - 310, h - margin - 150, w - margin - 130, h - margin - 205), fill=LIGHT["sandal"], width=14)

    logo = Image.open(PUBLIC / "app-icon-master.png").resize((96, 96), Image.Resampling.LANCZOS)
    img.alpha_composite(logo, (margin + 48, margin + 48))
    title_font = font(72 if not square else 84, serif=True, bold=True)
    body_font = font(34 if not square else 42, serif=False, bold=True)
    small_font = font(26 if not square else 30, serif=False, bold=False)
    d.text((margin + 170, margin + 58), "Parichay", fill=LIGHT["ink"], font=title_font)
    d.text((margin + 52, margin + 200), "Your Story,", fill=LIGHT["ink"], font=font(86 if not square else 92, bold=True))
    d.text((margin + 52, margin + 300), "Always Ready.", fill=LIGHT["lac"], font=font(82 if not square else 92, serif=True, bold=True))
    d.line((margin + 52, margin + 382, margin + 570, margin + 382), fill=LIGHT["shadow"], width=3)
    d.text((margin + 52, margin + 420), "Create a private intro. Share only the included parts.", fill=LIGHT["muted"], font=body_font if square else small_font)
    img.convert("RGB").save(path, quality=92)


def write_social_assets() -> None:
    draw_social(PUBLIC / "og-image.png", (1200, 630))
    draw_social(PUBLIC / "twitter-image.png", (1200, 675))
    draw_social(PUBLIC / "og-square.png", (1200, 1200), square=True)
    shutil.copy2(PUBLIC / "og-image.png", PUBLIC / "og-master.png")

    og_svg = """<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title desc">
  <title id="title">Parichay private intro studio</title>
  <desc id="desc">A warm cut-paper Parichay social card with a mirror, folded note, and lac seal.</desc>
  <rect width="1200" height="630" fill="#F8F1EA"/>
  <text x="140" y="174" fill="#34231F" font-family="Source Serif 4, Georgia, serif" font-size="72" font-weight="700">Parichay</text>
  <text x="140" y="310" fill="#34231F" font-family="Geist, Arial, sans-serif" font-size="86" font-weight="800">Your Story,</text>
  <text x="140" y="412" fill="#A85A44" font-family="Source Serif 4, Georgia, serif" font-size="82" font-weight="700" font-style="italic">Always Ready.</text>
  <text x="140" y="488" fill="#7C6158" font-family="Geist, Arial, sans-serif" font-size="28" font-weight="650">Create a private intro. Share only the included parts.</text>
  <path d="M792 144 C872 88 990 118 1034 220 C982 221 946 260 902 305 C844 363 780 334 724 292Z" fill="#F2E3D2"/>
  <ellipse cx="874" cy="246" rx="84" ry="96" fill="#A85A44"/>
  <ellipse cx="874" cy="242" rx="58" ry="70" fill="#FFF7ED"/>
  <path d="M828 416 C888 372 968 384 1032 430" fill="none" stroke="#6E2D3F" stroke-width="18" stroke-linecap="round"/>
</svg>
"""
    (PUBLIC / "og-image.svg").write_text(og_svg, encoding="utf-8")


def main() -> None:
    ensure_dirs()
    write_illustrations()
    write_logo_svgs()
    make_icon_set()
    write_social_assets()
    print("Generated Parichay illustration, icon, and social assets.")


if __name__ == "__main__":
    main()
