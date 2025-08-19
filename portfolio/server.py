import smtplib
from http.server import SimpleHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
from email.message import EmailMessage
import os

# Import config and data assuming they are in the same directory
from config import SENDER_EMAIL, SENDER_PASSWORD, RECEIVER_EMAIL
from data import portfolio_data

# The current working directory will be the root for the server,
# so all file paths are relative to where server.py is run from.

def render_template(template_name, data):
    """
    A simple function to render an HTML template with data.
    Finds placeholders like `{{placeholder}}` and replaces them.
    """
    try:
        with open(template_name, 'r', encoding='utf-8') as f:
            html_content = f.read()
    
        # Replace personal info placeholders
        html_content = html_content.replace('{{name}}', data['personal'].get('name', ''))
        html_content = html_content.replace('{{phone}}', data['personal'].get('phone', ''))
        html_content = html_content.replace('{{email}}', data['personal'].get('email', ''))
        html_content = html_content.replace('{{photo_url}}', data['personal'].get('photo_url', ''))
        html_content = html_content.replace('{{summary}}', data['personal'].get('summary', ''))
        html_content = html_content.replace('{{about_intro}}', data['personal'].get('about_intro', ''))

        # Handle lists for skills (simple <li> tags with class for styling)
        if '{{technical_skills}}' in html_content:
            skills_html = "".join([f"<li class='skill-tag animate-fade-in-up'>{skill.get('name', '')}</li>" for skill in data['skills'].get('technical', [])])
            html_content = html_content.replace('{{technical_skills}}', skills_html)
        
        if '{{soft_skills}}' in html_content:
            skills_html = "".join([f"<li class='skill-tag animate-fade-in-up'>{skill.get('name', '')}</li>" for skill in data['skills'].get('soft', [])])
            html_content = html_content.replace('{{soft_skills}}', skills_html)
            
        if '{{experience_list}}' in html_content:
            experience_html = ""
            for exp in data.get('experience', []):
                bullets_html = "".join([f"<li>{bullet}</li>" for bullet in exp.get('bullets', [])])
                experience_html += f"""
                    <div class="experience-item animate-fade-in-up">
                        <h3>{exp.get('title', '')}</h3>
                        <p><strong>{exp.get('duration', '')}</strong></p>
                        <ul>{bullets_html}</ul>
                    </div>
                """
            html_content = html_content.replace('{{experience_list}}', experience_html)

        if '{{certifications_list}}' in html_content:
            certs_html = ""
            for cert in data.get('certifications', []):
                issuer_html = f"<p><strong>Issuer:</strong> {cert.get('issuer', '')}</p>" if cert.get('issuer') else ""
                certs_html += f"""
                    <div class="certification-item animate-fade-in-up">
                        <h3>{cert.get('title', '')}</h3>
                        {issuer_html}
                        <a href="{cert.get('link', '#')}" target="_blank">View Certificate</a>
                    </div>
                """
            html_content = html_content.replace('{{certifications_list}}', certs_html)

        if '{{achievements_list}}' in html_content: # NEW: Rendering achievements
            achievements_html = ""
            for ach in data.get('achievements', []):
                date_html = f"<p><strong>Date:</strong> {ach.get('date', '')}</p>" if ach.get('date') else ""
                link_html = f"<a href='{ach.get('link', '#')}' target='_blank'>View Achievement</a>" if ach.get('link') else ""
                achievements_html += f"""
                    <div class="achievement-item animate-fade-in-up">
                        <h3>{ach.get('title', '')}</h3>
                        <p>{ach.get('description', '')}</p>
                        {date_html}
                        {link_html}
                    </div>
                """
            html_content = html_content.replace('{{achievements_list}}', achievements_html)

        if '{{projects_list}}' in html_content:
            projects_html = ""
            for proj in data.get('projects', []):
                projects_html += f"""
                    <div class="project-item animate-fade-in-up">
                        <h3>{proj.get('title', '')}</h3>
                        <p>{proj.get('description', '')}</p>
                        <a href="{proj.get('details_link', '#')}" target="_blank">View Details</a>
                    </div>
                """
            html_content = html_content.replace('{{projects_list}}', projects_html)

        return html_content.encode('utf-8')
    except FileNotFoundError:
        print(f"Template file not found: {template_name}")
        return None
    except Exception as e:
        print(f"Error rendering template {template_name}: {e}")
        return None


class PortfolioServer(SimpleHTTPRequestHandler):
    def do_GET(self):
        """Handle GET requests for all HTML, CSS, and image files in the same directory."""
        
        if self.path == '/':
            requested_file = 'index.html'
        elif self.path == '/achievements.html': # Handle the new achievements.html
            requested_file = 'achievements.html'
        else:
            # Remove leading slash if present, to look for file in current directory
            requested_file = self.path.lstrip('/') 

        try:
            if requested_file.endswith('.html'):
                content = render_template(requested_file, portfolio_data)
                if content:
                    self.send_response(200)
                    self.send_header('Content-type', 'text/html')
                    self.end_headers()
                    self.wfile.write(content)
                else:
                    self.send_error(500, "Error rendering template")
            elif requested_file.endswith('.css'):
                self.send_response(200)
                self.send_header('Content-type', 'text/css')
                with open(requested_file, 'rb') as f:
                    self.end_headers()
                    self.wfile.write(f.read())
            elif requested_file.endswith(('.jpg', '.jpeg', '.png', '.gif', '.svg')):
                mime_type = {
                    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
                    '.png': 'image/png', '.gif': 'image/gif',
                    '.svg': 'image/svg+xml'
                }[os.path.splitext(requested_file)[1].lower()]
                self.send_response(200)
                self.send_header('Content-type', mime_type)
                with open(requested_file, 'rb') as f:
                    self.end_headers()
                    self.wfile.write(f.read())
            else:
                # Fallback for any other file types not explicitly handled
                super().do_GET() 

        except FileNotFoundError:
            self.send_error(404, "File Not Found")
        except Exception as e:
            print(f"Error serving file: {e}")
            self.send_error(500, "Internal Server Error")


    def do_POST(self):
        """Handle POST requests for the contact form."""
        if self.path == '/submit_form':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            parsed_data = parse_qs(post_data.decode('utf-8'))
            
            name = parsed_data.get('name', [''])[0]
            email = parsed_data.get('email', [''])[0]
            message = parsed_data.get('message', [''])[0]
            
            msg = EmailMessage()
            msg.set_content(f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}")
            msg['Subject'] = f"New Contact from your Portfolio: {name}"
            msg['From'] = SENDER_EMAIL
            msg['To'] = RECEIVER_EMAIL
            msg['Reply-To'] = email

            try:
                with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
                    smtp.login(SENDER_EMAIL, SENDER_PASSWORD)
                    smtp.send_message(msg)
                print("Email sent successfully!")
                response_message = "Your message has been sent successfully!"
            except Exception as e:
                print(f"Error sending email: {e}")
                response_message = "There was an error sending your message. Please try again later."
            
            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(f"<html><body><h1>{response_message}</h1></body></html>".encode('utf-8'))
        else:
            self.send_error(404, "Page Not Found")

def run_server():
    server_address = ('', 8000)
    # Ensure the server runs from the directory where all these files are located
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    httpd = HTTPServer(server_address, PortfolioServer)
    print('Starting server on port 8000...')
    print('Open your browser and navigate to http://localhost:8000/')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    print('Stopping server...')

if __name__ == '__main__':
    run_server()
