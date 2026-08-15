# EiFlow Android branding assets

`logo.svg` is the checked-in fallback branding source used to generate launcher icons and the splash screen without Android Studio. It uses EiFlow's purple/lavender accent direction and can be replaced with the supplied artwork.

## Use the supplied image

The chat attachment is not automatically written into the workspace. Save the original high-resolution image locally, then choose one of these workflows:

### Easy mode (same image for icon and splash)

1. Save the image as `assets/logo.png` (minimum 1024x1024).
2. Remove or rename `assets/logo.svg` so the PNG is the only easy-mode logo source.
3. The checked-in Android resources are the build's source of truth. Asset generation is intentionally not included in the project dependency graph because it pulls native image-processing tooling into every install. If you replace the artwork, use a reviewed one-off asset generator outside this repository, review the generated files, then run:

```powershell
npm run build
npx cap sync android
```

### Full-control mode (different icon and cover images)

Place these files in `assets/`:

- `icon-only.png` — square, at least 1024x1024
- `icon-foreground.png` — optional adaptive icon foreground, at least 1024x1024
- `icon-background.png` — optional adaptive icon background, at least 1024x1024
- `splash.png` — square/portrait cover, at least 2732x2732
- `splash-dark.png` — optional dark-mode cover, at least 2732x2732

Then run the same command above. The generated density-specific files under `android/app/src/main/res/` are build outputs from these sources and should be reviewed before committing.

The currently attached preview is 768x768 in the chat context; use the original high-resolution file if available so the asset generator's minimum-size checks pass.
