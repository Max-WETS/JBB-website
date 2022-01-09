import classes from "./ProductsAside.module.css";
import Link from "next/link";
import { Field, Form, Formik } from "formik";
import {
  Icon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import Image from "next/image";
import ProductItem from "./ProductItem";
import { BsTwitter, BsFacebook, BsInstagram } from "react-icons/bs";
import { FaRss } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Product } from "./ProductsList";

function BlogAside(props: {
  products: Product[];
  activeCategories: Object;
  setSelectedCategory;
  setFilterRange;
}) {
  const [priceRange, setPriceRange] = useState([]);
  const [priceRangeCurrentValues, setPriceRangeCurrentValues] = useState([
    0, 200,
  ]);
  const api_url = "https://jbb-admin.herokuapp.com/";

  function getPriceRange(products) {
    const priceRangeArr = [];
    const pricesArr = products.reduce((prev, curr) => {
      return [...prev, curr.price];
    }, []);
    priceRangeArr[0] = Math.min(...pricesArr);
    priceRangeArr[1] = Math.max(...pricesArr);
    console.log("prices range array:", priceRangeArr);
    return priceRangeArr;
  }

  useEffect(() => {
    const priceRange = getPriceRange(props.products);
    setPriceRange(priceRange);
    // setPriceRangeCurrentValues([
    //   ((priceRange[1] - priceRange[0]) * 4) / 10,
    //   ((priceRange[1] - priceRange[0]) * 6) / 10,
    // ]);
  }, []);

  useEffect(() => {
    console.log("price range current values:", priceRangeCurrentValues);
  }, [priceRangeCurrentValues]);

  // console.log("Blog Aside categories:", props.activeCategories);

  const handleClick = (e) => {
    props.setSelectedCategory(e.target.dataset.category);
  };

  function SideProductDetail({ product }) {
    return (
      <li key={product.id}>
        <Link href="">
          <a className={classes.imgctr}>
            <Image
              src={api_url + product.image}
              alt={product.name}
              width="100%"
              height="100%"
            />
            <span className={classes.overlay}></span>
          </a>
        </Link>
        <div className={classes.recentarticledetails}>
          <Link href="">
            <a>{product.name}</a>
          </Link>
          <div>
            <div>{product.price}</div>
          </div>
        </div>
      </li>
    );
  }

  return (
    <aside className={classes.sidebarctn}>
      <div className={classes.sidebarinner}>
        <div className={classes.sidebox}>
          <h4 className={classes.socialtitle}>Filtrer par prix</h4>
          <RangeSlider
            defaultValue={[0, 300]}
            min={0}
            max={priceRange[1]}
            // step={(priceRange[1] - priceRange[0]) / 10}
            onChangeEnd={(values) =>
              setPriceRangeCurrentValues(values.map((val) => Math.round(val)))
            }
          >
            <RangeSliderTrack bg="red.200">
              <RangeSliderFilledTrack bg="#D93644" />
            </RangeSliderTrack>
            <RangeSliderThumb boxSize={6} index={0} />
            <RangeSliderThumb boxSize={6} index={1} />
          </RangeSlider>
          <div className={classes.filterlowerbox}>
            <div
              className={classes.pricelabel}
            >{`Prix: ${priceRangeCurrentValues[0]}€ - ${priceRangeCurrentValues[1]}€`}</div>
            <Button
              size="xs"
              colorScheme="red"
              onClick={() => props.setFilterRange(priceRangeCurrentValues)}
            >
              Filtrer
            </Button>
          </div>
        </div>
        <div className={classes.sidebox}>
          <h4 className={classes.socialtitle}>Me suivre</h4>
          <ul className={classes.socialicons}>
            <Link href="">
              <a>
                <li>
                  <Icon as={BsTwitter} h={5} w={5} size="sm" />
                </li>
              </a>
            </Link>
            <Link href="">
              <a>
                <li>
                  <Icon as={BsFacebook} h={5} w={5} size="sm" />
                </li>
              </a>
            </Link>
            <Link href="">
              <a>
                <li>
                  <Icon as={BsInstagram} h={5} w={5} size="sm" />
                </li>
              </a>
            </Link>
            <Link href="">
              <a>
                <li>
                  <Icon as={FaRss} h={5} w={5} size="sm" />
                </li>
              </a>
            </Link>
          </ul>
        </div>
        <div className={classes.sidebox}>
          <h4 className={classes.socialtitle}>Newsletter</h4>
          <div className={classes.newsletter}>
            <div className={classes.newslettertxt}>
              Recevez mes dernières nouvelles directement sur votre boîte mail
            </div>
            <Formik
              initialValues={{ email: "" }}
              onSubmit={() => console.log("email submitted")}
            >
              {(props) => (
                <Form>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl>
                        <FormLabel htmlFor="email" />
                        <InputGroup size="md">
                          <Input
                            {...field}
                            variant="filled"
                            id="email"
                            placeholder="Adresse mail"
                          />
                          <InputRightElement width="4.5rem">
                            <Button colorScheme="blackAlpha" type="submit">
                              OK
                            </Button>
                          </InputRightElement>
                        </InputGroup>
                      </FormControl>
                    )}
                  </Field>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className={classes.sidebox}>
          <h4 className={classes.socialtitle}>Catégories</h4>
          <div className={classes.blogcategories}>
            {Object.entries(props.activeCategories).map(([category, qty]) => (
              <li>
                <div data-category={category} onClick={(e) => handleClick(e)}>
                  {category}
                </div>
                <span>{`(${qty})`}</span>
              </li>
            ))}
            <li>
              <div data-category="Toutes" onClick={(e) => handleClick(e)}>
                Toutes catégories
              </div>
              <span>{`(${props.products.length})`}</span>
            </li>
          </div>
        </div>
        <div className={classes.sidebox}>
          <h4 className={classes.socialtitle}>Articles récents</h4>
          <ul className={classes.sidebarlist}>
            <SideProductDetail product={props.products[0]} />
            <SideProductDetail product={props.products[1]} />
            <SideProductDetail product={props.products[2]} />
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default BlogAside;