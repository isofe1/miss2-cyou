## 2024-05-23 - Hardcoded Admin Password in Client-Side Code
**Vulnerability:** The admin portal (`admin.html`) stored the master admin password (`miss2admin2026`) in plaintext as a constant (`ADMIN_PASSWORD`). Anyone could view the page source and gain full admin access to the Supabase backend.
**Learning:** In a pure frontend application with no intermediate API layer, storing plain text secrets is fully exposed to users. Moving auth to a simple hash comparison on the client is marginally better but still leaves the hash exposed; however, the plaintext password is no longer directly visible.
**Prevention:** Avoid hardcoding plaintext passwords. Instead, compute and store the hash (e.g., SHA-256) of the password and compare hashed user inputs. For a robust solution, implement an actual backend authentication system or use Supabase's built-in Auth.

## 2024-05-24 - Hardcoded Default Password in Utility Script
**Vulnerability:** The `generate_hash.js` utility script contained a hardcoded default password (`miss2admin2026`) that could be used to generate an admin password hash if the script was run without arguments. This exposed a sensitive secret within the source code.
**Learning:** Even in utility scripts or developer tools, hardcoding sensitive credentials poses a risk, as these files might be unintentionally committed to source control or expose secrets to unauthorized users.
**Prevention:** Always require sensitive inputs (like passwords) to be passed explicitly as command-line arguments or environment variables. Do not use sensitive data as fallback defaults.
