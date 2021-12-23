import classes from "./BlogHeading.module.css";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Icon,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { BiHomeHeart } from "react-icons/bi";

function BlogHeading() {
  return (
    <header className={classes.pageheader}>
      <div className={classes.container}>
        <h1>Blog</h1>
        <Breadcrumb
          spacing="4px"
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink href="/" _hover={{ color: "#D93644" }}>
              <Icon as={BiHomeHeart} h={6} w={6} size="sm" pt="4px" />
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage h="24px">
            <BreadcrumbLink
              fontSize="13px"
              position="relative"
              top="-3px"
              href="#"
              _hover={{ textDecoration: "none", color: "#D93644" }}
            >
              Contact
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
    </header>
  );
}

export default BlogHeading;
