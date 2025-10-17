# 📤 Panduan Deployment - Corals Image Correction Web App

Panduan lengkap untuk mengupload dan mendeploy aplikasi **Corals Image Correction** ke berbagai platform web hosting.

---

## 📋 Daftar Isi

1. [Persiapan Sebelum Deploy](#persiapan-sebelum-deploy)
2. [Option A: Platform Cloud (Recommended)](#option-a-platform-cloud-recommended)
   - [PythonAnywhere](#1-pythonanywhere-free--easy)
   - [Heroku](#2-heroku-scalable--professional)
   - [Railway.app](#3-railwayapp-modern--easy)
   - [Render](#4-render-modern--free-tier)
3. [Option B: VPS (Virtual Private Server)](#option-b-vps-virtual-private-server)
4. [Option C: Shared Hosting dengan cPanel](#option-c-shared-hosting-dengan-cpanel)
5. [Troubleshooting](#troubleshooting)
6. [Maintenance & Monitoring](#maintenance--monitoring)

---

## ⚙️ Persiapan Sebelum Deploy

### 1. **Update File app.py untuk Production**

Pastikan setting production sudah benar:

```python
if __name__ == '__main__':
    # For production, set debug=False
    app.run(debug=False, host='0.0.0.0', port=5000)
```

### 2. **Buat File .gitignore**

Buat file `.gitignore` untuk menghindari upload file yang tidak perlu:

```
# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
venv/
env/
ENV/

# Flask
instance/
.webassets-cache

# Uploads
uploads/*
outputs/*
!uploads/.gitkeep
!outputs/.gitkeep

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Environment variables
.env
.env.local
```

### 3. **Buat File .gitkeep untuk Folder Uploads/Outputs**

```bash
# Buat folder jika belum ada
mkdir uploads outputs

# Buat .gitkeep
echo "" > uploads/.gitkeep
echo "" > outputs/.gitkeep
```

### 4. **Pastikan requirements.txt Lengkap**

File `requirements.txt` sudah ada dengan isi:
```
Flask==3.1.2
Pillow==11.3.0
numpy==2.3.3
Werkzeug==3.1.3
```

### 5. **Test Aplikasi di Local**

```bash
python app.py
```

Pastikan aplikasi berjalan tanpa error di `http://localhost:5000`

---

## 🌐 Option A: Platform Cloud (Recommended)

### 1. PythonAnywhere (Free & Easy)

**Kelebihan:**
- ✅ Free tier tersedia
- ✅ Mudah untuk pemula
- ✅ Support Flask langsung
- ✅ SSL certificate gratis

**Langkah-langkah Detail:**

#### Step 1: Daftar Akun
1. Kunjungi https://www.pythonanywhere.com
2. Klik "Start running Python online in less than a minute!"
3. Pilih plan "Beginner" (Free)
4. Daftar dengan email Anda

#### Step 2: Upload Project

**Cara 1: Via Files Tab**
1. Login ke dashboard
2. Klik tab "Files"
3. Upload semua file project:
   - `app.py`
   - `underwater_fix.py`
   - `requirements.txt`
   - Folder `templates/` (semua file HTML)
   - Folder `static/` (CSS, JS, images, logos)

**Cara 2: Via Git (Recommended)**
1. Klik tab "Consoles" → "Bash"
2. Clone repository:
```bash
git clone https://github.com/yourusername/corals-image-app.git
cd corals-image-app
```

#### Step 3: Setup Virtual Environment
```bash
mkvirtualenv --python=/usr/bin/python3.10 corals-env
workon corals-env
pip install -r requirements.txt
```

#### Step 4: Configure Web App
1. Klik tab "Web"
2. Klik "Add a new web app"
3. Pilih domain: `yourusername.pythonanywhere.com`
4. Pilih "Manual configuration"
5. Pilih Python version: **Python 3.10**

#### Step 5: Set Paths
Di halaman Web configuration:

- **Source code:** `/home/yourusername/corals-image-app`
- **Working directory:** `/home/yourusername/corals-image-app`
- **Virtualenv:** `/home/yourusername/.virtualenvs/corals-env`

#### Step 6: Edit WSGI Configuration File
1. Klik link WSGI configuration file
2. Delete semua isi, ganti dengan:

```python
import sys
import os

# Add your project directory to the sys.path
project_home = '/home/yourusername/corals-image-app'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Set environment variables
os.environ['FLASK_APP'] = 'app.py'

# Import flask app
from app import app as application
```

3. Save (Ctrl+S)

#### Step 7: Create Upload Directories
Di Bash console:
```bash
cd /home/yourusername/corals-image-app
mkdir -p uploads outputs
chmod 755 uploads outputs
```

#### Step 8: Reload & Test
1. Kembali ke tab "Web"
2. Klik tombol hijau **"Reload yourusername.pythonanywhere.com"**
3. Akses aplikasi di: `https://yourusername.pythonanywhere.com`

---

### 2. Heroku (Scalable & Professional)

**Kelebihan:**
- ✅ Scalable (mudah upgrade)
- ✅ Git-based deployment
- ✅ Professional features
- ⚠️ Free tier dihapus (harus pakai paid plan)

**Langkah-langkah:**

#### Step 1: Install Heroku CLI
Download dan install dari: https://devcenter.heroku.com/articles/heroku-cli

**Windows:**
```bash
# Download installer dari website
# Atau via chocolatey:
choco install heroku-cli
```

#### Step 2: Buat File Tambahan

**1. Procfile** (tanpa extension):
```
web: gunicorn app:app
```

**2. runtime.txt**:
```
python-3.11.0
```

**3. Update requirements.txt**, tambahkan:
```
Flask==3.1.2
Pillow==11.3.0
numpy==2.3.3
Werkzeug==3.1.3
gunicorn==21.2.0
```

**4. Update app.py** (optional, untuk port dynamic):
```python
import os

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
```

#### Step 3: Initialize Git
```bash
cd C:\xampp\htdocs\imageGPT
git init
git add .
git commit -m "Initial commit - Corals Image Correction App"
```

#### Step 4: Deploy ke Heroku
```bash
# Login
heroku login

# Buat app
heroku create corals-image-app

# Deploy
git push heroku main

# Open browser
heroku open
```

#### Step 5: Monitor Logs
```bash
heroku logs --tail
```

---

### 3. Railway.app (Modern & Easy)

**Kelebihan:**
- ✅ Modern interface
- ✅ Auto-deploy dari GitHub
- ✅ Free tier $5/month credit
- ✅ Sangat mudah digunakan

**Langkah-langkah:**

#### Step 1: Persiapan
1. Push code ke GitHub repository
2. Kunjungi https://railway.app
3. Login dengan GitHub

#### Step 2: Deploy
1. Klik "New Project"
2. Pilih "Deploy from GitHub repo"
3. Pilih repository Anda
4. Railway akan auto-detect Flask app
5. Klik "Deploy"

#### Step 3: Configure (Optional)
1. Klik project → Settings
2. Add environment variables jika perlu
3. Generate domain: klik "Generate Domain"

#### Step 4: Access
Akses aplikasi di domain yang di-generate, contoh:
`https://corals-image-app.up.railway.app`

---

### 4. Render (Modern & Free Tier)

**Kelebihan:**
- ✅ Free tier tersedia
- ✅ SSL otomatis
- ✅ Auto-deploy dari Git
- ✅ Modern platform

**Langkah-langkah:**

#### Step 1: Buat File render.yaml
```yaml
services:
  - type: web
    name: corals-image-app
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: gunicorn app:app
    envVars:
      - key: PYTHON_VERSION
        value: 3.11.0
```

#### Step 2: Deploy
1. Kunjungi https://render.com
2. Sign up dengan GitHub
3. Klik "New +" → "Web Service"
4. Connect repository
5. Configure:
   - **Name:** corals-image-app
   - **Environment:** Python
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
6. Klik "Create Web Service"

---

## 🖥️ Option B: VPS (Virtual Private Server)

**Cocok untuk:** Advanced users, butuh kontrol penuh

**Provider Recommended:**
- **Indonesia:** Niagahoster, Dewaweb, IDCloudHost, Biznet Gio
- **International:** DigitalOcean, Linode, Vultr, AWS EC2

### Langkah-langkah di Ubuntu Server:

#### Step 1: Koneksi ke Server
```bash
ssh root@your-server-ip
```

#### Step 2: Update System
```bash
sudo apt update && sudo apt upgrade -y
```

#### Step 3: Install Dependencies
```bash
# Install Python dan tools
sudo apt install python3 python3-pip python3-venv nginx supervisor -y

# Install Git
sudo apt install git -y
```

#### Step 4: Buat User Non-Root
```bash
adduser corals
usermod -aG sudo corals
su - corals
```

#### Step 5: Clone Project
```bash
cd /home/corals
git clone https://github.com/yourusername/corals-image-app.git
cd corals-image-app
```

#### Step 6: Setup Virtual Environment
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn
```

#### Step 7: Test Gunicorn
```bash
gunicorn --bind 0.0.0.0:8000 app:app
```

#### Step 8: Configure Supervisor

Buat file `/etc/supervisor/conf.d/corals-app.conf`:
```ini
[program:corals-app]
directory=/home/corals/corals-image-app
command=/home/corals/corals-image-app/venv/bin/gunicorn --workers 3 --bind 0.0.0.0:8000 app:app
user=corals
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
stderr_logfile=/var/log/corals-app/err.log
stdout_logfile=/var/log/corals-app/out.log
```

Buat folder log:
```bash
sudo mkdir -p /var/log/corals-app
sudo chown corals:corals /var/log/corals-app
```

Start supervisor:
```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start corals-app
```

#### Step 9: Configure Nginx

Buat file `/etc/nginx/sites-available/corals-app`:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /static {
        alias /home/corals/corals-image-app/static;
        expires 30d;
    }

    location /uploads {
        alias /home/corals/corals-image-app/uploads;
        expires 1d;
    }

    location /outputs {
        alias /home/corals/corals-image-app/outputs;
        expires 1d;
    }

    client_max_body_size 16M;
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/corals-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 10: Setup SSL dengan Let's Encrypt
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

---

## 🏢 Option C: Shared Hosting dengan cPanel

**Catatan:** Tidak semua shared hosting support Python Flask. Pastikan cek dengan provider!

### Providers yang Support Python:
- A2 Hosting
- FastComet
- Hostinger (beberapa paket)

### Langkah-langkah:

#### Step 1: Cek Python Support
1. Login ke cPanel
2. Cari "Setup Python App" atau "Python Selector"
3. Jika tidak ada, hubungi support

#### Step 2: Setup Python Application
1. Buka "Setup Python App"
2. Klik "Create Application"
3. Configure:
   - **Python version:** 3.10 atau 3.11
   - **Application root:** `corals-app`
   - **Application URL:** `your-domain.com`
   - **Application startup file:** `app.py`
   - **Application Entry point:** `app`

#### Step 3: Upload Files via FTP
1. Download FileZilla atau gunakan cPanel File Manager
2. Upload semua file ke folder application root
3. Upload struktur:
```
/home/username/corals-app/
├── app.py
├── underwater_fix.py
├── requirements.txt
├── templates/
├── static/
├── uploads/
└── outputs/
```

#### Step 4: Install Dependencies
1. Di cPanel Python App
2. Klik "Run pip install"
3. Atau via SSH (jika tersedia):
```bash
cd ~/corals-app
source venv/bin/activate
pip install -r requirements.txt
```

#### Step 5: Start Application
Klik "Restart" di Python App dashboard

---

## 🔧 Troubleshooting

### Problem: Port Already in Use
**Solution:**
```bash
# Find process using port 5000
sudo lsof -i :5000
# Kill process
sudo kill -9 <PID>
```

### Problem: Permission Denied pada Uploads/Outputs
**Solution:**
```bash
chmod 755 uploads outputs
chown www-data:www-data uploads outputs
```

### Problem: Module Not Found
**Solution:**
```bash
pip install --upgrade -r requirements.txt
```

### Problem: 502 Bad Gateway (Nginx)
**Solution:**
```bash
# Check gunicorn status
sudo supervisorctl status corals-app
# Restart
sudo supervisorctl restart corals-app
# Check nginx
sudo nginx -t
sudo systemctl restart nginx
```

### Problem: Image Upload Fails
**Solution:**
- Cek max upload size di nginx config
- Pastikan folder uploads/ writable
- Cek disk space: `df -h`

---

## 📊 Maintenance & Monitoring

### Update Aplikasi

**Git-based platforms (Railway, Render, Heroku):**
```bash
git add .
git commit -m "Update features"
git push origin main
# Auto-deploy will trigger
```

**VPS:**
```bash
cd /home/corals/corals-image-app
git pull origin main
source venv/bin/activate
pip install -r requirements.txt
sudo supervisorctl restart corals-app
```

### Monitor Logs

**PythonAnywhere:**
- Dashboard → Web → Error log

**Heroku:**
```bash
heroku logs --tail
```

**VPS:**
```bash
tail -f /var/log/corals-app/out.log
tail -f /var/log/corals-app/err.log
tail -f /var/log/nginx/access.log
```

### Backup Database/Files
```bash
# Backup outputs
tar -czf outputs-backup-$(date +%Y%m%d).tar.gz outputs/

# Schedule with cron
0 2 * * * cd /home/corals/corals-image-app && tar -czf backups/outputs-$(date +\%Y\%m\%d).tar.gz outputs/
```

---

## 🌟 Rekomendasi Platform

### Untuk Testing & Portfolio:
- ✅ **PythonAnywhere** (Free & mudah)
- ✅ **Railway.app** (Modern, $5/month credit)

### Untuk Production:
- ✅ **VPS** (Full control, scalable)
- ✅ **Render** (Balance antara mudah & powerful)

### Untuk Indonesia Market:
- ✅ **VPS Indonesia** (Niagahoster, Dewaweb)
- Domain .id lebih terpercaya
- Server lebih dekat = lebih cepat

---

## 📞 Support

Jika ada masalah saat deployment:

1. **Check application logs** first
2. **Google error message** - biasanya ada solusi
3. **Platform documentation** - baca docs platform yang digunakan
4. **Community forums** - Stack Overflow, Reddit

---

## ✅ Checklist Deployment

- [ ] Update `app.py` - set `debug=False`
- [ ] Buat `.gitignore`
- [ ] Test di local environment
- [ ] Commit ke Git
- [ ] Pilih platform hosting
- [ ] Deploy aplikasi
- [ ] Test semua fitur
- [ ] Setup SSL certificate
- [ ] Setup monitoring
- [ ] Setup backup strategy
- [ ] Document access credentials

---

**Good luck with your deployment! 🚀**

Developed by **Suryo Kusumo**
© 2025 All Rights Reserved
