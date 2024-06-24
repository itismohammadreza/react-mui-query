import { CSSProperties, useEffect, useMemo, useState } from "react";
import { eventBusService } from "@services/eventBusService";
import { CircularProgress } from "@mui/material";

export const Loading = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    eventBusService.on("loading", value => {
      setLoading(value);
    })
  }, [])

  const styles = useMemo<CSSProperties>(() => ({
    width: '100%',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    transition: 'all 0.5s',
    visibility: loading ? 'visible' : 'hidden',
    opacity: loading ? 1 : 0,
    zIndex: 900000000000000,
  }), [loading])

  return (
      <div style={styles}>
        <CircularProgress size={100}/>
      </div>
  )
}
