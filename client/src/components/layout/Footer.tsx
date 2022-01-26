import styled from "@emotion/styled";
import React from "react";
import { Link } from "react-router-dom";
import {
  Container,
  GitHubIcon,
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
          to={"https://github.com/TheKekMan/"}
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
        <GitHubIcon />
        <YouTubeIcon />
        <TwitterIcon />
      </Container>
    </CustomFooter>
  );
};

export default Footer;
