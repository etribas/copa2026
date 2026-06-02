import http.server
import socketserver
import ssl

PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

# Cria o contexto SSL
context = ssl.create_default_context(ssl.Purpose.CLIENT_AUTH)
context.load_cert_chain(certfile="cert.pem", keyfile="key.pem")

# Inicia o servidor
with socketserver.TCPServer(("", PORT), Handler, bind_and_activate=True) as httpd:
    print(f"Servidor HTTPS rodando em https://localhost:{PORT}")
    httpd.socket = context.wrap_socket(httpd.socket, server_side=True)
    httpd.serve_forever()

