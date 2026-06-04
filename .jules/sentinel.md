## 2024-05-23 - Hardcoded Admin Password in Client-Side Code
**Vulnerability:** The admin portal (`admin.html`) stored the master admin password (`miss2admin2026`) in plaintext as a constant (`ADMIN_PASSWORD`). Anyone could view the page source and gain full admin access to the Supabase backend.
**Learning:** In a pure frontend application with no intermediate API layer, storing plain text secrets is fully exposed to users. Moving auth to a simple hash comparison on the client is marginally better but still leaves the hash exposed; however, the plaintext password is no longer directly visible.
**Prevention:** Avoid hardcoding plaintext passwords. Instead, compute and store the hash (e.g., SHA-256) of the password and compare hashed user inputs. For a robust solution, implement an actual backend authentication system or use Supabase's built-in Auth.

## 2024-05-24 - Hardcoded Default Password in Utility Script
**Vulnerability:** The `generate_hash.js` utility script contained a hardcoded default password (`miss2admin2026`) that could be used to generate an admin password hash if the script was run without arguments. This exposed a sensitive secret within the source code.
**Learning:** Even in utility scripts or developer tools, hardcoding sensitive credentials poses a risk, as these files might be unintentionally committed to source control or expose secrets to unauthorized users.
**Prevention:** Always require sensitive inputs (like passwords) to be passed explicitly as command-line arguments or environment variables. Do not use sensitive data as fallback defaults.

## Security Learning: Admin Panel Isolation and Serverless Authentication

*   **Vulnerability Pattern:** Client-side only authentication for an admin panel, even if obfuscated or hash-based, exposes the entire administrative UI and logic to unauthorized discovery and potential reverse engineering.
*   **Prevention Strategy:**
    1.  **Subdomain Isolation via Vercel Routing:** Utilize `vercel.json` rewrites to tightly bind administrative interfaces to a specific subdomain (e.g., `panel.example.com`). Crucially, use the `missing` property to match the main domain and explicitly route any attempts to access the admin paths to a 404, preventing path discovery.
    2.  **Serverless Migration:** Move the admin HTML into a serverless function (e.g., `/api/admin`). This prevents the HTML file from being served statically.
    3.  **HMAC-Signed HTTP-Only Cookies:** Implement authentication on the backend (`/api/login`) that issues a cryptographically signed cookie (using `crypto.createHmac`) marked as `HttpOnly`, `Secure`, and `SameSite=Strict`. The serverless function must validate this signature before rendering the admin HTML.
    4.  **Avoid Vulnerable Validation Methods:** Do not use simple string matching (like `.includes()`) for cookie validation, as this is susceptible to spoofing. Use robust parsing and cryptographically verify the signature. Ensure regex for cookie parsing handles whitespace correctly (`;\s*`).
*   **Context:** Applied when securing an admin panel that was previously a static HTML file using client-side password hashing.
