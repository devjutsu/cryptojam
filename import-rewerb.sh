#!/bin/bash

# Переменные путей
REWEB_BASE_DIR="/Users/garuda/Downloads/app/src"
SCAFFOLD_BASE_DIR="./packages/nextjs"

REWEB_COMPONENTS_DIR="$REWEB_BASE_DIR/components"
REWEB_APP_DIR="$REWEB_BASE_DIR/app"
REWEB_LIB_DIR="$REWEB_BASE_DIR/lib"
REWEB_PUBLIC_DIR="/Users/garuda/Downloads/app/public"
REWEB_TAILWIND_CONFIG="/Users/garuda/Downloads/app/tailwind.config.js"

SCAFFOLD_COMPONENTS_DIR="$SCAFFOLD_BASE_DIR/components"
SCAFFOLD_APP_DIR="$SCAFFOLD_BASE_DIR/app"
SCAFFOLD_LIB_DIR="$SCAFFOLD_BASE_DIR/lib"
SCAFFOLD_PUBLIC_DIR="$SCAFFOLD_BASE_DIR/public"
SCAFFOLD_TAILWIND_CONFIG="$SCAFFOLD_BASE_DIR/tailwind.config.js"

INDEX_FILE="$SCAFFOLD_BASE_DIR/pages/index.tsx"

echo "🚀 Копируем файлы из Reweb в Scaffold-ETH 2..."

# Копируем components
mkdir -p "$SCAFFOLD_COMPONENTS_DIR"
cp -R "$REWEB_COMPONENTS_DIR"/* "$SCAFFOLD_COMPONENTS_DIR"

# Копируем app
mkdir -p "$SCAFFOLD_APP_DIR"
cp -R "$REWEB_APP_DIR"/* "$SCAFFOLD_APP_DIR"

# Копируем lib
mkdir -p "$SCAFFOLD_LIB_DIR"
cp -R "$REWEB_LIB_DIR"/* "$SCAFFOLD_LIB_DIR"

# Копируем public (статические файлы и картинки)
if [ -d "$REWEB_PUBLIC_DIR" ]; then
  mkdir -p "$SCAFFOLD_PUBLIC_DIR"
  cp -R "$REWEB_PUBLIC_DIR"/* "$SCAFFOLD_PUBLIC_DIR"
  echo "✅ Папка public успешно скопирована!"
else
  echo "⚠️ Папка public не найдена в исходной директории!"
fi

# Копируем Tailwind config, если он есть
if [ -f "$REWEB_TAILWIND_CONFIG" ]; then
  cp "$REWEB_TAILWIND_CONFIG" "$SCAFFOLD_TAILWIND_CONFIG"
  echo "✅ Tailwind config скопирован!"
else
  echo "⚠️ Tailwind config не найден в исходной папке!"
fi

echo "✅ Все файлы успешно перемещены!"

# Автоматическая замена импортов
echo "🔄 Обновляем пути к компонентам, app и lib..."

# Находим файлы, исключая node_modules и .next/
find "$SCAFFOLD_BASE_DIR" \
  \( -path "$SCAFFOLD_BASE_DIR/node_modules" -o -path "$SCAFFOLD_BASE_DIR/.next" \) -prune -o \
  -type f \( -name "*.tsx" -o -name "*.ts" -o -name "*.js" -o -name "*.jsx" \) -print | while read -r file; do
  # echo "🔄 Обрабатываю файл: $file"
  
  sed -i '' \
    -e 's/from "src\/components\//from "..\/components\//g' \
    -e 's/from "src\/app\//from "..\/app\//g' \
    -e 's/from "src\/lib\//from "..\/lib\//g' \
    -e 's/from "@\/components\//from "~~\/components\//g' \
    -e 's/from "@\/app\//from "~~\/app\//g' \
    -e 's/from "@\/lib\//from "~~\/lib\//g' "$file"

done

echo "✅ Пути импортов исправлены!"

# Добавление компонентов в index.tsx
echo "🛠️ Подключаем компоненты в Scaffold-ETH 2..."
mkdir -p "$(dirname "$INDEX_FILE")"
touch "$INDEX_FILE"

echo -e "\n// Автоматически добавленные компоненты из Reweb" >> $INDEX_FILE
for file in "$SCAFFOLD_COMPONENTS_DIR"/*.tsx; do
  component_name=$(basename "$file" .tsx)
  echo "import $component_name from '~~/components/$component_name';" >> $INDEX_FILE
done

echo "✅ Компоненты подключены! 🚀"

./fix-imports.sh