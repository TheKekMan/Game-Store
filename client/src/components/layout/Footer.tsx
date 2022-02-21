import styled from "@emotion/styled";
import React from "react";
import {
  Container,
  GitHubIcon,
  IconButton,
  Link,
  TwitterIcon,
  Typography,
  YouTubeIcon,
} from "../../mui";

const CustomFooter = styled(Container)(() => ({
  textAlign: "center",
  minHeight: "100px",
  maxHeight: "200px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const Footer = () => {
  return (
    <CustomFooter
      maxWidth={false}
      sx={{
        backgroundColor: "secondary.main",
        position: "relative",
        bottom: "0",
      }}
    >
      <Typography>
        Created by{" "}
        <Link
          sx={{ color: "text.primary" }}
          href={"https://github.com/TheKekMan/"}
          target={"_blank"}
          style={{ textDecoration: "underline" }}
        >
          TheKekMan
        </Link>
      </Typography>
      <Container
        sx={{
          display: "flex",
          gap: "0.7em",
          justifyContent: "center",
          marginTop: "1em",
        }}
      >
        <IconButton>
          <GitHubIcon />
        </IconButton>
        <IconButton>
          <YouTubeIcon />
        </IconButton>
        <IconButton>
          <TwitterIcon />
        </IconButton>
      </Container>
    </CustomFooter>
  );
};

export default Footer;
