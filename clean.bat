@echo off
echo Limpando o projeto...

REM Limpar cache do npm
call npm cache clean --force

REM Remover node_modules
rmdir /s /q node_modules

REM Limpar cache do gradle
cd android
rmdir /s /q .gradle
rmdir /s /q build
cd ..

REM Reinstalar dependências
call npm install --legacy-peer-deps

echo Limpeza concluída!
pause 