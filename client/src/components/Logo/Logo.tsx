import Link from 'next/link';
import { FC, SVGAttributes } from 'react';

interface Props extends SVGAttributes<SVGElement> {
  variant?: 'dark' | 'light' | 'dark-icon' | 'light-icon';
}

const Logo: FC<Props> = (props) => {
  const { height = '100%', variant = 'dark', href = '/' } = props;
  const logoSvg = require(`@/src/assets/logo/${variant}.svg`).default;

  return (
    <Link href={href}>
      <a>{logoSvg({ ...props, height, href: undefined, variant: undefined })}</a>
    </Link>
  );
};

export default Logo;
