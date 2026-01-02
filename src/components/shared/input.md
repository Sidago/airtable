
# 🔤 Custom Input Component (React + TypeScript)

A **fully customizable, production-ready Input component** for React that supports:

- ✅ Text, Password & Textarea
- 👁️ Password visibility toggle
- 🔍 Left & Right icons
- 🧩 Label as string or ReactNode
- 🛡️ Built-in & custom validation (sync + async)
- 🎨 Full control over styles (Tailwind / CSS / styled-components)
- ⚙️ Controlled & uncontrolled usage

---

## 📦 Features

- **Input Types**: text, password, textarea
- **Password Toggle**: show / hide password
- **Icons**: left & right icons with click handlers
- **Validation Rules**:
  - required
  - minLength
  - maxLength
  - pattern
  - custom validator (async supported)
- **Styling**:
  - label, input, textarea, icons, wrapper
  - spacing, colors, borders, backgrounds

---

## 📁 File Structure

```
components/
 └── Input.tsx
README.md
```

---

## 🚀 Installation

Just copy the component:

```bash
components/Input.tsx
```

No external dependency required.

---

## 🧩 Basic Usage

```tsx
<Input
  label="Email"
  placeholder="Enter email"
  inputClassName="border px-3 py-2 rounded w-full"
  rules={[
    { type: "required" },
    {
      type: "pattern",
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email",
    },
  ]}
/>
```

---

## 👁️ Password Toggle

```tsx
<Input
  label="Password"
  type="password"
  enablePasswordToggle
  inputClassName="border px-10 py-2 rounded w-full"
  rules={[{ type: "minLength", value: 8 }]}
/>
```

---

## 🔍 Left Icon

```tsx
import { Search } from "lucide-react";

<Input
  placeholder="Search"
  leftIcon={<Search size={16} />}
  inputClassName="border pl-10 py-2 rounded w-full"
/>
```

---

## ⚙️ Right Icon Action

```tsx
<Input
  placeholder="Clear"
  rightIcon="❌"
  onRightIconClick={() => setValue("")}
  inputClassName="border pr-10 py-2 rounded w-full"
/>
```

---

## 🛡️ Custom Validation

```tsx
<Input
  as="textarea"
  label="Message"
  rules={[
    {
      type: "custom",
      validator: async (value) => value.length > 20,
      message: "Minimum 20 characters",
    },
  ]}
/>
```

---

## 🎨 Styling Control

All styles are passed via className props:

- `wrapperClassName`
- `labelClassName`
- `fieldWrapperClassName`
- `inputClassName`
- `textareaClassName`
- `iconClassName`
- `errorClassName`

Works perfectly with **Tailwind CSS**.

---

## 🧠 Controlled vs Uncontrolled

- Controlled → pass `value`
- Uncontrolled → use `defaultValue`

---

## 📄 License

MIT — use freely in personal & commercial projects.

---

Built with ❤️ by Mostakim Billah
