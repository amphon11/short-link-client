# Short URL Application

<div align="center">
  ![image](https://github.com/user-attachments/assets/d0de4734-7c6d-426f-b322-6da31d5004bf)
</div>

## 📌 Overview
  - URL Shortener Application เป็นเครื่องมือสำหรับย่อ URL ที่พัฒนาด้วย TypeScript, Node.js, Express, และ Prisma ช่วยให้ผู้ใช้สามารถ:
  - ย่อ URL ยาว ๆ ให้สั้นลง
  - ติดตามจำนวนคลิกของผู้ใช้
  - สร้าง QR Code สำฟรับเข้าชม URL
  - เหมาะสำหรับการแชร์ลิงก์บนโซเชียลมีเดียและการตลาดดิจิทัล ✨

  - 
## 🚀 Features

1. **🔗 URL Shortening**
   - แปลง URL ยาวให้เป็นรหัสสั้น (short code) โดยใช้การเข้ารหัส Base-64
   - รองรับการสร้าง Short URL ซ้ำสำหรับ URL เดิมที่มีอยู่แล้ว
   - คืนค่า URL สั้นในรูปแบบ `https://your-domain.com/<shortCode>`
   - 
2. **📊 QR Code**
   - สร้าง QR Code สำหรับ รหัสสั้น (short code)
   - ติดตามจำนวนการเข้าชมของผู้ใช้
   - เข้าชม URL ผ่านทาง QR Code

3. **📊 Click Tracking**
   - บันทึกจำนวนครั้งที่ URL สั้นถูกคลิก
     
4. **📈 Analytics**
   - **Shorting URL**: แสดง Short URl แสดง ตัวอย่าง URL และ QR Code
   - **URL History**: แสดงรายการ URL ทั้งหมดที่เคยสร้าง จำนวนคลิก และวันที่สร้าง

5. **⚡ Scalability**
   - ใช้ Prisma ORM ร่วมกับ PostgreSQL เพื่อจัดการฐานข้อมูลแบบ scalable
   - รองรับการ deploy บน platform เช่น Render

## 🛠 Prerequisites

ก่อนติดตั้ง คุณต้องมีเครื่องมือและข้อมูลต่อไปนี้:

- **React.js**: v19 หรือสูงกว่า
- **Render Account**: ถ้าต้องการ deploy ออนไลน์

## 🔧 Installation (Local Development)

### 1️⃣ Clone Repository
```bash
git clone https://github.com/amphon11/short-link.git
cd short-link
```
### 2️⃣ Install Dependencies
```bash
npm install
# หรือถ้าใช้ yarn
# yarn install
```
### 3️⃣ Setup Environment Variables
```bash
DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<dbname>?schema=public"
VITE_BASE_URL="your_server_domain" 
```
📌 เปลี่ยนค่า <username>, <password>, <host>, <port>, <dbname> ตามฐานข้อมูลของคุณ

API URL สามารถนำมาได้จาก [Short link server side](https://github.com/erisk405/ShortLink-Server) คือ http://localhost:8080

### 4️⃣ Setup Database
```bash
npx prisma migrate dev --name init
```

### 5️⃣ Start the Application
```bash
npm start
```

## 🚀 Deployment
รองรับการ deploy บนแพลตฟอร์มต่าง ๆ เช่น:
  - Vercel: vercel deploy
  - Netlify: netlify deploy
  - Render: สามารถตั้งค่าใน package.json ให้รองรับ build บน Render

## 🔗 Links
- **Client Repository:** [Short link client side](https://github.com/erisk405/ShortLink-Client)
- **Server Repository:** [Short link server side](https://github.com/erisk405/ShortLink-Server)

Built with ❤️ using React Router.
