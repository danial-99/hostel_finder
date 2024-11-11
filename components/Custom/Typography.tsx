import React from 'react';
import classNames from 'classnames';

type TypographyProps = {
  variant?: 
    | 'h1' 
    | 'h2' 
    | 'h3' 
    | 'h4' 
    | 'h5' 
    | 'h6' 
    | 'p' 
    | 'span' 
    | 'small' 
    | 'strong' 
    | 'blockquote'
    | 'b'
    | 'i'
    | 'em'
    | 'mark'
    | 'del'
    | 'ins'
    | 'sub'
    | 'sup';
  children: React.ReactNode;
  className?: string;
  [x: string]: any; // Additional props like id, style, etc.
};

const baseStyles = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-semibold',
  h3: 'text-2xl font-medium',
  h4: 'text-xl font-medium',
  h5: 'text-lg font-normal',
  h6: 'text-base font-normal',
  p: 'text-base',
  span: 'text-base',
  small: 'text-sm',
  strong: 'font-bold',
  blockquote: 'border-l-4 border-gray-500 pl-4 italic',
  b: 'font-bold',
  i: 'italic',
  em: 'italic font-semibold',
  mark: 'bg-yellow-200',
  del: 'line-through',
  ins: 'underline',
  sub: 'align-sub text-xs',
  sup: 'align-super text-xs',
};

const Typography: React.FC<TypographyProps> = ({
  variant = 'p',
  children,
  className,
  ...props
}) => {
  const Component = variant;
  const combinedClassName = classNames(baseStyles[variant], className);

  return <Component className={combinedClassName} {...props}>{children}</Component>;
};

export default Typography;