# Sử dụng Node.js 13 với Alpine Linux làm base image
FROM node:13-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app



# Sao chép toàn bộ mã nguồn vào container
# (Các file/thư mục trong .dockerignore sẽ không được sao chép)
COPY . .

# Cài đặt các dependencies
RUN npm install
# Xây dựng ứng dụng Next.js
RUN npm run build

# Mở cổng mà ứng dụng sẽ chạy
EXPOSE 3000

# Khởi chạy ứng dụng
CMD ["npm", "start"]

