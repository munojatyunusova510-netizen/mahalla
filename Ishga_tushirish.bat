@echo off
title Mening Mahallam — Ishga tushirish
echo =======================================================
echo   Mening Mahallam — Raqamli Mahalla Platformasi
echo   Brauzer ochilmoqda: http://localhost:3000/
echo =======================================================
timeout /t 2 /nobreak >nul
start http://localhost:3000/
call npm run dev
pause
