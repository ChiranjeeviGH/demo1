# Source update

Updated the supplied React source to better match the provided homepage reference, with the main focus on the Karnataka Presence section.

## Changes
- Isolated the Presence section from generic `.section` styles using its CSS module.
- Reworked desktop layout so the heading/description sit on the left, the map is elevated on the right, and the district card starts below the intro.
- Added responsive desktop/tablet/mobile behavior.
- Connected `Presence.jsx` to the existing `DistrictMap`, `DistrictInfoPanel`, and district data.
- Mysuru remains the initial selected district.
- Hover/focus/clicking a district updates the district information panel through the same reusable design.
- Added dynamic district card styling for districts without the Mysuru master image.
- Removed the dependency on a special-case Mysuru-only card component path in the Presence layout.

## Existing external assets
The supplied source references `/Frame 180.png` and `/Frame 177.png`. These files were not included in the uploaded ZIP, so those paths were preserved to avoid breaking an existing public-assets setup.

If those files are in the project's `public/` folder locally, they will continue to work.
