# Release Process

This document describes how to create and publish releases for Triage.

## Automated GitHub Releases

The project uses GitHub Actions to automatically build and publish releases for Windows, macOS, and Linux.

### Creating a Release

1. **Update the version** in `package.json` and `src-tauri/tauri.conf.json`:
   ```json
   "version": "0.2.0"
   ```

2. **Commit the version change**:
   ```bash
   git add package.json src-tauri/tauri.conf.json
   git commit -m "Bump version to 0.2.0"
   ```

3. **Create and push a git tag**:
   ```bash
   git tag v0.2.0
   git push origin main
   git push origin v0.2.0
   ```

4. **GitHub Actions will automatically**:
   - Build the app for Windows (.exe, .msi)
   - Build the app for macOS (Intel and Apple Silicon .dmg)
   - Build the app for Linux (.deb, .AppImage)
   - Create a draft release with all artifacts
   - Publish the release when all builds complete

### Manual Local Build

To build locally for your current platform:

```bash
pnpm run release
```

Build artifacts will be in `src-tauri/target/release/bundle/`:
- **Windows**: `nsis/*.exe` (installer) and `msi/*.msi`
- **macOS**: `dmg/*.dmg`
- **Linux**: `deb/*.deb` and `appimage/*.AppImage`

## Auto-Update System

The app includes an automatic update checker that runs on startup:

- When a new version is released on GitHub, users will be prompted to update
- The updater downloads and installs the new version in the background
- Users can choose to install immediately or skip the update
- Updates are checked against: `https://github.com/dan-costello/tracker/releases/latest/download/latest.json`

The updater is configured in `src-tauri/tauri.conf.json` with the Tauri updater system. The GitHub Actions workflow automatically generates the update manifest (`latest.json`) when publishing releases.

**How it works:**
1. App checks for updates on startup (App.tsx:19-39)
2. If update available, shows confirmation dialog
3. Downloads and installs update if user confirms
4. Relaunches app with new version

## Bundler Configuration

Bundling is enabled in `src-tauri/tauri.conf.json` with `"active": true`.

### Windows Signing (Optional)

For Windows, you can sign the executable to avoid security warnings:

1. Obtain a code signing certificate
2. Set the certificate thumbprint in `tauri.conf.json`:
   ```json
   "windows": {
     "certificateThumbprint": "YOUR_CERTIFICATE_THUMBPRINT",
     "digestAlgorithm": "sha256",
     "timestampUrl": ""
   }
   ```

Without signing, users may see "Windows protected your PC" warnings, but the app will still work if they click "More info" → "Run anyway".

### Distribution Targets

The bundler creates multiple formats per platform:

- **Windows**: NSIS installer (.exe) and MSI installer
- **macOS**: DMG disk image (universal or arch-specific)
- **Linux**: Debian package (.deb) and AppImage

## Release Notes

When creating a release on GitHub, include:
- New features added
- Bugs fixed
- Breaking changes (if any)
- Installation instructions for each platform

## Version Management

Keep versions synchronized across:
- `package.json` (line 3)
- `src-tauri/tauri.conf.json` (line 11)
- `src-tauri/Cargo.toml` (line 3)

Use semantic versioning (MAJOR.MINOR.PATCH):
- MAJOR: Breaking changes
- MINOR: New features (backwards compatible)
- PATCH: Bug fixes
