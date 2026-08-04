#!/usr/bin/env python3
"""Static server mirroring vercel.json's cleanUrls (extensionless -> .html)."""
import http.server
import os

PORT = 8000


class CleanUrlHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        clean_path = path.split('?', 1)[0].split('#', 1)[0]
        fs_path = super().translate_path(clean_path)
        if os.path.isdir(fs_path) or os.path.splitext(fs_path)[1]:
            return super().translate_path(path)
        candidate = fs_path + '.html'
        if os.path.isfile(candidate):
            return candidate
        return super().translate_path(path)


if __name__ == '__main__':
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    with http.server.HTTPServer(('', PORT), CleanUrlHandler) as httpd:
        print(f'Serving on http://localhost:{PORT}')
        httpd.serve_forever()
