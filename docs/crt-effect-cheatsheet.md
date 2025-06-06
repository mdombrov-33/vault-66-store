CRT Effect Cheat Sheet

1. .crt-mode on <body>

- Activates the CRT overlay effect and glow styles.

2. body.crt-mode::before — Vertical Sweep Line

- Moves slowly from top to bottom, simulating old CRT scanline sweep.

Key values to tweak:

- height: thickness of the sweep line (e.g., 80px)

- animation-duration: speed of the sweep (e.g., 10s slower, 6s faster)

- background gradient colors & alpha: darkness & visibility of the line

- filter: blur(): softness of the line edges

3. body.crt-mode::after — Horizontal Scanlines

- Subtle repeating horizontal lines to mimic CRT screen texture.

- Key values:

- background-image rgba colors: line color and transparency

- spacing between lines (controlled by pixel stops in gradient)

- mix-blend-mode helps blend lines naturally

4. .crt-glow class

- Applies greenish or yellowish glow to text or elements to fit Fallout/CRT theme.

- Key values:

- box-shadow colors and alpha: intensity and spread of glow

- color: text color matching CRT green

5. React Toggle Logic

- Adds/removes crt-mode class on <body> based on toggle and dark mode presence.

- Ensures CRT effect only runs in dark mode.

Quick Tweaking Tips:

- Increase sweep line height for thicker line

- Lower animation-duration for faster sweep

- Adjust alpha in gradients for stronger/weaker lines

- Increase glow box-shadow alpha for brighter glow

- Change scanline rgba colors for different tint
