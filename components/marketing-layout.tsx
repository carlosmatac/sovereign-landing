import { cn } from "@/lib/utils"

type MktContainerProps = React.ComponentProps<"div"> & {
  size?: "default" | "prose"
}

export function MktSectionX({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("mkt-section-x", className)} {...props} />
}

export function MktContainer({
  className,
  size = "default",
  ...props
}: MktContainerProps) {
  return (
    <div
      className={cn(
        "mkt-container",
        size === "prose" && "mkt-container-prose",
        className,
      )}
      {...props}
    />
  )
}
