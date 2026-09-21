from pathlib import Path
import sys

from PIL import Image, ImageEnhance, ImageFilter, ImageSequence


def webp_timing(path: Path) -> tuple[list[int], int]:
    data = path.read_bytes()
    durations: list[int] = []
    loop = 0
    offset = 12
    while offset + 8 <= len(data):
        kind = data[offset : offset + 4]
        length = int.from_bytes(data[offset + 4 : offset + 8], "little")
        payload = data[offset + 8 : offset + 8 + length]
        if kind == b"ANIM" and len(payload) >= 6:
            loop = int.from_bytes(payload[4:6], "little")
        elif kind == b"ANMF" and len(payload) >= 16:
            durations.append(int.from_bytes(payload[12:15], "little"))
        offset += 8 + length + (length & 1)
    return durations, loop


def main() -> None:
    source = Path(sys.argv[1])
    target = Path(sys.argv[2])
    scale = int(sys.argv[3]) if len(sys.argv) > 3 else 4

    source_durations, source_loop = (
        webp_timing(source) if source.suffix.lower() == ".webp" else ([], 0)
    )
    with Image.open(source) as image:
        loop = source_loop
        background = image.info.get("background", (255, 255, 255, 0))
        frames = []
        durations = []

        for frame in ImageSequence.Iterator(image):
            rgba = frame.convert("RGBA")
            enlarged = rgba.resize(
                (rgba.width * scale, rgba.height * scale),
                Image.Resampling.LANCZOS,
            )
            rgb = enlarged.convert("RGB")
            rgb = ImageEnhance.Contrast(rgb).enhance(1.06)
            rgb = ImageEnhance.Sharpness(rgb).enhance(1.18)
            rgb = rgb.filter(
                ImageFilter.UnsharpMask(radius=1.25, percent=115, threshold=4)
            )
            frames.append(rgb)
            index = len(durations)
            duration = source_durations[index] if index < len(source_durations) else 100
            durations.append(max(duration, 10))

        target.parent.mkdir(parents=True, exist_ok=True)
        if target.suffix.lower() == ".png":
            frames[0].save(target, format="PNG", optimize=True)
        else:
            frames[0].save(
                target,
                format="WEBP",
                save_all=True,
                append_images=frames[1:],
                duration=durations,
                loop=loop,
                background=background,
                quality=90,
                method=4,
                lossless=False,
                minimize_size=False,
            )

    with Image.open(target) as check:
        print(
            f"saved={target}\n"
            f"frames={getattr(check, 'n_frames', 1)}\n"
            f"size={check.width}x{check.height}\n"
            f"loop={check.info.get('loop', 0)}\n"
            f"bytes={target.stat().st_size}"
        )


if __name__ == "__main__":
    main()
