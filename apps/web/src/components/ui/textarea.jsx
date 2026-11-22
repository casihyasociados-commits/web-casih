import * as React from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    (<motion.textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      animate={{
        borderColor: isFocused ? "hsl(var(--ring))" : "hsl(var(--input))",
        boxShadow: isFocused ? "0 0 0 2px hsl(var(--ring))" : "none"
      }}
      transition={{ duration: 0.2 }}
      {...props} />)
  );
})
Textarea.displayName = "Textarea"

export { Textarea }