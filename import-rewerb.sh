#!/bin/bash

# Переменные путей
REWEB_COMPONENTS_DIR="/Users/garuda/Downloads/app/src/components"
SCAFFOLD_COMPONENTS_DIR="./packages/nextjs/components"

echo "🚀 Копируем файлы из Reweb в Scaffold-ETH 2..."
mkdir -p "$SCAFFOLD_COMPONENTS_DIR"
cp -R "$REWEB_COMPONENTS_DIR"/* "$SCAFFOLD_COMPONENTS_DIR"

echo "✅ Компоненты успешно перемещены!"

# Автоматическая замена импортов (пример для TypeScript)
echo "🔄 Обновляем пути к компонентам..."
find "$SCAFFOLD_COMPONENTS_DIR" -type f -name "*.tsx" -exec sed -i 's/from "src\/components\//from "..\/components\//g' {} \;

echo "✅ Пути обновлены!"

# Добавление компонентов в pages/index.tsx
echo "🛠️ Подключаем компоненты в Scaffold-ETH 2..."
INDEX_FILE="./packages/nextjs/pages/index.tsx"

echo -e "\n// Автоматически добавленные компоненты из Reweb" >> $INDEX_FILE
for file in "$SCAFFOLD_COMPONENTS_DIR"/*.tsx; do
  echo "$file"
  component_name=$(basename "$file" .tsx)
  echo "import $component_name from '@/components/$component_name';" >> $INDEX_FILE
done

echo "✅ Компоненты подключены! 🚀"
