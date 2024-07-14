# Simple To-Do List Project

این اولین پروژه‌ای است که روی آن کار کردم و یک To-Do List ساده است.

## پیش‌نیازها

- Python 3.6+
- Node.js 14+

# راه‌اندازی سرور Django

ابتدا به دایرکتوری backend بروید:


cd backend


سپس یک محیط مجازی ایجاد کنید و آن را فعال کنید:


python -m venv venv
.\venv\Scripts\activate



پکیج‌های مورد نیاز را نصب کنید:


pip install -r requirements.txt
فایل list را که در قسمت backend گیت‌هاب وجود دارد اضافه کنید.



سرور Django را روی پورت 8080 اجرا کنید:

python manage.py runserver 8080



# راه اندازی برنامه React

ابتدا به دایرکتوری frontend بروید:


cd ../frontend


یک برنامه React جدید ایجاد کنید و به دایرکتوری آن بروید:


create-react-app list


cd list



پکیج‌های مورد نیاز را نصب کنید:


npm install bootstrap axios react-router-dom yup


فایل src که در گیت‌هاب قرار دارد را جایگزین کنید.






# نحوه اجرا پروژه

 سرور Django را روی پورت 8080 اجرا کنید:



python manage.py runserver 8080

برنامه React را در دایرکتوری list روی پورت 3000 اجرا کنید:

npm start



توضیحات

    سرور Django باید روی پورت 8080 اجرا شود، در غیر این صورت کار نخواهد کرد.
    برنامه React نیز باید روی پورت 3000 اجرا شود.

مشارکت

اگر قصد دارید در این پروژه مشارکت کنید، لطفاً ابتدا یک Issue ایجاد کنید تا درباره تغییرات پیشنهادیتان بحث کنیم.
مجوز

این پروژه تحت مجوز MIT منتشر شده است.
