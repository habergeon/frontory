# Storage and privacy guide

Last updated: 2026-10-22

Frontory lets you read learning documents and experiment with code without an account. Learning records are stored in your current browser. The site uses Google Analytics for usage analysis. As we prepare to introduce Google AdSense ads, we have installed ad tags on some public learning documents.

## Operation and contact

Frontory is managed through the [habergeon/frontory public repository](https://github.com/habergeon/frontory). Send privacy inquiries and requests to delete inquiry information to [hefa91@gmail.com](mailto:hefa91@gmail.com). Send only what is necessary for a reply; do not attach passwords, verification codes, secret keys, or complete learning backups.

General bug reports and documentation suggestions are also accepted through [GitHub Issues](https://github.com/habergeon/frontory/issues). GitHub issues are public and require a GitHub account to create. Use email for inquiries containing personal information. Information you send directly to email and GitHub is also processed by those services.

## Learning records stored in your browser

Edited code, Markdown notes, the selected JavaScript/TypeScript language, progress, and modification times are stored in the browser's localStorage. There is no feature to upload learning records to a Frontory server or synchronize them through an account. If saving fails, records may remain only in the current tab.

The storage code does not automatically delete records after a set period. You can remove them using your browser's site data controls; back them up with JSON export first. Clearing site data does not delete files already downloaded or information processed by Google or the hosting service.

Records may be lost when you clear browser data, close private browsing, or run out of storage. Records from other devices, browsers, profiles, or site addresses are not merged automatically. When moving domains, export JSON from the old address and import it at the new one.

## Importing and exporting files

JSON and Markdown exports create files on your device. JSON import reads a file in the browser and, after confirmation, replaces records within its scope. Imported files are not uploaded to a Frontory server. Backup files are not encrypted, so remove personal information and secrets before sharing them.

## Usage analysis

The home and code practice screens use Google Analytics 4 to understand site usage. The Google tag processes usage information such as visited pages, browser, and device, and may use analytics cookies. Connection information is also processed when requests reach Google servers.

Frontory code has no feature that sends edited code, Markdown notes, or JSON backup contents in analytics events. However, Google's automatic collection and the operator's account settings are separate matters. Do not enter secrets in documents or notes, or personal information in URLs.

For details, see [how Google uses information from partner sites](https://policies.google.com/technologies/partner-sites?hl=ko) and the [Google Privacy Policy](https://policies.google.com/privacy?hl=ko). Browser cookie and tracking protection settings can limit collection. Google also provides the [Google Analytics Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout?hl=ko).

## Advertising and third-party cookies

We are currently preparing to request a Google AdSense review, and ads are planned to appear after site approval. Ad tags have been installed in advance on some public learning documents. AdSense execution scripts are not included on the home screen, code editing and notes screens, site introduction, this guide, or error pages. Even when no ad is visible, executing an ad tag may send requests to Google servers.

Third-party providers, including Google, may use cookies, web beacons, IP addresses, or other identifiers to serve ads and measure their effectiveness. Google's advertising cookies may personalize ads based on previous visits to this and other sites. You can manage personalized ads in [Google Ads Settings](https://adssettings.google.com/). This does not stop all advertising or data processing by other services.

For details on cookies and advertising data, see [Google's advertising technology guide](https://policies.google.com/technologies/ads?hl=ko) and [information use on partner sites](https://policies.google.com/technologies/partner-sites?hl=ko). If a consent selection screen is provided, check its purposes, partner list, and how to change your choices. This guide itself does not replace consent to cookies or personalized ads.

## Hosting and external services

Cloudflare Pages delivers static files. Request information, such as IP addresses, may be processed in doing so. Specific processing follows the [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/) and the applied service settings.

When you open links to official external documentation, GitHub, Google, or other services, their policies apply. Previews are isolated in a sandbox and network access is restricted, but CPU and GPU usage are not limited. Do not run code from sources you do not trust.

## Changes

When the site's storage, analytics, or advertising use changes, we update this document and its revision date. If the description differs from actual behavior or you need clarification about privacy, contact the email address above.
