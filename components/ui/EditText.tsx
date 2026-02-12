'use client';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import { InputHTMLAttributes, CSSProperties, forwardRef } from 'react';

const editTextClasses = cva(
  'w-full transition-all duration-200 focus:outline-none focus:ring-1',
  {
    variants: {
      variant: {
        default: 'bg-bg-input-background text-text-input-text border-border-input-border focus:ring-bg-primary-background',
        secondary: 'bg-bg-secondary-background text-text-secondary-foreground border-border-secondary focus:ring-bg-secondary-background',
      },
      size: {
        small: 'text-xs px-3 py-1.5',
        medium: 'text-sm px-4 py-2',
        large: 'text-md px-6 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'medium',
    },
  }
)

interface EditTextProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof editTextClasses> {
  placeholder?: string;
  text_font_size?: string;
  text_font_family?: string;
  text_font_weight?: string;
  text_line_height?: string;
  text_text_align?: string;
  text_color?: string;
  fill_background_color?: string;
  border_border?: string;
  border_border_radius?: string;
  
  layout_width?: string;
  padding?: string;
  position?: string;
}

const EditText = forwardRef<HTMLInputElement, EditTextProps>(({
  placeholder = "ID",
  text_font_size = "text-sm",
  text_font_family = "Inter",
  text_font_weight = "font-semibold",
  text_line_height = "leading-sm",
  text_text_align = "left",
  text_color = "text-input-text",
  fill_background_color = "bg-input-background",
  border_border = "1px solid #a8a8a8",
  border_border_radius = "rounded-sm",
  
  layout_width,
  padding,
  position,
  
  variant,
  size,
  disabled = false,
  className,
  type = 'text',
  ...props
}, ref) => {
  const hasValidWidth = layout_width && typeof layout_width === 'string' && layout_width.trim() !== ''
  const hasValidPadding = padding && typeof padding === 'string' && padding.trim() !== ''
  const hasValidPosition = position && typeof position === 'string' && position.trim() !== ''

  const optionalClasses = [
    hasValidWidth ? `w-[${layout_width}]` : '',
    hasValidPadding ? `p-[${padding}]` : '',
    hasValidPosition ? position : '',
  ].filter(Boolean).join(' ')

  const customStyles: CSSProperties = {
    ...(text_font_family && !text_font_family.startsWith('font-') && { fontFamily: text_font_family }),
  }

  const styleClasses = [
    text_font_size,
    text_font_family.startsWith('font-') ? text_font_family : '',
    text_font_weight,
    text_line_height,
    `text-${text_text_align}`,
    text_color,
    !variant ? fill_background_color : '',
    !variant ? `border border-[${border_border.split(' ')[2] || '#a8a8a8'}]` : '',
    border_border_radius,
  ].filter(Boolean).join(' ')

  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      style={customStyles}
      className={twMerge(
        editTextClasses({ variant, size }),
        styleClasses,
        optionalClasses,
        className
      )}
      aria-disabled={disabled}
      {...props}
    />
  )
})

EditText.displayName = 'EditText'

export default EditText