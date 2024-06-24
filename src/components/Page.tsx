import { PropsWithChildren, useEffect } from 'react';

export const Page = ({title, children}: PropsWithChildren<{ title: string }>) => {
  useEffect(() => {
    document.title = title ?? '';
  }, [title]);

  return <>{children}</>
};
