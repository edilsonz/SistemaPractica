@echo off
setlocal
title Iniciador - Sistema de Practicas UNSCH

echo Iniciando Sistema de Gestion de Practicas UNSCH...
echo.

start "Backend - UNSCH Practicas" /D "%~dp0backend" cmd /k npm.cmd run dev
start "Frontend - UNSCH Practicas" /D "%~dp0frontend" cmd /k npm.cmd run dev

echo Se abrieron dos terminales: backend y frontend.
echo Cuando ambas indiquen que estan listas, abre http://localhost:5173
pause
