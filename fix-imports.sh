#!/bin/bash

# Папка, в которой нужно заменить пути
TARGET_DIR="./packages/nextjs/app"

# Находим все .tsx файлы и заменяем пути
find "$TARGET_DIR" -type f -name "*.tsx" | while read -r file; do
  # echo "🔄 Обрабатываю файл: $file"
  
  sed -i '' -E 's|"~~/components/header";|"~~/components/Header";|g' "$file"
  sed -i '' -E 's|"~~/components/footer";|"~~/components/Footer";|g' "$file"
  
done
rm -rf './packages/nextjs/pages'
echo "✅ Замена завершена!"

echo "✅ ./packages/nextjs/pages удален!"





SOURCE_FILE="/Users/garuda/Downloads/app/tailwind.config.ts"
TARGET_FILE="./packages/nextjs/tailwind.config.js"
if [ ! -f "$SOURCE_FILE" ]; then
  echo "❌ Файл $SOURCE_FILE не найден!"
  exit 1
fi

cp "$SOURCE_FILE" "$TARGET_FILE"
# # Удаляем `export default` и заменяем `import` на `require` (если есть)
# sed -i '' -E 's/^export default/ module.exports =/' "$TARGET_FILE"
# sed -i '' -E 's/import (.*) from (.*);/const \1 = require(\2);/' "$TARGET_FILE"

echo "✅ Tailwind конфиг успешно скопирован!"



