import { Box, Button, keyframes, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const NotFound = () => {
  const float = keyframes`
    100% {
      transform: translateY(20px);
    }
  `;

  const SvgContainer = styled('svg')(({theme}) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '380px',
    height: '500px',
    marginTop: '-250px',
    marginLeft: '-400px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '-190px',
    },
  }));

  const MessageBox = styled(Box)(({theme}) => ({
    height: '200px',
    width: '380px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-100px',
    marginLeft: '50px',
    color: '#FFF',
    fontFamily: 'Roboto',
    fontWeight: 300,
    [theme.breakpoints.down('sm')]: {
      marginLeft: '-190px',
      textAlign: 'center',
    }
  }));

  const polygonStyles = {
    animation: `${float} 1s infinite ease-in-out alternate`,
  };

  const Polygon1 = styled('path')({
    ...polygonStyles,
    stroke: '#007FB2',
    strokeWidth: '6',
  });

  const Polygon2 = styled('path')({
    ...polygonStyles,
    animationDelay: '.2s',
    stroke: '#EF4A5B',
    strokeWidth: '6',
  });

  const Polygon3 = styled('path')({
    ...polygonStyles,
    animationDelay: '.4s',
    stroke: '#795D9C',
    strokeWidth: '6',
  });

  const Polygon4 = styled('path')({
    ...polygonStyles,
    animationDelay: '.6s',
    stroke: '#F2773F',
    strokeWidth: '6',
  });

  const Polygon5 = styled('path')({
    ...polygonStyles,
    animationDelay: '.8s',
    stroke: '#36B455',
    strokeWidth: '6',
  });

  return (
      <Box sx={{backgroundColor: '#2F3242', height: '100vh'}}>
        <SvgContainer viewBox="0 0 837 1045">
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <Polygon1 d="M353,9 L626.664028,170 L626.664028,487 L353,642 L79.3359724,487 L79.3359724,170 L353,9 Z"/>
            <Polygon2
                d="M78.5,529 L147,569.186414 L147,648.311216 L78.5,687 L10,648.311216 L10,569.186414 L78.5,529 Z"/>
            <Polygon3 d="M773,186 L827,217.538705 L827,279.636651 L773,310 L719,279.636651 L719,217.538705 L773,186 Z"/>
            <Polygon4 d="M639,529 L773,607.846761 L773,763.091627 L639,839 L505,763.091627 L505,607.846761 L639,529 Z"/>
            <Polygon5 d="M281,801 L383,861.025276 L383,979.21169 L281,1037 L179,979.21169 L179,861.025276 L281,801 Z"/>
          </g>
        </SvgContainer>
        <MessageBox>
          <Typography variant="h1" sx={{fontSize: '60px', lineHeight: '46px', marginBottom: '40px'}}>404</Typography>
          <Typography variant="body1">Page not found</Typography>
          <Box sx={{marginTop: '40px'}}>
            <Button component={Link} to="../" sx={{marginRight: '10px'}}>
              Go Back
            </Button>
            <Button component={Link} to="/">
              Go to Home Page
            </Button>
          </Box>
        </MessageBox>
      </Box>
  )
}
