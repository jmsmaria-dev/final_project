# M80 Deployment Guide for Digital Ocean

## Server: 138.68.254.154

## Quick Deploy

1. **SSH into your server:**
```bash
ssh root@138.68.254.154
```

2. **Download and run the deployment script:**
```bash
wget https://raw.githubusercontent.com/jmsmaria-dev/final_project/main/deploy.sh
chmod +x deploy.sh
bash deploy.sh
```

## Manual Deployment Steps

If you prefer manual setup or need to troubleshoot:

### 1. Initial Setup
```bash
ssh root@138.68.254.154

# Update system
sudo apt update && sudo apt upgrade -y
```

### 2. Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
node --version
npm --version
```

### 3. Install MongoDB
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### 4. Install NGINX & PM2
```bash
sudo apt install -y nginx
sudo npm install -g pm2
```

### 5. Clone Project
```bash
sudo mkdir -p /var/www/m80
sudo chown -R $USER:$USER /var/www/m80
cd /var/www/m80
git clone https://github.com/jmsmaria-dev/final_project.git .
```

### 6. Configure Environment
```bash
cat > .env << 'EOF'
FIRST_NAME=Maria
JWT_SECRET=m80-super-secret-jwt-key-change-in-production-2025
MONGODB_URI=mongodb://127.0.0.1:27017/final_project
EOF
```

### 7. Build & Deploy
```bash
npm install
npm run build
pm2 start server.js --name m80-backend
pm2 save
pm2 startup
```

### 8. Configure NGINX
```bash
sudo nano /etc/nginx/sites-available/m80
```

Paste this configuration:
```nginx
server {
    listen 80;
    server_name 138.68.254.154;

    root /var/www/m80/build;
    index index.html;

    location / {
        try_files $uri /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/m80 /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

### 9. Configure Firewall
```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## Access Your Application

Visit: **http://138.68.254.154**

Login: `Maria` / `Maria`

## Maintenance Commands

### View Logs
```bash
# Backend logs
pm2 logs m80-backend

# NGINX access logs
sudo tail -f /var/log/nginx/access.log

# NGINX error logs
sudo tail -f /var/log/nginx/error.log

# MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log
```

### Restart Services
```bash
# Restart backend
pm2 restart m80-backend

# Restart NGINX
sudo systemctl restart nginx

# Restart MongoDB
sudo systemctl restart mongod
```

### Update Application
```bash
cd /var/www/m80
bash update.sh
```

Or manually:
```bash
cd /var/www/m80
git pull origin main
npm install
npm run build
pm2 restart m80-backend
sudo systemctl reload nginx
```

### Check Status
```bash
# PM2 processes
pm2 status
pm2 monit

# NGINX status
sudo systemctl status nginx

# MongoDB status
sudo systemctl status mongod

# Disk usage
df -h

# Memory usage
free -h
```

## Troubleshooting

### Backend not starting
```bash
pm2 logs m80-backend --lines 100
pm2 restart m80-backend
```

### NGINX errors
```bash
sudo nginx -t
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
```

### MongoDB connection issues
```bash
sudo systemctl status mongod
mongosh final_project --eval "db.stats()"
```

### Port conflicts
```bash
# Check what's using port 3000
sudo lsof -i :3000

# Check what's using port 80
sudo lsof -i :80
```

## Security Recommendations

1. **Change default credentials** in `.env`
2. **Set strong JWT_SECRET**
3. **Enable firewall** (UFW already configured)
4. **Regular updates:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```
5. **Monitor logs regularly**
6. **Consider HTTPS** with Let's Encrypt (for domain names)

## Backup MongoDB

```bash
# Create backup
mongodump --db final_project --out /var/backups/mongodb/

# Restore backup
mongorestore --db final_project /var/backups/mongodb/final_project/
```

## Performance Monitoring

```bash
# Install htop
sudo apt install htop

# Monitor system resources
htop

# Monitor Node.js process
pm2 monit
```
