import { PropsWithChildren } from "react";
import { useConfig } from "@hooks/useConfig";
import { CacheProvider } from "@emotion/react";
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import createCache from '@emotion/cache';

export const RtlProvider = ({children}: PropsWithChildren) => {
  const [{rtl}] = useConfig();
  const rtlCache = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const ltrCache = createCache({
    key: 'mui',
  });

  document.dir = rtl ? 'rtl' : 'ltr';

  return (
      <CacheProvider value={rtl ? rtlCache : ltrCache}>
        {children}
      </CacheProvider>
  )
}
