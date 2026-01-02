# Badge Component Documentation

A fully customizable, Tailwind-CSS based Badge component, inspired by Ant Design / MUI. Supports counts, dots, status, children-only mode, custom sizes, shapes, events, and more.

---

## 1. Simple Count Badge
```tsx
<Badge count={5}>
  <button className="px-4 py-2 bg-slate-700 text-white rounded">
    Inbox
  </button>
</Badge>
```

## 2. Overflow Count (max)
```tsx
<Badge count={120} max={99}>
  <BellIcon />
</Badge>
```

## 3. Dot Badge
```tsx
<Badge dot>
  <Avatar />
</Badge>
```

## 4. Status Badge (Ant Design style)
```tsx
<Badge status="success">
  <span className="text-sm">Online</span>
</Badge>
```

## 5. Children-Only Badge
(No count, behaves like a styled badge)
```tsx
<Badge className="bg-slate-800 text-white px-2 py-1 rounded-md">
  New
</Badge>
```

## 6. Standalone Badge (No children)
```tsx
<Badge standalone count={12} />
```

---

## Styling Options

### Size
```tsx
<Badge count={3} size="sm">
  <BellIcon />
</Badge>
```
Available sizes:
- xs
- sm
- md (default)
- lg
- custom

### Radius / Shape
```tsx
<Badge count="PRO" radius="pill">
  Plan
</Badge>
```
Available radius values:
- rounded
- rounded-md
- rounded-lg
- rounded-full
- pill
- custom

### Custom Size & Radius
```tsx
<Badge
  count={9}
  size="custom"
  radius="custom"
  className="h-6 min-w-6 px-2 rounded-lg bg-purple-600"
>
  <BellIcon />
</Badge>
```

### Custom Colors
```tsx
<Badge count={7} color="bg-emerald-600" textColor="text-white">
  <MailIcon />
</Badge>
```

### Border Support
```tsx
<Badge count={1} border="border border-white">
  <Avatar />
</Badge>
```

---

## Placement & Offset

### Placement
```tsx
<Badge count={5} placement="bottom-left">
  <BellIcon />
</Badge>
```
Available placements:
- top-right (default)
- top-left
- bottom-right
- bottom-left

### Offset
```tsx
<Badge count={3} offset={[6, -6]}>
  <BellIcon />
</Badge>
```
Format: `[x, y]`

---

## Events Support
```tsx
<Badge
  count={4}
  onClick={() => console.log("Clicked")}
  onMouseEnter={() => console.log("Hover")}
>
  <BellIcon />
</Badge>
```
Supported events:
- onClick
- onMouseEnter
- onMouseLeave
- onFocus

---

## All Props Reference
```ts
interface BadgeProps {
  count?: number | string;
  max?: number;
  dot?: boolean;
  showZero?: boolean;
  status?: "success" | "error" | "warning" | "info" | "processing";
  children?: React.ReactNode;
  standalone?: boolean;

  size?: "xs" | "sm" | "md" | "lg" | "custom";
  radius?: "rounded" | "rounded-md" | "rounded-lg" | "rounded-full" | "pill" | "custom";

  color?: string;
  textColor?: string;
  border?: string;

  placement?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  offset?: [number, number];

  className?: string;
  style?: React.CSSProperties;

  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
}
```

---

Built with ❤️ by Mostakim Billah