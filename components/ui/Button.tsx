'use client';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { ButtonHTMLAttributes, ReactNode, CSSProperties } from 'react';

const buttonClasses = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary: 'bg-bg-button-background text-text-button-text hover:bg-opacity-90 focus:ring-bg-primary-background',
        secondary: 'bg-bg-secondary-background text-text-secondary-foreground hover:bg-opacity-90 focus:ring-bg-secondary-background',
        outline: 'border-2 border-border-button-border text-text-button-background bg-transparent hover:bg-bg-button-background hover:text-text-button-text focus:ring-bg-primary-background',
      },
      size: {
        small: 'text-xs px-3 py-1.5',
        medium: 'text-sm px-4 py-2',
        large: 'text-md px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonClasses> {
  // Required parameters with defaults
  text?: string;
  text_font_size?: string;
  text_font_family?: string;
  text_font_weight?: string;
  text_line_height?: string;
  text_text_align?: string;
  text_color?: string;
  fill_background_color?: string;
  border_border?: string;
  border_border_radius?: string;
  
  // Optional parameters
  layout_width?: string;
  padding?: string;
  position?: string;
  
  // Standard React props
  children?: ReactNode;
}

const Button = ({
  // Required parameters with defaults (mapped to style JSON)
  text = "Sign in",
  text_font_size = "text-sm", // 16px maps to text-sm
  text_font_family = "Inter",
  text_font_weight = "font-semibold", // 600 maps to font-semibold
  text_line_height = "leading-sm", // 20px maps to leading-sm
  text_text_align = "left",
  text_color = "text-primary-foreground", // #fafafa maps to text-primary-foreground
  fill_background_color = "bg-primary-background", // #008080 maps to bg-primary-background
  border_border = "1px solid #d9d9d9",
  border_border_radius = "rounded-sm", // 8px maps to rounded-sm
  
  // Optional parameters (no defaults)
  layout_width,
  padding,
  position,
  
  // Standard React props
  variant,
  size,
  disabled = false,
  className,
  children,
  onClick,
  type = 'button',
  ...props
}: ButtonProps) => {
  // Safe validation for optional parameters
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width.trim() !== ''
  const hasValidPadding = padding && typeof padding === 'string' && padding.trim() !== ''
  const hasValidPosition = position && typeof position === 'string' && position.trim() !== ''

  const optionalClasses = [
    hasValidWidth ? `w-[${layout_width}]` : '',
    hasValidPadding ? `p-[${padding}]` : '',
    hasValidPosition ? position : '',
  ].filter(Boolean).join(' ')

  // Build custom styles for non-Tailwind properties
  const customStyles: CSSProperties = {
    // Only use inline styles for truly custom values
    ...(text_font_family && !text_font_family.startsWith('font-') && { fontFamily: text_font_family }),
  }

  // Build Tailwind classes for styling
  const styleClasses = [
    text_font_size,
    text_font_family.startsWith('font-') ? text_font_family : '',
    text_font_weight,
    text_line_height,
    `text-${text_text_align}`,
    text_color,
    // Only apply these if not using variant system
    !variant ? fill_background_color : '',
    !variant ? `border border-[${border_border.split(' ')[2] || '#d9d9d9'}]` : '',
    border_border_radius,
  ].filter(Boolean).join(' ')

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      event.preventDefault()
      return
    }
    
    if (typeof onClick === 'function') {
      onClick(event)
    }
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      style={customStyles}
      className={twMerge(
        buttonClasses({ variant, size }),
        styleClasses,
        optionalClasses,
        className
      )}
      aria-disabled={disabled}
      {...props}
    >
      {children || text}
    </button>
  )
}

export default Button