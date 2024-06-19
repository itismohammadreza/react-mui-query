import { useEffect } from 'react';
import { WithChildren } from "@models/common";

export const Page = ({title, children}: WithChildren<{ title: string }>) => {
  useEffect(() => {
    document.title = title ?? '';
  }, [title]);

  return <>{children}</>
};
