# Dropdown Component

A fully dynamic, TailwindCSS-based Dropdown component using **Headless UI**. Supports:

* `items` array with `value` + `label` (ReactNode supported)
* Single `onChange` callback
* Divider options: `all | even | odd | none`
* Custom TailwindCSS classes for button, menu, and items
* Optional icon
* Disabled items
* Fully ReactNode-compatible labels

---

## Installation

```bash
npm install @headlessui/react lucide-react clsx
```

---

## Props

| Prop              | Type                                 | Default         | Description                                |
| ----------------- | ------------------------------------ | --------------- | ------------------------------------------ |
| `label`           | `React.ReactNode`                    | `"Select"`      | Button label when no item selected         |
| `items`           | `DropdownItem[]`                     | `[]`            | Array of menu items                        |
| `value`           | `string \| number`                   | `undefined`     | Currently selected value                   |
| `onChange`        | `(value: string \| number) => void`  | `undefined`     | Callback when item selected                |
| `divider`         | `"all" \| "even" \| "odd" \| "none"` | `"none"`        | Divider placement between items            |
| `buttonClassName` | `string`                             | `""`            | Tailwind classes for the MenuButton        |
| `menuClassName`   | `string`                             | `""`            | Tailwind classes for MenuItems container   |
| `itemClassName`   | `string`                             | `""`            | Default Tailwind classes for each MenuItem |
| `icon`            | `React.ReactNode`                    | ChevronDownIcon | Optional icon for the button               |

---

## DropdownItem

```ts
interface DropdownItem {
  value: string | number;         // Unique value
  label: React.ReactNode;         // Label to display, supports icons/ReactNode
  disabled?: boolean;             // Optional disabled state
  className?: string;             // Optional Tailwind classes for this item
}
```

---

## Usage Examples

### 1. Basic Dropdown

```tsx
const items = [
  { value: "edit", label: "Edit" },
  { value: "duplicate", label: "Duplicate" },
  { value: "archive", label: "Archive" },
  { value: "delete", label: <span className="text-red-500">Delete</span> },
];

<Dropdown
  label="Actions"
  items={items}
  value={value}
  onChange={setValue}
/>
```

### 2. Dropdown with Dividers

```tsx
<Dropdown
  label="Actions"
  items={items}
  value={value}
  onChange={setValue}
  divider="all" // options: all | even | odd | none
/>
```

### 3. Dropdown with Tailwind Customization

```tsx
<Dropdown
  label="Options"
  items={items}
  value={value}
  onChange={setValue}
  buttonClassName="bg-blue-600 text-white hover:bg-blue-700"
  menuClassName="bg-white text-black shadow-xl"
  itemClassName="hover:bg-blue-50"
  icon={<ChevronDownIcon className="w-5 h-5" />}
/>
```

### 4. ReactNode Labels (Icons)

```tsx
import { UserIcon, MailIcon } from "lucide-react";

const items = [
  { value: "profile", label: <><UserIcon className="inline w-4 h-4" /> Profile</> },
  { value: "messages", label: <><MailIcon className="inline w-4 h-4" /> Messages</> },
];

<Dropdown
  label="Menu"
  items={items}
  value={value}
  onChange={setValue}
/>
```

### 5. Disabled Items

```tsx
const items = [
  { value: "edit", label: "Edit" },
  { value: "delete", label: "Delete", disabled: true },
];

<Dropdown
  items={items}
  value={value}
  onChange={setValue}
/>
```

---

## Notes

* Uses **Headless UI Menu** under the hood.
* Active item styling uses **`data-[headlessui-state=active]`** for Tailwind compatibility (Headless UI v1.7+).
* Supports **ReactNode** for labels for flexible content.
* Single **`onChange`** callback handles all item selection.

---

Built with ❤️ by Mostakim Billah