import React, { CSSProperties, KeyboardEvent, MouseEvent, ReactNode, ButtonHTMLAttributes } from 'react';
import { IconType } from 'react-icons/lib';
import { Oval } from 'react-loader-spinner';

export type UI_SizeType = 'sm' | 'md' | 'lg' | 'iconmd' | 'xl' | '2xl' | 'iconlg' | 'iconxs' | 'iconsm';

export type UI_VariantType = 'default' | 'outline' | 'grayscale'   | 'ghost'  |  'main';

type Props = {
  id?: string;
  icon?: IconType | ReactNode ;
  iconLeft?: IconType | ReactNode ;
  iconRight?: IconType | ReactNode ;
  size?: UI_SizeType;
  variant?: UI_VariantType;
  className?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  tooltiplabel?: string;
  loading?: boolean;
  children?: ReactNode;
  disabled?: boolean;
  onKeyDown?: (e: KeyboardEvent<HTMLButtonElement>) => void;
  style?: CSSProperties;
};

export type ButtonProps = Props & ButtonHTMLAttributes<HTMLButtonElement>;

export const ui_styles = {
  variant: {
    main:'border-2 border-button text-button bg-button text-white  hover:text-button hover:bg-transparent transition-all',
    outline: 'inline-flex items-center justify-center bg-white text-gray-500 font-medium shadow-sm border border-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all gap-4',
    default: 'inline-flex items-center justify-center bg-button text-white shadow-sm   focus:outline-none focus:ring-2 focus:ring-button focus:ring-offset-2 transition-all disabled:bg-button/50 disabled:cursor-not-allowed gap-4',
    grayscale: 'text-gray-600 border border-slate-200  flex items-center justify-center hover:bg-slate-100 transition-all gap-4',
    ghost: ' flex items-center justify-center   text-gray-600   hover:bg-gray-200   focus:ring-2 focus:ring-button focus:ring-offset-2 transition-all duration-400 gap-4',
  },
  size: {
    sm: 'px-2 h-8 w-fit text-sm font-medium rounded',
    md: 'px-4 h-9 w-fit text-sm font-medium rounded ',
    lg: 'px-4 h-10 w-fit rounded-md font-semibold',
    iconxs: 'w-[25px] h-[25px] rounded',
    iconsm: 'w-8 h-8 rounded',
    iconmd: 'w-9 h-9 rounded',
    iconlg: 'w-10 h-10 rounded-md font-semibold',
    xl: 'h-12 px-8 rounded-lg text-lg font-bold',
    '2xl': 'h-[54px] px-9 rounded-lg text-lg font-bold'
  },
  text_color: {
    main: 'white',
    default: '#FFFFFF',
    outline: '#6B7280',
    outline_brand: '#FF6559',
    grayscale: '#4B5563',
    ghostorange: '#FF6559',
    ghost: '#4B5563',
},
  
};

export const ui_icon_sizes = {
  size: {
    sm: 'h-4 w-4',
    iconxs: 'h-4 w-4',
    iconsm: 'h-[18px] w-[18px]',
    iconmd: 'h-5 w-5',
    iconlg: 'h-6 w-6',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
    '2xl': 'h-8 w-8',
  },
};

export const Button: React.FC<ButtonProps> = ({
  disabled = false,
  icon: Icon,
  iconLeft: IconLeft,
  iconRight: IconRight,
  size = 'md',
  variant = 'default',
  children,
  className = '',
  onClick = () => {},
  loading = false,
  onKeyDown,
  style = {},
  id = '',
  ...rest // this will capture additional button attributes
}) => {
  const buttonContent = (
    <button
      style={style}
      id={id}
      onKeyDown={(e) => {
        if (onKeyDown) {
          onKeyDown(e);
        }
      }}
      disabled={disabled}
      className={`${ui_styles.variant[variant]} ${ui_styles.size[size]} ${className}`}
      onClick={onClick}
      {...rest} // apply additional button attributes here
    >
      {loading && (
        <Oval
          visible={true}
          height="15"
          width="15"
          strokeWidth={8}
          color={ui_styles.text_color[variant]}
          secondaryColor='rgba(0, 0, 0, 0.2)'
          ariaLabel="oval-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />)}
        {(size === 'iconlg' || size === 'iconmd' || size === 'iconsm' || size === 'iconxs') && loading ? null :
        <span className={`flex items-center justify-center  ${(size === 'iconlg' || size === 'iconmd' || size === 'iconsm' || size === 'iconxs') ? 'gap-0' : 'gap-2'}`}>
          {IconLeft && typeof IconLeft === 'function' && <IconLeft className={ui_icon_sizes.size[size]} />}
          {Icon && typeof Icon === 'function' && <Icon className={ui_icon_sizes.size[size]} />}
          <span className={className}>{children}</span>
          {IconRight && typeof IconRight === 'function' && <IconRight className={ui_icon_sizes.size[size]} />}
        </span>
        }
    </button>
  );

  return buttonContent 
};

export default Button;