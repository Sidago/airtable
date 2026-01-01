export interface InfoRowProps {
  label: string | ReactNode;
  value: string | ReactNode;
  className?: string;

  /** layout variants */
  direction?: "row" | "column";

  /** optional styles */
  labelClassName?: string;
  valueClassName?: string;
}