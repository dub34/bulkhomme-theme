# Product PremiumCare Layout - Инструкция

Документация по использованию Liquid шаблона для страницы товара с дизайном PremiumCare.

## 📁 Файлы шаблона

```
theme_export__bulk-homme/
├── sections/
│   └── product-information-premiumcare.liquid   # Основной шаблон секции
├── assets/
│   ├── product-premiumcare.css                 # Стили
│   └── product-premiumcare.js                  # JavaScript (слайдер, количество)
```

## 🎯 Места для вставки данных из админки Shopify

### 1. **BREADCRUMBS** - Хлебные крошки (строки 11-31)

**Автоматические данные:**
- `{{ shop.name }}` - название магазина
- `{{ collection.title }}` - название коллекции
- `{{ product.vendor }}` - бренд/производитель

**Настройки в админке:**
- `show_vendor_breadcrumb` (checkbox) - показывать ли бренд в хлебных крошках

---

### 2. **PRODUCT TITLE** - Название товара (строка 41)

```liquid
<h1 class="product-title">{{ product.title }}</h1>
```

**Данные из админки:**
- Название товара автоматически подтягивается из карточки товара

---

### 3. **PRODUCT GALLERY** - Галерея изображений (строки 49-99)

```liquid
{%- for image in product.images -%}
  <img src="{{ image | image_url: width: 1000 }}" alt="{{ product.title }}">
{%- endfor -%}
```

**Данные из админки:**
- Все изображения товара из карточки товара
- Автоматический бейдж скидки (если `compare_at_price` > `price`)
- Кнопки навигации "Prev/Next"
- Точки навигации (dots)

**Как работает скидка:**
- Если у товара указана старая цена (`compare_at_price`), автоматически показывается бейдж "-15%"
- Процент скидки вычисляется автоматически

---

### 4. **PRODUCT DESCRIPTION** - Краткое описание (строки 101-116)

**Приоритет данных:**

1. **Настройка секции** `section.settings.short_description` - вы вводите в админке секции
2. **Metafield товара** `product.metafields.custom.short_description` - в карточке товара
3. **Автоматическое** обрезанное описание товара (первые 200 символов)

**Пример настройки в админке:**
```
Short Description: "A unique premium treatment shampoo with many beneficial
effects for the beauty and health of men's hair..."
```

---

### 5. **VARIANT SELECTOR** - Выбор варианта (строки 126-153)

```liquid
{%- for option in product.options_with_values -%}
  <label>{{ option.name }}:</label>
  <select>
    {%- for value in option.values -%}
      <option>{{ value }}</option>
    {%- endfor -%}
  </select>
{%- endfor -%}
```

**Данные из админки:**
- Автоматически генерируется из вариантов товара
- Например: "Volume: 200ml, 500ml" или "Color: Red, Blue"

**Пример в HTML:**
```html
<label>Volume:</label>
<select>
  <option>200 ml</option>
  <option>500 ml</option>
</select>
```

---

### 6. **PRICE** - Цена товара (строки 155-172)

```liquid
{%- if product.compare_at_price > product.price -%}
  <span class="price-old">{{ product.compare_at_price | money }}</span>
{%- endif -%}
<span class="price">{{ product.price | money }}</span>
```

**Данные из админки:**
- `product.price` - текущая цена
- `product.compare_at_price` - старая цена (зачеркнутая)

**Пример в HTML:**
```html
<span class="price-old">34.40 €</span>
<span class="price">29.30 €</span>
```

---

### 7. **QUANTITY & ADD TO CART** - Количество и кнопка (строки 174-199)

**Настройки в админке:**
- `button_text` (text) - текст кнопки, по умолчанию "Add to Cart"

```liquid
<button type="submit">{{ section.settings.button_text | default: 'Add to Cart' }}</button>
```

**Пример настройки:**
```
Button Text: "Добавить в корзину"
```

---

### 8. **PRODUCT SPECIFICATIONS** - Характеристики товара (строки 202-268)

Вы можете настроить **4 характеристики** через админку Shopify:

#### **Характеристика 1:**
- `spec_1_label` - Название (например, "Purpose")
- `spec_1_value` - Значение (например, "cleansing, nutrition, strengthening")

#### **Характеристика 2:**
- `spec_2_label` - Название (например, "Application time")
- `spec_2_value` - Значение (например, "as needed, suitable for daily care")

#### **Характеристика 3:**
- `spec_3_label` - Название (например, "Hair type")
- `spec_3_value` - Значение (например, "for all hair types")

#### **Характеристика 4:**
- `spec_4_label` - Название (например, "Made in")
- `spec_4_value` - Значение (например, "Japan")

**Альтернатива - Metafields:**
Если не заполнить значение в настройках, система попытается использовать metafields:
- `product.metafields.custom.purpose`
- `product.metafields.custom.application_time`
- `product.metafields.custom.hair_type`
- `product.metafields.custom.country`

**Пример в HTML:**
```html
<ul>
  <li><b>Purpose:</b> cleansing, nutrition, strengthening, shine, anti-dandruff</li>
  <li><b>Application time:</b> as needed, suitable for daily care</li>
  <li><b>Hair type:</b> for all hair types</li>
  <li><b>Made in:</b> Japan</li>
</ul>
```

---

## 🎨 Схема настроек в админке Shopify

После добавления секции на страницу товара, вы увидите следующие настройки:

### **Breadcrumbs**
- ☑ Show vendor/brand in breadcrumbs

### **Product Description**
- Short Description (textarea)

### **Add to Cart Button**
- Button Text (text field)

### **Product Specifications**
- Specification 1 - Label (text)
- Specification 1 - Value (text)
- Specification 2 - Label (text)
- Specification 2 - Value (text)
- Specification 3 - Label (text)
- Specification 3 - Value (text)
- Specification 4 - Label (text)
- Specification 4 - Value (text)

---

## 🚀 Как использовать

### 1. Создать новый product template

1. В Shopify Admin перейдите в **Online Store** → **Themes** → **Customize**
2. Создайте новый product template: `product.premiumcare.json`
3. Добавьте секцию `product-information-premiumcare`

### 2. Назначить шаблон товару

1. Откройте товар в админке
2. В правом сайдбаре найдите **Theme template**
3. Выберите `product.premiumcare`

### 3. Настроить поля в админке

1. Откройте страницу товара в визуальном редакторе
2. Нажмите на секцию "Product Information Premium"
3. Заполните все необходимые поля:
   - Short Description
   - Button Text
   - 4 характеристики товара

---

## 📊 Карта соответствия HTML → Liquid

| HTML элемент | Liquid данные | Где настроить |
|-------------|---------------|---------------|
| `<h1 class="product-title">` | `{{ product.title }}` | Карточка товара |
| `<div class="sales">-15%</div>` | Автоматический расчет | Compare at price товара |
| `<img class="slide-img">` | `{{ product.images }}` | Изображения товара |
| `<p class="product-desc">` | `section.settings.short_description` | Настройки секции |
| `<select name="option">` | `{{ product.options }}` | Варианты товара |
| `<span class="price-old">` | `{{ product.compare_at_price }}` | Старая цена товара |
| `<span class="price">` | `{{ product.price }}` | Цена товара |
| `<button class="button">` | `section.settings.button_text` | Настройки секции |
| `<li><b>Purpose:</b>` | `section.settings.spec_1_label` | Настройки секции |

---

## 🎯 Функциональность JavaScript

Файл `product-premiumcare.js` добавляет:

1. **Слайдер изображений:**
   - Кнопки Prev/Next
   - Точки навигации (dots)
   - Свайп на мобильных

2. **Контроль количества:**
   - Кнопки +/- для изменения количества
   - Валидация минимума/максимума

3. **Добавление в корзину:**
   - Обработка отправки формы
   - Визуальная обратная связь

---

## 📝 Примечания

- **Все данные автоматические:** Большинство данных подтягиваются из карточки товара
- **Настройки опциональны:** Если не заполнить настройки секции, будут использованы значения по умолчанию
- **Metafields как альтернатива:** Можно использовать metafields вместо настроек секции
- **Responsive дизайн:** Макет адаптивный, работает на всех устройствах

---

## ✅ Чеклист для настройки товара

- [ ] Добавить название товара
- [ ] Загрузить изображения товара (минимум 3 для слайдера)
- [ ] Указать цену и старую цену (для скидки)
- [ ] Создать варианты товара (если нужно)
- [ ] Заполнить краткое описание в секции
- [ ] Настроить текст кнопки "Купить"
- [ ] Заполнить 4 характеристики товара
- [ ] Назначить template `product.premiumcare` товару

---

## 🎨 Кастомизация стилей

Все стили находятся в файле `product-premiumcare.css`:

- Цвета: `#f5ead6` (фон), `#d31e49` (скидка), `#352c25` (кнопка)
- Шрифты: 'Roboto Condensed', 'Bebas Neue'
- Responsive breakpoints: 600px, 800px, 1024px, 1500px

Вы можете изменить любые стили по вашему усмотрению!