import { Box, BoxProps } from '@mui/material';
import Link from "next/link";

interface LogoProps extends BoxProps {
  src?: string;
  href?: string;
  disableLink?: boolean;
}

export const Logo = (props: LogoProps) => {
  const {disableLink = false, src, href, sx} = props;

  const logo = (
      <Box
          component="img"
          src={src || '/logo/logo.svg'}
          sx={{width: 40, height: 40, cursor: 'pointer', ...sx}}
      />
  );

  if (disableLink) {
    return <>{logo}</>;
  }

  return <Link href={href || '/'}>{logo}</Link>;
}
