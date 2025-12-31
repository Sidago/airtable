# Avatar Component Documentation

A fully customizable, Tailwind-CSS based Avatar component for Next.js using `next/image`. Supports images, initials, icons, status indicators, custom sizes, shapes, events, and more.

---

## 1. Image Avatar
```tsx
<Avatar src="/avatar.jpg" alt="User" size="lg" />
```

## 2. Initials Avatar
```tsx
<Avatar initials="MB" size="md" shape="rounded" />
```

## 3. Icon Avatar
```tsx
<Avatar icon={<UserIcon />} size="sm" />
```

## 4. Avatar with Status
```tsx
<Avatar src="/avatar.jpg" status="online" size="lg" />
<Avatar initials="AB" status="busy" size="md" />
```

## 5. Custom Color / Size / Shape
```tsx
<Avatar
  initials="JS"
  size="custom"
  shape="pill"
  className="bg-purple-600 text-white w-16 h-16 text-lg"
  status="away"
  statusColor="bg-yellow-400"
  statusSize={12}
/>
```

## 6. Events
```tsx
<Avatar
  src="/avatar.jpg"
  onClick={() => console.log("Avatar clicked")}
  onMouseEnter={() => console.log("Hovered")}
  status="online"
/>
```

---

## Props Reference
```ts
interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  icon?: React.ReactNode;

  size?: "xs" | "sm" | "md" | "lg" | "xl" | "custom";
  shape?: "rounded" | "rounded-full" | "pill" | "custom";
  status?: "online" | "offline" | "busy" | "away";
  statusColor?: string;
  statusSize?: number;

  className?: string;
  style?: React.CSSProperties;

  border?: string;

  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
}
```

---

## Notes
- Uses `<Image />` from Next.js for automatic optimization.
- Initials or icon fallback if image fails.
- Status indicator is optional and customizable.
- Shape and size can be fully customized with Tailwind classes.
- Can be used standalone or in combination with the Badge component.

