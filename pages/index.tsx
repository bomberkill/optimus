import { GetStaticProps } from 'next';
import NextImage from 'next/legacy/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  AspectRatio,
  Box,
  Button,
  Card,
  Center,
  Container,
  Grid,
  GridCol,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { theme } from '@/theme';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import analyse from '../public/analyse.gif';
import animation from '../public/animation1.gif';
import logo from '../public/images/logo2.png';
import partner2 from '../public/images/partner2.png';
import partner1 from '../public/images/patner1.png';
import whatsapp from '../public/images/whatsapp.png';
import solution from '../public/solution.gif';
import suivi from '../public/suivi.gif';
// import image1 from '../public/images/image2.png';
// import image2 from '../public/images/image1.png';
// import image3 from '../public/images/image3.png';
import  business from '../public/images/business.png';
import  business2 from '../public/images/business2.png';
import  business3 from '../public/images/business3.png';
import user from '../public/images/man.png';

import '@mantine/carousel/styles.css';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselSlide } from '@mantine/carousel';
import Footer from '@/components/Footer/Footer';

export default function HomePage() {
  const isSmallScreen = useMediaQuery('(min-width: 576px)');
  const [footerIsVisible, setFooterIsVisible] = useState(false);
  const footerRef = useRef(null);
  const { t } = useTranslation('home');
  const autoplay = useRef(Autoplay({ delay: 3000 }));
  const autoplay2 = useRef(Autoplay({ delay: 3000 }));
  const approach = [
    {
      image: business,
    },
    {
      image: business2,
    },
    {
      image: business3,
    },
    {
      image: business,
    },
    {
      image: business2,
    },
    {
      image: business3,
    },
  ];
  const testimony = [
    {
      text: t('testimonials.testimonial1.text'),
      owner: t('testimonials.testimonial1.owner'),
      job: t('testimonials.testimonial1.job'),
      image: user,
    },
    {
      text: t('testimonials.testimonial2.text'),
      owner: t('testimonials.testimonial2.owner'),
      job: t('testimonials.testimonial2.job'),
      image: user,
    },
    {
      text: t('testimonials.testimonial3.text'),
      owner: t('testimonials.testimonial3.owner'),
      job: t('testimonials.testimonial3.job'),
      image: user,
    },
    {
      text: t('testimonials.testimonial1.text'),
      owner: t('testimonials.testimonial1.owner'),
      job: t('testimonials.testimonial1.job'),
      image: user,
    },
    {
      text: t('testimonials.testimonial2.text'),
      owner: t('testimonials.testimonial2.owner'),
      job: t('testimonials.testimonial2.job'),
      image: user,
    },
    {
      text: t('testimonials.testimonial3.text'),
      owner: t('testimonials.testimonial3.owner'),
      job: t('testimonials.testimonial3.job'),
      image: user,
    }
  ];
  const partners = [partner1, partner2, partner1, partner2, partner1, partner2];
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: isSmallScreen ? 0.5 : 0.1,
      }
    );
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);
  return (
    <Box pb={theme.spacing?.xl} >
      <Box>
        <Container size={isSmallScreen ? "80%" : "90%"}>
          <Center>
            <Box w="100%">
              <Box>
                <Center>
                  <AspectRatio w={100} h={100} my={theme.spacing?.sm}>
                    <NextImage
                      src={logo}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      unoptimized
                    />
                  </AspectRatio>
                </Center>
                <Text
                  fz={theme.fontSizes?.xs}
                  ta="center"
                  my={theme.spacing?.sm}
                >
                  {t('title')}
                </Text>
                <Text fz={theme.fontSizes?.md} fw={600} ta="center" c={theme.colors?.white?.[9]}>
                  {t('subtitle')}
                </Text>
                <Link href="why-evaluate">
                  <Text
                    fz={theme.fontSizes?.sm}
                    ta="center"
                  >
                    {t('more')}
                  </Text>
                </Link>
                <Center>
                  <Link href="form" style={{ textDecoration: 'none' }}>
                    <Button
                      my={theme.spacing?.sm}
                      fullWidth
                      h={50}
                      w={isSmallScreen ? 250 : 150}
                      color={theme.colors?.red?.[0]}
                    >
                      <Text fz={isSmallScreen ? theme.fontSizes?.md : theme.fontSizes?.md } fw={600} ta="center">
                        {t('button')}
                      </Text>
                    </Button>
                  </Link>
                </Center>
              </Box>
              <Box my={theme.spacing?.sm}>
                {/* <Text
                  variant="gradient"
                  gradient={{ from: '#EF1D1E ', to: '#EF1D1E' }}
                  fz={theme.fontSizes?.md}
                  ta="center"
                  fw={900}
                >
                  {t('approach')}
                </Text> */}
                <Center>
                  <Carousel
                    my={theme.spacing?.sm}
                    withControls={false}
                    height={200}
                    w={isSmallScreen ? "70%" : "80%"}
                    slideSize="33%"
                    slideGap="lg"
                    loop
                    align="start"
                    slidesToScroll={1}
                    plugins={[autoplay.current]}
                    onMouseEnter={autoplay.current.stop}
                    onMouseLeave={autoplay.current.reset}
                  >
                    {approach.map((item, index) => (
                      <CarouselSlide key={index}>
                        <Center>
                          <AspectRatio w={200} h={200}>
                            <NextImage
                              src={item.image}
                              style={{ width: "100%", height: "100%", objectFit: 'contain' }}
                            />
                          </AspectRatio>
                        </Center>
                      </CarouselSlide>
                    ))}
                  </Carousel>
                </Center>
              </Box>
              <Box mt={theme.spacing?.md}>
                <Text
                  variant="gradient"
                  gradient={{ from: '#EF1D1E ', to: '#EF1D1E' }}
                  fz={theme.fontSizes?.md}
                  ta="center"
                  fw={900}
                >
                  {t('partner')}
                </Text>
                <Center>
                  <Carousel
                    my={theme.spacing?.md}
                    withControls={false}
                    w={isSmallScreen ? "80%" : "80%"}
                    slideSize={isSmallScreen ? "33%" : "100%"}
                    slideGap="md"
                    loop
                    align="start"
                    slidesToScroll={1}
                    plugins={[autoplay2.current]}
                    onMouseEnter={autoplay2.current.stop}
                    onMouseLeave={autoplay2.current.reset}
                  >
                    {testimony.map((item, index) => (
                      <CarouselSlide key={index}>
                        <Box h="100%">
                          <Paper style={{display: 'flex', justifyContent:'center', alignItems: 'center'}} mih={200} radius={5} bg="#FFB8B8" key={index} p={theme.spacing?.sm}>
                            <Stack>
                              <Text fz={theme.fontSizes?.sm} ta="center"> {item.text} </Text>
                              <Group pt={theme.spacing?.md}  gap={10} align='center' justify='start'>
                                <AspectRatio w={40} h={40}>
                                  <NextImage src={item.image} alt='' style={{width: "100%", height: "100%", objectFit: 'contain'}}/>
                                </AspectRatio>
                                <Stack gap={1} align='flex-start' justify='center'>
                                  <Text  fz={theme.fontSizes?.sm} ta="center"> {item.owner} </Text>
                                  <Text  fz={theme.fontSizes?.xs} c="gray" ta="center"> {item.job} </Text>
                                </Stack>
                              </Group>
                            </Stack>
                          </Paper>
                        </Box>
                        {/* <AspectRatio w="auto" h="auto">
                          <NextImage
                            src={item}
                            style={{ width: 250, height: 250, objectFit: 'contain' }}
                          />
                        </AspectRatio> */}
                      </CarouselSlide>
                    ))}
                  </Carousel>
                </Center>
              </Box>
            </Box>
          </Center>
        </Container>
      </Box>
      <Box ref={footerRef}>
        <Box display="none">
          <Footer />
        </Box>
      </Box>
      <Link href="https://wa.me/+237690655845" target="_blank" rel="noopener noreferrer">
        <AspectRatio h="auto" w="auto" right={isSmallScreen ? 50 : 30} bottom={footerIsVisible ? 170 : 50} pos="fixed">
          <NextImage src={whatsapp} width={isSmallScreen ? 40 : 40} height={isSmallScreen ? 40 : 40} />
        </AspectRatio>
      </Link>
    </Box>
  );
}
export const getStaticProps: GetStaticProps = async ({ locale = 'fr' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'footer', 'home'])),
      // Will be passed to the page component as props
    },
  };
};
