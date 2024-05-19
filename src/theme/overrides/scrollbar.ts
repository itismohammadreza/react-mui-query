interface ScrollbarOptions {
  thickness: string;
  radius: string;
  trackColor: string;
  thumbColor: string;
}

export const scrollbar = (options: ScrollbarOptions) => {
  const {radius, thumbColor, trackColor, thickness} = options;
  return `
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      border-radius: 10px;
      background-color: ${trackColor};
    }
  
    ::-webkit-scrollbar {
      width: ${thickness};
      height: ${thickness};
      background-color: ${trackColor};
    }
  
    ::-webkit-scrollbar-thumb {
      border-radius: ${radius};
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: ${thumbColor};
  
    &:hover {
        background-color: lighten(${thumbColor}, 15%);
      }
    }
  `
}
