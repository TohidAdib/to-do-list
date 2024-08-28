FROM python:3.10

WORKDIR /usr/src/app

# کپی کردن فایل‌های وابستگی به تصویر
COPY requirements.txt .

# نصب وابستگی‌ها
RUN pip install --no-cache-dir -r requirements.txt

# کپی کردن بقیه فایل‌های پروژه
COPY . .

WORKDIR /usr/src/app/list

EXPOSE 8080

CMD ["python", "manage.py", "runserver", "0.0.0.0:8080"]
