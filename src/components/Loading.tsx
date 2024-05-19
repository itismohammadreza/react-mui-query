import { useLoading } from "@hooks/useLoading";
import { useMemo } from "react";

export const Loading = () => {
  const {value} = useLoading();

  const styles = useMemo(() => ({
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
    visibility: value ? 'visible' : 'hidden',
    opacity: value ? 1 : 0,
    zIndex: 900000000000000,
  }), [value])

  return (
      <div style={styles}>
        <svg
            height="200px"
            preserveAspectRatio="xMidYMid"
            style={{margin: 'auto', background: 'rgba(255, 255, 255, 0.592)', display: 'block'}}
            viewBox="0 0 100 100"
            width="200px"
            xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(20 50)">
            <circle cx="0" cy="0" fill="#0a818e" r="6">
              <animateTransform
                  attributeName="transform"
                  begin="-0.375s"
                  calcMode="spline"
                  dur="1s"
                  keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                  keyTimes="0;0.5;1"
                  repeatCount="indefinite"
                  type="scale"
                  values="0;1;0"
              ></animateTransform>
            </circle>
          </g>
          <g transform="translate(40 50)">
            <circle cx="0" cy="0" fill="#1b9aaa" r="6">
              <animateTransform
                  attributeName="transform"
                  begin="-0.25s"
                  calcMode="spline"
                  dur="1s"
                  keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                  keyTimes="0;0.5;1"
                  repeatCount="indefinite"
                  type="scale"
                  values="0;1;0"
              ></animateTransform>
            </circle>
          </g>
          <g transform="translate(60 50)">
            <circle cx="0" cy="0" fill="#44c1c3" r="6">
              <animateTransform
                  attributeName="transform"
                  begin="-0.125s"
                  calcMode="spline"
                  dur="1s"
                  keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                  keyTimes="0;0.5;1"
                  repeatCount="indefinite"
                  type="scale"
                  values="0;1;0"
              ></animateTransform>
            </circle>
          </g>
          <g transform="translate(80 50)">
            <circle cx="0" cy="0" fill="#73d9e0" r="6">
              <animateTransform
                  attributeName="transform"
                  begin="0s"
                  calcMode="spline"
                  dur="1s"
                  keySplines="0.3 0 0.7 1;0.3 0 0.7 1"
                  keyTimes="0;0.5;1"
                  repeatCount="indefinite"
                  type="scale"
                  values="0;1;0"
              ></animateTransform>
            </circle>
          </g>
        </svg>
      </div>
  )
}
