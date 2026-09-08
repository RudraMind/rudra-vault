---
type: concept
tags: [sprite-sheets, image-processing, sharp, pixel-art, alpha-masking]
created: 2026-09-07
updated: 2026-09-07
sources: [2026-09-07-minime-electron-companion]
related: [minime, semantic-animation-mapping]
disambiguates: ""
archived: ""
superseded_by: ""
---

# Sprite-Sheet Masking

Cutting transparent frames out of a pixel-art sheet by deciding, per pixel, what is
backdrop and what is artwork — the step where naive colour matching quietly destroys the
art.

## Explanation

The obvious approach is per-pixel colour distance: if a pixel is close enough to the
backdrop colour, make it transparent. It fails because interior shading legitimately
matches the backdrop — cap creases, collar shadows, a dark navy sheet's own dark lines —
so the mask punches holes straight through the character. In a `transparent: true`
Electron window those holes show the desktop, which reads as "the body colour changes
with the background".

## Key Principles

- **Use reachability, not colour alone.** A pixel is background only if it is reachable
  from the edge of the sheet — a border flood-fill. Interior pixels that merely happen to
  share the backdrop colour survive.
- **Close thin seams.** Follow with morphological closing so the fill cannot leak through
  one-pixel gaps in the source art. Radius 1 was measurably insufficient; radius 2 worked.
- **Tolerance constants do not transfer between sheets.** Histogram the actual colour
  distances before picking one. Measured values from a single project: ~20 for the dark
  navy character sheet, **25** for the house (its dark mortar lines sit at 30–40 and a
  tolerance of 40 let the fill seep in through the shingle gaps and hollow out the roof),
  and a strict **10** for white-background sheets.
- **White backgrounds are a different problem.** Near-white artwork — a white cap, socks,
  eye-whites — is the same colour as the backdrop. A loose tolerance leaks through the
  anti-aliased edge of the art's own outlines and erases it. A strict tolerance works
  because the outlines reliably block the fill.
- **Some separations are not colour problems at all.** Cream paws and a soft drop shadow
  occupy the same brightness and saturation range; measurement confirmed no colour rule
  can split them. The rule that works is **geometric**: a drop shadow lies below ALL
  linework in its column, whereas a paw, sock or shoe fill always sits above its own
  bottom outline.
- **Resize by re-slicing from the source sheet**, never by downscaling an already-sliced
  PNG — downscaling smears the masked edges back into the backdrop colour.

## Test That Catches It

Composite each frame over solid red AND over solid green, then diff. Any pixel whose
colour changes between the two is a hole in the mask. Cheap, and it catches the failure
that visual inspection on a light background does not.

## Traps

- **`sharp`'s `.flop()` is a silent no-op after `.composite()`** onto a created canvas.
  No error, and the output still looks plausible. Apply the flip to the image itself,
  before compositing, and confirm the output file's md5 actually changed.
- Frames in one animation cycle must share a bottom alignment or the character pops
  vertically during playback — verify the baseline, do not assume it.

## Examples

- Every failure above was measured in [[minime]]: holes in the character, a hollowed
  house roof, an erased white cap, and vanishing dog paws — four masking strategies
  before the pipeline held.

## Connections

- Feeds the art that [[semantic-animation-mapping]] addresses by semantic name
- Used by [[minime]]

## Sources

- [[wiki/sources/2026-09-07-minime-electron-companion]]
