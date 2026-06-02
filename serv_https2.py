import http.server
import socketserver
import ssl
import socket

PORT = 8000
HOST = "0.0.0.0"
Handler = http.server.SimpleHTTPRequestHandler

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        return s.getsockname()[0]
    finally:
        s.close()

context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.load_cert_chain(certfile="Eduardos-MacBook-Air.local+4.pem", keyfile="Eduardos-MacBook-Air.local+4-key.pem")

with socketserver.TCPServer((HOST, PORT), Handler) as httpd:
    local_ip = get_local_ip()
    httpd.socket = context.wrap_socket(httpd.socket, server_side=True)

    print(f"Servidor HTTPS rodando em:")
    print(f"  https://localhost:{PORT}")
    print(f"  https://{local_ip}:{PORT}")

    httpd.serve_forever()